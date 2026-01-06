import { nanoid } from "nanoid";
import { FormSection } from "../../contracts/editor.contract";
/* ======================================================
   ADD SECTION (EDITOR ONLY)
====================================================== */

export function addSection(
  sections: FormSection[],
  title?: string
): FormSection[] {
  const nextIndex = sections.length + 1;

  const newSection: FormSection = {
    id: nanoid(),
    title: title ?? `Section ${nextIndex}`,
    nodes: [],
    collapsed: false,
  };

  return [...sections, newSection];
}
