import StatsCard from "@/components/dashboard/Home/StatsCard";
import React from "react";
import { FileText, Users } from "lucide-react";
import GrowthOverviewChart from "@/components/dashboard/Home/GrowthOverviewChart";

const Dashboard = () => {
  return (
    <div className="flex flex-col py-3 px-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-lg font-semibold">Overview</h1>
        <h2 className="text-sm !text-gray-500">
          Get an overview of your business performance
        </h2>
      </div>
      <div className="w-full flex justify-center gap-3 ">
        <StatsCard
          icon={
            <svg
              width="24"
              height="24"
              stroke="#7C3AED"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          label="Users"
          value={430}
          period="Last 30 days"
          trend={{ value: "32.54%", positive: true }}
        />
        <StatsCard
          icon={
            <svg
              width="24"
              height="24"
              stroke="#7C3AED"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
              <path d="M6 15h.01" />
            </svg>
          }
          label="Subscriptions"
          value={360}
          period="Last 30 days"
          trend={{ value: "32.54%", positive: false }}
        />
        <StatsCard
          icon={<Users />}
          label="New Leads"
          value={"583"}
          period="Last 30 days"
          trend={{ value: "32.54%", positive: true }}
        />
        <StatsCard
          icon={<FileText />}
          label="Sent invoices"
          value={"43,583"}
          trend={{ value: "32.54%", positive: true }}
          period="Last 30 days"
        />
      </div>
      <GrowthOverviewChart />
    </div>
  );
};

export default Dashboard;
