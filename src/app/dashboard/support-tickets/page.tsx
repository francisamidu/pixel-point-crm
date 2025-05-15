"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Building,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for tickets
const tickets = [
  {
    id: "T-1001",
    subject: "POS System Connection Issue",
    message:
      "Our POS system is not connecting to the payment processor. We've tried restarting the system but it's still not working.",
    status: "Open",
    priority: "High",
    businessId: 1,
    businessName: "Coffee House Downtown",
    createdBy: "John Peterson",
    assignedTo: "Sarah Miller",
    createdAt: new Date("2024-05-10T09:30:00"),
    updatedAt: new Date("2024-05-10T14:20:00"),
    category: "Technical",
    comments: [
      {
        id: 1,
        text: "I've checked the connection logs and found some network issues. Will investigate further.",
        author: "Sarah Miller",
        isInternal: true,
        createdAt: new Date("2024-05-10T11:45:00"),
      },
      {
        id: 2,
        text: "Tried resetting the network connection but still having issues.",
        author: "John Peterson",
        isInternal: false,
        createdAt: new Date("2024-05-10T13:15:00"),
      },
    ],
  },
  {
    id: "T-1002",
    subject: "Menu Item Configuration",
    message:
      "We need to update our menu items with new prices and categories. Can you help us with the configuration?",
    status: "In Progress",
    priority: "Medium",
    businessId: 1,
    businessName: "Coffee House Downtown",
    createdBy: "John Peterson",
    assignedTo: "Michael Johnson",
    createdAt: new Date("2024-05-08T10:15:00"),
    updatedAt: new Date("2024-05-09T16:30:00"),
    category: "Configuration",
    comments: [
      {
        id: 3,
        text: "I'll help you update the menu items. Can you provide the new prices and categories?",
        author: "Michael Johnson",
        isInternal: false,
        createdAt: new Date("2024-05-08T11:30:00"),
      },
      {
        id: 4,
        text: "Customer has sent the updated menu via email. Working on implementing changes.",
        author: "Michael Johnson",
        isInternal: true,
        createdAt: new Date("2024-05-09T09:45:00"),
      },
    ],
  },
  {
    id: "T-1003",
    subject: "Staff Training Request",
    message:
      "We have new staff members who need training on the POS system. Can you schedule a training session?",
    status: "Open",
    priority: "Low",
    businessId: 2,
    businessName: "Burger Palace",
    createdBy: "Emily Wilson",
    assignedTo: null,
    createdAt: new Date("2024-05-11T14:00:00"),
    updatedAt: new Date("2024-05-11T14:00:00"),
    category: "Training",
    comments: [],
  },
  {
    id: "T-1004",
    subject: "Payment Processing Error",
    message:
      "We're getting an error when processing credit card payments. Error code: ERR-4501",
    status: "Resolved",
    priority: "High",
    businessId: 3,
    businessName: "Fresh Bakery",
    createdBy: "David Brown",
    assignedTo: "Sarah Miller",
    createdAt: new Date("2024-05-05T08:20:00"),
    updatedAt: new Date("2024-05-07T11:10:00"),
    category: "Technical",
    comments: [
      {
        id: 5,
        text: "I've identified the issue with the payment processor. Working on a fix.",
        author: "Sarah Miller",
        isInternal: false,
        createdAt: new Date("2024-05-05T10:30:00"),
      },
      {
        id: 6,
        text: "The payment processor had an outage. It's now resolved and payments should be working.",
        author: "Sarah Miller",
        isInternal: false,
        createdAt: new Date("2024-05-07T11:00:00"),
      },
    ],
  },
  {
    id: "T-1005",
    subject: "Inventory Sync Issue",
    message:
      "Our inventory is not syncing correctly between our POS and inventory management system.",
    status: "In Progress",
    priority: "Medium",
    businessId: 4,
    businessName: "Gourmet Restaurant",
    createdBy: "Robert Taylor",
    assignedTo: "Michael Johnson",
    createdAt: new Date("2024-05-09T15:45:00"),
    updatedAt: new Date("2024-05-10T09:20:00"),
    category: "Integration",
    comments: [
      {
        id: 7,
        text: "I'm looking into the sync issue. Can you provide more details about when this started?",
        author: "Michael Johnson",
        isInternal: false,
        createdAt: new Date("2024-05-09T16:30:00"),
      },
      {
        id: 8,
        text: "Customer mentioned this started after their recent inventory system update. Need to check API compatibility.",
        author: "Michael Johnson",
        isInternal: true,
        createdAt: new Date("2024-05-10T09:15:00"),
      },
    ],
  },
  {
    id: "T-1006",
    subject: "Reporting Feature Request",
    message:
      "We'd like to have a custom sales report that shows hourly sales by category.",
    status: "Open",
    priority: "Low",
    businessId: 5,
    businessName: "Pizza Express",
    createdBy: "Jennifer Lee",
    assignedTo: "Alex Thompson",
    createdAt: new Date("2024-05-11T11:30:00"),
    updatedAt: new Date("2024-05-11T13:45:00"),
    category: "Feature Request",
    comments: [
      {
        id: 9,
        text: "I'll look into creating this custom report. Let me check what data we have available.",
        author: "Alex Thompson",
        isInternal: false,
        createdAt: new Date("2024-05-11T13:40:00"),
      },
    ],
  },
  {
    id: "T-1007",
    subject: "Account Access Issue",
    message:
      "One of our managers can't log into the admin dashboard. Username: manager@pizzaexpress.com",
    status: "Closed",
    priority: "Medium",
    businessId: 5,
    businessName: "Pizza Express",
    createdBy: "Jennifer Lee",
    assignedTo: "Sarah Miller",
    createdAt: new Date("2024-05-03T09:15:00"),
    updatedAt: new Date("2024-05-04T10:30:00"),
    category: "Access",
    comments: [
      {
        id: 10,
        text: "I've reset the password for this account. Please check your email for the reset link.",
        author: "Sarah Miller",
        isInternal: false,
        createdAt: new Date("2024-05-03T10:00:00"),
      },
      {
        id: 11,
        text: "The manager has confirmed they can now access the dashboard. Closing ticket.",
        author: "Sarah Miller",
        isInternal: true,
        createdAt: new Date("2024-05-04T10:25:00"),
      },
    ],
  },
  {
    id: "T-1008",
    subject: "Printer Configuration",
    message: "We need to set up a new receipt printer. Model: Star TSP143III",
    status: "Resolved",
    priority: "Medium",
    businessId: 6,
    businessName: "Taco Truck",
    createdBy: "Carlos Rodriguez",
    assignedTo: "Michael Johnson",
    createdAt: new Date("2024-05-06T13:20:00"),
    updatedAt: new Date("2024-05-08T15:10:00"),
    category: "Hardware",
    comments: [
      {
        id: 12,
        text: "I'll help you set up the new printer. Are you available for a remote session tomorrow?",
        author: "Michael Johnson",
        isInternal: false,
        createdAt: new Date("2024-05-06T14:30:00"),
      },
      {
        id: 13,
        text: "Remote session completed. Printer is now configured and working properly.",
        author: "Michael Johnson",
        isInternal: false,
        createdAt: new Date("2024-05-08T15:00:00"),
      },
    ],
  },
];

