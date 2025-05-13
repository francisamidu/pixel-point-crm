"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Bell, Star, Edit, Pin } from "lucide-react";
import type { Conversation } from "@/types/messaging";
import { ConversationListItem } from "./conversation-list-item";
import type { TabType } from "@/types/messaging";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewMessage: () => void;
  onNewAnnouncement: () => void;
}

export const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  onNewMessage,
  onNewAnnouncement,
}: ConversationListProps) => {
  const [activeTabs, setActiveTabs] = useState<TabType[]>([
    { type: "inbox", active: true },
    { type: "unread", active: false },
    { type: "archived", active: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] =
    useState<Conversation[]>(conversations);

  // Filter conversations based on search term and active tab
  useEffect(() => {
    let filtered = [...conversations];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (conv) =>
          conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (conv.contact.business &&
            conv.contact.business
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (conv.messages.length > 0 &&
            conv.messages[conv.messages.length - 1].content
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Apply tab filter
    if (activeTabs.find((tab) => tab.type === "unread")?.active) {
      filtered = filtered.filter((conv) => conv.unread > 0);
    } else if (activeTabs.find((tab) => tab.type === "archived")?.active) {
      // In a real app, you would have an 'archived' property to filter by
      filtered = [];
    }

    setFilteredConversations(filtered);
  }, [searchTerm, activeTabs, conversations]);

  const pinnedConversations = filteredConversations.filter(
    (conv) => conv.pinned
  );
  const unpinnedConversations = filteredConversations.filter(
    (conv) => !conv.pinned
  );

  return (
    <div className="w-80 border-r bg-white z-30 border-gray-200 flex flex-col fixed top-12 bottom-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {activeTabs.map((tab, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`flex-1 rounded-none capitalize ${
              tab.active
                ? "border-b-2 !border-blue-500 !text-blue-900 bg-blue-50"
                : ""
            }`}
            onClick={() =>
              setActiveTabs((prev) =>
                prev.map((t) =>
                  t.type === tab.type
                    ? { ...t, active: true }
                    : { ...t, active: false }
                )
              )
            }
          >
            {tab.type}
          </Button>
        ))}
      </div>

      {pinnedConversations.length > 0 && (
        <>
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pinned Messages</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Pin className="h-3 w-3 mr-1" />
                <span className="text-xs">Manage</span>
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto">
            {pinnedConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onSelect={onSelectConversation}
              />
            ))}
          </div>
        </>
      )}

      {unpinnedConversations.length > 0 && (
        <>
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <span className="text-sm font-medium">All Messages</span>
          </div>

          <div className="overflow-y-auto flex-1">
            {unpinnedConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversation?.id === conversation.id}
                onSelect={onSelectConversation}
              />
            ))}
          </div>
        </>
      )}

      {filteredConversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-gray-500 mb-4">No messages found</p>
            <Button onClick={onNewMessage}>
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>
      )}

      <div className="p-3 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <Button className="flex-1" onClick={onNewMessage}>
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
          <Button variant="outline" onClick={onNewAnnouncement}>
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
