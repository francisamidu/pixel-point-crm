import type React from "react"
import type { TooltipProps } from "recharts"

export interface ChartTooltipProps extends Omit<TooltipProps<any, any>, "formatter" | "labelFormatter"> {
  formatter?: (value: number, name: string, index: number, payload: any[]) => React.ReactNode
  labelFormatter?: (label: string, payload: any[]) => React.ReactNode
}

export interface ChartConfig {
  xAxisKey?: string
  yAxisKey?: string
  dataKey?: string
  colors?: string[]
  showLegend?: boolean
  showGridLines?: boolean
  yAxisFormatter?: (value: number) => string
  tooltipFormatter?: (value: number, name: string, index: number, payload: any[]) => React.ReactNode
  tooltipLabelFormatter?: (label: string, payload: any[]) => React.ReactNode
  labelFormatter?: (entry: any, index: number, data: any[]) => React.ReactNode
  series?: {
    dataKey: string
    name?: string
    color?: string
    className?: string
    props?: any
  }[]
}
