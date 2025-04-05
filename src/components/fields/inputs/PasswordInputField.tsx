
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
  showToggle?: boolean;
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
  colors?: Record<string, string>;
}

export function PasswordInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  invalid = false,
  errorMessage,
  className,
  showToggle = true,
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
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    'flex-1 pr-10', // Add right padding for the eye button
    getRoundedClass(),
    getSizeClass(),
    filled && 'bg-gray-100',
    !showBorder && 'border-0',
    invalid && 'border-red-500 focus-visible:ring-red-500',
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
              ? "absolute top-0 left-3 -translate-y-1/2 bg-background text-xs px-1 z-10" 
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
          type={showPassword ? 'text' : 'password'}
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
        />
        
        {showToggle && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </Button>
        )}
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

export default PasswordInputField;
