import type { Conversation, MessageTemplate, MessageLog, Business } from "@/types/messaging"

// Sample data for conversations
export const conversations: Conversation[] = [
  {
    id: 1,
    contact: {
      id: 101,
      name: "Leslie Alexander",
      email: "leslie@coffeedowntown.com",
      avatar: "/avatar-1.png",
      business: "Coffee House Downtown",
      online: true,
    },
    messages: [
      {
        id: 1001,
        sender: "them",
        content: "Hi there! 👋",
        timestamp: new Date("2024-05-13T13:10:00"),
        read: true,
      },
      {
        id: 1002,
        sender: "them",
        content: "Could you clarify which documents I need to take with me for the trip to Paris?",
        timestamp: new Date("2024-05-13T13:11:00"),
        read: true,
      },
      {
        id: 1003,
        sender: "you",
        content: "Hi Leslie! Please ensure that your passport, driver's license, and vehicle documents are ready.",
        timestamp: new Date("2024-05-13T13:15:00"),
        read: true,
      },
      {
        id: 1004,
        sender: "them",
        content:
          "Thanks, Sarah. I'll get on the visa and travel insurance today. Anything else I should be aware of? And listen to this, please.",
        timestamp: new Date("2024-05-13T13:20:00"),
        read: true,
      },
      {
        id: 1005,
        sender: "them",
        content: "[Audio Message]",
        timestamp: new Date("2024-05-13T13:21:00"),
        read: true,
        isAudio: true,
        duration: "0:45",
      },
      {
        id: 1006,
        sender: "you",
        content: "No, nothing else is needed. Below is the track you will be traveling on:",
        timestamp: new Date("2024-05-13T13:25:00"),
        read: true,
      },
      {
        id: 1007,
        sender: "you",
        content: "[Image: Travel Route]",
        timestamp: new Date("2024-05-13T13:26:00"),
        read: true,
        isImage: true,
        imageUrl:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-e367d9fc123080e5bddcc1d12d686890-v6qmmAZg3TlOpCCY24pTK3hCeomH5h.png",
      },
    ],
    unread: 0,
    lastMessageTime: new Date("2024-05-13T13:26:00"),
    channel: "email",
    pinned: true,
  },
  {
    id: 2,
    contact: {
      id: 102,
      name: "Guy Hawkins",
      email: "guy@burgerpalace.com",
      avatar: "/avatar-2.png",
      business: "Burger Palace",
      online: false,
    },
    messages: [
      {
        id: 2001,
        sender: "them",
        content: "We need to update our menu in the system. Can you help with that?",
        timestamp: new Date("2024-05-13T12:20:00"),
        read: false,
      },
    ],
    unread: 1,
    lastMessageTime: new Date("2024-05-13T12:20:00"),
    channel: "sms",
    pinned: false,
    missed: true,
  },
  {
    id: 3,
    contact: {
      id: 103,
      name: "Kristin Watson",
      email: "kristin@freshbakery.com",
      avatar: "/avatar-3.png",
      business: "Fresh Bakery",
      online: false,
    },
    messages: [
      {
        id: 3001,
        sender: "them",
        content: "Hi there! Could you clarify when the new payment system will be implemented?",
        timestamp: new Date("2024-05-13T11:25:00"),
        read: false,
      },
    ],
    unread: 1,
    lastMessageTime: new Date("2024-05-13T11:25:00"),
    channel: "email",
    pinned: false,
  },
  {
    id: 4,
    contact: {
      id: 104,
      name: "Dianne Russell",
      email: "dianne@gourmetrestaurant.com",
      avatar: "/avatar-4.png",
      business: "Gourmet Restaurant",
      online: false,
    },
    messages: [
      {
        id: 4001,
        sender: "them",
        content: "Will additional documents for customs be required for our imported ingredients?",
        timestamp: new Date("2024-05-13T10:20:00"),
        read: false,
      },
    ],
    unread: 1,
    lastMessageTime: new Date("2024-05-13T10:20:00"),
    channel: "email",
    pinned: false,
  },
  {
    id: 5,
    contact: {
      id: 105,
      name: "Documents",
      isGroup: true,
      members: ["Leslie Alexander", "Guy Hawkins", "Kristin Watson"],
      avatar: "/group-avatar.png",
      business: "Multiple",
      online: false,
    },
    messages: [
      {
        id: 5001,
        sender: "you",
        content: "Have there been any changes to the required documentation for international shipping?",
        timestamp: new Date("2024-05-13T09:35:00"),
        read: true,
      },
    ],
    unread: 0,
    lastMessageTime: new Date("2024-05-13T09:35:00"),
    channel: "group",
    pinned: false,
  },
  {
    id: 6,
    contact: {
      id: 106,
      name: "Ralph Edwards",
      email: "ralph@pizzaexpress.com",
      avatar: "/avatar-5.png",
      business: "Pizza Express",
      online: false,
    },
    messages: [
      {
        id: 6001,
        sender: "them",
        content: "I need to discuss our subscription plan. Can we schedule a call?",
        timestamp: new Date("2024-05-13T08:30:00"),
        read: true,
      },
    ],
    unread: 0,
    lastMessageTime: new Date("2024-05-13T08:30:00"),
    channel: "email",
    pinned: false,
    incoming: true,
  },
]

