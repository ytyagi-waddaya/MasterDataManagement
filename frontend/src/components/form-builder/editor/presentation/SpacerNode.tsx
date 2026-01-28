const sizeMap: any = {
  xs: "h-2",
  sm: "h-4",
  md: "h-8",
  lg: "h-12",
};

export function SpacerNode({ node }: any) {
  const size = node.config?.size ?? "md";
  return <div className={sizeMap[size]} />;
}
