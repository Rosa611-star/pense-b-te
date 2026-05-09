import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/axios';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import ToastContainer, { useToast } from '../components/Toast';

const FILTERS = ['Toutes', 'Haute', 'Moyenne', 'Basse'];

function Notes() {
    const [notes, setNotes]           = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [filtre, setFiltre]         = useState('Toutes');
    const [loading, setLoading]       = useState(true);
    const { toasts, toast, removeToast } = useToast();
    const navigate = useNavigate();

    // ── Filtered list (fix: was passing raw `notes`) ──────
    const notesFiltrees = filtre === 'Toutes'
        ? notes
        : notes.filter(n => n.priority === filtre);

    // ── Fetch notes ────────────────────────────────────────
    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (err) {
            toast(getErrorMessage(err), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchNotes(); }, []);

    // ── Delete ─────────────────────────────────────────────
    const handleDelete = async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            setNotes(prev => prev.filter(n => n.id !== id));
            toast('Note supprimée.', 'success');
            // Deselect if we just deleted the edited note
            if (noteToEdit?.id === id) setNoteToEdit(null);
        } catch (err) {
            toast(getErrorMessage(err), 'error');
        }
    };

    // ── Save callback (after create / update) ──────────────
    const handleSave = () => {
        fetchNotes();
        setNoteToEdit(null);
        toast(
            noteToEdit ? 'Note modifiée avec succès.' : 'Note ajoutée avec succès.',
            'success'
        );
    };

    // ── Logout ─────────────────────────────────────────────
    const handleLogout = async () => {
        try { await api.post('/logout'); } catch (_) { /* ignore */ }
        localStorage.removeItem('token');
        navigate('/login');
    };

    // ── Active filter class ────────────────────────────────
    const filterClass = (f) => {
        if (f !== filtre) return 'filter-btn';
        if (f === 'Toutes') return 'filter-btn active';
        return `filter-btn active-${f.toLowerCase()}`;
    };

    return (
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            {/* Header */}
            <header className="app-header">
                <div className="container">
                    <div className="app-header-inner">
                        <span className="app-logo">📝 NotePad</span>
                        <div className="header-user">
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: '.8rem', color: 'var(--ink-3)' }}>
                                    {notes.length} note{notes.length !== 1 ? 's' : ''}
                                </span>
                            </span>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="notes-page">
                <div className="container">
                    {/* Page Title */}
                    <div className="page-title-row">
                        <h1>Mes notes</h1>
                        {!loading && (
                            <span className="note-count">
                                {notesFiltrees.length} / {notes.length}
                            </span>
                        )}
                    </div>

                    {/* Note Form */}
                    <NoteForm
                        noteToEdit={noteToEdit}
                        onSave={handleSave}
                        onCancel={() => setNoteToEdit(null)}
                        onError={(msg) => toast(msg, 'error')}
                    />

                    {/* Filter Bar */}
                    <div className="filter-bar">
                        <span className="filter-label">Filtrer :</span>
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={filterClass(f)}
                                onClick={() => setFiltre(f)}
                            >
                                {f === 'Haute'   && '▲ '}
                                {f === 'Moyenne' && '● '}
                                {f === 'Basse'   && '▼ '}
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Notes */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-3)' }}>
                            <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
                            <p style={{ marginTop: 14 }}>Chargement…</p>
                        </div>
                    ) : (
                        <NoteList
                            notes={notesFiltrees}  
                            onEdit={(note) => {
                                setNoteToEdit(note);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>
        </>
    );
}

export default Notes;