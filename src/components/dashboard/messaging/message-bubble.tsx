import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message } from "@/types/messaging"
import { Button } from "@/components/ui/button"

interface MessageBubbleProps {
  message: Message
  contactName: string
  contactAvatar?: string
  userAvatar?: string
}

export const MessageBubble = ({ message, contactName, contactAvatar, userAvatar }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}>
      {message.sender !== "you" && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src={contactAvatar || "/placeholder.svg"} alt={contactName} />
          <AvatarFallback>
            {contactName
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[70%] ${
          message.sender === "you"
            ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
            : "bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
        }`}
      >
        {message.isAudio ? (
          <div className="p-3 flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-gray-200 mr-2">
              <Play className="h-4 w-4 text-gray-700" />
            </Button>
            <div className="flex-1">
              <div className="h-1 bg-gray-300 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full w-1/3"></div>
              </div>
            </div>
            <span className="ml-2 text-xs">{message.duration}</span>
          </div>
        ) : message.isImage ? (
          <div>
            <img
              src={
                message.imageUrl ||
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-e367d9fc123080e5bddcc1d12d686890-v6qmmAZg3TlOpCCY24pTK3hCeomH5h.png"
              }
              alt="Message attachment"
              className="rounded-lg max-w-full"
              style={{ maxHeight: "200px" }}
            />
          </div>
        ) : (
          <div className="p-3">
            <p>{message.content}</p>
          </div>
        )}
      </div>
      {message.sender === "you" && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarImage src={userAvatar || "/avatar-you.png"} alt="You" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

const Play = ({ className }: { className?: string }) => {
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
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
