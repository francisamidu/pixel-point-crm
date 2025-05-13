import type { User, AuditLogEntry, RoleDefinition, UserRole } from "@/types/admin"

// Sample users
export const users: User[] = [
  {
    id: "u1",
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    role: "superadmin",
    status: "active",
    avatar: "/intertwined-letters.png",
    department: "Operations",
    createdAt: new Date("2023-01-15"),
    lastActive: new Date("2024-05-12"),
  },
  {
    id: "u2",
    name: "Marvin McKinney",
    email: "marvin.mckinney@example.com",
    role: "support",
    status: "active",
    avatar: "/abstract-mm.png",
    department: "Customer Support",
    createdAt: new Date("2023-02-20"),
    lastActive: new Date("2024-05-10"),
  },
  {
    id: "u3",
    name: "Jerome Bell",
    email: "jerome.bell@example.com",
    role: "viewer",
    status: "active",
    avatar: "/stylized-jb-monogram.png",
    department: "Finance",
    createdAt: new Date("2023-03-10"),
    lastActive: new Date("2024-05-05"),
  },
  {
    id: "u4",
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    role: "support",
    status: "active",
    avatar: "/stylized-cf-logo.png",
    department: "Customer Support",
    createdAt: new Date("2023-04-05"),
    lastActive: new Date("2024-05-13"),
  },
  {
    id: "u5",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    role: "viewer",
    status: "inactive",
    avatar: "/abstract-dl.png",
    department: "Marketing",
    createdAt: new Date("2023-04-20"),
    lastActive: new Date("2024-03-15"),
  },
  {
    id: "u6",
    name: "Eleanor Pena",
    email: "eleanor.pena@example.com",
    role: "support",
    status: "active",
    avatar: "/abstract-geometric-ep.png",
    department: "Customer Support",
    createdAt: new Date("2023-05-15"),
    lastActive: new Date("2024-05-10"),
  },
  {
    id: "u7",
    name: "Robert Fox",
    email: "robert.fox@example.com",
    role: "superadmin",
    status: "active",
    avatar: "/radio-frequency-spectrum.png",
    department: "Operations",
    createdAt: new Date("2023-01-10"),
    lastActive: new Date("2024-05-12"),
  },
  {
    id: "u8",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    role: "viewer",
    status: "inactive",
    avatar: "/stylized-gh.png",
    department: "Analytics",
    createdAt: new Date("2023-06-10"),
    lastActive: new Date("2024-02-28"),
  },
]

// Role definitions with permissions
export const roles: RoleDefinition[] = [
  {
    name: "superadmin",
    description: "Full access to all CRM features and admin controls",
    color: "#8B5CF6",
    permissions: [
      { id: "p1", module: "admin", create: true, read: true, update: true, delete: true },
      { id: "p2", module: "businesses", create: true, read: true, update: true, delete: true },
      { id: "p3", module: "tickets", create: true, read: true, update: true, delete: true },
      { id: "p4", module: "messaging", create: true, read: true, update: true, delete: true },
      { id: "p5", module: "analytics", create: true, read: true, update: true, delete: true },
    ],
  },
  {
    name: "support",
    description: "Access to support features and limited admin functions",
    color: "#60A5FA",
    permissions: [
      { id: "p6", module: "admin", create: false, read: true, update: false, delete: false },
      { id: "p7", module: "businesses", create: false, read: true, update: true, delete: false },
      { id: "p8", module: "tickets", create: true, read: true, update: true, delete: false },
      { id: "p9", module: "messaging", create: true, read: true, update: true, delete: false },
      { id: "p10", module: "analytics", create: false, read: true, update: false, delete: false },
    ],
  },
  {
    name: "viewer",
    description: "Read-only access to CRM data",
    color: "#94A3B8",
    permissions: [
      { id: "p11", module: "admin", create: false, read: true, update: false, delete: false },
      { id: "p12", module: "businesses", create: false, read: true, update: false, delete: false },
      { id: "p13", module: "tickets", create: false, read: true, update: false, delete: false },
      { id: "p14", module: "messaging", create: false, read: true, update: false, delete: false },
      { id: "p15", module: "analytics", create: false, read: true, update: false, delete: false },
    ],
  },
]

