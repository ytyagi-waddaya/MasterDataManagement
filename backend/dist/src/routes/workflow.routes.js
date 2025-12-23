import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import workflowController from "../controllers/workflow.controller.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();
router.get("/", asyncHandler(workflowController.getWorkflows));
router.post("/", requireAuth, asyncHandler(workflowController.createWorkflow));
router.post("/:workflowId/publish", requireAuth, asyncHandler(workflowController.publishWorkflow));
router.put("/:workflowId/graph", requireAuth, asyncHandler(workflowController.saveWorkflowGraph));
router.get("/:workflowId", asyncHandler(workflowController.getWorkflow));
router.patch("/:workflowId", asyncHandler(workflowController.updateWorkflow));
router.patch("/:workflowId/archive", asyncHandler(workflowController.archiveWorkflow));
router.patch("/:workflowId/restore", asyncHandler(workflowController.restoreWorkflow));
router.delete("/:workflowId", asyncHandler(workflowController.deleteWorkflow));
/* -------------------------------------------------------------------------- */
/*                                   STAGES                                   */
/* -------------------------------------------------------------------------- */
router.post("/:workflowId/stages", asyncHandler(workflowController.createStages));
router.get("/:workflowId/stages", asyncHandler(workflowController.getStages));
router.get("/:workflowId/stage/:stageId", asyncHandler(workflowController.getStage));
router.patch("/:workflowId/stage/:stageId", asyncHandler(workflowController.updateStage));
router.delete("/:workflowId/stage/:stageId", asyncHandler(workflowController.deleteStage));
// /* -------------------------------------------------------------------------- */
// /*                                TRANSITIONS                                 */
// /* -------------------------------------------------------------------------- */
router.post("/:workflowId/transitions", asyncHandler(workflowController.createTransitions));
router.get("/:workflowId/transitions", asyncHandler(workflowController.getTransitions));
router.get("/:workflowId/transition/:transitionId", asyncHandler(workflowController.getTransition));
router.patch("/:workflowId/transition/:transitionId", asyncHandler(workflowController.updateTransition));
router.delete("/:workflowId/transition/:transitionId", asyncHandler(workflowController.deleteTransitions));
/* -------------------------------------------------------------------------- */
/*                                INSTANCES                                   */
/* -------------------------------------------------------------------------- */
router.post("/:workflowId/instance", asyncHandler(workflowController.startInstance));
router.get("/:workflowId/instances", asyncHandler(workflowController.listByWorkflow));
router.get("/:workflowId/instance/:instanceId", asyncHandler(workflowController.getInstance));
// router.patch(
//   "/:workflowId/instance/:instanceId/move",
//   asyncHandler(workflowController.moveInstance)
// );
router.delete("/:workflowId/instance/:instanceId", asyncHandler(workflowController.closeInstance));
// router.post(
//   "/:workflowId/instance/:instanceId/approve",
//   requireAuth,
//   asyncHandler(workflowController.approveInstance)
// );
// router.post(
//   "/:workflowId/instance/:instanceId/reject",
//   requireAuth,
//   asyncHandler(workflowController.rejectInstance)
// );
/* -------------------------------------------------------------------------- */
/*                                   ExecuteTransition                              */
/* -------------------------------------------------------------------------- */
router.post("/:workflowId/instance", requireAuth, asyncHandler(workflowController.start));
router.post("/instance/:instanceId/transition", requireAuth, asyncHandler(workflowController.transition));
router.get("/instance/:instanceId/actions", requireAuth, asyncHandler(workflowController.getAvailableActions));
router.get("/:workflowId/visualizer", requireAuth, asyncHandler(workflowController.getVisualizer));
export default router;
// POST /:workflowId/instance           → startInstance
// POST /instance/:instanceId/transition → executeTransition
// GET  /instance/:instanceId/actions   → getAvailableActions
//# sourceMappingURL=workflow.routes.js.map