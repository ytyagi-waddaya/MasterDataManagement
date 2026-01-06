import { FormSection } from "../../contracts/editor.contract";

export function deleteSection(
  sections: FormSection[],
  sectionId: string
): FormSection[] {
  return sections.filter((s) => s.id !== sectionId);
}
