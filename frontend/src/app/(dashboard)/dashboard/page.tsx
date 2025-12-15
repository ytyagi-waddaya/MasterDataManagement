import { Activity, Coffee, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center  dark:bg-gray-900 p-6 md:p-10">
      <div className="flex flex-col items-center justify-center dark:bg-gray-800  p-8 w-full max-w-sm text-center space-y-4">
        {/* Dashboard Icon */}
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
          <LayoutDashboard className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dashboard Coming Soon
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We’re working hard to bring you a full-featured dashboard. Stay tuned for updates and analytics soon!
        </p>

        {/* Example Features / Icons */}
        <div className="flex gap-4 mt-4">
          <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Activity className="w-6 h-6 mb-1" />
            <span className="text-xs">Analytics</span>
          </div>
          <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <Coffee className="w-6 h-6 mb-1" />
            <span className="text-xs">Tasks</span>
          </div>
          <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <LayoutDashboard className="w-6 h-6 mb-1" />
            <span className="text-xs">Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
