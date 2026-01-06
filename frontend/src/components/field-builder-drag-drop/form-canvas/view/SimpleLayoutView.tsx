// import { EditorNode } from "../../contracts/editor.contract";

// export function SimpleLayoutView({
//   node,
// }: {
//   node: Extract<EditorNode, { kind: "LAYOUT" }>;
// }) {
//   switch (node.type) {
//     case "divider":
//       return <hr className="my-4" />;

//     case "heading":
//       return (
//         <h3 className="text-lg font-semibold">
//           {node.config?.text ?? "Heading"}
//         </h3>
//       );

//     case "spacer":
//       return <div style={{ height: node.config?.height ?? 16 }} />;

//     default:
//       return null;
//   }
// }

import { EditorNode } from "../../contracts/editor.contract";

export function SimpleLayoutView({
  node,
}: {
  node: Extract<EditorNode, { kind: "LAYOUT" }>;
}) {
  switch (node.type) {
    case "divider":
      return (
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />
          </div>
          {node.config?.text && (
            <div className="relative flex justify-center">
              <span className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                {node.config.text}
              </span>
            </div>
          )}
        </div>
      );

    case "heading":
      const level = node.config?.level ?? 3;
      const headingText = node.config?.text ?? "Heading";
      
      const headingStyles = {
        1: "text-xl font-semibold text-gray-900 dark:text-gray-100",
        2: "text-lg font-semibold text-gray-800 dark:text-gray-200",
        3: "text-md font-medium text-gray-700 dark:text-gray-300",
        4: "text-sm font-medium text-gray-600 dark:text-gray-400",
        5: "text-sm font-normal text-gray-500 dark:text-gray-500",
        6: "text-xs font-normal text-gray-500 dark:text-gray-500 uppercase tracking-wide",
      };

      const headingStyle = headingStyles[level as keyof typeof headingStyles];
      
      // Render appropriate heading level
      switch (level) {
        case 1:
          return (
            <div className="py-2">
              <h1 className={headingStyle}>
                {headingText}
              </h1>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
        case 2:
          return (
            <div className="py-2">
              <h2 className={headingStyle}>
                {headingText}
              </h2>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
        case 4:
          return (
            <div className="py-2">
              <h4 className={headingStyle}>
                {headingText}
              </h4>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
        case 5:
          return (
            <div className="py-2">
              <h5 className={headingStyle}>
                {headingText}
              </h5>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
        case 6:
          return (
            <div className="py-2">
              <h6 className={headingStyle}>
                {headingText}
              </h6>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
        default: // level 3 or fallback
          return (
            <div className="py-2">
              <h3 className={headingStyle}>
                {headingText}
              </h3>
              {node.config?.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {node.config.description}
                </p>
              )}
            </div>
          );
      }

    case "spacer":
      const height = node.config?.height ?? 16;
      const sizeLabel = height <= 16 ? "XS" : height <= 32 ? "S" : height <= 48 ? "M" : "L";
      
      return (
        <div 
          className="relative group"
          style={{ height }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div className="px-2 py-1 rounded bg-gray-800 dark:bg-gray-700 text-white text-xs font-medium">
              {sizeLabel} Spacer
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}