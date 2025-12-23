import { Button } from "@/components/ui/button";
import { Trash2, Copy } from "lucide-react";

export function FieldPreview({
  field,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  field: any;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  return (
    <div
      onClick={onEdit}
      className="
        relative
        group
        border
        rounded
        px-3
        py-2
        bg-muted/30
        cursor-pointer
        hover:bg-muted
      "
    >
      {/* Hover actions */}
      <div
        className="
          absolute
          top-0
          right-1
          hidden
          group-hover:flex
          gap-1
          z-10
        "
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={onDuplicate}
        >
          <Copy size={14} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          onClick={onDelete}
        >
          <Trash2 size={14} />
        </Button>
      </div>

      {/* Field info */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">{field.label}</div>

        {/* <div className="flex gap-1">
          {field.required && (
            <Badge variant="destructive">Req</Badge>
          )}
          <Badge variant="outline">{field.type}</Badge>
          <Badge variant="secondary">
            {field.layout ?? "full"}
          </Badge>
        </div> */}
      </div>
    </div>
  );
}
