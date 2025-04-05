
import React from 'react';
import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/ui/color-picker';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorPickerFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  helpText?: string;
}

export function ColorPickerField({
  id,
  label,
  value = '',
  onChange,
  helpText
}: ColorPickerFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>{label}</Label>
      )}
      
      <div className="flex items-center gap-2">
        <ColorPicker
          value={value}
          onChange={onChange}
          presetColors={[
            "#000000", "#ffffff", "#ef4444", "#f97316", 
            "#f59e0b", "#eab308", "#84cc16", "#10b981", 
            "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6",
            "#a855f7", "#d946ef", "#ec4899", "#f43f5e"
          ]}
        />
        <Input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1"
        />
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default ColorPickerField;
