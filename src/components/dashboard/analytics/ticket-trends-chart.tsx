import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TicketTrend } from "@/types/analytics"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TicketTrendsChartProps {
  ticketTrends: TicketTrend[]
}

export function TicketTrendsChart({ ticketTrends }: TicketTrendsChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Support Ticket Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={ticketTrends}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="open" stroke="#F97316" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="closed" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
