"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Filter,
  Search,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NotificationList } from "@/components/dashboard/notifications/notification-list";
import { AlertList } from "@/components/dashboard/notifications/alert-list";
import { NotificationDetails } from "@/components/dashboard/notifications/notification-details";
import { AlertDetails } from "@/components/dashboard/notifications/alert-details";
import { NotificationSettingsDialog } from "@/components/dashboard/notifications/notification-settings";
import {
  notifications,
  alerts,
  defaultNotificationSettings,
} from "@/shared/notifications-data";
import type {
  Notification,
  Alert,
  NotificationFilter,
  NotificationSettings,
} from "@/types/notification";

export default function NotificationsPage() {
  // State for notifications and alerts
  const [notificationsList, setNotificationsList] =
    useState<Notification[]>(notifications);
  const [alertsList, setAlertsList] = useState<Alert[]>(alerts);
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(defaultNotificationSettings);

  // Filter state
  const [filter, setFilter] = useState<NotificationFilter>({
    type: "all",
    status: "all",
    timeRange: "all",
    search: "",
  });

  // Dialog state
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [notificationDetailsOpen, setNotificationDetailsOpen] = useState(false);
  const [alertDetailsOpen, setAlertDetailsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Count unread notifications
  const unreadCount = notificationsList.filter(
    (n) => n.status === "unread"
  ).length;

  // Handle marking a notification as read
  const handleMarkAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id
          ? { ...notification, status: "read" }
          : notification
      )
    );
  };

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        status: "read",
      }))
    );
  };

  // Handle viewing notification details
  const handleViewNotificationDetails = (notification: Notification) => {
    setSelectedNotification(notification);
    setNotificationDetailsOpen(true);
  };

  // Handle alert actions
  const handleAcknowledgeAlert = (id: string) => {
    setAlertsList(
      alertsList.map((alert) =>
        alert.id === id ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolveAlert = (id: string) => {
    setAlertsList(
      alertsList.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const handleViewAlertDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setAlertDetailsOpen(true);
  };

  // Handle saving notification settings
  const handleSaveSettings = (settings: NotificationSettings) => {
    setNotificationSettings(settings);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with your latest activities and messages
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Mark All as Read
              </Button>
            )}
            <Button variant="outline" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
          <div className="relative md:w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications..."
              className="pl-8"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filter.type}
              onValueChange={(value) =>
                setFilter({ ...filter, type: value as any })
              }
            >
              <SelectTrigger className="w-[130px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ticket">Tickets</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filter.status}
              onValueChange={(value) =>
                setFilter({ ...filter, status: value as any })
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <NotificationList
              notifications={notificationsList}
              filter={filter}
              onMarkAsRead={handleMarkAsRead}
              onViewDetails={handleViewNotificationDetails}
            />
          </TabsContent>
          <TabsContent value="alerts">
            <AlertList
              alerts={alertsList}
              onAcknowledge={handleAcknowledgeAlert}
              onResolve={handleResolveAlert}
              onViewDetails={handleViewAlertDetails}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <NotificationDetails
        notification={selectedNotification}
        open={notificationDetailsOpen}
        onOpenChange={setNotificationDetailsOpen}
        onMarkAsRead={handleMarkAsRead}
      />

      <AlertDetails
        alert={selectedAlert}
        open={alertDetailsOpen}
        onOpenChange={setAlertDetailsOpen}
        onAcknowledge={handleAcknowledgeAlert}
        onResolve={handleResolveAlert}
      />

      <NotificationSettingsDialog
        settings={notificationSettings}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
}
