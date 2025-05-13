import { Input } from "@/components/ui/input"
import type { MessageTemplate } from "@/types/messaging"

interface TemplatePreviewProps {
  template: MessageTemplate
}

export const TemplatePreview = ({ template }: TemplatePreviewProps) => {
  return (
    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium mb-2">Preview</h3>
      <p className="text-sm">{template.content}</p>
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Variables</h4>
        <div className="grid grid-cols-2 gap-2">
          {template.variables.map((variable) => (
            <div key={variable} className="flex items-center space-x-2">
              <label className="text-sm">{`{{${variable}}}`}</label>
              <Input placeholder={`Enter ${variable}`} className="text-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
