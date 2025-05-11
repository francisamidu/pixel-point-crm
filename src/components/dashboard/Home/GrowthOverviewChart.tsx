"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "January", Impressions: 120, Followers: 80 },
  { month: "February", Impressions: 140, Followers: 90 },
  { month: "March", Impressions: 160, Followers: 100 },
  { month: "April", Impressions: 170, Followers: 110 },
  { month: "May", Impressions: 180, Followers: 120 },
  { month: "June", Impressions: 200, Followers: 130 },
  { month: "July", Impressions: 240, Followers: 140 },
  { month: "August", Impressions: 220, Followers: 135 },
  { month: "September", Impressions: 230, Followers: 138 },
  { month: "October", Impressions: 250, Followers: 145 },
  { month: "November", Impressions: 260, Followers: 150 },
  { month: "December", Impressions: 280, Followers: 160 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100 text-xs min-w-[180px]">
        <div className="font-semibold mb-1 text-gray-700">
          Friday, 10 July 2024
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Impression</span>
            <span className="font-medium text-[#3B5CFF]">240K Reach</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Followers</span>
            <span className="font-medium text-[#F4A300]">132K User</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const GrowthOverviewChart = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 px-6 py-4 mt-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Growth Overview
          </div>
          <div className="text-xs text-gray-400">
            Analyze and track your growth trends easily
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs text-gray-500 border px-2 py-1 rounded-md bg-gray-50 hover:bg-gray-100">
            Filters
          </button>
          <span className="text-xs text-gray-500">1 Jan - 31 Dec 2024</span>
          <button className="text-xs text-gray-500 border px-2 py-1 rounded-md bg-gray-50 hover:bg-gray-100">
            Refresh
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 16, right: 24, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#F1F5F9"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#A0AEC0" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#A0AEC0",
              strokeWidth: 1,
              strokeDasharray: "2 2",
            }}
          />
          <Line
            type="monotone"
            dataKey="Impressions"
            stroke="#3B5CFF"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#3B5CFF",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="Followers"
            stroke="#F4A300"
            strokeWidth={2.5}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "#F4A300",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthOverviewChart;
