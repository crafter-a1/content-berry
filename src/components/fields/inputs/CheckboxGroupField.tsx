
import React, { useState, useEffect } from 'react';
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
  value?: string[];
  onChange: (value: string[]) => void;
  options: CheckboxOption[];
  helpText?: string;
  className?: string;
  customClass?: string;
}

export function CheckboxGroupField({
  id,
  label,
  value = [],
  onChange,
  options,
  helpText,
  className,
  customClass
}: CheckboxGroupFieldProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>(value || []);
  
  // Sync with external value changes
  useEffect(() => {
    setSelectedItems(value || []);
  }, [value]);

  const toggleOption = (checked: boolean, itemValue: string) => {
    let updatedItems: string[];
    
    if (checked) {
      updatedItems = [...selectedItems, itemValue];
    } else {
      updatedItems = selectedItems.filter(item => item !== itemValue);
    }
    
    setSelectedItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <div className={cn('space-y-3', className, customClass)}>
      {label && (
        <Label className="text-base">{label}</Label>
      )}
      
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-${index}`}
              checked={selectedItems.includes(option.value)}
              onCheckedChange={(checked) => toggleOption(!!checked, option.value)}
            />
            <Label 
              htmlFor={`${id}-${index}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      
      {helpText && (
        <p className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default CheckboxGroupField;
