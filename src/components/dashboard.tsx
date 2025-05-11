"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import PerformanceSummary from "./performance-summary";
import GrowthOverview from "./growth-overview";
import CampaignList from "./campaign-list";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {activeSection === "overview"
                ? "Overview"
                : activeSection === "performance"
                ? "Performance"
                : activeSection === "insights"
                ? "Insights"
                : activeSection === "comparison"
                ? "Comparison"
                : activeSection === "tracking"
                ? "Tracking"
                : activeSection === "analysis"
                ? "Analysis"
                : "Dashboard"}
            </h1>
            
          </div>

          {activeSection === "overview" && (
            <>
              <PerformanceSummary />
              <GrowthOverview />
              <CampaignList />
            </>
          )}

          {activeSection === "performance" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Performance Details
              </h2>
              <p>
                Detailed performance metrics and analysis would appear here.
              </p>
            </div>
          )}

          {activeSection === "insights" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Business Insights</h2>
              <p>Detailed business insights and trends would appear here.</p>
            </div>
          )}

          {activeSection === "comparison" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Comparison Analysis
              </h2>
              <p>
                Comparative analysis between different metrics would appear
                here.
              </p>
            </div>
          )}

          {activeSection === "tracking" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Campaign Tracking</h2>
              <p>Campaign tracking and monitoring tools would appear here.</p>
            </div>
          )}

          {activeSection === "analysis" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Advanced Analysis</h2>
              <p>
                Advanced data analysis and reporting tools would appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
