export interface Business {
  id: string
  name: string
  email: string
  plan: PlanType
  status: BusinessStatus
  onboardedDate: Date
  lastActive: Date
}

export type BusinessStatus = "active" | "inactive" | "pending"
export type PlanType = "free" | "basic" | "premium" | "enterprise"

export interface Plan {
  type: PlanType
  count: number
  color: string
}

export interface SupportTicket {
  id: string
  businessId: string
  status: TicketStatus
  priority: TicketPriority
  category: string
  createdAt: Date
  resolvedAt?: Date
}

export type TicketStatus = "open" | "closed" | "pending"
export type TicketPriority = "low" | "medium" | "high" | "urgent"

export interface TicketTrend {
  date: string
  open: number
  closed: number
}

export interface POSData {
  businessId: string
  businessName: string
  totalSales: number
  averageOrderValue: number
  syncFrequency: number // times per day
  lastSyncDate: Date
}

export interface BusinessSalesData {
  businessId: string
  businessName: string
  sales: number
  transactions: number
}

export interface TimeFilter {
  label: string
  value: string
}

export interface AnalyticsState {
  timeFilter: string
  businesses: Business[]
  plans: Plan[]
  tickets: SupportTicket[]
  ticketTrends: TicketTrend[]
  posData: POSData[]
}
