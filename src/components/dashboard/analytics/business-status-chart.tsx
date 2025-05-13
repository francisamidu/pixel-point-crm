import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Business } from "@/types/analytics"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface BusinessStatusChartProps {
  businesses: Business[]
}

export function BusinessStatusChart({ businesses }: BusinessStatusChartProps) {
  // Count businesses by status
  const statusCounts = businesses.reduce(
    (acc, business) => {
      acc[business.status] = (acc[business.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = [
    { name: "Active", value: statusCounts.active || 0, color: "#10B981" },
    { name: "Inactive", value: statusCounts.inactive || 0, color: "#F87171" },
    { name: "Pending", value: statusCounts.pending || 0, color: "#FBBF24" },
  ]

  const total = businesses.length

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Active vs Inactive Businesses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, "Businesses"]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
