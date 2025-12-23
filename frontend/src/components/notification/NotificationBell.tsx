"use client";

import { useSelector, useDispatch } from "react-redux";
import { markAllRead } from "@/store/notificationSlice";
import { RootState, AppDispatch } from "@/store";
import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";

/* -----------------------------------
   Helpers
----------------------------------- */
function getIcon(type?: string) {
  switch (type) {
    case "SUCCESS":
      return <CheckCircle className="text-green-500 w-5 h-5" />;
    case "WARNING":
      return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
    case "ERROR":
      return <XCircle className="text-red-500 w-5 h-5" />;
    default:
      return <Info className="text-blue-500 w-5 h-5" />;
  }
}

/* -----------------------------------
   Component
----------------------------------- */
export default function NotificationBell() {
  const dispatch = useDispatch<AppDispatch>();

  const unread = useSelector((s: RootState) => s.notifications.unread);
  const items = useSelector((s: RootState) => s.notifications.latest);
  const userId = useSelector((s: RootState) => s.auth.me?.user.id);

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {/* 🔔 Bell */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          dispatch(markAllRead()); // UI-only
        }}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Bell className="w-5 h-5" />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
            {unread}
          </span>
        )}
      </button>

      {/* 📥 Dropdown */}
      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white dark:bg-gray-900 shadow-lg rounded border z-50">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-semibold">Notifications</span>

            {/* 👇 Redirect */}
            {userId && (
              <Link
                href={`/notifications/${userId}`}
                className="text-blue-500 text-sm hover:underline"
                onClick={() => setOpen(false)}
              >
                View All
              </Link>
            )}
          </div>

          {items.length === 0 && (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          )}

          <div className="max-h-96 overflow-auto">
            {items.map((n) => (
              <div
                key={n.deliveryId}
                className={`p-3 flex gap-3 border-b ${
                  !n.read ? "bg-gray-50 dark:bg-gray-800" : ""
                }`}
              >
                <div>{getIcon(n.type)}</div>

                <div className="flex-1">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {n.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {timeAgo(n.createdAt!)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useSelector, useDispatch } from "react-redux";
// import { markAllRead } from "@/store/notificationSlice";
// import { RootState } from "@/store";
// import { Bell } from "lucide-react";

// export default function NotificationBell() {
//   const dispatch = useDispatch();
//   const unread = useSelector((s: RootState) => s.notifications.unread);
// console.log("🔔 [UI] NotificationBell render", {
//   unread
// });

//   return (
//     <button
//       onClick={() => dispatch(markAllRead())}
//       className="relative p-2"
//     >
//       <Bell className="w-5 h-5" />

//       {unread > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
//           {unread}
//         </span>
//       )}
//     </button>
//   );
// }
