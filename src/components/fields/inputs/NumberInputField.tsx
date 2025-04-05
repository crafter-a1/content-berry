
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputFieldProps {
  id: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  showButtons?: boolean;
  buttonLayout?: 'horizontal' | 'vertical';
  prefix?: string;
  suffix?: string;
  floatLabel?: boolean;
  filled?: boolean;
  textAlign?: "left" | "center" | "right";
  labelPosition?: "top" | "left";
  labelWidth?: number;
  showBorder?: boolean;
  roundedCorners?: "none" | "small" | "medium" | "large";
  fieldSize?: "small" | "medium" | "large";
  labelSize?: "small" | "medium" | "large";
  customClass?: string;
  colors?: {
    border?: string;
    text?: string;
    background?: string;
    focus?: string;
    label?: string;
  };
}

export const NumberInputField = ({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = "",
  required = false,
  helpText,
  showButtons = false,
  buttonLayout = 'horizontal',
  prefix,
  suffix,
  floatLabel = false,
  filled = false,
  textAlign = "left",
  labelPosition = "top",
  labelWidth = 30,
  showBorder = true,
  roundedCorners = "medium",
  fieldSize = "medium",
  labelSize = "medium",
  customClass,
  colors = {}
}: NumberInputFieldProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [hasFocus, setHasFocus] = useState(false);
  
  // Update local state when prop value changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);
  
  // Generate dynamic styles based on props
  const containerStyle: React.CSSProperties = {
    display: labelPosition === "left" ? "flex" : "block",
    alignItems: "flex-start",
    position: "relative"
  };
  
  const labelStyle: React.CSSProperties = {
    width: labelPosition === "left" ? `${labelWidth}%` : "auto",
    fontSize: labelSize === "small" ? "0.875rem" : labelSize === "medium" ? "1rem" : "1.125rem",
    fontWeight: labelSize === "large" ? 600 : 500,
    color: colors.label || "#64748b",
    marginBottom: labelPosition === "top" ? "0.5rem" : "0",
    marginTop: labelPosition === "left" ? "0.5rem" : "0"
  };
  
  // Get border radius based on roundedCorners prop
  const getBorderRadius = () => {
    switch (roundedCorners) {
      case "none": return "0";
      case "small": return "0.25rem";
      case "medium": return "0.375rem";
      case "large": return "0.5rem";
      default: return "0.375rem";
    }
  };
  
  // Get padding based on fieldSize prop
  const getPadding = () => {
    switch (fieldSize) {
      case "small": return "0.375rem 0.5rem";
      case "medium": return "0.5rem 0.75rem";
      case "large": return "0.75rem 1rem";
      default: return "0.5rem 0.75rem";
    }
  };
  
  const inputStyle: React.CSSProperties = {
    width: labelPosition === "left" ? `${100 - labelWidth}%` : "100%",
    backgroundColor: filled ? (colors.background || "#f1f5f9") : "transparent",
    border: showBorder ? `1px solid ${colors.border || "#e2e8f0"}` : "none",
    borderRadius: getBorderRadius(),
    padding: getPadding(),
    paddingLeft: prefix ? "2rem" : undefined,
    paddingRight: suffix ? "2rem" : showButtons && buttonLayout === 'horizontal' ? "4rem" : undefined,
    fontSize: fieldSize === "small" ? "0.875rem" : fieldSize === "medium" ? "1rem" : "1.125rem",
    textAlign,
    color: colors.text || "#1e293b",
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty input (will be treated as 0 later)
    if (newValue === '') {
      setInputValue('');
      return;
    }
    
    // Only allow numeric input (may include decimal point and minus sign)
    if (!/^-?\d*\.?\d*$/.test(newValue)) {
      return;
    }
    
    setInputValue(newValue);
    
    // Only update parent if the value is a valid number
    if (!isNaN(parseFloat(newValue))) {
      onChange(parseFloat(newValue));
    }
  };
  
  // Handle blur event to format the value
  const handleBlur = () => {
    setHasFocus(false);
    
    // If empty, set to 0
    if (inputValue === '') {
      setInputValue('0');
      onChange(0);
      return;
    }
    
    const numValue = parseFloat(inputValue);
    
    // Apply min/max constraints
    let constrainedValue = numValue;
    if (min !== undefined && numValue < min) {
      constrainedValue = min;
    }
    if (max !== undefined && numValue > max) {
      constrainedValue = max;
    }
    
    // Update both the input value and the parent
    setInputValue(constrainedValue.toString());
    onChange(constrainedValue);
  };
  
  // Increment value
  const increment = () => {
    const currentValue = inputValue === '' ? 0 : parseFloat(inputValue);
    let newValue = currentValue + step;
    
    if (max !== undefined && newValue > max) {
      newValue = max;
    }
    
    setInputValue(newValue.toString());
    onChange(newValue);
  };
  
  // Decrement value
  const decrement = () => {
    const currentValue = inputValue === '' ? 0 : parseFloat(inputValue);
    let newValue = currentValue - step;
    
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    
    setInputValue(newValue.toString());
    onChange(newValue);
  };
  
  // Render buttons based on layout
  const renderButtons = () => {
    if (buttonLayout === 'horizontal') {
      return (
        <div className="absolute right-0 top-0 h-full flex flex-row">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 h-full border-l"
            onClick={decrement}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 h-full border-l"
            onClick={increment}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      );
    } else {
      return (
        <div className="absolute right-0 top-0 h-full flex flex-col">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 h-1/2 border-l"
            onClick={increment}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-2 h-1/2 border-l border-t"
            onClick={decrement}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={cn("space-y-2", customClass)} style={containerStyle}>
      {label && !floatLabel && (
        <Label 
          htmlFor={id} 
          style={labelStyle}
          className={required ? "after:content-['*'] after:ml-1 after:text-red-600" : ""}
        >
          {label}
        </Label>
      )}
      
      <div 
        className={cn("relative", floatLabel && "pt-4")}
        style={{ width: labelPosition === "left" ? `${100 - labelWidth}%` : "100%" }}
      >
        {floatLabel && label && (
          <Label
            htmlFor={id}
            className={cn(
              "absolute transition-all duration-200 pointer-events-none",
              (hasFocus || value !== 0 || inputValue !== '0') ? "-top-3 left-2 bg-white px-1 text-xs" : "top-4 left-3"
            )}
            style={{
              color: hasFocus ? (colors.focus || "#3b82f6") : (colors.label || "#64748b"),
              zIndex: 10
            }}
          >
            {label}
          </Label>
        )}
        
        {prefix && (
          <div className="absolute left-0 top-0 h-full flex items-center px-3">
            <span className="text-gray-500">{prefix}</span>
          </div>
        )}
        
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={() => setHasFocus(true)}
          placeholder={floatLabel && label ? "" : placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          style={inputStyle}
          className={cn(
            "focus:ring-1 focus:ring-offset-0",
            hasFocus && "outline-none"
          )}
        />
        
        {suffix && !showButtons && (
          <div className="absolute right-0 top-0 h-full flex items-center px-3">
            <span className="text-gray-500">{suffix}</span>
          </div>
        )}
        
        {showButtons && renderButtons()}
      </div>
      
      {helpText && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default NumberInputField;
