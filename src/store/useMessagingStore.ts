import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { 
  Conversation, 
  Message, 
  MessageTemplate, 
  MessageLog,
  Business,
  Staff,
  MessageChannel 
} from '@/types/messaging'
import { createMessage, sortConversations } from '@/utils/messaging'

interface MessagingStore {
  // State
  selectedConversation: Conversation | null
  conversations: Conversation[]
  templates: MessageTemplate[]
  logs: MessageLog[]
  businesses: Business[]
  staff: Staff[]
  searchTerm: string
  activeTab: string
  isTemplateOpen: boolean
  templateVariables: string[]
  templateContent: string
  newMessage: string

  // Actions
  selectConversation: (conversation: Conversation | null) => void
  sendMessage: (content: string, channel: MessageChannel) => void
  updateSearch: (term: string) => void
  setActiveTab: (tab: string) => void
  toggleTemplateDialog: (isOpen: boolean) => void
  addTemplateVariable: (variable: string) => void
  removeTemplateVariable: (variable: string) => void
  updateTemplateContent: (content: string) => void
  setNewMessage: (message: string) => void
  
  // Computed values
  filteredConversations: () => Conversation[]
  hasUnreadMessages: () => boolean
}

export const useMessagingStore = create<MessagingStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      selectedConversation: null,
      conversations: [],
      templates: [],
      logs: [],
      businesses: [],
      staff: [],
      searchTerm: '',
      activeTab: 'all',
      isTemplateOpen: false,
      templateVariables: [],
      templateContent: '',
      newMessage: '',

      // Actions
      selectConversation: (conversation) => 
        set({ selectedConversation: conversation }),

      sendMessage: (content, channel) => {
        const { selectedConversation, conversations } = get()
        if (!selectedConversation) return

        const newMessage = createMessage(content)
        const updatedConversations = conversations.map(conv => 
          conv.id === selectedConversation.id
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessageTime: newMessage.timestamp
              }
            : conv
        )

        set({ 
          conversations: sortConversations(updatedConversations),
          newMessage: ''
        })

        // Here you would typically make an API call to persist the message
        // For now, we're just updating the local state
      },

      updateSearch: (term) => set({ searchTerm: term }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      toggleTemplateDialog: (isOpen) => set({ isTemplateOpen: isOpen }),

      addTemplateVariable: (variable) => {
        const { templateVariables } = get()
        if (!templateVariables.includes(variable)) {
          set({ templateVariables: [...templateVariables, variable] })
        }
      },

      removeTemplateVariable: (variable) => {
        const { templateVariables } = get()
        set({ 
          templateVariables: templateVariables.filter(v => v !== variable)
        })
      },

      updateTemplateContent: (content) => set({ templateContent: content }),

      setNewMessage: (message) => set({ newMessage: message }),

      // Computed values
      filteredConversations: () => {
        const { conversations, searchTerm, activeTab } = get()
        return conversations
          .filter(conv => {
            const matchesSearch = searchTerm 
              ? conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                conv.contact.business.toLowerCase().includes(searchTerm.toLowerCase())
              : true

            const matchesTab = activeTab === 'all' 
              ? true 
              : conv.channel === activeTab

            return matchesSearch && matchesTab
          })
      },

      hasUnreadMessages: () => {
        const { conversations } = get()
        return conversations.some(conv => 
          conv.messages.some(msg => !msg.read && msg.sender === 'them')
        )
      }
    }),
    { name: 'messaging-store' }
  )
)
