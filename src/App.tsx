import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  createNote,
  deleteNote,
  getNoteBySlug,
  listNotes,
  saveNote,
  type Note,
} from "./lib/storage";
import { useHashRoute } from "./lib/useHashRoute";
import { useTheme } from "./lib/useTheme";
import { NoteList } from "./components/NoteList";
import { NoteEditor } from "./components/NoteEditor";
import { ThemeToggle } from "./components/ThemeToggle";

const SITE_NAME = "localnotes.work";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => listNotes());
  const [slug, navigate, replaceSlug] = useHashRoute();
  const [theme, toggleTheme] = useTheme();

  const activeNote = useMemo(() => notes.find((n) => n.slug === slug), [notes, slug]);

  useEffect(() => {
    document.title = activeNote
      ? `${activeNote.title || "Untitled"} · ${SITE_NAME}`
      : SITE_NAME;
  }, [activeNote]);

  useEffect(() => {
    if (!slug || activeNote) return;
    const fromStorage = getNoteBySlug(slug);
    if (fromStorage) setNotes(listNotes());
  }, [slug, activeNote]);

  const handleCreate = () => {
    const note = createNote();
    setNotes(listNotes());
    navigate(note.slug);
  };

  const handleSelect = (note: Note) => {
    navigate(note.slug);
  };

  const handleDelete = (note: Note) => {
    deleteNote(note.id);
    const remaining = listNotes();
    setNotes(remaining);
    if (activeNote?.id === note.id) {
      navigate(remaining[0]?.slug ?? "");
    }
  };

  const handleChangeTitle = (title: string) => {
    if (!activeNote) return;
    const updated = saveNote(activeNote.id, { title });
    setNotes(listNotes());
    if (updated.slug !== slug) {
      replaceSlug(updated.slug);
    }
  };

  const handleChangeBody = (body: string) => {
    if (!activeNote) return;
    saveNote(activeNote.id, { body });
    setNotes(listNotes());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <span className="logo-dot" aria-hidden="true" />
          localnotes<span className="tld">.work</span>
        </h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>
      <div className="app-body">
        <NoteList
          notes={notes}
          activeId={activeNote?.id}
          onSelect={handleSelect}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
        {activeNote ? (
          <NoteEditor
            note={activeNote}
            onChangeTitle={handleChangeTitle}
            onChangeBody={handleChangeBody}
          />
        ) : (
          <div className="empty-state">
            <p>{notes.length === 0 ? "No notes yet." : "Select a note, or:"}</p>
            <button onClick={handleCreate}>New note</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
