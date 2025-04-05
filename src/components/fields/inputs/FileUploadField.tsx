
import React, { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadFieldProps {
  id: string;
  label?: string;
  value?: string | File;
  onChange: (value: File | string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  customClass?: string;
  accept?: string;
}

export function FileUploadField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select file',
  required = false,
  helpText,
  className,
  customClass,
  accept
}: FileUploadFieldProps) {
  const [filename, setFilename] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      onChange(file);
    }
  };

  const handleRemoveFile = () => {
    setFilename('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} />
            {placeholder}
          </Button>
          <input
            ref={fileInputRef}
            id={id}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            required={required}
            aria-describedby={helpText ? `${id}-description` : undefined}
          />
          
          {filename && (
            <div className="flex items-center gap-2 px-3 py-1 border rounded-md bg-muted/50">
              <FileText size={16} className="text-blue-500" />
              <span className="text-sm truncate max-w-[200px]">{filename}</span>
              <Button 
                type="button"
                variant="ghost" 
                size="icon"
                className="h-5 w-5" 
                onClick={handleRemoveFile}
              >
                <X size={14} />
              </Button>
            </div>
          )}
        </div>

        {helpText && (
          <p id={`${id}-description`} className="text-muted-foreground text-xs">
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
}

export default FileUploadField;
