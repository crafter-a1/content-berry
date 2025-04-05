
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  id: string;
  label?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options: SelectOption[];
  className?: string;
  customClass?: string;
}

export function MultiSelectField({
  id,
  label,
  value = [],
  onChange,
  placeholder = 'Select options',
  required = false,
  helpText,
  options,
  className,
  customClass
}: MultiSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value || []);
  
  // Sync external value changes
  useEffect(() => {
    setSelectedValues(value || []);
  }, [value]);

  const handleSelect = (optionValue: string) => {
    const isSelected = selectedValues.includes(optionValue);
    let newValues: string[];
    
    if (isSelected) {
      newValues = selectedValues.filter(val => val !== optionValue);
    } else {
      newValues = [...selectedValues, optionValue];
    }
    
    setSelectedValues(newValues);
    onChange(newValues);
  };

  const handleRemoveValue = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter(val => val !== optionValue);
    setSelectedValues(newValues);
    onChange(newValues);
  };

  // Get labels for selected values
  const getSelectedLabels = () => {
    return selectedValues.map(val => {
      const option = options.find(opt => opt.value === val);
      return option ? option.label : val;
    });
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
          >
            {selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-[calc(100%-20px)] overflow-hidden">
                {selectedLabels.map((label, i) => (
                  <Badge key={i} variant="secondary" className="mr-1">
                    {label}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemoveValue(selectedValues[i], e)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {label}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default MultiSelectField;
