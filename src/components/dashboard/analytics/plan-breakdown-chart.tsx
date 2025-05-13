import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Plan } from "@/types/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface PlanBreakdownChartProps {
  plans: Plan[]
}

export function PlanBreakdownChart({ plans }: PlanBreakdownChartProps) {
  // Format plan names for display
  const formattedData = plans.map((plan) => ({
    ...plan,
    name: plan.type.charAt(0).toUpperCase() + plan.type.slice(1),
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Plan Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${value} businesses`, "Count"]}
                labelFormatter={(value) => `${value} Plan`}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
