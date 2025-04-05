
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  rows?: number;
  className?: string;
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

export const TextareaField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  helpText,
  rows = 5,
  floatLabel = false,
  filled = false,
  textAlign = "left",
  labelPosition = "top",
  labelWidth = 30,
  showBorder = true,
  roundedCorners = "medium",
  fieldSize = "medium",
  labelSize = "medium",
  customClass = "",
  colors = {}
}: TextareaFieldProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  
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
  
  const textareaStyle: React.CSSProperties = {
    width: labelPosition === "left" ? `${100 - labelWidth}%` : "100%",
    backgroundColor: filled ? (colors.background || "#f1f5f9") : "transparent",
    border: showBorder ? `1px solid ${colors.border || "#e2e8f0"}` : "none",
    borderRadius: getBorderRadius(),
    padding: getPadding(),
    fontSize: fieldSize === "small" ? "0.875rem" : fieldSize === "medium" ? "1rem" : "1.125rem",
    textAlign: textAlign as any,
    color: colors.text || "#1e293b",
    resize: "vertical"
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
              (hasFocus || value) ? "-top-3 left-2 bg-white px-1 text-xs" : "top-4 left-3"
            )}
            style={{
              color: hasFocus ? (colors.focus || "#3b82f6") : (colors.label || "#64748b"),
              zIndex: 10
            }}
          >
            {label}
          </Label>
        )}
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={floatLabel && label ? "" : placeholder}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          required={required}
          rows={rows}
          style={textareaStyle}
          className={cn(
            "focus:ring-1 focus:ring-offset-0",
            hasFocus && "outline-none"
          )}
        />
      </div>
      {helpText && (
        <p className="text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default TextareaField;
