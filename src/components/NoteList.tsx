import type { Note } from "../lib/storage";

export function NoteList({
  notes,
  activeId,
  onSelect,
  onCreate,
  onDelete,
}: {
  notes: Note[];
  activeId: string | undefined;
  onSelect: (note: Note) => void;
  onCreate: () => void;
  onDelete: (note: Note) => void;
}) {
  return (
    <div className="note-list">
      <button className="new-note" onClick={onCreate}>
        <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
          <path
            d="M10 4v12M4 10h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        New note
      </button>
      {notes.length === 0 ? (
        <p className="note-list-empty">No notes yet</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className={note.id === activeId ? "active" : ""}>
              <button className="note-item" onClick={() => onSelect(note)}>
                <span className="note-title">{note.title || "Untitled"}</span>
              </button>
              <button
                className="delete-note"
                title="Delete note"
                onClick={() => onDelete(note)}
              >
                <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                  <path
                    d="M4 5h12M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5m2 0v11.5A1.5 1.5 0 0 1 12.5 18h-5A1.5 1.5 0 0 1 6 16.5V5h8Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
