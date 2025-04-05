
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  helpText?: string;
  customClass?: string;
}

export function RadioGroupField({
  id,
  label,
  value = '',
  onChange,
  options = [],
  helpText,
  customClass
}: RadioGroupFieldProps) {
  return (
    <div className={cn("space-y-3", customClass)}>
      {label && (
        <Label>{label}</Label>
      )}
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-1"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem id={`${id}-${option.value}`} value={option.value} />
            <Label 
              htmlFor={`${id}-${option.value}`}
              className="text-sm font-normal"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default RadioGroupField;
