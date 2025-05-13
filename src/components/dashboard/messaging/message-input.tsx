"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Smile, Paperclip, Mic, Send, FileText, Calendar, ImageIcon } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onOpenTemplates: () => void
}

export const MessageInput = ({ onSendMessage, onOpenTemplates }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    onSendMessage(newMessage)
    setNewMessage("")
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Smile className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <div className="flex-1 mx-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border-gray-300"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Mic className="h-5 w-5 text-gray-500" />
        </Button>
        <Button onClick={handleSendMessage} className="ml-2">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
      <div className="mt-2 flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-7" onClick={onOpenTemplates}>
            <FileText className="h-3 w-3 mr-1" />
            Templates
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7">
            <Calendar className="h-3 w-3 mr-1" />
            Schedule
          </Button>
        </div>
        <div>
          <Button variant="outline" size="sm" className="text-xs h-7">
            <ImageIcon className="h-3 w-3 mr-1" />
            Add Media
          </Button>
        </div>
      </div>
    </div>
  )
}
