"use client";

import {
  LayoutDashboard,
  BarChart2,
  LineChart,
  ArrowLeftRight,
  Target,
  PieChart,
  Bell,
  AlertTriangle,
  Download,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const temp = usePathname();
  console.log(temp);
  const menuItems = [
    {
      title: "Main",
      items: [{ name: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      title: "Business",
      items: [
        { name: "businesses", label: "Businesses", icon: Building2 },
        { name: "subscriptions", label: "Subscriptions", icon: FileText },
        { name: "support-tickets", label: "Support", icon: HelpCircle },
      ],
    },
    {
      title: "Operations",
      items: [
        { name: "communication", label: "Communication", icon: MessageSquare },
        { name: "analytics", label: "Analytics", icon: BarChart2 },
        {
          name: "documents-billing",
          label: "Documents & Billing",
          icon: FileText,
        },
        { name: "data-export", label: "Data Export / Import", icon: Download },
      ],
    },
    {
      title: "System",
      items: [
        {
          name: "notifications-alerts",
          label: "Notifications & Alerts",
          icon: Bell,
        },
      ],
    },
    {
      title: "Admin",
      items: [
        { name: "admin-settings", label: "Admin & Settings", icon: Settings },
      ],
    },
  ];

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto fixed top-0 left-0 z-20">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-semibold">PP</span>
        </div>
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          Pixel Point CRM
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 text-xs font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.name}>
                  <button
                    // onClick={() => setActiveSection(item.name)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2 text-sm rounded-md mb-1",
                      item.name
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
