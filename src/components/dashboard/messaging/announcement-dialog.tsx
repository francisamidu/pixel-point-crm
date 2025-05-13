"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar, Send } from "lucide-react"

interface AnnouncementDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onOpenTemplates: () => void
}

export const AnnouncementDialog = ({ isOpen, onOpenChange, onOpenTemplates }: AnnouncementDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Announcement</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipients</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Businesses</SelectItem>
                <SelectItem value="active">Active Businesses</SelectItem>
                <SelectItem value="premium">Premium Subscribers</SelectItem>
                <SelectItem value="free">Free Tier Users</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Channel</label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="announcement-email" defaultChecked />
                <label htmlFor="announcement-email" className="text-sm">
                  Email
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="announcement-sms" />
                <label htmlFor="announcement-sms" className="text-sm">
                  SMS
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="announcement-notification" />
                <label htmlFor="announcement-notification" className="text-sm">
                  In-app Notification
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Announcement Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feature">New Feature</SelectItem>
                <SelectItem value="maintenance">System Maintenance</SelectItem>
                <SelectItem value="update">Product Update</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="Enter announcement subject" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Message</label>
              <Button variant="outline" size="sm" className="text-xs" onClick={onOpenTemplates}>
                <FileTextIcon className="h-3 w-3 mr-1" />
                Use Template
              </Button>
            </div>
            <Textarea placeholder="Type your announcement here..." className="min-h-[150px]" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Preview</label>
              <Button variant="outline" size="sm" className="text-xs">
                <EyeIcon className="h-3 w-3 mr-1" />
                Preview
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-500">Preview will appear here</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const FileTextIcon = ({ className }: { className?: string }) => {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

const EyeIcon = ({ className }: { className?: string }) => {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
