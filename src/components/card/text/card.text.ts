export type HeadingLevel = "h1" | "h2" | "h3";

export type CardTextChunk =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: HeadingLevel; content: string }
  | { type: "list"; items: string[] }
  | { type: "spacer" };

export type CardTextInput =
  | string
  | { type: HeadingLevel | "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "spacer" };

export const parseLinesToChunks = (
  lines: CardTextInput[],
): CardTextChunk[] => {
  const chunks: CardTextChunk[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      chunks.push({ type: "list", items: listBuffer });
      listBuffer = [];
    }
  };

  lines.forEach((line) => {
    if (typeof line === "string") {
      const trimmed = line.trim();
      if (trimmed === "") {
        flushList();
        chunks.push({ type: "spacer" });
        return;
      }
      if (trimmed.startsWith("- ")) {
        listBuffer.push(trimmed.slice(2));
        return;
      }
      flushList();
      chunks.push({ type: "paragraph", content: line });
      return;
    }
    flushList();

    if (line.type === "list") {
      if (line.items.length) {
        chunks.push({ type: "list", items: line.items });
      }
      return;
    }

    if (line.type === "spacer") {
      chunks.push({ type: "spacer" });
      return;
    }

    if (line.type === "p") {
      chunks.push({ type: "paragraph", content: line.text });
      return;
    }
    chunks.push({
      type: "heading",
      level: line.type,
      content: line.text,
    });
  });

  flushList();
  return chunks;
};
