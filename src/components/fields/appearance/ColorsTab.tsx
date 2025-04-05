
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorTabProps {
  onUpdate: (colors: any) => void;
  initialColors?: any;
}

export function ColorsTab({ onUpdate, initialColors = {} }: ColorTabProps) {
  const [colors, setColors] = useState({
    textColor: initialColors?.textColor || '',
    backgroundColor: initialColors?.backgroundColor || '',
    borderColor: initialColors?.borderColor || '',
    labelColor: initialColors?.labelColor || '',
    helpTextColor: initialColors?.helpTextColor || '',
  });

  useEffect(() => {
    if (initialColors) {
      setColors({
        textColor: initialColors.textColor || '',
        backgroundColor: initialColors.backgroundColor || '',
        borderColor: initialColors.borderColor || '',
        labelColor: initialColors.labelColor || '',
        helpTextColor: initialColors.helpTextColor || '',
      });
    }
  }, [initialColors]);

  const handleColorChange = (colorType: string, color: string) => {
    const updatedColors = { ...colors, [colorType]: color };
    setColors(updatedColors);
    onUpdate(updatedColors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, colorType: string) => {
    handleColorChange(colorType, e.target.value);
  };

  return (
    <div className="py-4 space-y-6">
      <h2 className="text-lg font-medium mb-4">Color Settings</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Customize the colors of your field. Use hex color values or color names.
      </p>

      <ColorPicker
        label="Text Color"
        description="Color of the input text"
        value={colors.textColor}
        onChange={(color) => handleColorChange('textColor', color)}
        onInputChange={(e) => handleInputChange(e, 'textColor')}
      />
      
      <ColorPicker
        label="Background Color"
        description="Color of the field background"
        value={colors.backgroundColor}
        onChange={(color) => handleColorChange('backgroundColor', color)}
        onInputChange={(e) => handleInputChange(e, 'backgroundColor')}
      />
      
      <ColorPicker
        label="Border Color"
        description="Color of the field border"
        value={colors.borderColor}
        onChange={(color) => handleColorChange('borderColor', color)}
        onInputChange={(e) => handleInputChange(e, 'borderColor')}
      />
      
      <ColorPicker
        label="Label Color"
        description="Color of the field label"
        value={colors.labelColor}
        onChange={(color) => handleColorChange('labelColor', color)}
        onInputChange={(e) => handleInputChange(e, 'labelColor')}
      />
      
      <ColorPicker
        label="Help Text Color"
        description="Color of the help text"
        value={colors.helpTextColor}
        onChange={(color) => handleColorChange('helpTextColor', color)}
        onInputChange={(e) => handleInputChange(e, 'helpTextColor')}
      />
    </div>
  );
}

interface ColorPickerProps {
  label: string;
  description?: string;
  value: string;
  onChange: (color: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ColorPicker({ label, description, value, onChange, onInputChange }: ColorPickerProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-md border"
              style={{ backgroundColor: value || 'transparent' }}
            >
              <span className="sr-only">Pick a color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3">
              <input
                type="color"
                value={value || '#ffffff'}
                onChange={(e) => onChange(e.target.value)}
                className="w-32 h-32"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={value || ''}
          onChange={onInputChange}
          placeholder="#000000 or color name"
          className="max-w-xs"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

export default ColorsTab;
