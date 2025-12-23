// "use client";

// import  { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
// import type { AppDispatch, RootState } from "@/store";
// import { markAllRead } from "@/store/notificationSlice";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { formatDistanceToNowStrict, parseISO } from "date-fns";
// import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";


// function IconForType({ type }: { type?: string }) {
//   switch (type) {
//     case "SUCCESS":
//       return <CheckCircle className="w-5 h-5 text-green-600" />;
//     case "WARNING":
//       return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
//     case "ERROR":
//       return <XCircle className="w-5 h-5 text-red-600" />;
//     default:
//       return <Info className="w-5 h-5 text-sky-500" />;
//   }
// }

// function timeAgo(ts?: string) {
//   if (!ts) return "just now";
//   try {
//     return formatDistanceToNowStrict(parseISO(ts), { addSuffix: true });
//   } catch (e) {
//     return "just now";
//   }
// }

// export default function NotificationsPageClient() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { latest, unread } = useSelector((s: RootState) => s.notifications);

//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(20);

//   // pretend fetch - in production replace with real API call
//   useEffect(() => {
//     // If you want to hydrate from API on page load, call your /api/notifications
//     // Example (fetch):
//     // fetch('/api/notifications?take=20&skip=0').then(...).then(data => dispatch(pushMany(data)))
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Notifications</h1>
//           <p className="text-sm text-muted-foreground">Inbox for system & realtime notifications.</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Badge variant="secondary">Unread: {unread}</Badge>
//           <Button variant="ghost" onClick={() => dispatch(markAllRead())}>Mark all read</Button>
//           <Link href="/">
//             <Button>Back</Button>
//           </Link>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Latest</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ScrollArea className="h-[60vh]">
//             <div className="space-y-2">
//               {latest.length === 0 && (
//                 <div className="p-6 text-center text-sm text-muted-foreground">No notifications yet.</div>
//               )}

//               {latest.slice((page - 1) * pageSize, page * pageSize).map((n) => (
//                 <div key={n.deliveryId} className={`p-4 rounded-md border ${n.read ? 'bg-white' : 'bg-sky-50'}`}>
//                   <div className="flex items-start gap-3">
//                     <div className="mt-1"><IconForType type={n.type} /></div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <div className="font-medium">{n.title}</div>
//                           <div className="text-sm text-muted-foreground">{n.message}</div>
//                         </div>
//                         <div className="text-xs text-muted-foreground">{timeAgo(n.createdAt)}</div>
//                       </div>
//                       <div className="mt-3 flex items-center gap-2">
//                         {!n.read && (
//                           <Button size="sm" variant="outline" onClick={() => dispatch(markAllRead())}>
//                             Mark read
//                           </Button>
//                         )}

//                         <Link href={`/notifications/${n.deliveryId}`}>
//                           <Button size="sm">View</Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>

//           <div className="flex items-center justify-between mt-4">
//             <div className="text-sm text-muted-foreground">Page {page}</div>
//             <div className="flex gap-2">
//               <Button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</Button>
//               <Button disabled={latest.length <= page * pageSize} onClick={() => setPage((p) => p + 1)}>Next</Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useNotifications } from "@/lib/notifications/hooks/useNotification";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function NotificationsPage() {
  const { userId } = useParams<{ userId: string }>();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useNotifications({
    userId,
    page,
    limit: 20,
    // search,
  });

  if (isLoading) {
    return <div className="p-6">Loading notifications…</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      {data?.length === 0 && (
        <p className="text-gray-500">No notifications found</p>
      )}

      <div className="space-y-3">
        {data?.map((n: any) => (
          <div
            key={n.id}
            className={`p-4 border rounded ${
              !n.read ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="font-medium">{n.title}</div>
            <p className="text-sm text-gray-600">{n.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
