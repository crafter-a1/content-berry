
import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadFieldProps {
  id: string;
  label?: string;
  value?: string | File;
  onChange: (value: File | string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  customClass?: string;
  maxSize?: number; // in MB
}

export function ImageUploadField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select image',
  required = false,
  helpText,
  className,
  customClass,
  maxSize = 5 // Default max size is 5MB
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    
    if (file) {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size exceeds ${maxSize}MB limit`);
        return;
      }
      
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      onChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // If we have a string URL as the value, use it as preview
  React.useEffect(() => {
    if (typeof value === 'string' && value && !preview) {
      setPreview(value);
    }
  }, [value, preview]);

  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="flex flex-col space-y-2">
        {preview ? (
          <div className="relative max-w-xs">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-40 rounded-md object-contain border" 
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={handleRemoveImage}
            >
              <X size={14} />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="flex gap-2 max-w-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={16} />
            {placeholder}
          </Button>
        )}
        
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          required={required}
          aria-describedby={helpText ? `${id}-description` : undefined}
        />
        
        {error && (
          <p className="text-destructive text-xs">{error}</p>
        )}
        
        {helpText && !error && (
          <p id={`${id}-description`} className="text-muted-foreground text-xs">
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUploadField;
