
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MaskInputFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  mask: string;
}

export function MaskInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  mask = ''
}: MaskInputFieldProps) {
  const [displayValue, setDisplayValue] = useState('');

  // Apply mask to value
  useEffect(() => {
    if (!mask) {
      setDisplayValue(value);
      return;
    }

    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (valueIndex >= value.length) break;

      const maskChar = mask[i];
      const valueChar = value[valueIndex];

      if (maskChar === '9' && /\d/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      } else if (maskChar === 'a' && /[a-zA-Z]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      } else if (maskChar === '*' && /[a-zA-Z0-9]/.test(valueChar)) {
        result += valueChar;
        valueIndex++;
      } else if (maskChar !== '9' && maskChar !== 'a' && maskChar !== '*') {
        result += maskChar;
        if (valueChar === maskChar) {
          valueIndex++;
        }
      } else {
        valueIndex++;
        i--;  // Try this position again with next character
      }
    }

    setDisplayValue(result);
  }, [value, mask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Extract just the raw data (no mask characters)
    const rawValue = input.replace(/[^a-zA-Z0-9]/g, '');
    
    onChange(rawValue);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <Input
        id={id}
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder || mask}
        required={required}
      />
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
}

export default MaskInputField;
