
import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface OTPInputFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  length?: number;
  helpText?: string;
  customClass?: string;
}

export function OTPInputField({
  id,
  label,
  value = '',
  onChange,
  length = 6,
  helpText,
  customClass
}: OTPInputFieldProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  // Update OTP state when value prop changes
  useEffect(() => {
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newOtp = [...valueArray, ...new Array(length - valueArray.length).fill('')];
      setOtp(newOtp);
    } else {
      setOtp(new Array(length).fill(''));
    }
  }, [value, length]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newValue = value.replace(/[^0-9]/g, ''); // Only allow numbers
    
    if (!newValue) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      onChange(newOtp.join(''));
      return;
    }
    
    // If user pastes multiple digits
    if (newValue.length > 1) {
      const pastedValues = newValue.split('').slice(0, length - index);
      const newOtp = [...otp];
      
      pastedValues.forEach((digit, i) => {
        if (index + i < length) {
          newOtp[index + i] = digit;
        }
      });
      
      setOtp(newOtp);
      onChange(newOtp.join(''));
      
      // Focus the next input after the pasted values
      const nextIndex = Math.min(index + pastedValues.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }
    
    // Handle single digit
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Auto-focus the next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  return (
    <div className={cn('space-y-2', customClass)}>
      {label && (
        <Label htmlFor={`${id}-0`}>{label}</Label>
      )}
      
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            id={`${id}-${index}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "w-12 h-12 text-center text-xl",
              digit && "border-primary"
            )}
            autoFocus={index === 0}
            autoComplete="off"
          />
        ))}
      </div>
      
      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs text-center">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default OTPInputField;
