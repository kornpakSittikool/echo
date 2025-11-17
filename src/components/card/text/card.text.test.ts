import { describe, expect, it } from "vitest";
import {
  parseLinesToChunks,
  type CardTextInput,
  type CardTextChunk,
} from "./card.text";

const collectTypes = (chunks: CardTextChunk[]) =>
  chunks.map((chunk) => chunk.type);

describe("card text parser", () => {
  it("converts blank strings into spacer chunks", () => {
    const chunks = parseLinesToChunks(["Hello", ""]);
    expect(collectTypes(chunks)).toEqual(["paragraph", "spacer"]);
  });

  it("groups bullet prefixed strings into a single list", () => {
    const chunks = parseLinesToChunks([
      "Intro",
      "- first",
      "- second",
      "Outro",
    ]);

    expect(collectTypes(chunks)).toEqual([
      "paragraph",
      "list",
      "paragraph",
    ]);
    const list = chunks.find((chunk) => chunk.type === "list");
    expect(list).toEqual({
      type: "list",
      items: ["first", "second"],
    });
  });

  it("supports rich inputs with headings, lists, and spacers", () => {
    const input: CardTextInput[] = [
      { type: "h2", text: "Heading" },
      { type: "p", text: "Body copy" },
      { type: "list", items: ["a", "b"] },
      { type: "spacer" },
      { type: "h3", text: "Sub" },
    ];

    const chunks = parseLinesToChunks(input);
    expect(chunks).toEqual([
      { type: "heading", level: "h2", content: "Heading" },
      { type: "paragraph", content: "Body copy" },
      { type: "list", items: ["a", "b"] },
      { type: "spacer" },
      { type: "heading", level: "h3", content: "Sub" },
    ]);
  });
});
