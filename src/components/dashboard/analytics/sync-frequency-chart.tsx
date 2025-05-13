import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { POSData } from "@/types/analytics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SyncFrequencyChartProps {
  posData: POSData[]
}

export function SyncFrequencyChart({ posData }: SyncFrequencyChartProps) {
  // Format data for the chart
  const chartData = posData.map((business) => ({
    name: business.businessName,
    syncFrequency: business.syncFrequency,
  }))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>POS Sync Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip formatter={(value: number) => [`${value} times per day`, "Sync Frequency"]} />
              <Bar dataKey="syncFrequency" fill="#8884d8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
