"use client";

import { useState } from "react";
import {
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";
import { format, isPast, addDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for subscriptions
const subscriptions = [
  {
    id: 1,
    businessName: "Coffee House Downtown",
    plan: "Premium",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2024-11-15"),
    renewalDate: new Date("2024-11-15"),
    status: "Active",
    trial: false,
    paymentMethod: "Stripe",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-04-15"),
    amount: 49.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 2,
    businessName: "Burger Palace",
    plan: "Standard",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2025-01-10"),
    renewalDate: new Date("2025-01-10"),
    status: "Active",
    trial: false,
    paymentMethod: "Stripe",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-04-10"),
    amount: 29.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 3,
    businessName: "Fresh Bakery",
    plan: "Free",
    startDate: new Date("2024-03-05"),
    endDate: null,
    renewalDate: null,
    status: "Active",
    trial: false,
    paymentMethod: null,
    paymentStatus: null,
    lastPayment: null,
    amount: 0,
    currency: "USD",
    autoRenew: false,
    category: "Food & Beverage",
  },
  {
    id: 4,
    businessName: "Gourmet Restaurant",
    plan: "Enterprise",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2024-12-10"),
    renewalDate: new Date("2024-12-10"),
    status: "Active",
    trial: false,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-03-10"),
    amount: 199.99,
    currency: "USD",
    autoRenew: false,
    category: "Food & Beverage",
  },
  {
    id: 5,
    businessName: "Pizza Express",
    plan: "Standard",
    startDate: new Date("2024-04-18"),
    endDate: new Date("2024-05-18"),
    renewalDate: new Date("2024-05-18"),
    status: "Trial",
    trial: true,
    paymentMethod: null,
    paymentStatus: null,
    lastPayment: null,
    amount: 29.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 6,
    businessName: "Taco Truck",
    plan: "Standard",
    startDate: new Date("2023-09-30"),
    endDate: new Date("2024-09-30"),
    renewalDate: new Date("2024-09-30"),
    status: "Active",
    trial: false,
    paymentMethod: "MPesa",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-03-30"),
    amount: 29.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 7,
    businessName: "Sushi Bar",
    plan: "Premium",
    startDate: new Date("2023-08-14"),
    endDate: new Date("2024-02-14"),
    renewalDate: new Date("2024-02-14"),
    status: "Expired",
    trial: false,
    paymentMethod: "Stripe",
    paymentStatus: "Unpaid",
    lastPayment: new Date("2023-08-14"),
    amount: 49.99,
    currency: "USD",
    autoRenew: false,
    category: "Food & Beverage",
  },
  {
    id: 8,
    businessName: "Ice Cream Shop",
    plan: "Free",
    startDate: new Date("2024-01-05"),
    endDate: null,
    renewalDate: null,
    status: "Active",
    trial: false,
    paymentMethod: null,
    paymentStatus: null,
    lastPayment: null,
    amount: 0,
    currency: "USD",
    autoRenew: false,
    category: "Food & Beverage",
  },
  {
    id: 9,
    businessName: "Smoothie Bar",
    plan: "Premium",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-01"),
    renewalDate: new Date("2024-05-01"),
    status: "Trial",
    trial: true,
    paymentMethod: null,
    paymentStatus: null,
    lastPayment: null,
    amount: 49.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 10,
    businessName: "Steakhouse Grill",
    plan: "Enterprise",
    startDate: new Date("2023-10-20"),
    endDate: new Date("2024-10-20"),
    renewalDate: new Date("2024-10-20"),
    status: "Active",
    trial: false,
    paymentMethod: "Stripe",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-04-20"),
    amount: 199.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 11,
    businessName: "Vegan Cafe",
    plan: "Standard",
    startDate: new Date("2023-12-05"),
    endDate: new Date("2024-12-05"),
    renewalDate: new Date("2024-12-05"),
    status: "Active",
    trial: false,
    paymentMethod: "MPesa",
    paymentStatus: "Paid",
    lastPayment: new Date("2024-03-05"),
    amount: 29.99,
    currency: "USD",
    autoRenew: true,
    category: "Food & Beverage",
  },
  {
    id: 12,
    businessName: "Breakfast Diner",
    plan: "Standard",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-03-15"),
    renewalDate: new Date("2024-03-15"),
    status: "Expired",
    trial: false,
    paymentMethod: "Stripe",
    paymentStatus: "Unpaid",
    lastPayment: new Date("2024-02-15"),
    amount: 29.99,
    currency: "USD",
    autoRenew: false,
    category: "Food & Beverage",
  },
];

// Status badge colors
const statusColors = {
  Active: "bg-green-100 text-green-800",
  Trial: "bg-blue-100 text-blue-800",
  Expired: "bg-red-100 text-red-800",
  Cancelled: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

// Plan badge colors
const planColors = {
  Free: "bg-gray-100 text-gray-800",
  Standard: "bg-blue-100 text-blue-800",
  Premium: "bg-purple-100 text-purple-800",
  Enterprise: "bg-indigo-100 text-indigo-800",
};

// Payment status colors
const paymentStatusColors = {
  Paid: "bg-green-100 text-green-800",
  Unpaid: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
};

const Subscriptions = () => {
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<number[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [groupByPlan, setGroupByPlan] = useState(false);
  const [currentView, setCurrentView] = useState("table");
  const [showRenewalWarning, setShowRenewalWarning] = useState(true);
  const [isChangePlanDialogOpen, setIsChangePlanDialogOpen] = useState(false);
  const [
    selectedSubscriptionForPlanChange,
    setSelectedSubscriptionForPlanChange,
  ] = useState<any>(null);

  // Filter subscriptions based on search and filters
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch = subscription.businessName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPlan = !planFilter || subscription.plan === planFilter;
    const matchesStatus = !statusFilter || subscription.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Group subscriptions by plan if groupByPlan is true
  type Subscription = {
    id: number;
    businessName: string;
    plan: string;
    startDate: Date;
    endDate: Date | null;
    renewalDate: Date | null;
    status: string;
    trial: boolean;
    paymentMethod: string | null;
    paymentStatus: string | null;
    lastPayment: Date | null;
    amount: number;
    currency: string;
    autoRenew: boolean;
    category: string;
  };

  const groupedSubscriptions: [string, Subscription[]][] = groupByPlan
    ? Object.entries(
        filteredSubscriptions.reduce(
          (acc: Record<string, Subscription[]>, subscription: Subscription) => {
            if (!acc[subscription.plan]) {
              acc[subscription.plan] = [];
            }
            acc[subscription.plan].push(subscription);
            return acc;
          },
          {} as Record<string, Subscription[]>
        )
      )
    : [["All", filteredSubscriptions as Subscription[]]];

  // Calculate subscriptions that are about to expire (within 30 days)
  const soonToExpireSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.endDate &&
      !isPast(subscription.endDate) &&
      isPast(addDays(subscription.endDate, -30))
  );

  const toggleSelectSubscription = (id: number) => {
    setSelectedSubscriptions((prev) =>
      prev.includes(id) ? prev.filter((subId) => subId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedSubscriptions.length === filteredSubscriptions.length) {
      setSelectedSubscriptions([]);
    } else {
      setSelectedSubscriptions(filteredSubscriptions.map((sub) => sub.id));
    }
  };

  const handleChangePlan = (subscription: any) => {
    setSelectedSubscriptionForPlanChange(subscription);
    setIsChangePlanDialogOpen(true);
  };

  // Stats for the summary cards
  const stats = [
    {
      label: "Total Subscriptions",
      value: subscriptions.length,
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Active",
      value: subscriptions.filter((sub) => sub.status === "Active").length,
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    },
    {
      label: "Trials",
      value: subscriptions.filter((sub) => sub.trial).length,
      icon: <Clock className="h-5 w-5 text-blue-500" />,
    },
    {
      label: "Expiring Soon",
      value: soonToExpireSubscriptions.length,
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    },
  ];

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Subscription
          </Button>
        </div>
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

      {/* Renewal warning */}
      {showRenewalWarning && soonToExpireSubscriptions.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-yellow-700 font-medium">
                {soonToExpireSubscriptions.length} subscription
                {soonToExpireSubscriptions.length > 1 ? "s" : ""} will expire in
                the next 30 days
              </p>
              <p className="text-sm text-yellow-600 mt-1">
                Review and take action to prevent service interruption.
              </p>
            </div>
            <button
              className="ml-auto text-yellow-500 hover:text-yellow-700"
              onClick={() => setShowRenewalWarning(false)}
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* View toggle and filters */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Checkbox
              id="groupByPlan"
              checked={groupByPlan}
              onCheckedChange={(checked) => setGroupByPlan(checked as boolean)}
              className="mr-2"
            />
            <label htmlFor="groupByPlan" className="text-sm text-gray-700">
              Group by Plan
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search businesses..."
              className="pl-9 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs
        defaultValue="table"
        onValueChange={setCurrentView}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Table View */}
        <TabsContent value="table">
          {groupedSubscriptions.map(([plan, subs]: [string, any[]]) => (
            <div key={plan} className="mb-6">
              {groupByPlan && (
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={`${
                      planColors[plan as keyof typeof planColors] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {subs.length} businesses
                  </span>
                </div>
              )}

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto" style={{ minWidth: "100%" }}>
                  <table className="w-full min-w-[1400px] text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 w-[40px]">
                          <Checkbox
                            checked={
                              subs.length > 0 &&
                              subs.every((sub) =>
                                selectedSubscriptions.includes(sub.id)
                              )
                            }
                            onCheckedChange={() => {
                              if (
                                subs.every((sub) =>
                                  selectedSubscriptions.includes(sub.id)
                                )
                              ) {
                                setSelectedSubscriptions(
                                  selectedSubscriptions.filter(
                                    (id) => !subs.some((sub) => sub.id === id)
                                  )
                                );
                              } else {
                                setSelectedSubscriptions([
                                  ...selectedSubscriptions,
                                  ...subs
                                    .map((sub) => sub.id)
                                    .filter(
                                      (id) =>
                                        !selectedSubscriptions.includes(id)
                                    ),
                                ]);
                              }
                            }}
                            aria-label="Select all"
                          />
                        </th>
                        <th className="px-4 py-3">Business</th>
                        <th className="px-4 py-3">Plan</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Start Date</th>
                        <th className="px-4 py-3">End Date</th>
                        <th className="px-4 py-3">Payment Method</th>
                        <th className="px-4 py-3">Last Payment</th>
                        <th className="px-4 py-3">Auto Renew</th>
                        <th className="px-4 py-3 w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {subs.map((subscription) => (
                        <tr
                          key={subscription.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            <Checkbox
                              checked={selectedSubscriptions.includes(
                                subscription.id
                              )}
                              onCheckedChange={() =>
                                toggleSelectSubscription(subscription.id)
                              }
                              aria-label={`Select ${subscription.businessName}`}
                            />
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 min-w-[180px]">
                            {subscription.businessName}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={`${
                                planColors[
                                  subscription.plan as keyof typeof planColors
                                ]
                              }`}
                              variant="outline"
                            >
                              {subscription.plan}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              className={`${
                                statusColors[
                                  subscription.status as keyof typeof statusColors
                                ]
                              }`}
                              variant="outline"
                            >
                              {subscription.status}
                            </Badge>
                            {subscription.trial && (
                              <Badge
                                className="ml-2 bg-blue-100 text-blue-800"
                                variant="outline"
                              >
                                Trial
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {format(subscription.startDate, "MMM d, yyyy")}
                          </td>
                          <td className="px-4 py-3 min-w-[150px]">
                            {subscription.endDate ? (
                              <div className="flex items-center gap-1">
                                {format(subscription.endDate, "MMM d, yyyy")}
                                {subscription.endDate &&
                                  isPast(addDays(subscription.endDate, -30)) &&
                                  !isPast(subscription.endDate) && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Expires soon</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                              </div>
                            ) : (
                              "Never"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {subscription.paymentMethod ? (
                              <div className="flex items-center gap-1">
                                {subscription.paymentMethod === "Stripe" && (
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06l-1.72 1.72-1.72-1.72z" />
                                  </svg>
                                )}
                                {subscription.paymentMethod === "MPesa" && (
                                  <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" />
                                  </svg>
                                )}
                                {subscription.paymentMethod}
                              </div>
                            ) : (
                              "None"
                            )}
                          </td>
                          <td className="px-4 py-3 min-w-[180px]">
                            {subscription.lastPayment ? (
                              <div className="flex items-center gap-2">
                                {format(
                                  subscription.lastPayment,
                                  "MMM d, yyyy"
                                )}
                                <Badge
                                  className={`${
                                    paymentStatusColors[
                                      subscription.paymentStatus as keyof typeof paymentStatusColors
                                    ]
                                  }`}
                                  variant="outline"
                                >
                                  {subscription.paymentStatus}
                                </Badge>
                              </div>
                            ) : (
                              "None"
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {subscription.autoRenew ? (
                              <Badge
                                className="bg-green-100 text-green-800"
                                variant="outline"
                              >
                                Yes
                              </Badge>
                            ) : (
                              <Badge
                                className="bg-gray-100 text-gray-800"
                                variant="outline"
                              >
                                No
                              </Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
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
                                  onClick={() => handleChangePlan(subscription)}
                                >
                                  Change Plan
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Subscription
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Payment History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Cancel Subscription
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {subs.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-gray-500">No subscriptions found</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                1-{filteredSubscriptions.length}
              </span>{" "}
              of <span className="font-medium">{subscriptions.length}</span>{" "}
              subscriptions
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
        </TabsContent>

        {/* Grid View */}
        <TabsContent value="grid">
          {groupedSubscriptions.map(([plan, subs]: [string, any[]]) => (
            <div key={plan} className="mb-6">
              {groupByPlan && (
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={`${
                      planColors[plan as keyof typeof planColors] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {subs.length} businesses
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subs.map((subscription) => (
                  <div
                    key={subscription.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {subscription.businessName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={`${
                              planColors[
                                subscription.plan as keyof typeof planColors
                              ]
                            }`}
                            variant="outline"
                          >
                            {subscription.plan}
                          </Badge>
                          <Badge
                            className={`${
                              statusColors[
                                subscription.status as keyof typeof statusColors
                              ]
                            }`}
                            variant="outline"
                          >
                            {subscription.status}
                          </Badge>
                          {subscription.trial && (
                            <Badge
                              className="bg-blue-100 text-blue-800"
                              variant="outline"
                            >
                              Trial
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Checkbox
                        checked={selectedSubscriptions.includes(
                          subscription.id
                        )}
                        onCheckedChange={() =>
                          toggleSelectSubscription(subscription.id)
                        }
                        aria-label={`Select ${subscription.businessName}`}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Start Date:</span>
                        <span className="text-gray-900">
                          {format(subscription.startDate, "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">End Date:</span>
                        <span className="text-gray-900">
                          {subscription.endDate
                            ? format(subscription.endDate, "MMM d, yyyy")
                            : "Never"}
                          {subscription.endDate &&
                            isPast(addDays(subscription.endDate, -30)) &&
                            !isPast(subscription.endDate) && (
                              <AlertCircle className="inline-block h-4 w-4 text-yellow-500 ml-1" />
                            )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="text-gray-900">
                          {subscription.paymentMethod || "None"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Auto Renew:</span>
                        <span className="text-gray-900">
                          {subscription.autoRenew ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleChangePlan(subscription)}
                      >
                        Change Plan
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Subscription</DropdownMenuItem>
                          <DropdownMenuItem>
                            View Payment History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        {/* Calendar View Placeholder */}
        <TabsContent value="calendar">
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Calendar View
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Calendar view allows you to visualize subscription start dates,
              end dates, and renewal dates in a monthly calendar format.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Change Plan Dialog */}
      <Dialog
        open={isChangePlanDialogOpen}
        onOpenChange={setIsChangePlanDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Subscription Plan</DialogTitle>
            <DialogDescription>
              Update the subscription plan for{" "}
              {selectedSubscriptionForPlanChange?.businessName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Plan</label>
              <div className="flex items-center">
                <Badge
                  className={`${
                    planColors[
                      selectedSubscriptionForPlanChange?.plan as keyof typeof planColors
                    ] || ""
                  }`}
                  variant="outline"
                >
                  {selectedSubscriptionForPlanChange?.plan}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Plan</label>
              <Select defaultValue={selectedSubscriptionForPlanChange?.plan}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Change Effective Date
              </label>
              <Select defaultValue="immediate">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediately</SelectItem>
                  <SelectItem value="next-cycle">Next Billing Cycle</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Send Email Notification
              </label>
              <div className="flex items-center space-x-2">
                <Checkbox id="send-email" defaultChecked />
                <label htmlFor="send-email" className="text-sm text-gray-700">
                  Notify customer about plan change
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangePlanDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsChangePlanDialogOpen(false)}>
              Change Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Subscriptions;
