"use client";

import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User, UserRole } from "@/types/admin";
import { formatDistanceToNow } from "date-fns";
import { getRoleBadgeVariant } from "@/shared/admin-data";

interface UserTableProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserTable({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
}: UserTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof User>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <Button onClick={onAddUser} size="sm">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("lastActive")}
              >
                Last Active{" "}
                {sortColumn === "lastActive" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role as UserRole)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "outline" : "secondary"}
                    className={
                      user.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.lastActive
                    ? formatDistanceToNow(user.lastActive, { addSuffix: true })
                    : "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditUser(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
