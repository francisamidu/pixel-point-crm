"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-3 py-2 rounded-t-lg sticky top-0 left-0 w-full z-50 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
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
