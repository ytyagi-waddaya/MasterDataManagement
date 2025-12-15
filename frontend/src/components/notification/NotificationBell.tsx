"use client";

import { useSelector, useDispatch } from "react-redux";
import { markAllRead, markRead } from "@/store/notificationSlice";
import { useState, useRef, useEffect } from "react";
import { AppDispatch, RootState } from "@/store";
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import Link from "next/link";

function getIcon(type?: string) {
  switch (type) {
    case "SUCCESS": return <CheckCircle className="text-green-500 w-5 h-5" />;
    case "WARNING": return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
    case "ERROR": return <XCircle className="text-red-500 w-5 h-5" />;
    default: return <Info className="text-blue-500 w-5 h-5" />;
  }
}

export default function NotificationBell() {
  const dispatch = useDispatch<AppDispatch>();
  const unread = useSelector((s: RootState) => s.notifications.unread);
  const items = useSelector((s: RootState) => s.notifications.items);

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      <button
        onClick={() => {
          setOpen(!open);
          dispatch(markAllRead());
        }}
        className="relative"
      >
        <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full">
          <Bell className="w-5 h-5" />
        </div>

        {unread > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 bg-white shadow-lg rounded w-80 max-h-96 overflow-auto z-50 mt-32 border">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-semibold">Notifications</span>
            <Link
              href="/notifications"
              className="text-blue-500 text-sm hover:text-blue-700"
            >
              View All
            </Link>
          </div>

          {items.length === 0 && (
            <p className="p-3 text-gray-500 text-sm">No notifications</p>
          )}

          {items.map((n) => (
            <div
              key={n.deliveryId}
              className={`p-3 border-b flex gap-3 cursor-pointer ${
                !n.read ? "bg-gray-50" : "bg-white"
              }`}
              onClick={() => dispatch(markRead(n.deliveryId))}
            >
              <div>{getIcon(n.type)}</div>

              <div className="flex-1">
                <strong className="block">{n.title}</strong>
                <p className="text-sm text-gray-600">{n.message}</p>
                <span className="text-xs text-gray-400">
                  {timeAgo(n.createdAt!)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}









// "use client";

// import { useState, useEffect } from "react";
// import { Bell } from "lucide-react";
// import { useQueryClient } from "@tanstack/react-query";
// import { formatDistanceToNow } from "date-fns";
// import { useNotifications, useMarkNotificationRead } from "@/hooks/useNotifications";
// import { initNotificationSocket } from "@/lib/socket-notifications";
// import { useUser } from "@/hooks/useUser"; // however you get current user
// import Link from "next/link";

// export default function NotificationBell() {
//   const { user } = useUser();
//   const queryClient = useQueryClient();

//   const [open, setOpen] = useState(false);

//   const { data, isLoading } = useNotifications({
//     userId: user?.id!,
//     page: 1,
//     limit: 10,
//     search: "",
//   });

//   const markReadMutation = useMarkNotificationRead();

//   const notifications = data?.notifications.data ?? [];
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   // Init socket listener once user is known
//   useEffect(() => {
//     if (user?.id) initNotificationSocket(user.id);
//   }, [user?.id]);

//   const toggleOpen = () => setOpen((prev) => !prev);

//   const handleMarkRead = (id: string) => {
//     markReadMutation.mutate(id);
//   };

//   return (
//     <div className="relative">
//       {/* Bell Icon */}
//       <button onClick={toggleOpen} className="relative">
//         <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-full">
//           <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//         </div>

//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-700 rounded-lg z-50">
//           <div className="p-3 flex justify-between items-center border-b dark:border-gray-700">
//             <p className="text-sm font-semibold">Notifications</p>
//             <Link
//               href="/notifications"
//               className="text-xs text-blue-600 hover:underline"
//             >
//               View All
//             </Link>
//           </div>

//           <div className="max-h-80 overflow-y-auto">
//             {notifications.length === 0 && (
//               <p className="p-4 text-sm text-gray-500 text-center">
//                 No notifications
//               </p>
//             )}

//             {notifications.map((n) => (
//               <div
//                 key={n.id}
//                 className={`p-3 text-sm border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
//                   !n.read ? "bg-blue-50 dark:bg-blue-900/30" : ""
//                 }`}
//                 onClick={() => handleMarkRead(n.id)}
//               >
//                 <div className="flex justify-between items-start">
//                   <p className="font-medium">{n.title}</p>
//                   {!n.read && (
//                     <span className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
//                   )}
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
//                   {n.message}
//                 </p>

//                 <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
//                   {formatDistanceToNow(new Date(n.createdAt), {
//                     addSuffix: true,
//                   })}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
