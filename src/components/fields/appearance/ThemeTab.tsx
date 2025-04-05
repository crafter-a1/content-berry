
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ThemeOption {
  id: string;
  name: string;
  description?: string;
  preview: React.ReactNode;
  settings: any;
}

interface ThemeTabProps {
  onUpdate: (theme: any) => void;
  initialData?: any;
}

export function ThemeTab({ onUpdate, initialData }: ThemeTabProps) {
  const handleSelectTheme = (theme: any) => {
    onUpdate(theme.settings);
  };

  const themeOptions: ThemeOption[] = [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard form field appearance',
      preview: (
        <div className="h-10 w-full border rounded-md bg-background"></div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'top',
        filled: false,
        roundedCorners: 'medium',
        fieldSize: 'medium'
      }
    },
    {
      id: 'material',
      name: 'Material Design',
      description: 'Google\'s Material Design style',
      preview: (
        <div className="h-10 w-full border-b-2 border-primary"></div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'top',
        floatLabel: true,
        filled: false,
        roundedCorners: 'none',
        fieldSize: 'medium'
      }
    },
    {
      id: 'filled',
      name: 'Filled Style',
      description: 'Fields with background color',
      preview: (
        <div className="h-10 w-full rounded-md bg-gray-100"></div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'top',
        filled: true,
        roundedCorners: 'medium',
        fieldSize: 'medium'
      }
    },
    {
      id: 'compact',
      name: 'Compact',
      description: 'Smaller field size',
      preview: (
        <div className="h-8 w-full border rounded-sm bg-background"></div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'top',
        filled: false,
        roundedCorners: 'small',
        fieldSize: 'small'
      }
    },
    {
      id: 'large',
      name: 'Large',
      description: 'Bigger field size',
      preview: (
        <div className="h-12 w-full border rounded-lg bg-background"></div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'top',
        filled: false,
        roundedCorners: 'large',
        fieldSize: 'large'
      }
    },
    {
      id: 'inline',
      name: 'Inline Label',
      description: 'Label next to the field',
      preview: (
        <div className="flex items-center gap-2">
          <div className="w-1/3 h-5"></div>
          <div className="w-2/3 h-10 border rounded-md bg-background"></div>
        </div>
      ),
      settings: {
        textAlign: 'left',
        labelPosition: 'left',
        labelWidth: 30,
        filled: false,
        roundedCorners: 'medium',
        fieldSize: 'medium'
      }
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-lg font-medium mb-4">Select a Theme</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Choose a pre-designed theme to apply to your field.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themeOptions.map((theme) => (
          <Card
            key={theme.id}
            className="p-4 cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleSelectTheme(theme)}
          >
            <div className="mb-3">
              <h3 className="font-medium">{theme.name}</h3>
              {theme.description && (
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              )}
            </div>
            <div className="mb-3">
              {theme.preview}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => handleSelectTheme(theme)}
            >
              Apply Theme
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ThemeTab;
