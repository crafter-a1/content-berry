
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface TextareaFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  rows?: number;
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

export function TextareaField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  className,
  rows = 3,
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
}: TextareaFieldProps) {
  return (
    <div className={cn('relative space-y-1', className, customClass)}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            floatLabel && value ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs z-10" : "",
            labelSize === 'small' && "text-xs",
            labelSize === 'large' && "text-base",
            labelPosition === 'left' && "mb-0",
            colors?.labelColor && `text-[${colors.labelColor}]`
          )}
          style={{
            width: labelPosition === 'left' ? `${labelWidth}%` : 'auto',
          }}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className={labelPosition === 'left' ? 'flex items-start' : ''}>
        {label && labelPosition === 'left' && <div style={{ width: `${labelWidth}%` }} />}
        <div className={cn('relative', labelPosition === 'left' ? `w-[${100 - labelWidth}%]` : 'w-full')}>
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={rows}
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
        </div>
      </div>
      {helpText && (
        <p 
          id={`${id}-description`} 
          className={cn(
            "text-muted-foreground text-xs",
            colors?.helpTextColor && `text-[${colors.helpTextColor}]`
          )}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

export default TextareaField;
