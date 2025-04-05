
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options: SelectOption[];
  className?: string;
  customClass?: string;
}

export function SelectField({
  id,
  label,
  value = '',
  onChange,
  placeholder = 'Select an option',
  required = false,
  helpText,
  options,
  className,
  customClass,
}: SelectFieldProps) {
  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default SelectField;
