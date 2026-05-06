import NoteItem from './NoteItem';

function NoteList({ notes, onEdit, onDelete }) {
    if (notes.length === 0) {
        return <p>Aucune note pour l'instant. Créez-en une ! 📝</p>;
    }

    return (
        <div>
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