"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { MessageTemplate } from "@/types/messaging"
import { TemplateList } from "./template-dialog/template-list"
import { TemplatePreview } from "./template-dialog/template-preview"
import { TemplateManager } from "./template-dialog/template-manager"
import { TemplateCreator } from "./template-dialog/template-creator"

interface TemplateDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  templates: MessageTemplate[]
}

export const TemplateDialog = ({ isOpen, onOpenChange, templates }: TemplateDialogProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null)
  const [activeTab, setActiveTab] = useState("use")

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Message Templates</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="use" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="use">Use Template</TabsTrigger>
            <TabsTrigger value="manage">Manage Templates</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
          </TabsList>

          <TabsContent value="use">
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search templates..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="updates">Updates</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TemplateList
                templates={templates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />

              {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button disabled={!selectedTemplate}>Use Template</Button>
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <TemplateManager templates={templates} />
          </TabsContent>

          <TabsContent value="create">
            <TemplateCreator />
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button>Save Template</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
