import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, onDelete }) {
    if (notes.length === 0) {
        return (
            <div className="note-empty">
                <span className="note-empty-icon">📋</span>
                <p className="note-empty-text">Aucune note trouvée</p>
                <p className="note-empty-sub">
                    Créez votre première note à l'aide du formulaire ci-dessus.
                </p>
            </div>
        );
    }

    return (
        <div className="note-list">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default NoteList;