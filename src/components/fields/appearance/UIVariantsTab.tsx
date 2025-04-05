
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UIVariant {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
}

interface UIVariantsTabProps {
  onUpdate: (variant: string) => void;
  initialVariant?: string;
}

export function UIVariantsTab({ onUpdate, initialVariant = 'default' }: UIVariantsTabProps) {
  const handleSelectVariant = (variantId: string) => {
    onUpdate(variantId);
  };

  const variants: UIVariant[] = [
    {
      id: 'default',
      name: 'Default',
      description: 'Standard UI component',
      preview: (
        <div className="h-10 w-full border rounded-md bg-background"></div>
      ),
    },
    {
      id: 'bordered',
      name: 'Bordered',
      description: 'Component with distinct borders',
      preview: (
        <div className="h-10 w-full border-2 border-black rounded-md bg-background"></div>
      ),
    },
    {
      id: 'shadowed',
      name: 'Shadowed',
      description: 'Component with drop shadow',
      preview: (
        <div className="h-10 w-full border rounded-md shadow-lg bg-background"></div>
      ),
    },
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Gradient background',
      preview: (
        <div className="h-10 w-full border rounded-md bg-gradient-to-r from-blue-100 to-purple-100"></div>
      ),
    },
    {
      id: 'outlined',
      name: 'Outlined',
      description: 'Outline with transparent background',
      preview: (
        <div className="h-10 w-full border-2 border-blue-500 rounded-md bg-transparent"></div>
      ),
    },
    {
      id: 'underlined',
      name: 'Underlined',
      description: 'Bottom border only',
      preview: (
        <div className="h-10 w-full border-b-2 border-gray-300 bg-transparent"></div>
      ),
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-lg font-medium mb-2">UI Variants</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Choose an alternative visual style for your field.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {variants.map((variant) => (
          <Card
            key={variant.id}
            className={`p-4 cursor-pointer hover:border-primary transition-colors ${
              initialVariant === variant.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => handleSelectVariant(variant.id)}
          >
            <div className="mb-3">
              <h3 className="font-medium">{variant.name}</h3>
              <p className="text-sm text-muted-foreground">{variant.description}</p>
            </div>
            <div className="mb-3">
              {variant.preview}
            </div>
            <Button 
              variant={initialVariant === variant.id ? "default" : "outline"} 
              size="sm" 
              className="w-full"
              onClick={() => handleSelectVariant(variant.id)}
            >
              {initialVariant === variant.id ? 'Selected' : 'Select'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UIVariantsTab;