// Sample data for businesses
const businesses = [
  { id: 1, name: "Coffee House Downtown" },
  { id: 2, name: "Burger Palace" },
  { id: 3, name: "Fresh Bakery" },
  { id: 4, name: "Gourmet Restaurant" },
  { id: 5, name: "Pizza Express" },
  { id: 6, name: "Taco Truck" },
  { id: 7, name: "Sushi Bar" },
  { id: 8, name: "Ice Cream Shop" },
];

// Sample data for staff
const staff = [
  { id: 1, name: "Sarah Miller" },
  { id: 2, name: "Michael Johnson" },
  { id: 3, name: "Alex Thompson" },
  { id: 4, name: "Jessica Williams" },
  { id: 5, name: "Daniel Brown" },
];

// Status badge colors
const statusColors = {
  Open: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-800",
};

// Priority badge colors
const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-orange-100 text-orange-800",
  Low: "bg-green-100 text-green-800",
};

// Category badge colors
const categoryColors = {
  Technical: "bg-purple-100 text-purple-800",
  Configuration: "bg-blue-100 text-blue-800",
  Training: "bg-teal-100 text-teal-800",
  Integration: "bg-indigo-100 text-indigo-800",
  "Feature Request": "bg-pink-100 text-pink-800",
  Access: "bg-yellow-100 text-yellow-800",
  Hardware: "bg-gray-100 text-gray-800",
};

