"use client";

import { useState } from "react";
import { Building, Users, CreditCard, TicketCheck } from "lucide-react";
import { StatsCard } from "@/components/dashboard/analytics/stats-card";
import { BusinessStatusChart } from "@/components/dashboard/analytics/business-status-chart";
import { PlanBreakdownChart } from "@/components/dashboard/analytics/plan-breakdown-chart";
import { TicketTrendsChart } from "@/components/dashboard/analytics/ticket-trends-chart";
import { BusinessSalesTable } from "@/components/dashboard/analytics/business-sales-table";
import { SyncFrequencyChart } from "@/components/dashboard/analytics/sync-frequency-chart";
import { TimeFilterSelect } from "@/components/dashboard/analytics/time-filter";
import {
  businesses,
  plans,
  tickets,
  ticketTrends,
  posData,
  businessSalesData,
  timeFilters,
} from "@/shared/analytics-data";

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("30d");

  // Calculate stats
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter(
    (b) => b.status === "active"
  ).length;
  const inactiveBusinesses = businesses.filter(
    (b) => b.status === "inactive"
  ).length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const closedTickets = tickets.filter((t) => t.status === "closed").length;

  // Calculate total sales from POS data
  const totalSales = posData.reduce(
    (sum, business) => sum + business.totalSales,
    0
  );

  return (
    <section className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Get insights into your CRM activity and business metrics.
          </p>
        </div>
        <TimeFilterSelect
          filters={timeFilters}
          selectedFilter={timeFilter}
          onFilterChange={setTimeFilter}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatsCard
          title="Total Businesses"
          value={totalBusinesses}
          icon={<Building className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Active Businesses"
          value={activeBusinesses}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
          description="from last month"
        />
        <StatsCard
          title="Open Support Tickets"
          value={openTickets}
          icon={<TicketCheck className="h-5 w-5" />}
          trend={{ value: 5.1, isPositive: false }}
          description="from last month"
        />
        <StatsCard
          title="Total Sales (POS)"
          value={`$${(totalSales / 1000).toFixed(1)}k`}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 18.3, isPositive: true }}
          description="from last month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <BusinessStatusChart businesses={businesses} />
        <PlanBreakdownChart plans={plans} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <TicketTrendsChart ticketTrends={ticketTrends} />
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <BusinessSalesTable salesData={businessSalesData} />
        <SyncFrequencyChart posData={posData} />
      </div>
    </section>
  );
}
