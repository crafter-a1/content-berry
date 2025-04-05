
import React, { useState, KeyboardEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagsInputFieldProps {
  id: string;
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  maxTags?: number;
}

export function TagsInputField({
  id,
  label,
  value = [],
  onChange,
  placeholder = 'Add a tag...',
  required = false,
  helpText,
  maxTags = 10
}: TagsInputFieldProps) {
  const [inputValue, setInputValue] = useState('');
  
  const addTag = (tag: string) => {
    tag = tag.trim();
    if (!tag) return;
    if (value.includes(tag)) return;
    if (value.length >= maxTags) return;
    
    onChange([...value, tag]);
    setInputValue('');
  };
  
  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="border rounded-md p-1 flex flex-wrap gap-1">
        {value.map((tag, index) => (
          <Badge 
            key={`${tag}-${index}`}
            variant="secondary"
            className="px-2 py-1"
          >
            {tag}
            <button
              type="button"
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        
        <Input
          id={id}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={value.length < maxTags ? placeholder : `Maximum ${maxTags} tags`}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-1 py-0 h-8"
          disabled={value.length >= maxTags}
        />
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default TagsInputField;
