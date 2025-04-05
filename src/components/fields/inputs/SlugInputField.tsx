
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SlugInputFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  prefix?: string;
  suffix?: string;
}

export function SlugInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = 'your-slug-here',
  required = false,
  helpText,
  prefix,
  suffix
}: SlugInputFieldProps) {
  // Convert input to a valid slug
  const handleSlugChange = (input: string) => {
    // Replace spaces and special chars with dashes, lowercase everything
    const slug = input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
    
    onChange(slug);
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="flex items-center">
        {prefix && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
            {prefix}
          </span>
        )}
        <Input
          id={id}
          value={value}
          onChange={(e) => handleSlugChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(
            prefix && "rounded-l-none",
            suffix && "rounded-r-none"
          )}
        />
        {suffix && (
          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
            {suffix}
          </span>
        )}
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default SlugInputField;
