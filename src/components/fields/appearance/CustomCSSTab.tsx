
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomCSSTabProps {
  onUpdate: (css: string) => void;
  initialCSS?: string;
}

export function CustomCSSTab({ onUpdate, initialCSS = '' }: CustomCSSTabProps) {
  const [css, setCSS] = useState(initialCSS);
  const [customClass, setCustomClass] = useState('');

  useEffect(() => {
    setCSS(initialCSS || '');
  }, [initialCSS]);

  const handleSaveCSS = () => {
    onUpdate(css);
  };

  return (
    <div className="py-4 space-y-6">
      <div>
        <Label htmlFor="customClass">Custom Class Name</Label>
        <div className="flex mt-1.5 mb-1">
          <Input
            id="customClass"
            value={customClass}
            onChange={(e) => setCustomClass(e.target.value)}
            placeholder="e.g. my-custom-field"
            className="flex-1"
          />
          <Button
            onClick={() => onUpdate(customClass)}
            className="ml-2"
          >
            Apply Class
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Add a custom CSS class name to the field
        </p>
      </div>

      <div>
        <Label htmlFor="customCSS">Custom CSS</Label>
        <Textarea
          id="customCSS"
          value={css}
          onChange={(e) => setCSS(e.target.value)}
          placeholder=".my-custom-field {
  color: #3366ff;
  background-color: rgba(51, 102, 255, 0.1);
  border: 1px solid #3366ff;
}"
          className="font-mono h-64 mt-1.5"
        />
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          Write custom CSS for your field. Use the custom class name as selector.
        </p>
        <Button onClick={handleSaveCSS}>
          Save CSS
        </Button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Example Selectors</h3>
        <div className="text-sm space-y-2">
          <p><code>.my-custom-field</code> - The field container</p>
          <p><code>.my-custom-field label</code> - The field label</p>
          <p><code>.my-custom-field input</code> - The input element</p>
          <p><code>.my-custom-field p</code> - The help text</p>
        </div>
      </div>
    </div>
  );
}

export default CustomCSSTab;
