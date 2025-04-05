
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FieldAppearancePanelProps {
  fieldType: string | null;
  initialData: any;
  onSave: (data: any) => void;
}

export function FieldAppearancePanel({ fieldType, initialData, onSave }: FieldAppearancePanelProps) {
  const [appearanceSettings, setAppearanceSettings] = useState<any>({
    textAlign: 'left',
    labelPosition: 'top',
    labelWidth: 30,
    floatLabel: false,
    filled: false,
    showBorder: true,
    showBackground: true,
    roundedCorners: 'medium',
    fieldSize: 'medium',
    labelSize: 'medium',
    uiVariant: 'default',
    customClass: '',
    customCss: '',
    colors: {
      border: '#e2e8f0',
      text: '#1e293b',
      background: '#f1f5f9',
      focus: '#3b82f6',
      label: '#64748b'
    },
    ...initialData
  });

  useEffect(() => {
    setAppearanceSettings({
      textAlign: 'left',
      labelPosition: 'top',
      labelWidth: 30,
      floatLabel: false,
      filled: false,
      showBorder: true,
      showBackground: true,
      roundedCorners: 'medium',
      fieldSize: 'medium',
      labelSize: 'medium',
      uiVariant: 'default',
      customClass: '',
      customCss: '',
      colors: {
        border: '#e2e8f0',
        text: '#1e293b',
        background: '#f1f5f9',
        focus: '#3b82f6',
        label: '#64748b'
      },
      ...initialData
    });
  }, [initialData]);

  const handleChange = (property: string, value: any) => {
    setAppearanceSettings((prev: any) => ({
      ...prev,
      [property]: value
    }));
  };

  const handleColorChange = (colorType: string, value: string) => {
    setAppearanceSettings((prev: any) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleSaveChanges = () => {
    onSave(appearanceSettings);
    toast({
      title: "Appearance settings saved",
      description: "Your appearance changes have been applied"
    });
  };

  const renderFieldSpecificSettings = () => {
    switch (fieldType) {
      case 'text':
      case 'password':
      case 'number':
      case 'mask':
      case 'slug':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="textAlign">Text Alignment</Label>
                <Select
                  value={appearanceSettings.textAlign || 'left'}
                  onValueChange={(value) => handleChange('textAlign', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select text alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="floatLabel">Float Label</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="floatLabel"
                    checked={!!appearanceSettings.floatLabel}
                    onCheckedChange={(checked) => handleChange('floatLabel', checked)}
                  />
                  <Label htmlFor="floatLabel" className="cursor-pointer">
                    {appearanceSettings.floatLabel ? 'Enabled' : 'Disabled'}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'textarea':
      case 'markdown':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="rows">Default Rows</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="rows"
                  type="number"
                  min={3}
                  max={20}
                  value={appearanceSettings.rows || 5}
                  onChange={(e) => handleChange('rows', Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">rows</span>
              </div>
            </div>
            <div>
              <Label htmlFor="showCharCount">Character Counter</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="showCharCount"
                  checked={!!appearanceSettings.showCharCount}
                  onCheckedChange={(checked) => handleChange('showCharCount', checked)}
                />
                <Label htmlFor="showCharCount" className="cursor-pointer">
                  {appearanceSettings.showCharCount ? 'Visible' : 'Hidden'}
                </Label>
              </div>
            </div>
          </div>
        );
      case 'wysiwyg':
      case 'blockeditor':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="minHeight">Minimum Height</Label>
              <Input
                id="minHeight"
                value={appearanceSettings.minHeight || '200px'}
                onChange={(e) => handleChange('minHeight', e.target.value)}
                placeholder="e.g. 200px"
              />
              <p className="text-sm text-muted-foreground mt-1">
                CSS value (px, rem, vh, etc.)
              </p>
            </div>
            <div>
              <Label htmlFor="showToolbar">Show Toolbar</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="showToolbar"
                  checked={appearanceSettings.showToolbar !== false}
                  onCheckedChange={(checked) => handleChange('showToolbar', checked)}
                />
                <Label htmlFor="showToolbar" className="cursor-pointer">
                  {appearanceSettings.showToolbar !== false ? 'Visible' : 'Hidden'}
                </Label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="layout" className="w-full">
        <TabsList>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="labelPosition">Label Position</Label>
              <Select
                value={appearanceSettings.labelPosition || 'top'}
                onValueChange={(value) => handleChange('labelPosition', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Label position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {appearanceSettings.labelPosition === 'left' && (
              <div>
                <Label htmlFor="labelWidth">Label Width (%)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="labelWidth"
                    value={[appearanceSettings.labelWidth || 30]}
                    min={10}
                    max={50}
                    step={5}
                    onValueChange={(value) => handleChange('labelWidth', value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{appearanceSettings.labelWidth || 30}%</span>
                </div>
              </div>
            )}
          </div>
          
          {renderFieldSpecificSettings()}
        </TabsContent>
        
        <TabsContent value="style" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldSize">Field Size</Label>
              <Select
                value={appearanceSettings.fieldSize || 'medium'}
                onValueChange={(value) => handleChange('fieldSize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Field size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="labelSize">Label Size</Label>
              <Select
                value={appearanceSettings.labelSize || 'medium'}
                onValueChange={(value) => handleChange('labelSize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Label size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="roundedCorners">Corner Radius</Label>
              <Select
                value={appearanceSettings.roundedCorners || 'medium'}
                onValueChange={(value) => handleChange('roundedCorners', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Corner radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="filled">Fill Style</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="filled"
                  checked={!!appearanceSettings.filled}
                  onCheckedChange={(checked) => handleChange('filled', checked)}
                />
                <Label htmlFor="filled" className="cursor-pointer">
                  {appearanceSettings.filled ? 'Filled' : 'Default'}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="showBorder">Show Border</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="showBorder"
                  checked={appearanceSettings.showBorder !== false}
                  onCheckedChange={(checked) => handleChange('showBorder', checked)}
                />
                <Label htmlFor="showBorder" className="cursor-pointer">
                  {appearanceSettings.showBorder !== false ? 'Visible' : 'Hidden'}
                </Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="showBackground">Show Background</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="showBackground"
                  checked={!!appearanceSettings.showBackground}
                  onCheckedChange={(checked) => handleChange('showBackground', checked)}
                />
                <Label htmlFor="showBackground" className="cursor-pointer">
                  {appearanceSettings.showBackground ? 'Visible' : 'Hidden'}
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="borderColor">Border Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300" 
                  style={{ backgroundColor: appearanceSettings.colors?.border || '#e2e8f0' }}
                />
                <Input
                  id="borderColor"
                  value={appearanceSettings.colors?.border || '#e2e8f0'}
                  onChange={(e) => handleColorChange('border', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300" 
                  style={{ backgroundColor: appearanceSettings.colors?.text || '#1e293b' }}
                />
                <Input
                  id="textColor"
                  value={appearanceSettings.colors?.text || '#1e293b'}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300" 
                  style={{ backgroundColor: appearanceSettings.colors?.background || '#f1f5f9' }}
                />
                <Input
                  id="backgroundColor"
                  value={appearanceSettings.colors?.background || '#f1f5f9'}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="focusColor">Focus Color</Label>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-300" 
                  style={{ backgroundColor: appearanceSettings.colors?.focus || '#3b82f6' }}
                />
                <Input
                  id="focusColor"
                  value={appearanceSettings.colors?.focus || '#3b82f6'}
                  onChange={(e) => handleColorChange('focus', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="labelColor">Label Color</Label>
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded border border-gray-300" 
                style={{ backgroundColor: appearanceSettings.colors?.label || '#64748b' }}
              />
              <Input
                id="labelColor"
                value={appearanceSettings.colors?.label || '#64748b'}
                onChange={(e) => handleColorChange('label', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <div>
            <Label htmlFor="customClass">Custom CSS Class</Label>
            <Input
              id="customClass"
              value={appearanceSettings.customClass || ''}
              onChange={(e) => handleChange('customClass', e.target.value)}
              placeholder="e.g. my-special-field"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Add custom CSS classes to the field
            </p>
          </div>
          
          <div>
            <Label htmlFor="customCss">Custom CSS</Label>
            <Textarea
              id="customCss"
              value={appearanceSettings.customCss || ''}
              onChange={(e) => handleChange('customCss', e.target.value)}
              placeholder="e.g. .my-field { border-color: red; }"
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Add custom CSS styles (will be inserted inline)
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleSaveChanges}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save Appearance Settings
        </Button>
      </div>
    </div>
  );
}

export default FieldAppearancePanel;
