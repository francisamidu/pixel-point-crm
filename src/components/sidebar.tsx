"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { useMenuContext } from "@/contexts/MenuContext";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const currentPageName = pathname.split("/").pop();

  const { menuItems, setMenuItems } = useMenuContext();

  const activatePage = useCallback(
    (currentPageName = "dashboard") => {
      const updatedMenuItems = menuItems.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
          ...item,
          active: item.name === currentPageName,
        })),
      }));

      if (currentPageName === "dashboard") {
        updatedMenuItems[0].items[0].active = true;
      }

      setMenuItems(updatedMenuItems);
    },
    [menuItems]
  );

  useEffect(() => {
    activatePage(String(currentPageName));
  }, [currentPageName]);

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-y-auto fixed top-0 left-0 z-20">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-semibold">PP</span>
        </div>
        <span
          aria-label="Pixel Point CRM"
          role="heading"
          className="font-semibold text-gray-800 dark:text-gray-200"
        >
          Pixel Point CRM
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 text-xs font-semibold !text-gray-400 dark:text-gray-400 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item) => (
                <Link
                  href={`/dashboard/${
                    item.name === "dashboard" ? "" : item.name
                  }`}
                  key={item.name}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-2 text-sm rounded-md mb-1",
                    item.active
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center border border-gray-10 dark:border-gray-700 space-x-4 p-2 bg-white">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User thumbnail"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-sm">Obie Trice</h1>
          <h2 className="text-xs !text-gray-500">admin@pixelpoint.com</h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDownIcon className="h-4 w-4 hover:cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
