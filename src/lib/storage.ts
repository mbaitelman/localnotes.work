export interface Note {
  id: string;
  title: string;
  slug: string;
  body: string;
  updatedAt: number;
}

const STORAGE_KEY = "localnotes.notes";

function readAll(): Note[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
}

function writeAll(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";
}

function uniqueSlug(base: string, excludeId: string | undefined, notes: Note[]): string {
  let slug = base;
  let n = 2;
  while (notes.some((note) => note.slug === slug && note.id !== excludeId)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export function listNotes(): Note[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getNoteBySlug(slug: string): Note | undefined {
  return readAll().find((note) => note.slug === slug);
}

export function getNoteById(id: string): Note | undefined {
  return readAll().find((note) => note.id === id);
}

export function createNote(title = "Untitled"): Note {
  const notes = readAll();
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    slug: uniqueSlug(slugify(title), undefined, notes),
    body: "",
    updatedAt: Date.now(),
  };
  notes.push(note);
  writeAll(notes);
  return note;
}

export function saveNote(id: string, updates: Partial<Pick<Note, "title" | "body">>): Note {
  const notes = readAll();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) throw new Error(`Note not found: ${id}`);

  const existing = notes[index];
  const title = updates.title ?? existing.title;
  const slug =
    updates.title !== undefined && updates.title !== existing.title
      ? uniqueSlug(slugify(title), id, notes)
      : existing.slug;

  const updated: Note = {
    ...existing,
    title,
    slug,
    body: updates.body ?? existing.body,
    updatedAt: Date.now(),
  };
  notes[index] = updated;
  writeAll(notes);
  return updated;
}

export function deleteNote(id: string): void {
  writeAll(readAll().filter((note) => note.id !== id));
}