// Sample data for message templates
export const messageTemplates: MessageTemplate[] = [
  {
    id: 1,
    name: "Welcome Message",
    content: "Hello {{name}}, welcome to {{business}}! We're excited to have you on board.",
    variables: ["name", "business"],
    category: "Onboarding",
  },
  {
    id: 2,
    name: "Payment Reminder",
    content: "Hi {{name}}, this is a friendly reminder that your payment of {{amount}} is due on {{date}}.",
    variables: ["name", "amount", "date"],
    category: "Billing",
  },
  {
    id: 3,
    name: "New Feature Announcement",
    content: "Great news, {{name}}! We've just launched a new feature: {{feature}}. Check it out!",
    variables: ["name", "feature"],
    category: "Updates",
  },
  {
    id: 4,
    name: "Maintenance Notice",
    content:
      "Dear {{name}}, our system will be undergoing maintenance on {{date}} from {{start_time}} to {{end_time}}. We apologize for any inconvenience.",
    variables: ["name", "date", "start_time", "end_time"],
    category: "System",
  },
  {
    id: 5,
    name: "Follow-up",
    content: "Hi {{name}}, I wanted to follow up on our conversation about {{topic}}. Do you have any questions?",
    variables: ["name", "topic"],
    category: "Sales",
  },
]

// Sample data for message logs
export const messageLogs: MessageLog[] = [
  {
    id: 1,
    recipient: "Leslie Alexander",
    business: "Coffee House Downtown",
    channel: "email",
    subject: "Document Requirements",
    status: "Delivered",
    sentAt: new Date("2024-05-13T13:15:00"),
    deliveredAt: new Date("2024-05-13T13:15:30"),
    openedAt: new Date("2024-05-13T13:18:45"),
  },
  {
    id: 2,
    recipient: "All Businesses",
    business: "Multiple",
    channel: "email",
    subject: "System Maintenance Notice",
    status: "Sent",
    sentAt: new Date("2024-05-12T10:00:00"),
    deliveredAt: new Date("2024-05-12T10:01:15"),
    openedAt: null,
  },
  {
    id: 3,
    recipient: "Guy Hawkins",
    business: "Burger Palace",
    channel: "sms",
    subject: null,
    status: "Failed",
    sentAt: new Date("2024-05-11T15:30:00"),
    deliveredAt: null,
    openedAt: null,
    error: "Invalid phone number",
  },
  {
    id: 4,
    recipient: "Kristin Watson",
    business: "Fresh Bakery",
    channel: "email",
    subject: "Payment System Update",
    status: "Delivered",
    sentAt: new Date("2024-05-10T09:45:00"),
    deliveredAt: new Date("2024-05-10T09:46:20"),
    openedAt: new Date("2024-05-10T11:22:10"),
  },
  {
    id: 5,
    recipient: "All Premium Subscribers",
    business: "Multiple",
    channel: "email",
    subject: "New Feature Release",
    status: "Delivered",
    sentAt: new Date("2024-05-09T14:00:00"),
    deliveredAt: new Date("2024-05-09T14:02:30"),
    openedAt: null,
  },
]

// Sample data for businesses
export const businesses: Business[] = [
  { id: 1, name: "Coffee House Downtown", email: "info@coffeedowntown.com", phone: "+1 (555) 123-4567" },
  { id: 2, name: "Burger Palace", email: "contact@burgerpalace.com", phone: "+1 (555) 234-5678" },
  { id: 3, name: "Fresh Bakery", email: "hello@freshbakery.com", phone: "+1 (555) 345-6789" },
  { id: 4, name: "Gourmet Restaurant", email: "info@gourmetrestaurant.com", phone: "+1 (555) 456-7890" },
  { id: 5, name: "Pizza Express", email: "orders@pizzaexpress.com", phone: "+1 (555) 567-8901" },
  { id: 6, name: "Taco Truck", email: "hello@tacotruck.com", phone: "+1 (555) 678-9012" },
  { id: 7, name: "Sushi Bar", email: "info@sushibar.com", phone: "+1 (555) 789-0123" },
  { id: 8, name: "Ice Cream Shop", email: "contact@icecreamshop.com", phone: "+1 (555) 890-1234" },
]

// Status badge colors
export const statusColors = {
  Delivered: "bg-green-100 text-green-800",
  Sent: "bg-blue-100 text-blue-800",
  Failed: "bg-red-100 text-red-800",
  Pending: "bg-yellow-100 text-yellow-800",
}

// Channel badge colors
export const channelColors = {
  email: "bg-blue-100 text-blue-800",
  sms: "bg-purple-100 text-purple-800",
  group: "bg-green-100 text-green-800",
}
