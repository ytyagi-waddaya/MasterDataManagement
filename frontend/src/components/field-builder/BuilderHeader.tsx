import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export function BuilderHeader({
  onSave,
  onPublish,
  onPreview,
}: {
  onSave: () => void;
  onPublish: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onPreview}>
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>

      <Button variant="outline" onClick={onSave}>
        Save Draft
      </Button>

      <Button onClick={onPublish}>Publish</Button>
    </div>
  );
}
