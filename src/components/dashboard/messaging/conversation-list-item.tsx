"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/types/messaging";
import { channelColors } from "@/shared/messaging";
import { Mail, MessageSquare, Users, Phone } from "lucide-react";
import { format } from "date-fns";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversation: Conversation) => void;
}

export const ConversationListItem = ({
  conversation,
  isSelected,
  onSelect,
}: ConversationListItemProps) => {
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return format(messageDate, "h:mm a");
    } else {
      return format(messageDate, "MMM d, h:mm a");
    }
  };

  const renderChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />;
      case "sms":
        return <MessageSquare className="h-3 w-3" />;
      case "group":
        return <Users className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  const lastMessage =
    conversation.messages.length > 0
      ? conversation.messages[conversation.messages.length - 1]
      : null;

  return (
    <div
      className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
        isSelected ? "bg-blue-50" : ""
      }`}
      onClick={() => onSelect(conversation)}
    >
      <div className="flex items-start">
        <div className="relative mr-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={conversation.contact.avatar || "/placeholder.svg"}
              alt={conversation.contact.name}
            />
            <AvatarFallback>
              {conversation.contact.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {conversation.contact.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-sm truncate">
              {conversation.contact.name}
            </h3>
            <span className="text-xs text-gray-500">
              {formatMessageTime(conversation.lastMessageTime)}
            </span>
          </div>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className={`mr-1 ${
                channelColors[
                  conversation.channel as keyof typeof channelColors
                ]
              }`}
            >
              <span className="flex items-center">
                {renderChannelIcon(conversation.channel)}
                <span className="ml-1 text-[10px]">
                  {conversation.channel === "email"
                    ? "Email"
                    : conversation.channel === "sms"
                    ? "SMS"
                    : "Group"}
                </span>
              </span>
            </Badge>
            {conversation.missed && (
              <Badge variant="outline" className="mr-1 bg-red-100 text-red-800">
                <span className="flex items-center">
                  <Phone className="h-3 w-3" />
                  <span className="ml-1 text-[10px]">Missed</span>
                </span>
              </Badge>
            )}
            {conversation.incoming && (
              <Badge
                variant="outline"
                className="mr-1 bg-yellow-100 text-yellow-800"
              >
                <span className="flex items-center">
                  <Phone className="h-3 w-3" />
                  <span className="ml-1 text-[10px]">Incoming</span>
                </span>
              </Badge>
            )}
            <p className="text-xs text-gray-500 truncate">
              {lastMessage
                ? lastMessage.content.substring(0, 30) +
                  (lastMessage.content.length > 30 ? "..." : "")
                : "No messages yet"}
            </p>
          </div>
        </div>
        {conversation.unread > 0 && (
          <Badge className="ml-2 bg-blue-500 text-white">
            {conversation.unread}
          </Badge>
        )}
      </div>
    </div>
  );
};
