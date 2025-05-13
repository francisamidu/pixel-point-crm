"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MessageTemplate } from "@/types/messaging"

interface TemplateListProps {
  templates: MessageTemplate[]
  selectedTemplate: MessageTemplate | null
  onSelectTemplate: (template: MessageTemplate) => void
}

export const TemplateList = ({ templates, selectedTemplate, onSelectTemplate }: TemplateListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`cursor-pointer hover:border-blue-500 transition-colors ${
            selectedTemplate?.id === template.id ? "border-blue-500 ring-1 ring-blue-500" : ""
          }`}
          onClick={() => onSelectTemplate(template)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{template.name}</h3>
              <Badge variant="outline">{template.category}</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{template.content}</p>
            <div className="flex flex-wrap gap-1">
              {template.variables.map((variable) => (
                <Badge key={variable} variant="outline" className="bg-blue-50">
                  {`{{${variable}}}`}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
