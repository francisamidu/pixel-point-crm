export type UserRole = "superadmin" | "support" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: "active" | "inactive"
  avatar?: string
  department?: string
  createdAt: Date
  lastActive?: Date
}

export interface RolePermission {
  id: string
  module: string
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
}

export interface AuditLogEntry {
  id: string
  userId: string
  userName: string
  userRole: UserRole
  action: string
  entityType: "user" | "business" | "ticket" | "message" | "system"
  entityId: string
  details: string
  timestamp: Date
}

export interface RoleDefinition {
  name: UserRole
  description: string
  color: string
  permissions: RolePermission[]
}

export interface AdminState {
  users: User[]
  roles: RoleDefinition[]
  auditLogs: AuditLogEntry[]
  selectedUser: User | null
  isAddUserModalOpen: boolean
  isEditUserModalOpen: boolean
  currentPage: number
  itemsPerPage: number
  searchQuery: string
  statusFilter: string
  roleFilter: string
  currentTab: "users" | "roles" | "audit"
}
