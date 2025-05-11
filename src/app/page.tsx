"use client";

import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600">
      <div className="container mx-auto p-4">
        <h1 className="text-6xl font-bold text-white">PixelPoint</h1>
        <p className="text-2xl text-white">
          Your go-to CRM for managing your business relationships and analytics.
        </p>
        <div className="mt-12">
          <a
            href="/signin"
            className="bg-white px-6 py-3 rounded-md shadow-md text-lg font-bold text-indigo-600"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
