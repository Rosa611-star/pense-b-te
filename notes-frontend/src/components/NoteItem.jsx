// Couleur du badge selon la priorité
const badgeColor = {
    Basse:   'green',
    Moyenne: 'orange',
    Haute:   'red',
};

function NoteItem({ note, onEdit, onDelete }) {
    const date = new Date(note.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px',
            padding: '15px', marginBottom: '10px' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0 }}>{note.title}</h3>
                <span style={{
                    background: badgeColor[note.priority],
                    color: 'white', padding: '2px 10px',
                    borderRadius: '12px', fontSize: '12px'
                }}>
                    {note.priority}
                </span>
            </div>

            {note.content && <p style={{ margin: '8px 0' }}>{note.content}</p>}
            <small style={{ color: '#888' }}>📅 {date}</small>

            <div style={{ marginTop: '10px' }}>
                <button onClick={() => onEdit(note)} style={{ marginRight: '8px' }}>
                    ✏️ Modifier
                </button>
                <button onClick={() => onDelete(note.id)} style={{ color: 'red' }}>
                    🗑️ Supprimer
                </button>
            </div>
        </div>
    );
}

export default NoteItem;