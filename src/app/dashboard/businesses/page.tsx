"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import BusinessDetails from "@/components/dashboard/Business/BusinessDetails";

// Sample data
const businesses = [
  {
    id: 1,
    name: "Coffee House Downtown",
    email: "info@coffeedowntown.com",
    status: "Active",
    plan: "Premium",
    registrationDate: new Date("2023-05-15"),
    lastActive: new Date("2024-05-10T14:30:00"),
    notes: "Regular customer, considering expansion to second location",
    tickets: 3,
  },
  {
    id: 2,
    name: "Burger Palace",
    email: "contact@burgerpalace.com",
    status: "Active",
    plan: "Standard",
    registrationDate: new Date("2023-08-22"),
    lastActive: new Date("2024-05-11T09:15:00"),
    notes: "Recently upgraded from Free plan",
    tickets: 1,
  },
  {
    id: 3,
    name: "Fresh Bakery",
    email: "hello@freshbakery.com",
    status: "Inactive",
    plan: "Free",
    registrationDate: new Date("2023-11-05"),
    lastActive: new Date("2024-03-20T11:45:00"),
    notes: "Seasonal business, typically inactive during summer",
    tickets: 0,
  },
  {
    id: 4,
    name: "Gourmet Restaurant",
    email: "reservations@gourmetrest.com",
    status: "Active",
    plan: "Enterprise",
    registrationDate: new Date("2022-12-10"),
    lastActive: new Date("2024-05-11T20:10:00"),
    notes: "VIP customer, dedicated account manager assigned",
    tickets: 2,
  },
  {
    id: 5,
    name: "Pizza Express",
    email: "orders@pizzaexpress.com",
    status: "Suspended",
    plan: "Standard",
    registrationDate: new Date("2023-06-18"),
    lastActive: new Date("2024-04-15T18:30:00"),
    notes: "Payment issues, follow up required",
    tickets: 5,
  },
  {
    id: 6,
    name: "Taco Truck",
    email: "info@tacotruck.com",
    status: "Active",
    plan: "Standard",
    registrationDate: new Date("2023-09-30"),
    lastActive: new Date("2024-05-09T12:20:00"),
    notes: "Mobile business, multiple locations",
    tickets: 1,
  },
  {
    id: 7,
    name: "Sushi Bar",
    email: "contact@sushibar.com",
    status: "Cancelled",
    plan: "Premium",
    registrationDate: new Date("2023-02-14"),
    lastActive: new Date("2024-01-20T19:45:00"),
    notes: "Closed business permanently",
    tickets: 0,
  },
  {
    id: 8,
    name: "Ice Cream Shop",
    email: "hello@icecreamshop.com",
    status: "Active",
    plan: "Free",
    registrationDate: new Date("2024-01-05"),
    lastActive: new Date("2024-05-11T15:10:00"),
    notes: "New business, potential for upgrade",
    tickets: 2,
  },
];

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

const BusinessManagement = () => {
  const [selectedBusinesses, setSelectedBusinesses] = useState<number[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // Filter businesses based on search and filters
  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || business.status === statusFilter;
    const matchesPlan = !planFilter || business.plan === planFilter;
    // Add date filter logic if needed
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const toggleSelectBusiness = (id: number) => {
    setSelectedBusinesses((prev) =>
      prev.includes(id)
        ? prev.filter((businessId) => businessId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedBusinesses.length === filteredBusinesses.length) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(filteredBusinesses.map((business) => business.id));
    }
  };

  const openBusinessDetails = (business: any) => {
    setSelectedBusiness(business);
    setIsDetailsOpen(true);
  };

  const stats = [
    {
      label: "Total",
      value: businesses.length,
      change: "+12%",
      positive: true,
    },
    {
      label: "Active",
      value: businesses.filter((b) => b.status === "Active").length,
      change: "+8%",
      positive: true,
    },
    {
      label: "Inactive",
      value: businesses.filter((b) => b.status === "Inactive").length,
      change: "-3%",
      positive: false,
    },
    {
      label: "Premium & Enterprise",
      value: businesses.filter(
        (b) => b.plan === "Premium" || b.plan === "Enterprise"
      ).length,
      change: "+15%",
      positive: true,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Businesses</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="gap-2 bg-primary text-white">
            <Plus className="h-4 w-4" />
            <span className="-mt-0.5"> New Business</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <span
                className={`text-xs font-medium ${
                  stat.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search businesses..."
                className="pl-9 w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter || ""}
              onValueChange={(value) =>
                setStatusFilter(value === "" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={planFilter || ""}
              onValueChange={(value) =>
                setPlanFilter(value === "" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-500"
              disabled={selectedBusinesses.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="uppercase text-xs !text-gray-500 bg-gray-100">
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={
                      filteredBusinesses.length > 0 &&
                      selectedBusinesses.length === filteredBusinesses.length
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Business Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Registration Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Support Tickets</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow
                  key={business.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openBusinessDetails(business)}
                >
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectBusiness(business.id);
                    }}
                  >
                    <Checkbox
                      checked={selectedBusinesses.includes(business.id)}
                      aria-label={`Select ${business.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div>{business.name}</div>
                      <div className="text-sm text-gray-500">
                        {business.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        statusColors[
                          business.status as keyof typeof statusColors
                        ]
                      }`}
                      variant="outline"
                    >
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        planColors[business.plan as keyof typeof planColors]
                      }`}
                      variant="outline"
                    >
                      {business.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(business.registrationDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(business.lastActive, "MMM d, yyyy h:mm a")}
                  </TableCell>
                  <TableCell>
                    {business.tickets > 0 ? (
                      <Badge variant="outline" className="bg-gray-100">
                        {business.tickets}
                      </Badge>
                    ) : (
                      "None"
                    )}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
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
                          onClick={() => openBusinessDetails(business)}
                        >
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit business</DropdownMenuItem>
                        <DropdownMenuItem>Change status</DropdownMenuItem>
                        <DropdownMenuItem>Change plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete business
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No businesses found</p>
          </div>
        )}

        {selectedBusinesses.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <span className="text-sm text-gray-700">
              {selectedBusinesses.length} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Change Status
              </Button>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Business Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          {selectedBusiness && (
            <BusinessDetails
              business={selectedBusiness}
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessManagement;
