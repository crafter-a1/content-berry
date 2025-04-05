
import React from "react";
import InputTextField from "../fields/inputs/InputTextField";
import PasswordInputField from "../fields/inputs/PasswordInputField";
import NumberInputField from "../fields/inputs/NumberInputField";
import { Textarea } from "@/components/ui/textarea";
import MarkdownEditorField from "../fields/inputs/MarkdownEditorField";
import WysiwygEditorField from "../fields/inputs/WysiwygEditorField";
import BlockEditorField from "../fields/inputs/BlockEditorField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Define appropriate interfaces for the field renderer
export interface FieldRendererProps {
  field: any;
  value: any;
  titleField?: string | null;
  onInputChange: (fieldId: string, value: any) => void;
  errors?: Record<string, string[]>;
}

export const FieldRenderer = ({ field, value, titleField, onInputChange, errors }: FieldRendererProps) => {
  const fieldId = field.id || field.apiId || field.name;
  const fieldName = field.name || "Field";
  const placeholder = field.ui_options?.placeholder || `Enter ${fieldName}...`;
  const helpText = field.helpText || field.ui_options?.help_text;
  const required = field.required || false;
  const hasError = errors && errors[fieldId]?.length > 0;
  const errorMessage = errors && errors[fieldId]?.join(", ");
  
  // Extract appearance settings
  const appearance = field.appearance || {};
  const {
    textAlign,
    labelPosition,
    labelWidth,
    floatLabel,
    filled,
    showBorder,
    showBackground,
    roundedCorners,
    fieldSize,
    labelSize,
    uiVariant,
    colors = {}
  } = appearance;
  
  // Extract advanced settings
  const advanced = field.advanced || {};
  
  // Create a className that includes any error styling
  const fieldClassName = cn(
    "w-full",
    hasError && "has-error"
  );
  
  switch (field.type) {
    case "text":
      return (
        <InputTextField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          keyFilter={advanced.keyFilter || "none"}
          floatLabel={floatLabel || false}
          filled={filled || false}
          textAlign={textAlign || "left"}
          labelPosition={labelPosition || "top"}
          labelWidth={labelWidth || 30}
          showBorder={showBorder !== false}
          roundedCorners={roundedCorners || "medium"}
          fieldSize={fieldSize || "medium"}
          labelSize={labelSize || "medium"}
          colors={colors}
        />
      );

    case "number":
      return (
        <NumberInputField
          id={fieldId}
          label={fieldName}
          value={value || 0}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          min={field.min}
          max={field.max}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          floatLabel={floatLabel || false}
          filled={filled || false}
          showButtons={advanced.showButtons || false}
          buttonLayout={advanced.buttonLayout || "horizontal"}
          prefix={advanced.prefix || ""}
          suffix={advanced.suffix || ""}
          textAlign={textAlign || "left"}
          labelPosition={labelPosition || "top"}
          labelWidth={labelWidth || 30}
          showBorder={showBorder !== false}
          roundedCorners={roundedCorners || "medium"}
          fieldSize={fieldSize || "medium"}
          labelSize={labelSize || "medium"}
          colors={colors}
        />
      );

    case "password":
      return (
        <PasswordInputField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          floatLabel={floatLabel || false}
          filled={filled || false}
          textAlign={textAlign || "left"}
          labelPosition={labelPosition || "top"}
          labelWidth={labelWidth || 30}
          showBorder={showBorder !== false}
          roundedCorners={roundedCorners || "medium"}
          fieldSize={fieldSize || "medium"}
          labelSize={labelSize || "medium"}
          colors={colors}
        />
      );

    case "textarea":
      return (
        <div className="space-y-2">
          {fieldName && (
            <Label htmlFor={fieldId}>{fieldName}{required && <span className="text-red-500 ml-1">*</span>}</Label>
          )}
          <Textarea
            id={fieldId}
            value={value || ""}
            onChange={(e) => onInputChange(fieldId, e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={field.rows || 5}
          />
          {helpText && <p className="text-sm text-gray-500">{helpText}</p>}
        </div>
      );

    case "markdown":
      return (
        <MarkdownEditorField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          rows={field.rows || 3}
        />
      );

    case "wysiwyg":
      return (
        <WysiwygEditorField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          minHeight={field.minHeight || "200px"}
        />
      );

    case "blockeditor":
      return (
        <BlockEditorField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder}
          required={required}
          helpText={hasError ? errorMessage : helpText}
          minHeight={field.minHeight || "200px"}
        />
      );

    case "file":
    case "image":
      return (
        <div className="space-y-2">
          {fieldName && (
            <Label htmlFor={fieldId}>{fieldName}{required && <span className="text-red-500 ml-1">*</span>}</Label>
          )}
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-32 flex flex-col items-center justify-center border-dashed"
            onClick={() => alert("File upload not implemented in preview")}
          >
            <span className="text-sm text-gray-500">Click to upload {field.type}</span>
          </Button>
          {helpText && <p className="text-sm text-gray-500">{helpText}</p>}
        </div>
      );

    case "date":
      return (
        <InputTextField
          id={fieldId}
          label={fieldName}
          value={value || ""}
          onChange={(newValue) => onInputChange(fieldId, newValue)}
          placeholder={placeholder || "YYYY-MM-DD"}
          required={required}
          helpText={hasError ? errorMessage : helpText}
        />
      );

    case "select":
    case "multiselect":
    case "toggle":
    case "checkbox":
    case "radio":
    case "color":
    case "slug":
    case "tags":
    case "mask":
    case "otp":
    case "autocomplete":
      return (
        <div className="space-y-2">
          <Label htmlFor={fieldId}>{fieldName}</Label>
          <div className="p-4 border border-dashed rounded-md text-center bg-gray-50">
            <p className="text-sm text-gray-500">Field type '{field.type}' not available in preview</p>
          </div>
          {helpText && <p className="text-sm text-gray-500">{helpText}</p>}
        </div>
      );

    default:
      return (
        <div>
          <p className="text-sm text-gray-500">Field type '{field.type}' not supported in preview</p>
        </div>
      );
  }
};

export default FieldRenderer;
