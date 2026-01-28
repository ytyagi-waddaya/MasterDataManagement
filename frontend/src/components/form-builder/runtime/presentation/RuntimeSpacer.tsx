const sizeMap: any = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
};

export function RuntimeSpacer({ node }: any) {
  return (
    <div className={sizeMap[node.config?.size ?? "md"]} />
  );
}
