import { useState, useEffect } from 'react';
import api, { getErrorMessage } from '../api/axios';

const PRIORITIES = ['Basse', 'Moyenne', 'Haute'];

function NoteForm({ noteToEdit, onSave, onCancel, onError }) {
    const [title, setTitle]       = useState('');
    const [content, setContent]   = useState('');
    const [priority, setPriority] = useState('Basse');
    const [loading, setLoading]   = useState(false);
    const [titleErr, setTitleErr] = useState('');

    const isEditing = Boolean(noteToEdit);

    // Pre-fill when editing
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title ?? '');
            setContent(noteToEdit.content ?? '');
            setPriority(noteToEdit.priority ?? 'Basse');
            setTitleErr('');
        } else {
            setTitle('');
            setContent('');
            setPriority('Basse');
            setTitleErr('');
        }
    }, [noteToEdit]);

    const validate = () => {
        if (!title.trim()) {
            setTitleErr('Le titre est obligatoire.');
            return false;
        }
        if (title.length > 100) {
            setTitleErr('Le titre ne peut pas dépasser 100 caractères.');
            return false;
        }
        setTitleErr('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const data = { title: title.trim(), content: content.trim(), priority };
        setLoading(true);
        try {
            if (isEditing) {
                await api.put(`/notes/${noteToEdit.id}`, data);
            } else {
                await api.post('/notes', data);
            }
            onSave();
            if (!isEditing) {
                setTitle('');
                setContent('');
                setPriority('Basse');
            }
        } catch (err) {
            onError?.(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const charLeft = 100 - title.length;

    return (
        <div className="note-form-card">
            <div className="note-form-header">
                <span className="note-form-title">
                    {isEditing ? '✏️ Modifier la note' : '✚ Nouvelle note'}
                </span>
                {isEditing && (
                    <button className="btn btn-ghost btn-sm" type="button" onClick={onCancel}>
                        Annuler
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="note-form-body">
                    {/* Title + Priority row */}
                    <div className="note-form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="note-title">
                                Titre
                                <span style={{ color: 'var(--ink-3)', fontWeight: 400, marginLeft: 4 }}>
                                    ({charLeft} restants)
                                </span>
                            </label>
                            <input
                                id="note-title"
                                className={`form-input${titleErr ? ' error' : ''}`}
                                style={titleErr ? { borderColor: 'var(--danger)' } : {}}
                                type="text"
                                value={title}
                                maxLength={100}
                                placeholder="Titre de la note…"
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (titleErr && e.target.value.trim()) setTitleErr('');
                                }}
                                autoFocus={isEditing}
                            />
                            {titleErr && <span className="form-error">⚠ {titleErr}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="note-priority">Priorité</label>
                            <select
                                id="note-priority"
                                className="form-select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                {PRIORITIES.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="form-group">
                        <label className="form-label" htmlFor="note-content">
                            Contenu <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>(optionnel)</span>
                        </label>
                        <textarea
                            id="note-content"
                            className="form-textarea"
                            value={content}
                            placeholder="Écrivez le contenu de votre note…"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="note-form-actions">
                    {isEditing && (
                        <button type="button" className="btn btn-outline" onClick={onCancel}>
                            Annuler
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <span className="spinner" /> : null}
                        {loading ? 'Enregistrement…' : isEditing ? 'Enregistrer' : 'Ajouter la note'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteForm;