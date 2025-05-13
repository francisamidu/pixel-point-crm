import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/types/messaging";
import { Phone, Video, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConversationHeaderProps {
  contact: Contact;
}

export const ConversationHeader = ({ contact }: ConversationHeaderProps) => {
  return (
    <div className="p-2 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage
            src={contact.avatar || "/placeholder.svg"}
            alt={contact.name}
          />
          <AvatarFallback>
            {contact.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold">{contact.name}</h2>
            {contact.online && (
              <Badge
                variant="outline"
                className="ml-2 bg-green-100 text-green-800"
              >
                Online
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{contact.business}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View contact info</DropdownMenuItem>
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Mute notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Block contact</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
