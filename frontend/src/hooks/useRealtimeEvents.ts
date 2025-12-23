// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { moduleUpdated } from "@/store/moduleSlice";
// import { pushNotification } from "@/store/notificationSlice";
// import { toast } from "sonner";
// import { AppDispatch } from "@/store";
// import { socket } from "@/socket/socket";
// import { queryClient } from "@/lib/api/queryClient";

// export function useRealtimeEvents() {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     // Module Events
//     socket.on("module.updated", (payload) => {
//       dispatch(moduleUpdated(payload));
//       toast.info(`Module updated: ${payload.name}`);
//     });

//     // System Notifications
//     socket.on("notification", (payload) => {
//       dispatch(pushNotification(payload));
//       toast.success(payload.title);
//     });

//     // Workflow Events
//     socket.on("workflow.stage_changed", (evt) => {
//       toast.info(`Stage changed → ${evt.payload.stageName}`);
//       queryClient.invalidateQueries({
//         queryKey: ["workflow-instance", evt.payload.instanceId],
//       });
//     });

//     socket.on("workflow.approved", (evt) => {
//       toast.success(`Approved by ${evt.payload.actorId}`);
//     });

//     socket.on("workflow.rejected", (evt) => {
//       toast.error(`Rejected: ${evt.payload.reason}`);
//     });

//     return () => {
//       socket.off("module.updated");
//       socket.off("notification");
//       socket.off("workflow.stage_changed");
//       socket.off("workflow.approved");
//       socket.off("workflow.rejected");
//     };
//   }, []);
// }

// import { useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { moduleUpdated } from "@/store/moduleSlice";
// import { pushNotification } from "@/store/notificationSlice";
// import { toast } from "sonner";
// import { AppDispatch } from "@/store";
// import { socket } from "@/socket/socket";
// import { queryClient } from "@/lib/api/queryClient";
// import { moduleQueryKeys } from "@/lib/queryKeys/modules";
// import { userOffline, userOnline } from "@/store/presenceSlice";

// export function useRealtimeEvents() {
//   const dispatch = useDispatch();
//   const seen = useRef<Set<string>>(new Set());

//   const once = (evt: any, fn: () => void) => {
//     if (evt?.outboxId && seen.current.has(evt.outboxId)) return;
//     if (evt?.outboxId) seen.current.add(evt.outboxId);
//     fn();
//   };

//   useEffect(() => {
//     socket.on("user.online", ({ userId }) => {
//       dispatch(userOnline(userId));
//     });

//     socket.on("user.offline", ({ userId }) => {
//       dispatch(userOffline(userId));
//     });

//     // socket.on("module.updated", (evt) =>
//     //   once(evt, () => {
//     //     toast.info(`Module updated: ${evt.payload.name}`);

//     //     queryClient.invalidateQueries({
//     //       queryKey: moduleQueryKeys.all,
//     //       exact: false,
//     //     });
//     //   })
//     // );
//     socket.on("module.updated", (evt) => {
//       console.log("🔥 module.updated received", evt);
//     });
//     socket.on("notification", (evt) =>
//       once(evt, () => {
//         toast.success(evt.title);
//       })
//     );

//     socket.on("workflow.stage_changed", (evt) =>
//       once(evt, () => {
//         queryClient.invalidateQueries({
//           queryKey: ["workflow-instance", evt.payload.instanceId],
//         });
//       })
//     );

//     return () => {
//       socket.off("module.updated");
//       socket.off("notification");
//       socket.off("workflow.stage_changed");
//     };
//   }, []);
// }

// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { socket } from "@/socket/socket";
// import { queryClient } from "@/lib/api/queryClient";
// import { moduleQueryKeys } from "@/lib/queryKeys/modules";
// import { userOffline, userOnline } from "@/store/presenceSlice";
// import { AppDispatch, RootState, store } from "@/store";

// export function useRealtimeEvents() {
//   const dispatch = useDispatch<AppDispatch>();
//    const { me, loaded } = useSelector((state: RootState) => state.auth);

//   const seen = useRef<Set<string>>(new Set());

//   const once = (evt: any, fn: () => void) => {
//     if (evt?.outboxId && seen.current.has(evt.outboxId)) return;
//     if (evt?.outboxId) seen.current.add(evt.outboxId);
//     fn();
//   };

//   useEffect(() => {
//     if (!loaded) return;
//     /* ---------- Presence ---------- */
//     const onUserOnline = ({ userId }: { userId: string }) => {
//       dispatch(userOnline(userId));
//     };

//     const onUserOffline = ({ userId }: { userId: string }) => {
//       dispatch(userOffline(userId));
//     };

//     const onConnect = () => {
//       const myUserId = store.getState().auth.me?.user.id;
//       console.log("🟢 socket connected, self online:", myUserId);
//       if (myUserId) dispatch(userOnline(myUserId));
//     };

//     const onDisconnect = () => {
//       const myUserId = store.getState().auth.me?.user.id;
//        console.log("🔴 socket disconnected:", myUserId);
//       if (myUserId) dispatch(userOffline(myUserId));
//     };

//     socket.on("user.online", onUserOnline);
//     socket.on("user.offline", onUserOffline);
//     socket.on("connect", onConnect);
//     socket.on("disconnect", onDisconnect);
//     /* ---------- Module ---------- */
//     const onModuleUpdated = (evt: any) =>
//       once(evt, () => {
//         toast.info(`Module updated`);
//         queryClient.invalidateQueries({
//           queryKey: moduleQueryKeys.all,
//           exact: false,
//         });
//       });

//     socket.on("module.updated", onModuleUpdated);

//     /* ---------- Notifications ---------- */
//     const onNotification = (evt: any) =>
//       once(evt, () => {
//         toast.success(evt.title);
//       });

//     socket.on("notification", onNotification);

//     /* ---------- Workflow ---------- */
//     const onWorkflowStageChanged = (evt: any) =>
//       once(evt, () => {
//         queryClient.invalidateQueries({
//           queryKey: ["workflow-instance", evt.payload.instanceId],
//         });
//       });

//     socket.on("workflow.stage_changed", onWorkflowStageChanged);

//     /* ---------- Cleanup ---------- */
//     return () => {
//       socket.off("user.online", onUserOnline);
//       socket.off("user.offline", onUserOffline);
//       socket.off("connect", onConnect);
//       socket.off("disconnect", onDisconnect);
//       socket.off("module.updated", onModuleUpdated);
//       socket.off("notification", onNotification);
//       socket.off("workflow.stage_changed", onWorkflowStageChanged);
//     };
//   }, [dispatch]);
// }
"use client";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "@/socket/socket";
import { initNotificationSocket } from "@/socket/notificationSocket";
import { joinResource } from "@/socket/socket";
import { RootState, AppDispatch } from "@/store";

export function useRealtimeEvents() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.auth.me?.user.id);

  const initialized = useRef(false);

  useEffect(() => {
    if (!userId) return;
    if (initialized.current) return;

    initialized.current = true;

    console.log("[RT] realtime initialized for user:", userId);

    /* -------------------------
       🔔 Notifications
    -------------------------- */
    initNotificationSocket(userId);

    /* -------------------------
       📦 Resource rooms
    -------------------------- */
    joinResource("MODULE");

    return () => {
      console.log("[RT] realtime cleanup");
      socket.off("notification"); // ✅ correct event
      initialized.current = false;
    };
  }, [userId, dispatch]);
}
