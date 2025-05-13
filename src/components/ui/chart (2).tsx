"use client"

import type { ChartConfig, ChartTooltipProps } from "@/types/chart"
import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ChartTooltip({
  active,
  payload,
  label,
  className,
  formatter,
  labelFormatter,
  ...props
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
      <div className="grid gap-2">
        {labelFormatter ? (
          <div className="text-xs text-muted-foreground">{labelFormatter(label, payload)}</div>
        ) : (
          <div className="text-xs text-muted-foreground">{label}</div>
        )}
        <div className="grid gap-1">
          {payload.map((data, i) => (
            <div key={i} className="flex items-center gap-1 text-sm">
              <div className="h-1 w-1 rounded-full" style={{ background: data.color }} />
              <span className="font-medium">
                {data.name}: {formatter ? formatter(data.value as number, data.name, i, payload) : data.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BarChart({
  data,
  className,
  chartConfig,
  ...props
}: {
  data: any[]
  className?: string
  chartConfig?: ChartConfig
}) {
  return (
    <div className={cn("h-80 w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} className="stroke-muted" />
          <XAxis
            dataKey={chartConfig?.xAxisKey ?? "name"}
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (chartConfig?.yAxisFormatter ? chartConfig.yAxisFormatter(value) : value)}
          />
          <Tooltip
            content={
              <ChartTooltip
                formatter={chartConfig?.tooltipFormatter}
                labelFormatter={chartConfig?.tooltipLabelFormatter}
              />
            }
          />
          {chartConfig?.showLegend && <Legend />}
          {chartConfig?.showGridLines && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
          {chartConfig?.series?.map((serie, i) => (
            <Bar
              key={i}
              type="monotone"
              dataKey={serie.dataKey}
              fill={serie.color}
              className={cn("fill-primary", serie.className)}
              radius={[4, 4, 0, 0]}
              {...serie.props}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LineChart({
  data,
  className,
  chartConfig,
  ...props
}: {
  data: any[]
  className?: string
  chartConfig?: ChartConfig
}) {
  return (
    <div className={cn("h-80 w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} className="stroke-muted" />
          <XAxis
            dataKey={chartConfig?.xAxisKey ?? "name"}
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            className="text-sm text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => (chartConfig?.yAxisFormatter ? chartConfig.yAxisFormatter(value) : value)}
          />
          <Tooltip
            content={
              <ChartTooltip
                formatter={chartConfig?.tooltipFormatter}
                labelFormatter={chartConfig?.tooltipLabelFormatter}
              />
            }
          />
          {chartConfig?.showLegend && <Legend />}
          {chartConfig?.showGridLines && <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />}
          {chartConfig?.series?.map((serie, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={serie.dataKey}
              stroke={serie.color}
              className={cn("stroke-primary", serie.className)}
              activeDot={{ r: 8 }}
              strokeWidth={2}
              dot={false}
              {...serie.props}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PieChart({
  data,
  className,
  chartConfig,
  ...props
}: {
  data: any[]
  className?: string
  chartConfig?: ChartConfig
}) {
  return (
    <div className={cn("h-80 w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={chartConfig?.labelFormatter}
            outerRadius={80}
            fill="#8884d8"
            dataKey={chartConfig?.dataKey ?? "value"}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig?.colors?.[index % (chartConfig?.colors?.length ?? 1)] ?? "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip
            content={
              <ChartTooltip
                formatter={chartConfig?.tooltipFormatter}
                labelFormatter={chartConfig?.tooltipLabelFormatter}
              />
            }
          />
          {chartConfig?.showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RadialBarChart({
  data,
  className,
  chartConfig,
  ...props
}: {
  data: any[]
  className?: string
  chartConfig?: ChartConfig
}) {
  return (
    <div className={cn("h-80 w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            label={
              chartConfig?.labelFormatter
                ? { position: "insideStart", fill: "#fff", formatter: chartConfig.labelFormatter }
                : undefined
            }
            background
            dataKey={chartConfig?.dataKey ?? "value"}
          />
          <Tooltip
            content={
              <ChartTooltip
                formatter={chartConfig?.tooltipFormatter}
                labelFormatter={chartConfig?.tooltipLabelFormatter}
              />
            }
          />
          {chartConfig?.showLegend && <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />}
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
