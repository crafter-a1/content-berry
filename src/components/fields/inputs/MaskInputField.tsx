
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface MaskInputFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  mask?: string;
  className?: string;
  floatLabel?: boolean;
  filled?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  labelPosition?: 'top' | 'left' | 'right';
  labelWidth?: number;
  showBorder?: boolean;
  roundedCorners?: 'none' | 'small' | 'medium' | 'large';
  fieldSize?: 'small' | 'medium' | 'large';
  labelSize?: 'small' | 'medium' | 'large';
  customClass?: string;
  colors?: any;
}

export function MaskInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  mask = '',
  className,
  floatLabel = false,
  filled = false,
  textAlign = 'left',
  labelPosition = 'top',
  labelWidth = 30,
  showBorder = true,
  roundedCorners = 'medium',
  fieldSize = 'medium',
  labelSize = 'medium',
  customClass,
  colors
}: MaskInputFieldProps) {
  const [displayValue, setDisplayValue] = useState('');

  // Function to apply mask to the input value
  const applyMask = (inputValue: string, inputMask: string): string => {
    if (!inputMask) return inputValue;
    
    let result = '';
    let inputIndex = 0;

    for (let i = 0; i < inputMask.length && inputIndex < inputValue.length; i++) {
      const maskChar = inputMask[i];
      const inputChar = inputValue[inputIndex];

      if (maskChar === '#') {
        // # indicates a digit
        if (/\d/.test(inputChar)) {
          result += inputChar;
          inputIndex++;
        } else {
          inputIndex++;
          i--;
        }
      } else if (maskChar === 'A') {
        // A indicates a letter
        if (/[a-zA-Z]/.test(inputChar)) {
          result += inputChar;
          inputIndex++;
        } else {
          inputIndex++;
          i--;
        }
      } else if (maskChar === '*') {
        // * indicates any character
        result += inputChar;
        inputIndex++;
      } else {
        // For any other mask character, add it to the result
        result += maskChar;
        
        // Only advance the input index if the current input matches the mask character
        if (inputChar === maskChar) {
          inputIndex++;
        }
      }
    }

    return result;
  };

  // Handle input change with mask
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = mask ? applyMask(rawValue, mask) : rawValue;
    setDisplayValue(maskedValue);
    onChange(maskedValue);
  };

  // Update display value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      const maskedValue = mask ? applyMask(value, mask) : value;
      setDisplayValue(maskedValue);
    }
  }, [value, mask]);

  return (
    <div className={cn('relative space-y-1', className, customClass)}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            floatLabel && displayValue ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs z-10" : "",
            labelSize === 'small' && "text-xs",
            labelSize === 'large' && "text-base",
            labelPosition === 'left' && "mb-0",
            colors?.labelColor && `text-[${colors.labelColor}]`
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        type="text"
        id={id}
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder || (mask ? mask.replace(/#/g, '0').replace(/A/g, 'a').replace(/\*/g, 'x') : '')}
        required={required}
        className={cn(
          filled && "bg-gray-100",
          floatLabel && "pt-4",
          `text-${textAlign}`,
          !showBorder && "border-0",
          roundedCorners === 'none' && "rounded-none",
          roundedCorners === 'small' && "rounded-sm",
          roundedCorners === 'large' && "rounded-lg",
          fieldSize === 'small' && "text-xs px-2 py-1",
          fieldSize === 'large' && "text-base px-4 py-3",
          colors?.borderColor && `border-[${colors.borderColor}]`,
          colors?.backgroundColor && `bg-[${colors.backgroundColor}]`,
          colors?.textColor && `text-[${colors.textColor}]`
        )}
        aria-describedby={helpText ? `${id}-description` : undefined}
      />
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default MaskInputField;
