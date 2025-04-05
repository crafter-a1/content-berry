
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface OTPInputFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  length?: number;
  helpText?: string;
}

export function OTPInputField({
  id,
  label,
  value = '',
  onChange,
  length = 6,
  helpText
}: OTPInputFieldProps) {
  const [otp, setOtp] = useState<string[]>(
    Array(length).fill('').map((_, i) => value[i] || '')
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);
  
  // Update OTP array when value prop changes
  useEffect(() => {
    const newOtp = Array(length).fill('').map((_, i) => value[i] || '');
    setOtp(newOtp);
  }, [value, length]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value.slice(-1); // Only take last character
    
    // Only allow numbers
    if (newValue && !/\d/.test(newValue)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    
    // Call the onChange with the full OTP string
    onChange(newOtp.join(''));
    
    // Move to next input if current input is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Move to next input on right arrow
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Move to previous input on left arrow
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    
    // Only allow digits
    const digits = pastedData.replace(/\D/g, '');
    
    if (!digits) return;
    
    const newOtp = [...otp];
    
    // Fill the OTP array with the pasted digits
    for (let i = 0; i < digits.length; i++) {
      if (i < length) {
        newOtp[i] = digits[i];
      }
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus the next empty input or the last input
    for (let i = digits.length; i < length; i++) {
      if (i < length) {
        inputRefs.current[i]?.focus();
        break;
      }
    }
    
    if (digits.length >= length) {
      inputRefs.current[length - 1]?.focus();
    }
  };
  
  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={`${id}-0`}>{label}</Label>
      )}
      
      <div className="flex gap-2 justify-center">
        {Array(length).fill(0).map((_, index) => (
          <Input
            key={index}
            id={`${id}-${index}`}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            value={otp[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-10 h-12 text-center text-lg"
            maxLength={1}
            autoComplete="off"
          />
        ))}
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground text-center">{helpText}</p>
      )}
    </div>
  );
}

export default OTPInputField;
