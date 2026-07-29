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
import { SidebarToggle } from "./components/SidebarToggle";

const SITE_NAME = "localnotes.work";
const MOBILE_QUERY = "(max-width: 720px)";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => listNotes());
  const [slug, navigate, replaceSlug] = useHashRoute();
  const [theme, toggleTheme] = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(
    () => !window.matchMedia(MOBILE_QUERY).matches
  );

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

  const closeSidebarOnMobile = () => {
    if (window.matchMedia(MOBILE_QUERY).matches) setSidebarOpen(false);
  };

  const handleCreate = () => {
    const note = createNote();
    setNotes(listNotes());
    navigate(note.slug);
    closeSidebarOnMobile();
  };

  const handleSelect = (note: Note) => {
    navigate(note.slug);
    closeSidebarOnMobile();
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
        <div className="app-header-left">
          <SidebarToggle open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
          <h1>
            <svg className="logo-mark" viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <rect x="9" y="10" width="14" height="2.6" rx="1.3" fill="var(--bg)" />
              <rect x="9" y="14.7" width="14" height="2.6" rx="1.3" fill="var(--bg)" opacity="0.85" />
              <rect x="9" y="19.4" width="8.5" height="2.6" rx="1.3" fill="var(--bg)" opacity="0.7" />
            </svg>
            localnotes<span className="tld">.work</span>
          </h1>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>
      <div className="app-body">
        <NoteList
          open={sidebarOpen}
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
