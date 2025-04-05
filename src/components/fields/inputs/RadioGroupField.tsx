
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
  value?: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  helpText?: string;
  className?: string;
  customClass?: string;
}

export function RadioGroupField({
  id,
  label,
  value = '',
  onChange,
  options,
  helpText,
  className,
  customClass
}: RadioGroupFieldProps) {
  return (
    <div className={cn('space-y-3', className, customClass)}>
      {label && (
        <Label className="text-base">{label}</Label>
      )}
      
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-2"
      >
        {options.map((option, index) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`${id}-${index}`}
              value={option.value}
            />
            <Label 
              htmlFor={`${id}-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {helpText && (
        <p className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default RadioGroupField;
