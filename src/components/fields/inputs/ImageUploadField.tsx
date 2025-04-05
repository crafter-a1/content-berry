
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ImageUploadFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  customClass?: string;
}

export function ImageUploadField({
  id,
  label,
  value = '',
  onChange,
  placeholder = 'Select an image...',
  required = false,
  helpText,
  customClass
}: ImageUploadFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Only accept image files
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Simulate file upload
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // In a real implementation, you would upload the file to a server
    // and get back a URL or identifier. Here we just use the name.
    onChange(file.name);
  };
  
  const handleRemoveImage = () => {
    onChange('');
    setPreview(null);
  };
  
  return (
    <div className={cn("space-y-2", customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="border-2 border-dashed rounded-lg p-6">
        {!value ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="font-medium">Upload your image</p>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to browse
            </p>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById(id)?.click()}
            >
              Choose Image
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {preview && (
              <div className="relative h-40 w-full overflow-hidden rounded-md border">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{value}</p>
                {isUploading && (
                  <Progress value={uploadProgress} className="h-1 mt-1" />
                )}
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="flex-shrink-0 h-8 w-8 p-0 text-red-500"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {helpText && (
        <p className="text-sm text-muted-foreground">{helpText}</p>
      )}
      
      <input 
        id={id}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        required={required}
      />
    </div>
  );
}

export default ImageUploadField;
