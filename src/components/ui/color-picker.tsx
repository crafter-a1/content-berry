
import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  presetColors?: string[]
  className?: string
}

export function ColorPicker({
  value,
  onChange,
  presetColors = [
    "#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#eab308",
    "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6",
    "#a855f7", "#d946ef", "#ec4899", "#f43f5e"
  ],
  className
}: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-8 w-8 rounded-md border border-input overflow-hidden flex items-center justify-center",
            className
          )}
          style={{
            backgroundColor: value || "transparent"
          }}
        >
          {!value && (
            <span className="text-xs text-gray-400">+</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                className={cn(
                  "h-6 w-6 rounded-md border border-input",
                  value === color && "ring-2 ring-offset-1 ring-ring"
                )}
                style={{ backgroundColor: color }}
                onClick={() => onChange(color)}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
