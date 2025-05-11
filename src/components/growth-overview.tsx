"use client";

import { useState } from "react";
import { Calendar, Filter, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  { name: "January", impressions: 4000, followers: 2400 },
  { name: "February", impressions: 5000, followers: 2600 },
  { name: "March", impressions: 6000, followers: 2900 },
  { name: "April", impressions: 5500, followers: 2800 },
  { name: "May", impressions: 6500, followers: 3000 },
  { name: "June", impressions: 7000, followers: 3200 },
  { name: "July", impressions: 8000, followers: 3500 },
  { name: "August", impressions: 9000, followers: 3800 },
  { name: "September", impressions: 9500, followers: 4000 },
  { name: "October", impressions: 10000, followers: 4200 },
  { name: "November", impressions: 11000, followers: 4500 },
  { name: "December", impressions: 12000, followers: 4800 },
];

export default function GrowthOverview() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">
            Growth Overview
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Analyze and track your growth trends easily
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">1 Jan - 31 Dec 2024</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <Filter className="h-3.5 w-3.5" />
          </Button>

          <Button variant="outline" size="icon" className="h-8 w-8">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <ReferenceLine x="July" stroke="#666" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                name="Impressions"
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Followers"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Impressions
              </span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                240k total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Followers
              </span>
              <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                123k total
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