// Sample audit logs
export const auditLogs: AuditLogEntry[] = [
  {
    id: "a1",
    userId: "u1",
    userName: "Jenny Wilson",
    userRole: "superadmin",
    action: "created",
    entityType: "user",
    entityId: "u8",
    details: "Created new user account for Guy Hawkins",
    timestamp: new Date("2024-05-10T10:15:30"),
  },
  {
    id: "a2",
    userId: "u4",
    userName: "Cody Fisher",
    userRole: "support",
    action: "updated",
    entityType: "ticket",
    entityId: "t45",
    details: "Updated status from 'open' to 'closed' for ticket #45",
    timestamp: new Date("2024-05-10T11:20:15"),
  },
  {
    id: "a3",
    userId: "u2",
    userName: "Marvin McKinney",
    userRole: "support",
    action: "updated",
    entityType: "business",
    entityId: "b12",
    details: "Updated contact information for 'Coffee House Downtown'",
    timestamp: new Date("2024-05-09T14:35:22"),
  },
  {
    id: "a4",
    userId: "u7",
    userName: "Robert Fox",
    userRole: "superadmin",
    action: "deleted",
    entityType: "user",
    entityId: "u9",
    details: "Deleted user account for Sarah Johnson",
    timestamp: new Date("2024-05-08T09:45:11"),
  },
  {
    id: "a5",
    userId: "u1",
    userName: "Jenny Wilson",
    userRole: "superadmin",
    action: "updated",
    entityType: "user",
    entityId: "u5",
    details: "Changed role from 'support' to 'viewer' for Devon Lane",
    timestamp: new Date("2024-05-08T16:12:45"),
  },
  {
    id: "a6",
    userId: "u2",
    userName: "Marvin McKinney",
    userRole: "support",
    action: "created",
    entityType: "ticket",
    entityId: "t48",
    details: "Created new support ticket for 'Burger Palace'",
    timestamp: new Date("2024-05-07T10:30:00"),
  },
  {
    id: "a7",
    userId: "u1",
    userName: "Jenny Wilson",
    userRole: "superadmin",
    action: "updated",
    entityType: "system",
    entityId: "sys1",
    details: "Updated system settings: enabled two-factor authentication",
    timestamp: new Date("2024-05-06T11:22:33"),
  },
  {
    id: "a8",
    userId: "u4",
    userName: "Cody Fisher",
    userRole: "support",
    action: "sent",
    entityType: "message",
    entityId: "m123",
    details: "Sent mass announcement to 25 businesses",
    timestamp: new Date("2024-05-05T15:45:12"),
  },
  {
    id: "a9",
    userId: "u7",
    userName: "Robert Fox",
    userRole: "superadmin",
    action: "created",
    entityType: "user",
    entityId: "u6",
    details: "Created new user account for Eleanor Pena",
    timestamp: new Date("2024-05-05T09:15:30"),
  },
  {
    id: "a10",
    userId: "u2",
    userName: "Marvin McKinney",
    userRole: "support",
    action: "updated",
    entityType: "business",
    entityId: "b7",
    details: "Updated subscription plan from 'basic' to 'premium' for 'Sushi Bar'",
    timestamp: new Date("2024-05-04T14:10:25"),
  },
]

export function getRoleBadgeVariant(role: UserRole): "default" | "outline" | "secondary" | "destructive" {
  switch (role) {
    case "superadmin":
      return "destructive"
    case "support":
      return "secondary"
    case "viewer":
      return "outline"
    default:
      return "default"
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case "superadmin":
      return "#8B5CF6" // Purple
    case "support":
      return "#60A5FA" // Blue
    case "viewer":
      return "#94A3B8" // Gray
    default:
      return "#94A3B8"
  }
}
