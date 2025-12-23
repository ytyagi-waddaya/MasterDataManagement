import { RuntimeField } from "../runtimeField";

export function groupFieldsBySection(fields: RuntimeField[]) {
  const sections = new Map<string, RuntimeField[]>();

  for (const field of fields) {
    const section =
      field.config.ui?.layout?.section ?? "Default";

    if (!sections.has(section)) {
      sections.set(section, []);
    }

    sections.get(section)!.push(field);
  }

  for (const [, list] of sections) {
    list.sort((a, b) => a.order - b.order);
  }

  return sections;
}
