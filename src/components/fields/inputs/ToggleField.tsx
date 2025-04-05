
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface ToggleFieldProps {
  id: string;
  label?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
  helpText?: string;
  className?: string;
  customClass?: string;
}

export function ToggleField({
  id,
  label,
  value = false,
  onChange,
  helpText,
  className,
  customClass
}: ToggleFieldProps) {
  return (
    <div className={cn('flex flex-col space-y-2', className, customClass)}>
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={value}
          onCheckedChange={onChange}
        />
        {label && (
          <Label htmlFor={id} className="cursor-pointer">
            {label}
          </Label>
        )}
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs pl-12">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default ToggleField;
