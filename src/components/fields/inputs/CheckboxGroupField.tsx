
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupFieldProps {
  id: string;
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: CheckboxOption[];
  helpText?: string;
  customClass?: string;
}

export function CheckboxGroupField({
  id,
  label,
  value = [],
  onChange,
  options = [],
  helpText,
  customClass
}: CheckboxGroupFieldProps) {
  const handleCheckedChange = (checked: boolean, itemValue: string) => {
    if (checked) {
      onChange([...value, itemValue]);
    } else {
      onChange(value.filter(v => v !== itemValue));
    }
  };
  
  return (
    <div className={cn("space-y-3", customClass)}>
      {label && (
        <Label>{label}</Label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => 
                handleCheckedChange(checked as boolean, option.value)
              }
            />
            <Label 
              htmlFor={`${id}-${option.value}`}
              className="text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default CheckboxGroupField;
