"use client"

import { useRef, useEffect } from "react"
import type { Conversation } from "@/types/messaging"
import { ConversationHeader } from "./conversation-header"
import { MessageBubble } from "./message-bubble"
import { MessageInput } from "./message-input"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ConversationViewProps {
  conversation: Conversation | null
  onSendMessage: (message: string) => void
  onNewMessage: () => void
  onOpenTemplates: () => void
}

export const ConversationView = ({
  conversation,
  onSendMessage,
  onNewMessage,
  onOpenTemplates,
}: ConversationViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [conversation])

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
          <p className="text-gray-500 mt-1">Choose a conversation from the list or start a new one</p>
          <Button className="mt-4" onClick={onNewMessage}>
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ConversationHeader contact={conversation.contact} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            contactName={conversation.contact.name}
            contactAvatar={conversation.contact.avatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSendMessage={onSendMessage} onOpenTemplates={onOpenTemplates} />
    </>
  )
}

const Plus = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
