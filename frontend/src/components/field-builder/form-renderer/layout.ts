export function layoutToColSpan(
  layout?: "full" | "half" | "third" | "quarter" | "two-third"
): string {
  switch (layout) {
    case "half":
      return "col-span-12 md:col-span-6";
    case "third":
      return "col-span-12 md:col-span-4";
    case "two-third":
      return "col-span-12 md:col-span-8";
    case "quarter":
      return "col-span-12 md:col-span-3";
    case "full":
    default:
      return "col-span-12";
  }
}
