import { useState } from "react";
import type { Note } from "../lib/storage";
import { MarkdownPreview } from "./MarkdownPreview";

export function NoteEditor({
  note,
  onChangeTitle,
  onChangeBody,
}: {
  note: Note;
  onChangeTitle: (title: string) => void;
  onChangeBody: (body: string) => void;
}) {
  const [preview, setPreview] = useState(false);

  return (
    <div className="note-editor">
      <div className="note-editor-header">
        <input
          className="note-title-input"
          value={note.title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Note title"
        />
        <button className="preview-toggle" onClick={() => setPreview((p) => !p)}>
          {preview ? "Edit" : "Preview"}
        </button>
      </div>
      {preview ? (
        <MarkdownPreview body={note.body} />
      ) : (
        <textarea
          className="note-body-input"
          value={note.body}
          onChange={(e) => onChangeBody(e.target.value)}
          placeholder="Write in Markdown…"
        />
      )}
    </div>
  );
}
