"use client";

import { useState } from "react";
import type { AuditLogEntry } from "@/types/admin";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileDown, Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export function AuditLog({ logs }: AuditLogProps) {
  const [userFilter, setUserFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredLogs = logs.filter((log) => {
    if (userFilter !== "all" && log.userId !== userFilter) {
      return false;
    }

    if (actionFilter !== "all" && log.action !== actionFilter) {
      return false;
    }

    if (entityFilter !== "all" && log.entityType !== entityFilter) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        log.userName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.entityType.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Get unique users for filter
  const uniqueUsers = Array.from(new Set(logs.map((log) => log.userId)));
  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));
  const uniqueEntities = Array.from(new Set(logs.map((log) => log.entityType)));

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-800 border-green-200";
      case "updated":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "deleted":
        return "bg-red-100 text-red-800 border-red-200";
      case "sent":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold">Audit logs</CardTitle>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <div className="flex flex-wrap gap-2">
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All users</SelectItem>
                {uniqueUsers.map((userId) => {
                  const user = logs.find((log) => log.userId === userId);
                  return (
                    <SelectItem key={userId} value={userId}>
                      {user?.userName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                {uniqueActions.map((action) => (
                  <SelectItem
                    key={action}
                    value={action}
                    className="capitalize"
                  >
                    {action}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Entity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All entities</SelectItem>
                {uniqueEntities.map((entity) => (
                  <SelectItem
                    key={entity}
                    value={entity}
                    className="capitalize"
                  >
                    {entity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs here"
                className="pl-8 h-9 w-full sm:w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="h-9 bg-blue-600 hover:bg-blue-700">
              <FileDown className="h-4 w-4 mr-2" />
              Export logs
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[240px]">User</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
                <TableHead className="w-[160px]">Date & Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[100px]">Entity</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No audit logs found for the current filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.userId}@example.com
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getActionBadgeColor(
                          log.action
                        )} capitalize px-2 py-0.5 text-xs font-medium`}
                      >
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {format(log.timestamp, "dd MMM, yyyy")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(log.timestamp, "HH:mm:ss")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        "{log.details}"
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{log.entityType}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete log</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
