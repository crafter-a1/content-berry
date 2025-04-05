
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface AutocompleteOption {
  label: string;
  value: string;
}

interface AutocompleteInputFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options: AutocompleteOption[];
  className?: string;
  customClass?: string;
  floatLabel?: boolean;
  filled?: boolean;
}

export function AutocompleteInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  options,
  className,
  customClass,
  floatLabel = false,
  filled = false
}: AutocompleteInputFieldProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  // Update component state when the value prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter options based on input value
  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter((option) => 
        option.label.toLowerCase().includes(inputValue.toLowerCase()) || 
        option.value.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current && 
        !commandRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Update parent component
    setShowSuggestions(true);
  };

  const handleSelectOption = (selectedValue: string) => {
    const selected = options.find(option => option.value === selectedValue);
    if (selected) {
      setInputValue(selected.label);
      onChange(selectedValue);
      setShowSuggestions(false);
    }
  };

  return (
    <div className={cn('relative space-y-1', className, customClass)}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            floatLabel && inputValue ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs z-10" : ""
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          required={required}
          className={cn(
            filled && "bg-gray-100",
            floatLabel && "pt-4"
          )}
          aria-describedby={helpText ? `${id}-description` : undefined}
        />

        {showSuggestions && filteredOptions.length > 0 && (
          <div 
            ref={commandRef}
            className="absolute z-50 w-full mt-1"
          >
            <Command className="rounded-lg border border-gray-200 bg-white shadow-md">
              <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelectOption(option.value)}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default AutocompleteInputField;
