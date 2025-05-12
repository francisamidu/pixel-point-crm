"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Search, Slash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useMenuContext } from "@/contexts/MenuContext";

export default function Header() {
  const pathname = usePathname();
  const currentPageName = pathname.split("/").pop();

  const { menuItems } = useMenuContext();

  const page = useMemo(() => {
    const currentPage = menuItems
      .flatMap((section) => section.items)
      .find((item) => item.name === currentPageName);
    return currentPage || null;
  }, [pathname]);

  return (
    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-6 py-2 rounded-t-lg sticky top-0 left-0 w-full z-50 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem
                className={`${
                  page?.name !== "dashboard" ? "text-gray-400" : ""
                }`}
              >
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              {page?.name !== "dashboard" && (
                <>
                  <BreadcrumbSeparator>
                    <span className="text-gray-400 h-2">/</span>
                  </BreadcrumbSeparator>
                  <BreadcrumbItem className="text-slate-800">
                    <BreadcrumbLink href={page?.name}>
                      {page?.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="relative flex items-center gap-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-700 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-[250px] bg-gray-100 dark:bg-gray-800 !outline-none !ring-0 !border-0"
          />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