const TicketTracking = () => {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [businessFilter, setBusinessFilter] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isViewTicketOpen, setIsViewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const [isInternalComment, setIsInternalComment] = useState(false);

  // New ticket form state
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    status: "Open",
    priority: "Medium",
    businessId: "",
    category: "Technical",
  });

  // Filter tickets based on active tab, search, and filters
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority =
      !priorityFilter || ticket.priority === priorityFilter;
    const matchesBusiness =
      !businessFilter || ticket.businessId === businessFilter;

    let matchesTab = true;
    if (activeTab === "open") {
      matchesTab = ticket.status === "Open" || ticket.status === "In Progress";
    } else if (activeTab === "closed") {
      matchesTab = ticket.status === "Resolved" || ticket.status === "Closed";
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesBusiness &&
      matchesTab
    );
  });

  // Sort tickets by creation date (newest first)
  const sortedTickets = [...filteredTickets].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsViewTicketOpen(true);
  };

  const handleCreateTicket = () => {
    setIsCreateTicketOpen(true);
  };

  const handleSubmitTicket = () => {
    // In a real app, this would send the data to an API
    console.log("Creating new ticket:", newTicket);
    setIsCreateTicketOpen(false);
    // Reset form
    setNewTicket({
      subject: "",
      message: "",
      status: "Open",
      priority: "Medium",
      businessId: "",
      category: "Technical",
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // In a real app, this would send the comment to an API
    console.log("Adding comment:", {
      ticketId: selectedTicket.id,
      text: newComment,
      isInternal: isInternalComment,
    });

    // Reset form
    setNewComment("");
    setIsInternalComment(false);
  };

  const handleUpdateTicketStatus = (status: string) => {
    // In a real app, this would update the ticket status via API
    console.log("Updating ticket status:", {
      ticketId: selectedTicket.id,
      status,
    });
  };

  // Stats for the summary cards
  const stats = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Open",
      value: tickets.filter((ticket) => ticket.status === "Open").length,
      icon: <AlertCircle className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "In Progress",
      value: tickets.filter((ticket) => ticket.status === "In Progress").length,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
    },
    {
      label: "Resolved/Closed",
      value: tickets.filter(
        (ticket) => ticket.status === "Resolved" || ticket.status === "Closed"
      ).length,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Support Tickets
        </h1>
        <Button onClick={handleCreateTicket}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Ticket
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-2">
              {stat.icon}
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters and search */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <Tabs
          defaultValue="all"
          className="w-auto"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="all">All Tickets</TabsTrigger>
            <TabsTrigger value="open">Open Tickets</TabsTrigger>
            <TabsTrigger value="closed">Closed Tickets</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-9 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter || "all"}
            onValueChange={(value) =>
              setStatusFilter(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={priorityFilter || "all"}
            onValueChange={(value) =>
              setPriorityFilter(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tickets table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Ticket ID</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Business</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3 w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewTicket(ticket)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-3">{ticket.businessName}</td>
                  <td className="px-4 py-3 min-w-[100px]">
                    <Badge
                      className={`${
                        statusColors[ticket.status as keyof typeof statusColors]
                      }`}
                      variant="outline"
                    >
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 min-w-[100px]">
                    <Badge
                      className={`${
                        priorityColors[
                          ticket.priority as keyof typeof priorityColors
                        ]
                      }`}
                      variant="outline"
                    >
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 min-w-[120px]">
                    <Badge
                      className={`${
                        categoryColors[
                          ticket.category as keyof typeof categoryColors
                        ]
                      }`}
                      variant="outline"
                    >
                      {ticket.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {format(ticket.createdAt, "MMM d, yyyy")}
                  </td>
                  <td className="px-4 py-3">
                    {ticket.assignedTo || "Unassigned"}
                  </td>
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          aria-label="Open menu"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewTicket(ticket)}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Assign ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Change status</DropdownMenuItem>
                        <DropdownMenuItem>Change priority</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete ticket
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedTickets.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No tickets found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1-{sortedTickets.length}</span>{" "}
          of <span className="font-medium">{tickets.length}</span> tickets
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>
              Fill in the information below to create a new support ticket.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business</label>
                <Select
                  value={newTicket.businessId}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, businessId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem
                        key={business.id}
                        value={business.id.toString()}
                      >
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Configuration">Configuration</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Integration">Integration</SelectItem>
                    <SelectItem value="Feature Request">
                      Feature Request
                    </SelectItem>
                    <SelectItem value="Access">Access</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                placeholder="Enter ticket subject"
                value={newTicket.subject}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, subject: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Describe the issue in detail"
                className="min-h-[120px]"
                value={newTicket.message}
                onChange={(e) =>
                  setNewTicket({ ...newTicket, message: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={newTicket.status}
                  onValueChange={(value) =>
                    setNewTicket({ ...newTicket, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateTicketOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmitTicket}>Create Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Ticket Dialog */}
      {selectedTicket && (
        <Dialog open={isViewTicketOpen} onOpenChange={setIsViewTicketOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selectedTicket.subject}</DialogTitle>
                <Badge
                  className={`${
                    statusColors[
                      selectedTicket.status as keyof typeof statusColors
                    ]
                  }`}
                  variant="outline"
                >
                  {selectedTicket.status}
                </Badge>
                <Badge
                  className={`${
                    priorityColors[
                      selectedTicket.priority as keyof typeof priorityColors
                    ]
                  }`}
                  variant="outline"
                >
                  {selectedTicket.priority}
                </Badge>
              </div>
              <DialogDescription>
                Ticket ID: {selectedTicket.id}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6">
              {/* Ticket details */}
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Ticket Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-gray-700 whitespace-pre-line">
                        {selectedTicket.message}
                      </p>
                      <div className="mt-4 text-sm text-gray-500">
                        Submitted by {selectedTicket.createdBy} on{" "}
                        {format(
                          selectedTicket.createdAt,
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Comments & Updates</h4>
                      {selectedTicket.comments.length > 0 ? (
                        <div className="space-y-4">
                          {selectedTicket.comments.map((comment: any) => (
                            <div
                              key={comment.id}
                              className={`p-4 rounded-md ${
                                comment.isInternal
                                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                                  : "bg-gray-50"
                              }`}
                            >
                              {comment.isInternal && (
                                <div className="text-xs font-medium text-yellow-800 mb-2">
                                  INTERNAL NOTE
                                </div>
                              )}
                              <p className="text-gray-700">{comment.text}</p>
                              <div className="mt-2 text-sm text-gray-500">
                                {comment.author} -{" "}
                                {format(
                                  comment.createdAt,
                                  "MMMM d, yyyy 'at' h:mm a"
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No comments yet</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Add Comment</h4>
                      <Textarea
                        placeholder="Type your comment here..."
                        className="min-h-[100px]"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="internal-note"
                          checked={isInternalComment}
                          onCheckedChange={(checked) =>
                            setIsInternalComment(!!checked)
                          }
                        />
                        <label
                          htmlFor="internal-note"
                          className="text-sm text-gray-700"
                        >
                          Mark as internal note (not visible to customer)
                        </label>
                      </div>
                      <Button onClick={handleAddComment}>Add Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with metadata */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Ticket Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">Status</label>
                      <Select
                        value={selectedTicket.status}
                        onValueChange={handleUpdateTicketStatus}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Business</label>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {selectedTicket.businessName}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Category</label>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <Badge
                          className={`${
                            categoryColors[
                              selectedTicket.category as keyof typeof categoryColors
                            ]
                          }`}
                          variant="outline"
                        >
                          {selectedTicket.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">
                        Created By
                      </label>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {selectedTicket.createdBy}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">
                        Created Date
                      </label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {format(selectedTicket.createdAt, "MMMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">
                        Last Updated
                      </label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-900">
                          {format(selectedTicket.updatedAt, "MMMM d, yyyy")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500">
                        Assigned To
                      </label>
                      <Select
                        defaultValue={selectedTicket.assignedTo || "unassigned"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {staff.map((person) => (
                            <SelectItem key={person.id} value={person.name}>
                              {person.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full">
                      Email Customer
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete Ticket
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TicketTracking;
