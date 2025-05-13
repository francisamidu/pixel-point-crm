"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { X } from "lucide-react"

export const TemplateCreator = () => {
  const [templateName, setTemplateName] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [templateContent, setTemplateContent] = useState("")
  const [templateVariables, setTemplateVariables] = useState<string[]>([])
  const [newVariable, setNewVariable] = useState("")

  const handleAddVariable = () => {
    if (newVariable.trim() !== "") {
      setTemplateVariables([...templateVariables, newVariable.trim()])
      setNewVariable("")
    }
  }

  const handleRemoveVariable = (variableToRemove: string) => {
    setTemplateVariables(templateVariables.filter((variable) => variable !== variableToRemove))
  }

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Template Name</label>
        <Input
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={templateCategory} onValueChange={setTemplateCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="updates">Updates</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Template Content</label>
        <Textarea
          placeholder="Type your template content here..."
          className="min-h-[150px]"
          value={templateContent}
          onChange={(e) => setTemplateContent(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Use {{ variable_name }} syntax to add variables. Example: Hello {{ name }}!
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Variables</label>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center mb-2">
            <Input
              placeholder="Add variable name"
              className="mr-2"
              value={newVariable}
              onChange={(e) => setNewVariable(e.target.value)}
            />
            <Button variant="outline" size="sm" onClick={handleAddVariable}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {templateVariables.map((variable) => (
              <Badge key={variable} variant="outline" className="bg-blue-50 flex items-center">
                {variable}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => handleRemoveVariable(variable)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
