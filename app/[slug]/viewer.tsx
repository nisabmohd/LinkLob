"use client";

import MDEditor from "@uiw/react-md-editor";

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} />
  );
}
