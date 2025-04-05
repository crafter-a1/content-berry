
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ColorPickerFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  helpText?: string;
  className?: string;
  customClass?: string;
  defaultColor?: string;
}

export function ColorPickerField({
  id,
  label,
  value = '',
  onChange,
  helpText,
  className,
  customClass,
  defaultColor = '#000000'
}: ColorPickerFieldProps) {
  const [color, setColor] = useState<string>(value || defaultColor);
  
  useEffect(() => {
    setColor(value || defaultColor);
  }, [value, defaultColor]);
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    
    // Only update if it's a valid color format
    if (/^#([0-9A-F]{3}){1,2}$/i.test(newColor)) {
      onChange(newColor);
    }
  };

  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}
        </Label>
      )}
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-10 h-10 rounded-md border border-input",
                "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}
              style={{ backgroundColor: color }}
              aria-label="Select color"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-32 h-32"
            />
          </PopoverContent>
        </Popover>
        
        <Input
          id={id}
          value={color}
          onChange={handleTextChange}
          className="w-32 uppercase"
          maxLength={7}
        />
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default ColorPickerField;
