
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  floatLabel?: boolean;
  filled?: boolean;
  // Add additional styling props used in FieldRenderer
  textAlign?: 'left' | 'center' | 'right';
  labelPosition?: 'top' | 'left';
  labelWidth?: number;
  showBorder?: boolean;
  roundedCorners?: string;
  fieldSize?: string;
  labelSize?: string;
  colors?: Record<string, string>;
  customClass?: string;
}

export function PasswordInputField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  required = false,
  helpText,
  className,
  floatLabel = false,
  filled = false,
  textAlign,
  labelPosition,
  labelWidth,
  showBorder,
  roundedCorners,
  fieldSize,
  labelSize,
  colors = {},
  customClass
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn('relative space-y-1', className, customClass)}>
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium",
            floatLabel && value ? "absolute top-0 left-3 -translate-y-1/2 bg-background px-1 text-xs" : ""
          )}
          style={{
            textAlign: textAlign,
            width: labelPosition === 'left' ? `${labelWidth}%` : undefined,
            fontSize: labelSize === 'small' ? '0.875rem' : labelSize === 'large' ? '1.125rem' : undefined
          }}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(
            "pr-10",
            filled && "bg-gray-100",
            floatLabel && "pt-4"
          )}
          style={{
            borderRadius: roundedCorners === 'large' ? '0.5rem' : roundedCorners === 'small' ? '0.25rem' : undefined,
            borderWidth: showBorder ? '1px' : '0',
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: filled ? (colors.background || '#f1f5f9') : undefined
          }}
          aria-describedby={helpText ? `${id}-description` : undefined}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </Button>
      </div>
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default PasswordInputField;
