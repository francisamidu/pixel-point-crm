"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TimeFilter } from "@/types/analytics"

interface TimeFilterProps {
  filters: TimeFilter[]
  selectedFilter: string
  onFilterChange: (value: string) => void
}

export function TimeFilterSelect({ filters, selectedFilter, onFilterChange }: TimeFilterProps) {
  return (
    <Select value={selectedFilter} onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select time period" />
      </SelectTrigger>
      <SelectContent>
        {filters.map((filter) => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
