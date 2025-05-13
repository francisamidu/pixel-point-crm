import React, { useMemo } from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  period?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  trend,
  period = "Last 30 days",
}) => {
  const statColor = useMemo(() => {
    switch (label) {
      case "Users":
        return "text-[#7C3AED] dark:text-indigo-300";
      case "Subscriptions":
        return "text-[#840032] dark:text-indigo-300";
      case "New Leads":
        return "text-[#e59500] dark:text-indigo-300";
      case "Sent invoices":
        return "text-[#2e933c] dark:text-indigo-300";
      default:
        return "text-[#e5dada] dark:text-indigo-300";
    }
  }, [label]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-3 min-w-[220px] max-w-[260px] flex flex-col flex-1 gap-2 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-8">
        <span
          className={`text-xl ${statColor} border p-3 rounded-xl shadow-xs`}
        >
          {icon}
        </span>
        <div className="mt-2">
          <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
            {label}
          </div>
          <div className="text-3xl font-bold text-(color:--text-primary) dark:text-white tracking-tight">
            {value}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-400">{period}</span>
        {trend && (
          <span
            className={`flex items-center text-sm font-semibold rounded-md px-2 py-0.5 ${
              trend.positive
                ? "bg-green-50 text-green-600 border !border-green-200"
                : "bg-red-50 text-red-500 border !border-red-200"
            }`}
          >
            {trend.positive ? (
              <svg
                className="w-3 h-3 mr-1 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 mr-1 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            )}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
