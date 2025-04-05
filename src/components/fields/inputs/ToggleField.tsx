
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ToggleFieldProps {
  id: string;
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  helpText?: string;
  customClass?: string;
}

export function ToggleField({
  id,
  label,
  value = false,
  onChange,
  helpText,
  customClass
}: ToggleFieldProps) {
  return (
    <div className={cn("space-y-2", customClass)}>
      <div className="flex items-center justify-between">
        {label && (
          <Label htmlFor={id} className="flex-1">
            {label}
          </Label>
        )}
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
        />
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default ToggleField;
