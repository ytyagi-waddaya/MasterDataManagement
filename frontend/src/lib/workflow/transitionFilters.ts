import { NormalizedStage } from "./TransitionsStep";


export function filterDestinationStages({
  stages,
  fromStageId,
  transitionType,
}: {
  stages: NormalizedStage[];
  fromStageId?: string;
  transitionType: string;
}) {
  return stages.filter((s) => {
    if (!fromStageId) return true;

    // REVIEW → self only
    if (transitionType === "REVIEW") {
      return String(s.id) === String(fromStageId);
    }

    // never same stage
    if (String(s.id) === String(fromStageId)) return false;

    // SEND_BACK → anywhere else
    if (transitionType === "SEND_BACK") return true;

    // AUTO → no destination
    if (transitionType === "AUTO") return false;

    // NORMAL / APPROVAL → forward only
    const fromIndex = stages.findIndex(
      (st) => String(st.id) === String(fromStageId)
    );
    const toIndex = stages.findIndex(
      (st) => String(st.id) === String(s.id)
    );

    if (fromIndex === -1 || toIndex === -1) return true;

    return toIndex > fromIndex;
  });
}
