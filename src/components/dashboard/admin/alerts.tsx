"use client"

import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface SuccessAlertProps {
  title?: string
  message: string
  className?: string
  onDismiss?: () => void
}

export function SuccessAlert({ title = "Success", message, className, onDismiss }: SuccessAlertProps) {
  return (
    <Alert className={cn("border-green-500 bg-green-50", className)}>
      <div className="flex justify-between items-start">
        <div className="flex">
          <CheckCircle2 className="h-4 w-4 text-green-600 mt-1 mr-2" />
          <div>
            <AlertTitle className="text-green-800">{title}</AlertTitle>
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-green-600 hover:text-green-800">
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  )
}

interface ErrorAlertProps {
  title?: string
  message: string
  className?: string
  onDismiss?: () => void
}

export function ErrorAlert({ title = "Error", message, className, onDismiss }: ErrorAlertProps) {
  return (
    <Alert className={cn("border-red-500 bg-red-50", className)}>
      <div className="flex justify-between items-start">
        <div className="flex">
          <AlertCircle className="h-4 w-4 text-red-600 mt-1 mr-2" />
          <div>
            <AlertTitle className="text-red-800">{title}</AlertTitle>
            <AlertDescription className="text-red-700">{message}</AlertDescription>
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-red-600 hover:text-red-800">
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </Alert>
  )
}
