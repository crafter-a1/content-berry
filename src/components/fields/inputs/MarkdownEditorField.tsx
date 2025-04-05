
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  rows?: number;
  customClass?: string;
}

export function MarkdownEditorField({
  id,
  label,
  value = '',
  onChange,
  placeholder = 'Enter markdown content...',
  required = false,
  helpText,
  rows = 6,
  customClass
}: MarkdownEditorFieldProps) {
  // For a simple implementation, we're using a regular textarea
  // In a real app, you'd use a proper markdown editor library
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn('space-y-2', customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="markdown-wrapper">
        <Textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="font-mono text-sm"
          aria-describedby={helpText ? `${id}-description` : undefined}
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

export default MarkdownEditorField;
