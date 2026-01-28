export function RuntimeHeading({ node }: any) {
  const level = node.config?.level ?? 2;
  const Tag = `h${level}` as any;

  return (
    <Tag className="font-semibold my-2">
      {node.config?.text}
    </Tag>
  );
}
