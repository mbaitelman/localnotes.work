import { useEffect, useState } from "react";
import type { Note } from "../lib/storage";
import { MarkdownPreview } from "./MarkdownPreview";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable
  );
}

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

  useEffect(() => {
    if (!preview) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "e" && e.key !== "E") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      setPreview(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return (
    <div className="note-editor">
      <div className="note-editor-header">
        <input
          className="note-title-input"
          value={note.title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Note title"
        />
        <button
          className="preview-toggle"
          onClick={() => setPreview((p) => !p)}
          title={preview ? "Back to editing (press E)" : "Preview Markdown"}
        >
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
