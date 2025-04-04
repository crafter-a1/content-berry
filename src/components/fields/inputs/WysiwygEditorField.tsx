
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BlockEditorField } from './BlockEditorField';

// This is essentially a wrapper around the BlockEditorField
// In a real implementation, you might use a different rich text editor library
// or add more specific functionality for a WYSIWYG editor

interface WysiwygEditorFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  minHeight?: string;
  customClass?: string;
}

export function WysiwygEditorField({
  id,
  label,
  value = '',
  onChange,
  placeholder = 'Enter content...',
  required = false,
  helpText,
  minHeight = '200px',
  customClass
}: WysiwygEditorFieldProps) {
  return (
    <div className={cn('space-y-2', customClass)}>
      <BlockEditorField
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        helpText={helpText}
        minHeight={minHeight}
      />
    </div>
  );
}

export default WysiwygEditorField;
