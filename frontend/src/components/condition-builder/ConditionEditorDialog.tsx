import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConditionEditor, { Group } from "./ConditionEditor";

export function ConditionEditorDialog({
  open,
  onOpenChange,
  defaultValue,
  onSave,
  fieldHints = [],
  operators = [],
  title = "Condition Builder",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValue: Group | null;
  onSave: (value: Group) => void;

  /* All dynamic configs come from parent */
  fieldHints?: string[];
  operators?: readonly string[];
  title?: string;
  width?: string;
  height?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[90vw] 
          max-w-[90vw] 
          sm:w-[90vw] 
          sm:max-w-[90vw] 
          max-h-[95vh] 
          p-4
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold mb-1">
            {title}
          </DialogTitle>
        </DialogHeader>

        <ConditionEditor
          defaultValue={defaultValue}
          fieldHints={fieldHints}
          operators={operators}
          onSave={(v) => {
            onSave(v);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
