"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Building2, Calendar, Mail, MessageSquare } from "lucide-react";

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Suspended: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

// Plan badge colors
const planColors = {
  Free: "bg-gray-100 text-gray-800",
  Standard: "bg-blue-100 text-blue-800",
  Premium: "bg-purple-100 text-purple-800",
  Enterprise: "bg-indigo-100 text-indigo-800",
};

// Sample support tickets
const supportTickets = [
  {
    id: "T-1234",
    subject: "POS System Connection Issue",
    status: "Resolved",
    priority: "High",
    created: new Date("2024-04-15T10:30:00"),
    updated: new Date("2024-04-16T14:20:00"),
  },
  {
    id: "T-1235",
    subject: "Payment Processing Error",
    status: "Open",
    priority: "Critical",
    created: new Date("2024-05-02T09:15:00"),
    updated: new Date("2024-05-02T11:45:00"),
  },
  {
    id: "T-1236",
    subject: "Menu Item Configuration",
    status: "Resolved",
    priority: "Medium",
    created: new Date("2024-03-20T15:40:00"),
    updated: new Date("2024-03-21T10:10:00"),
  },
];

// Sample activity log
const activityLog = [
  {
    action: "Status changed",
    from: "Inactive",
    to: "Active",
    by: "John Peterson",
    timestamp: new Date("2024-05-01T09:30:00"),
  },
  {
    action: "Plan upgraded",
    from: "Standard",
    to: "Premium",
    by: "System",
    timestamp: new Date("2024-04-15T14:20:00"),
  },
  {
    action: "Note added",
    by: "Sarah Miller",
    timestamp: new Date("2024-04-10T11:15:00"),
  },
  {
    action: "Business created",
    by: "John Peterson",
    timestamp: new Date("2023-05-15T10:00:00"),
  },
];

interface BusinessDetailsProps {
  business: any;
  onClose: () => void;
}

const BusinessDetails = ({ business, onClose }: BusinessDetailsProps) => {
  const [notes, setNotes] = useState(business.notes);
  const [status, setStatus] = useState(business.status);
  const [plan, setPlan] = useState(business.plan);

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">{business.name}</h2>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Mail className="h-4 w-4" />
            <span>{business.email}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Business</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-xs text-gray-500">Status</Label>
                  <div className="mt-1">
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Plan</Label>
                  <div className="mt-1">
                    <Select value={plan} onValueChange={setPlan}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">
                    Registration Date
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {format(business.registrationDate, "MMMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500">Last Active</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {format(business.lastActive, "MMMM d, yyyy h:mm a")}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Details
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
                <CardDescription>
                  Internal notes about this business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this business..."
                  className="min-h-[150px]"
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Notes</Button>
              </CardFooter>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-base">
                  Recent Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                {supportTickets.length > 0 ? (
                  <div className="space-y-4">
                    {supportTickets.slice(0, 3).map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-start justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{ticket.id}</span>
                            <span className="text-gray-700">
                              {ticket.subject}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Created: {format(ticket.created, "MMM d, yyyy")}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={
                              ticket.status === "Open"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {ticket.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              ticket.priority === "Critical"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "High"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No support tickets found
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Tickets
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                View and manage support tickets for {business.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {supportTickets.length > 0 ? (
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-start justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ticket.id}</span>
                          <span className="text-gray-700">
                            {ticket.subject}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Created:{" "}
                          {format(ticket.created, "MMM d, yyyy h:mm a")}
                          <br />
                          Updated:{" "}
                          {format(ticket.updated, "MMM d, yyyy h:mm a")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            ticket.status === "Open"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {ticket.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            ticket.priority === "Critical"
                              ? "bg-red-100 text-red-800"
                              : ticket.priority === "High"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {ticket.priority}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No support tickets found</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Create New Ticket</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Recent activity for {business.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      {activity.from && activity.to && (
                        <div className="text-sm text-gray-600">
                          Changed from{" "}
                          <span className="font-medium">{activity.from}</span>{" "}
                          to <span className="font-medium">{activity.to}</span>
                        </div>
                      )}
                      <div className="text-sm text-gray-500 mt-1">
                        By {activity.by} on{" "}
                        {format(activity.timestamp, "MMMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDetails;
