export interface Contact {
  id: number
  name: string
  email?: string
  avatar?: string
  business?: string
  online?: boolean
  isGroup?: boolean
  members?: string[]
}

export interface Message {
  id: number
  sender: "you" | "them"
  content: string
  timestamp: Date
  read: boolean
  isAudio?: boolean
  isImage?: boolean
  imageUrl?: string
  duration?: string
}

export interface Conversation {
  id: number
  contact: Contact
  messages: Message[]
  unread: number
  lastMessageTime: Date
  channel: "email" | "sms" | "group"
  pinned: boolean
  missed?: boolean
  incoming?: boolean
}

export interface MessageTemplate {
  id: number
  name: string
  content: string
  variables: string[]
  category: string
}

export interface MessageLog {
  id: number
  recipient: string
  business: string
  channel: string
  subject: string | null
  status: "Delivered" | "Sent" | "Failed" | "Pending"
  sentAt: Date
  deliveredAt: Date | null
  openedAt: Date | null
  error?: string
}

export interface Business {
  id: number
  name: string
  email: string
  phone: string
}

export type TabType = "inbox" | "unread" | "archived"
