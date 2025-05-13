"use client";

import { useState } from "react";
import { ConversationList } from "@/components/dashboard/messaging/conversation-list";
import { ConversationView } from "@/components/dashboard/messaging/conversation-view";
import { ComposeDialog } from "@/components/dashboard/messaging/compose-dialog";
import { AnnouncementDialog } from "@/components/dashboard/messaging/announcement-dialog";
import { TemplateDialog } from "@/components/dashboard/messaging/template-dialog";
import type { Conversation } from "@/types/messaging";
import {
  conversations,
  businesses,
  messageTemplates,
} from "@/shared/messaging";

const Messaging = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(conversations[0]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [allConversations, setAllConversations] =
    useState<Conversation[]>(conversations);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);

    // Mark messages as read when selecting a conversation
    if (conversation.unread > 0) {
      const updatedConversations = allConversations.map((conv) => {
        if (conv.id === conversation.id) {
          return {
            ...conv,
            unread: 0,
            messages: conv.messages.map((msg) => ({ ...msg, read: true })),
          };
        }
        return conv;
      });
      setAllConversations(updatedConversations);
    }
  };

  const handleSendMessage = (message: string) => {
    if (!selectedConversation) return;

    // In a real app, this would send the message to an API
    console.log("Sending message:", message);

    // Add the message to the conversation
    const newMessage = {
      id: Date.now(),
      sender: "you" as const,
      content: message,
      timestamp: new Date(),
      read: true,
    };

    const updatedConversations = allConversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessageTime: new Date(),
        };
      }
      return conv;
    });

    setAllConversations(updatedConversations);
    setSelectedConversation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessageTime: new Date(),
      };
    });
  };

  // Handle edge cases like network errors or empty states
  const handleError = (error: Error) => {
    console.error("An error occurred:", error);
    // In a real app, you would show a toast notification or error message
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="flex h-screen relative bg-white">
        <ConversationList
          conversations={allConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          onNewMessage={() => setIsComposeOpen(true)}
          onNewAnnouncement={() => setIsAnnouncementOpen(true)}
        />

        <div className="flex-1 flex flex-col md:ml-80">
          <ConversationView
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
            onNewMessage={() => setIsComposeOpen(true)}
            onOpenTemplates={() => setIsTemplateOpen(true)}
          />
        </div>

        <ComposeDialog
          isOpen={isComposeOpen}
          onOpenChange={setIsComposeOpen}
          businesses={businesses}
          onOpenTemplates={() => {
            setIsComposeOpen(false);
            setIsTemplateOpen(true);
          }}
        />

        <AnnouncementDialog
          isOpen={isAnnouncementOpen}
          onOpenChange={setIsAnnouncementOpen}
          onOpenTemplates={() => {
            setIsAnnouncementOpen(false);
            setIsTemplateOpen(true);
          }}
        />

        <TemplateDialog
          isOpen={isTemplateOpen}
          onOpenChange={setIsTemplateOpen}
          templates={messageTemplates}
        />
      </div>
    </section>
  );
};

export default Messaging;
