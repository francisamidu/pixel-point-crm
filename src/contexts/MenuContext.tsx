"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { MenuItem } from "@/types/menu-items";
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Settings,
  HelpCircle,
  MessageSquare,
  Building2,
  Bell,
  Download,
} from "lucide-react";

// Define context shape
interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: Dispatch<SetStateAction<MenuItem[]>>;
}

// Create context with default empty values
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Define initial state
const initialMenuItems: MenuItem[] = [
  {
    title: "Main",
    items: [
      {
        active: false,
        name: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        active: false,
        name: "businesses",
        label: "Businesses",
        icon: Building2,
      },
      {
        active: false,
        name: "subscriptions",
        label: "Subscriptions",
        icon: FileText,
      },
      {
        active: false,
        name: "support-tickets",
        label: "Support Tickets",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        active: false,
        name: "messaging",
        label: "Messaging",
        icon: MessageSquare,
      },
      { active: false, name: "analytics", label: "Analytics", icon: BarChart2 },
      {
        active: false,
        name: "documents-billing",
        label: "Documents & Billing",
        icon: FileText,
      },
      // {
      //   active: false,
      //   name: "data-export",
      //   label: "Data Export / Import",
      //   icon: Download,
      // },
    ],
  },
  {
    title: "System",
    items: [
      {
        active: false,
        name: "notifications-alerts",
        label: "Notifications & Alerts",
        icon: Bell,
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        active: false,
        name: "admin-settings",
        label: "Administration",
        icon: Settings,
      },
    ],
  },
];

// Context Provider
export const MenuContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContextProvider");
  }
  return context;
};
