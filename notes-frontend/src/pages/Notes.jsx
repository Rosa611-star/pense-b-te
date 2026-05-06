import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';

function Notes() {
    const [filtre, setFiltre] = useState('Toutes');
    const [notes, setNotes]           = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [message, setMessage]       = useState('');
    const navigate = useNavigate();
    const notesFiltrees = filtre === 'Toutes'
    ? notes
    : notes.filter(note => note.priority === filtre);
    // Charger les notes au démarrage
    const fetchNotes = async () => {
        try {
            const response = await api.get('/notes');
            setNotes(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchNotes(); }, []);

    // Supprimer une note
    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer cette note ?')) return;
        await api.delete(`/notes/${id}`);
        setMessage('Note supprimée ✅');
        fetchNotes();
    };

    // Déconnexion
    const handleLogout = async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>📝 Mes Notes</h1>
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>

            {message && <p style={{ color: 'green' }}>{message}</p>}

            <NoteForm
                noteToEdit={noteToEdit}
                onSave={() => { fetchNotes(); setNoteToEdit(null);
                    setMessage('Note sauvegardée ✅'); }}
                onCancel={() => setNoteToEdit(null)}
            />
            <div style={{ marginBottom: '15px' }}>
    <strong>Filtrer : </strong>
    {['Toutes', 'Haute', 'Moyenne', 'Basse'].map(p => (
        <button key={p} onClick={() => setFiltre(p)}
            style={{
                marginLeft: '8px', padding: '5px 12px',
                background: filtre === p ? '#007bff' : '#f8f9fa',
                color: filtre === p ? 'white' : 'black',
                border: '1px solid #ddd', borderRadius: '4px',
                cursor: 'pointer'
            }}>
            {p}
        </button>
    ))}
</div>
            <NoteList
                notes={notes}
                onEdit={(note) => setNoteToEdit(note)}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Notes;