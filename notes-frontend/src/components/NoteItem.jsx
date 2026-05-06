const BADGE = {
    Haute:   'badge badge-high',
    Moyenne: 'badge badge-medium',
    Basse:   'badge badge-low',
};

function NoteItem({ note, onEdit, onDelete }) {
    const date = new Date(note.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    const handleDelete = () => {
        if (window.confirm(`Supprimer la note "${note.title}" ?`)) {
            onDelete(note.id);
        }
    };

    return (
        <article className="note-card">
            <div className="note-card-header">
                <h3 className="note-card-title">{note.title}</h3>
                <span className={BADGE[note.priority] ?? 'badge'}>
                    {note.priority === 'Haute'   && '▲ '}
                    {note.priority === 'Moyenne' && '● '}
                    {note.priority === 'Basse'   && '▼ '}
                    {note.priority}
                </span>
            </div>

            {note.content && (
                <p className="note-card-content">{note.content}</p>
            )}

            <div className="note-card-footer">
                <span className="note-card-date">
                    📅 {date}
                </span>
                <div className="note-card-actions">
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onEdit(note)}
                        title="Modifier"
                        aria-label={`Modifier la note "${note.title}"`}
                    >
                        ✏️ Modifier
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={handleDelete}
                        title="Supprimer"
                        aria-label={`Supprimer la note "${note.title}"`}
                    >
                        🗑 Supprimer
                    </button>
                </div>
            </div>
        </article>
    );
}

export default NoteItem;