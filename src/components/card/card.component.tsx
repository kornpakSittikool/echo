// Card.tsx
import React, { type CSSProperties, type ReactNode } from "react";
import { CardTextInput, parseLinesToChunks } from "./text/card.text";
import { buildClassName, normalizePadding } from "./utils/card.utils";

type CardProps = {
  children: ReactNode;
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Card({ children, padding, className, style }: CardProps) {
  const paddingValue = normalizePadding(padding);

  const mergedStyle: CSSProperties = {
    ...style,
    padding: style?.padding ?? paddingValue,
  };

  return (
    <section
      className={buildClassName("card", className)}
      style={mergedStyle}
    >
      <div className="card__body">{children}</div>
    </section>
  );
}

export const formatCardText = (lines: CardTextInput[]) => {
  const chunks = parseLinesToChunks(lines);

  return (
    <div className="card__rich-text">
      {chunks.map((chunk, index) => {
        if (chunk.type === "paragraph") {
          return (
            <p
              key={`card-text-${index}`}
              className="card__paragraph"
            >
              {chunk.content}
            </p>
          );
        }

        if (chunk.type === "heading") {
          const HeadingTag = chunk.level;
          return (
            <HeadingTag
              key={`card-text-${index}`}
              className={`card__heading card__heading--${chunk.level}`}
            >
              {chunk.content}
            </HeadingTag>
          );
        }

        if (chunk.type === "list") {
          return (
            <ul
              key={`card-text-${index}`}
              className="card__list"
            >
              {chunk.items.map((item, idx) => (
                <li key={`card-text-${index}-${idx}`}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <div
            key={`card-text-${index}`}
            className="card__spacer"
          />
        );
      })}
    </div>
  );
};
