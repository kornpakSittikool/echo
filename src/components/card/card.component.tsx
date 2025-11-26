// Card.tsx
import Image from "next/image";
import React, { type CSSProperties, type ReactNode } from "react";
import { CardTextInput, parseLinesToChunks } from "./text/card.text";
import { buildClassName, normalizePadding } from "./utils/card.utils";

type CardStyle = CSSProperties & {
  "--card-heading-color"?: string;
};

type CardProps = {
  children: ReactNode;
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
  headingColor?: string;
  mediaSrc?: string;
  mediaAlt?: string;
};

export function Card({
  children,
  padding,
  className,
  style,
  headingColor,
  mediaSrc,
  mediaAlt,
}: CardProps) {
  const paddingValue = normalizePadding(padding);

  const mergedStyle: CardStyle = {
    ...((style ?? {}) as CardStyle),
    padding: style?.padding ?? paddingValue,
  };

  if (headingColor && mergedStyle["--card-heading-color"] === undefined) {
    mergedStyle["--card-heading-color"] = headingColor;
  }

  const hasMedia = Boolean(mediaSrc);

  return (
    <section
      className={buildClassName("card", className)}
      style={mergedStyle}
    >
      {hasMedia && (
        <div className="card__media">
          <Image
            src={mediaSrc ?? ""}
            alt={mediaAlt ?? ""}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw"
            priority={false}
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
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
