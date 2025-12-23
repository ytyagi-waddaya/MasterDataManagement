export function toPreviewFields(sections: any[]) {
  return sections.flatMap((section) =>
    section.fields.map((f: any) => ({
      key: f.key,
      label: f.label,
      fieldType: f.type.toUpperCase(),
      required: f.required,
      config: {
        layout: f.layout,
        placeholder: f.placeholder,
        options: f.options,
      },
      value: null,
    }))
  );
}
