"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserTable } from "@/components/dashboard/admin/user-table";
import { UserForm } from "@/components/dashboard/admin/user-form";
import { RolesEditor } from "@/components/dashboard/admin/roles-editor";
import { AuditLog } from "@/components/dashboard/admin/audit-log";
import { SuccessAlert, ErrorAlert } from "@/components/dashboard/admin/alerts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users, roles, auditLogs } from "@/shared/admin-data";
import type { User, RolePermission, UserRole } from "@/types/admin";
import { v4 as uuidv4 } from "uuid";
import { UserIcon, ShieldAlert, ClipboardList, Search } from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [usersList, setUsersList] = useState(users);
  const [rolesList, setRolesList] = useState(roles);
  const [logsList] = useState(auditLogs);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const usersPerPage = 6;

  // Filter users based on search query, status, and role
  const filteredUsers = usersList.filter((user) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !user.name.toLowerCase().includes(query) &&
        !user.email.toLowerCase().includes(query) &&
        !(user.department && user.department.toLowerCase().includes(query))
      ) {
        return false;
      }
    }

    // Filter by status
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }

    // Filter by role
    if (roleFilter !== "all" && user.role !== roleFilter) {
      return false;
    }

    return true;
  });

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (currentUserPage - 1) * usersPerPage,
    currentUserPage * usersPerPage
  );

  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleAddUser = (userData: any) => {
    const newUser: User = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      role: userData.role as UserRole,
      status: userData.status,
      department: userData.department,
      createdAt: new Date(),
      lastActive: new Date(),
      avatar: `http://randomuser.me/api/portraits/men/${
        Math.floor(Math.random() * 100) + 1
      }.jpg`,
    };

    setUsersList([...usersList, newUser]);
    setAlertInfo({
      show: true,
      type: "success",
      message: "User added successfully",
    });

    setTimeout(() => {
      setAlertInfo({ show: false, type: "success", message: "" });
    }, 3000);
  };

  const handleEditUser = (userData: any) => {
    if (!selectedUser) return;

    const updatedUsers = usersList.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            status: userData.status,
            department: userData.department,
          }
        : user
    );

    setUsersList(updatedUsers);
    setAlertInfo({
      show: true,
      type: "success",
      message: "User updated successfully",
    });

    setTimeout(() => {
      setAlertInfo({ show: false, type: "success", message: "" });
    }, 3000);
  };

  const handleDeleteUser = (userId: string) => {
    setUsersList(usersList.filter((user) => user.id !== userId));
    setAlertInfo({
      show: true,
      type: "success",
      message: "User deleted successfully",
    });

    setTimeout(() => {
      setAlertInfo({ show: false, type: "success", message: "" });
    }, 3000);
  };

  const handleOpenEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleUpdateRole = (
    roleName: string,
    permissions: RolePermission[]
  ) => {
    const updatedRoles = rolesList.map((role) =>
      role.name === roleName ? { ...role, permissions } : role
    );

    setRolesList(updatedRoles);
    setAlertInfo({
      show: true,
      type: "success",
      message: `${roleName} role permissions updated successfully`,
    });

    setTimeout(() => {
      setAlertInfo({ show: false, type: "success", message: "" });
    }, 3000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Admin Management
          </h1>
          <p className="text-muted-foreground">
            Control access and manage system users.
          </p>
        </div>
      </div>

      {alertInfo.show &&
        (alertInfo.type === "success" ? (
          <SuccessAlert
            message={alertInfo.message}
            onDismiss={() =>
              setAlertInfo({ show: false, type: "success", message: "" })
            }
            className="mb-4"
          />
        ) : (
          <ErrorAlert
            message={alertInfo.message}
            onDismiss={() =>
              setAlertInfo({ show: false, type: "error", message: "" })
            }
            className="mb-4"
          />
        ))}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center">
            <ClipboardList className="h-4 w-4 mr-2" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Create and manage CRM admin accounts.
              </CardDescription>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="superadmin">Superadmin</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UserTable
                users={paginatedUsers}
                onAddUser={() => setIsAddUserOpen(true)}
                onEditUser={handleOpenEditUser}
                onDeleteUser={handleDeleteUser}
              />

              {totalUserPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentUserPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={
                          currentUserPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalUserPages }).map((_, index) => {
                      const page = index + 1;

                      // Show first page, current page, last page, and pages adjacent to current
                      if (
                        page === 1 ||
                        page === totalUserPages ||
                        (page >= currentUserPage - 1 &&
                          page <= currentUserPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentUserPage(page)}
                              isActive={page === currentUserPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      // Show ellipsis if there's a gap
                      if (
                        (page === 2 && currentUserPage > 3) ||
                        (page === totalUserPages - 1 &&
                          currentUserPage < totalUserPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }

                      return null;
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentUserPage((prev) =>
                            Math.min(prev + 1, totalUserPages)
                          )
                        }
                        className={
                          currentUserPage === totalUserPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <RolesEditor roles={rolesList} onRoleUpdate={handleUpdateRole} />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLog logs={logsList} />
        </TabsContent>
      </Tabs>

      {/* User Forms */}
      <UserForm
        open={isAddUserOpen}
        onOpenChange={setIsAddUserOpen}
        onSubmit={handleAddUser}
      />

      <UserForm
        open={isEditUserOpen}
        onOpenChange={setIsEditUserOpen}
        user={selectedUser || undefined}
        onSubmit={handleEditUser}
      />
    </div>
  );
}
