
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  id: string;
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options: SelectOption[];
  customClass?: string;
}

export function MultiSelectField({
  id,
  label,
  value = [],
  onChange,
  placeholder = "Select options",
  required = false,
  helpText,
  options = [],
  customClass
}: MultiSelectFieldProps) {
  const [open, setOpen] = useState(false);
  
  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      // Remove if already selected
      onChange(value.filter(v => v !== selectedValue));
    } else {
      // Add if not selected
      onChange([...value, selectedValue]);
    }
  };
  
  const handleRemove = (selectedValue: string) => {
    onChange(value.filter(v => v !== selectedValue));
  };
  
  const selectedLabels = value.map(v => {
    const option = options.find(opt => opt.value === v);
    return option ? option.label : v;
  });
  
  return (
    <div className={cn("space-y-2", customClass)}>
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
            className={cn(
              "w-full justify-between",
              !value.length && "text-muted-foreground"
            )}
          >
            {value.length > 0 ? `${value.length} selected` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Search ${label || "options"}...`} />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((selectedValue, index) => {
            const option = options.find(opt => opt.value === selectedValue);
            return (
              <Badge 
                key={selectedValue} 
                variant="secondary"
                className="px-2 py-1"
              >
                {option ? option.label : selectedValue}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRemove(selectedValue);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleRemove(selectedValue)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default MultiSelectField;
