
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputTextFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  invalid?: boolean;
  errorMessage?: string;
  keyFilter?: 'none' | 'letters' | 'numbers' | 'alphanumeric';
  floatLabel?: boolean;
  filled?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  labelPosition?: 'top' | 'left' | 'right';
  labelWidth?: number;
  showBorder?: boolean;
  roundedCorners?: 'none' | 'small' | 'medium' | 'large';
  fieldSize?: 'small' | 'medium' | 'large';
  labelSize?: 'small' | 'medium' | 'large';
  className?: string;
  customClass?: string;
  name?: string;
  colors?: Record<string, string>;
  disabled?: boolean;
}

export function InputTextField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  invalid = false,
  errorMessage,
  keyFilter = 'none',
  floatLabel = false,
  filled = false,
  textAlign = 'left',
  labelPosition = 'top',
  labelWidth = 30,
  showBorder = true,
  roundedCorners = 'medium',
  fieldSize = 'medium',
  labelSize = 'medium',
  className,
  customClass,
  name,
  colors,
  disabled = false
}: InputTextFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Apply key filtering if specified
    if (keyFilter !== 'none') {
      if (keyFilter === 'letters') {
        newValue = newValue.replace(/[^a-zA-Z\s]/g, '');
      } else if (keyFilter === 'numbers') {
        newValue = newValue.replace(/[^0-9]/g, '');
      } else if (keyFilter === 'alphanumeric') {
        newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, '');
      }
    }
    
    onChange(newValue);
  };

  // Generate rounded corner classes based on the roundedCorners prop
  const getRoundedClass = () => {
    switch (roundedCorners) {
      case 'none': return 'rounded-none';
      case 'small': return 'rounded-sm';
      case 'large': return 'rounded-lg';
      default: return 'rounded-md';
    }
  };

  // Generate size classes based on the fieldSize prop
  const getSizeClass = () => {
    switch (fieldSize) {
      case 'small': return 'h-8 text-xs px-2';
      case 'large': return 'h-12 text-base px-4';
      default: return 'h-10 text-sm px-3';
    }
  };

  // Generate label size classes based on the labelSize prop
  const getLabelSizeClass = () => {
    switch (labelSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  const inputClassName = cn(
    getRoundedClass(),
    getSizeClass(),
    filled && 'bg-gray-100',
    !showBorder && 'border-0',
    invalid && 'border-red-500 focus-visible:ring-red-500',
    disabled && 'opacity-50 cursor-not-allowed',
    customClass
  );

  return (
    <div className={cn(
      'space-y-2',
      labelPosition === 'left' && 'flex items-center gap-2',
      labelPosition === 'right' && 'flex flex-row-reverse items-center gap-2',
      className
    )}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            getLabelSizeClass(),
            labelPosition === 'left' && `w-${labelWidth}`,
            labelPosition === 'right' && `w-${labelWidth}`,
            floatLabel && value 
              ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs z-10" 
              : ""
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className={cn(
        'relative',
        labelPosition === 'left' && `w-[calc(100%-${labelWidth}%)]`,
        labelPosition === 'right' && `w-[calc(100%-${labelWidth}%)]`
      )}>
        <Input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          required={required}
          className={inputClassName}
          style={{
            textAlign,
            ...(colors && {
              color: colors.textColor || 'inherit',
              backgroundColor: colors.backgroundColor || (filled ? 'rgb(243 244 246)' : 'inherit'),
              borderColor: invalid 
                ? colors.errorBorderColor || 'rgb(239 68 68)'
                : colors.borderColor || 'inherit'
            })
          }}
          aria-describedby={helpText || errorMessage ? `${id}-description` : undefined}
          aria-invalid={invalid}
          disabled={disabled}
        />
      </div>
      
      {(helpText || errorMessage) && (
        <p 
          id={`${id}-description`} 
          className={cn(
            'text-xs',
            invalid ? 'text-red-500' : 'text-muted-foreground'
          )}
        >
          {invalid ? errorMessage : helpText}
        </p>
      )}
    </div>
  );
}

export default InputTextField;
