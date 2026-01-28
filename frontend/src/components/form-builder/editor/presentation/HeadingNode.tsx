import React from "react";

/* ======================================================
   TYPES
====================================================== */

type HeadingNodeType = {
  kind: "LAYOUT";
  id: string;
  type: "heading";
  config?: {
    level?: number;
    text?: string;
  };
};

type Props = {
  node: HeadingNodeType;
};

/* ======================================================
   COMPONENT
====================================================== */

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function HeadingNode({ node }: Props) {
  const level = Math.min(
    6,
    Math.max(1, node.config?.level ?? 2),
  ) as keyof typeof HEADING_TAGS;

  const Tag = HEADING_TAGS[level];

  return React.createElement(
    Tag,
    { className: "font-semibold my-2" },
    node.config?.text ?? "Heading",
  );
}
