
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberInputFieldProps {
  id: string;
  label?: string;
  value?: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  invalid?: boolean;
  errorMessage?: string;
  showButtons?: boolean;
  buttonLayout?: 'horizontal' | 'vertical';
  prefix?: string;
  suffix?: string;
  locale?: string;
  currency?: string;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  labelPosition?: 'top' | 'left' | 'right';
  labelWidth?: number;
  showBorder?: boolean;
  roundedCorners?: 'none' | 'small' | 'medium' | 'large';
  fieldSize?: 'small' | 'medium' | 'large';
  labelSize?: 'small' | 'medium' | 'large';
  customClass?: string;
  floatLabel?: boolean;
  filled?: boolean;
  disabled?: boolean;
  'aria-label'?: string;
  colors?: Record<string, string>;
}

export function NumberInputField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = '',
  required = false,
  helpText,
  invalid = false,
  errorMessage,
  showButtons = false,
  buttonLayout = 'horizontal',
  prefix,
  suffix,
  locale,
  currency,
  className,
  textAlign = 'left',
  labelPosition = 'top',
  labelWidth = 30,
  showBorder = true,
  roundedCorners = 'medium',
  fieldSize = 'medium',
  labelSize = 'medium',
  customClass,
  floatLabel = false,
  filled = false,
  disabled = false,
  'aria-label': ariaLabel,
  colors
}: NumberInputFieldProps) {
  const [inputValue, setInputValue] = useState<string>(value !== null && value !== undefined ? value.toString() : '');

  // Update local state when prop value changes
  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value.toString());
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty input
    if (newValue === '') {
      setInputValue('');
      onChange(null);
      return;
    }
    
    // Only allow numbers, decimal point, and minus sign
    if (!/^-?\d*\.?\d*$/.test(newValue)) {
      return;
    }
    
    setInputValue(newValue);
    
    const numberValue = parseFloat(newValue);
    if (!isNaN(numberValue)) {
      onChange(numberValue);
    }
  };

  const handleIncrement = () => {
    if (disabled) return;
    
    const currentValue = value !== null && value !== undefined ? value : 0;
    const newValue = Math.min(max !== undefined ? max : Infinity, currentValue + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    if (disabled) return;
    
    const currentValue = value !== null && value !== undefined ? value : 0;
    const newValue = Math.max(min !== undefined ? min : -Infinity, currentValue - step);
    onChange(newValue);
  };

  // Format the display value if locale is provided
  const getDisplayValue = () => {
    if (inputValue === '') {
      return '';
    }
    
    if (locale && currency) {
      try {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
        }).format(parseFloat(inputValue));
      } catch (error) {
        return inputValue;
      }
    }
    
    if (locale) {
      try {
        return new Intl.NumberFormat(locale).format(parseFloat(inputValue));
      } catch (error) {
        return inputValue;
      }
    }
    
    return inputValue;
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

  return (
    <div className={cn(
      'space-y-2',
      labelPosition === 'left' && 'flex items-center gap-2',
      labelPosition === 'right' && 'flex flex-row-reverse items-center gap-2',
      className,
      customClass
    )}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            getLabelSizeClass(),
            labelPosition === 'left' && `w-${labelWidth}`,
            labelPosition === 'right' && `w-${labelWidth}`,
            floatLabel && inputValue 
              ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs z-10" 
              : ""
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className={cn(
        'relative flex items-center',
        labelPosition === 'left' && `w-[calc(100%-${labelWidth}%)]`,
        labelPosition === 'right' && `w-[calc(100%-${labelWidth}%)]`,
        showButtons && buttonLayout === 'horizontal' && 'flex-1'
      )}>
        {showButtons && buttonLayout === 'horizontal' && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn("rounded-r-none border-r-0", 
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleDecrement}
            disabled={disabled || (min !== undefined && value !== null && value <= min)}
            tabIndex={-1}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        )}
        
        {prefix && (
          <span className="absolute left-3 text-muted-foreground">
            {prefix}
          </span>
        )}
        
        <div className="relative flex-grow">
          <Input
            id={id}
            type="text"
            inputMode="decimal"
            value={locale || currency ? getDisplayValue() : inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            required={required}
            disabled={disabled}
            aria-label={ariaLabel}
            className={cn(
              getRoundedClass(),
              getSizeClass(),
              filled && "bg-gray-100",
              !showBorder && "border-0",
              invalid && "border-red-500 focus-visible:ring-red-500",
              prefix && "pl-8",
              suffix && "pr-8",
              showButtons && buttonLayout === 'horizontal' && "rounded-none",
              showButtons && buttonLayout === 'vertical' && "rounded-l-none"
            )}
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
        </div>
        
        {suffix && (
          <span className="absolute right-3 text-muted-foreground">
            {suffix}
          </span>
        )}
        
        {showButtons && buttonLayout === 'horizontal' && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn("rounded-l-none border-l-0", 
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleIncrement}
            disabled={disabled || (max !== undefined && value !== null && value >= max)}
            tabIndex={-1}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        )}
        
        {showButtons && buttonLayout === 'vertical' && (
          <div className="flex flex-col h-full">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn("rounded-bl-none rounded-tl-none border-l-0 h-1/2", 
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && value !== null && value >= max)}
              tabIndex={-1}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn("rounded-tl-none rounded-tr-none border-l-0 border-t-0 h-1/2", 
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && value !== null && value <= min)}
              tabIndex={-1}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
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

export default NumberInputField;
