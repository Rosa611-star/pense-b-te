import { useState, useEffect } from 'react';
import api from '../api/axios';

function NoteForm({ noteToEdit, onSave, onCancel }) {
    const [title, setTitle]       = useState('');
    const [content, setContent]   = useState('');
    const [priority, setPriority] = useState('Basse');

    // Si on édite une note, pré-remplir le formulaire
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content || '');
            setPriority(noteToEdit.priority);
        }
    }, [noteToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Bloquer si titre vide

        const data = { title, content, priority };

        try {
            if (noteToEdit) {
                await api.put(`/notes/${noteToEdit.id}`, data);
            } else {
                await api.post('/notes', data);
            }
            onSave(); // Recharge la liste
            setTitle(''); setContent(''); setPriority('Basse');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h3>{noteToEdit ? 'Modifier la note' : 'Nouvelle note'}</h3>
            <input
                type="text"
                placeholder="Titre (obligatoire)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                style={{ display: 'block', width: '100%', marginBottom: '8px' }}
            />
            <textarea
                placeholder="Contenu (optionnel)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '8px' }}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}
                style={{ marginBottom: '8px' }}>
                <option>Basse</option>
                <option>Moyenne</option>
                <option>Haute</option>
            </select>
            <button type="submit">
                {noteToEdit ? 'Enregistrer' : 'Ajouter'}
            </button>
            {noteToEdit && (
                <button type="button" onClick={onCancel} style={{ marginLeft: '8px' }}>
                    Annuler
                </button>
            )}
        </form>
    );
}

export default NoteForm;