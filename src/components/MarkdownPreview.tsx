import { useMemo } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

export function MarkdownPreview({ body }: { body: string }) {
  const html = useMemo(() => {
    const raw = marked.parse(body, { async: false, breaks: true }) as string;
    return DOMPurify.sanitize(raw);
  }, [body]);

  return <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: html }} />;
}
