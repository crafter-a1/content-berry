
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ColorPicker } from '../ui/color-picker';

interface AppearanceSettings {
  floatLabel?: boolean;
  filled?: boolean;
  width?: number;
  display_mode?: string;
  showCharCount?: boolean;
  customClass?: string;
  customCss?: string;
  textAlign?: string;
  labelPosition?: string;
  labelWidth?: number;
  showBorder?: boolean;
  showBackground?: boolean;
  roundedCorners?: string;
  fieldSize?: string;
  labelSize?: string;
  uiVariant?: string;
  isDarkMode?: boolean;
  colors?: {
    border?: string;
    text?: string;
    background?: string;
    focus?: string;
    label?: string;
  };
}

interface FieldAppearancePanelProps {
  fieldType: string | null;
  initialData: AppearanceSettings;
  onSave: (data: AppearanceSettings) => void;
}

export function FieldAppearancePanel({ fieldType, initialData, onSave }: FieldAppearancePanelProps) {
  const [activeTab, setActiveTab] = useState('ui');
  const [settings, setSettings] = useState<AppearanceSettings>(initialData || {});
  const [colors, setColors] = useState<Record<string, string>>(initialData?.colors || {});
  
  const handleChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSave(newSettings);
  };
  
  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    const newSettings = { ...settings, colors: newColors };
    setSettings(newSettings);
    onSave(newSettings);
  };
  
  const renderPreview = () => {
    switch (fieldType) {
      case 'text':
      case 'email':
      case 'url':
      case 'password':
      case 'number':
        return (
          <div className="p-4 border rounded-md mt-4">
            <h3 className="text-sm font-medium mb-4">Preview</h3>
            <div 
              className="w-full"
              style={{
                display: settings.labelPosition === 'left' ? 'flex' : 'block',
                alignItems: 'center'
              }}
            >
              {/* Label */}
              <div 
                style={{
                  width: settings.labelPosition === 'left' ? `${settings.labelWidth || 30}%` : '100%',
                  marginBottom: settings.labelPosition === 'top' ? '0.5rem' : '0',
                  fontSize: settings.labelSize === 'small' ? '0.875rem' : 
                           settings.labelSize === 'large' ? '1.125rem' : '1rem',
                  fontWeight: settings.labelSize === 'large' ? 600 : 500,
                  color: colors.label || '#64748b',
                  textAlign: settings.textAlign as any || 'left'
                }}
              >
                Field Label
              </div>
              
              {/* Input */}
              <div 
                className="relative"
                style={{
                  width: settings.labelPosition === 'left' ? `${100 - (settings.labelWidth || 30)}%` : '100%',
                }}
              >
                <div
                  className={`w-full h-10 ${settings.filled ? 'bg-gray-100' : 'bg-white'} ${settings.showBorder !== false ? 'border' : 'border-0'}`}
                  style={{
                    borderColor: colors.border || '#e2e8f0',
                    borderRadius: settings.roundedCorners === 'none' ? '0' :
                                 settings.roundedCorners === 'small' ? '0.25rem' :
                                 settings.roundedCorners === 'large' ? '0.5rem' : '0.375rem',
                    padding: settings.fieldSize === 'small' ? '0.375rem 0.5rem' :
                            settings.fieldSize === 'large' ? '0.75rem 1rem' : '0.5rem 0.75rem',
                    fontSize: settings.fieldSize === 'small' ? '0.875rem' :
                             settings.fieldSize === 'medium' ? '1rem' : '1.125rem',
                    color: colors.text || '#1e293b',
                    backgroundColor: settings.filled ? (colors.background || '#f1f5f9') : 'transparent',
                  }}
                >
                  {settings.floatLabel && (
                    <span 
                      className="absolute -top-3 left-2 px-1 bg-white text-xs"
                      style={{ color: colors.focus || '#3b82f6' }}
                    >
                      Floating Label
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border rounded-md mt-4 text-center text-gray-500">
            Preview not available for this field type
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-2 mb-4 border-b">
        <h2 className="text-lg font-medium">Field Appearance</h2>
        <p className="text-sm text-gray-500">
          Configure the visual appearance of your field
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ui">UI Variants</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="css">Custom CSS</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ui" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="labelPosition">Label Position</Label>
                    <Select 
                      value={settings.labelPosition || 'top'} 
                      onValueChange={(value) => handleChange('labelPosition', value)}
                    >
                      <SelectTrigger id="labelPosition" className="mt-1">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {settings.labelPosition === 'left' && (
                    <div>
                      <Label htmlFor="labelWidth">Label Width (%)</Label>
                      <Input
                        id="labelWidth"
                        type="number"
                        value={settings.labelWidth || 30}
                        onChange={(e) => handleChange('labelWidth', Number(e.target.value))}
                        className="mt-1"
                        min={10}
                        max={90}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="textAlign">Text Alignment</Label>
                    <Select 
                      value={settings.textAlign || 'left'} 
                      onValueChange={(value) => handleChange('textAlign', value)}
                    >
                      <SelectTrigger id="textAlign" className="mt-1">
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fieldSize">Field Size</Label>
                    <Select 
                      value={settings.fieldSize || 'medium'} 
                      onValueChange={(value) => handleChange('fieldSize', value)}
                    >
                      <SelectTrigger id="fieldSize" className="mt-1">
                        <SelectValue placeholder="Select size" />
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
                      value={settings.labelSize || 'medium'} 
                      onValueChange={(value) => handleChange('labelSize', value)}
                    >
                      <SelectTrigger id="labelSize" className="mt-1">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="roundedCorners">Corner Radius</Label>
                    <Select 
                      value={settings.roundedCorners || 'medium'} 
                      onValueChange={(value) => handleChange('roundedCorners', value)}
                    >
                      <SelectTrigger id="roundedCorners" className="mt-1">
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="floatLabel" 
                    checked={settings.floatLabel || false}
                    onCheckedChange={(checked) => handleChange('floatLabel', checked)}
                  />
                  <Label htmlFor="floatLabel">Floating Label</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="filled" 
                    checked={settings.filled || false}
                    onCheckedChange={(checked) => handleChange('filled', checked)}
                  />
                  <Label htmlFor="filled">Filled Style</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="showBorder" 
                    checked={settings.showBorder !== false}
                    onCheckedChange={(checked) => handleChange('showBorder', checked)}
                  />
                  <Label htmlFor="showBorder">Show Border</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="showCharCount" 
                    checked={settings.showCharCount || false}
                    onCheckedChange={(checked) => handleChange('showCharCount', checked)}
                  />
                  <Label htmlFor="showCharCount">Show Character Count</Label>
                </div>
              </div>
              
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="borderColor">Border Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: colors.border || '#e2e8f0' }}
                    ></div>
                    <Input
                      id="borderColor"
                      value={colors.border || '#e2e8f0'}
                      onChange={(e) => handleColorChange('border', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: colors.text || '#1e293b' }}
                    ></div>
                    <Input
                      id="textColor"
                      value={colors.text || '#1e293b'}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bgColor">Background Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: colors.background || '#f1f5f9' }}
                    ></div>
                    <Input
                      id="bgColor"
                      value={colors.background || '#f1f5f9'}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="focusColor">Focus Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: colors.focus || '#3b82f6' }}
                    ></div>
                    <Input
                      id="focusColor"
                      value={colors.focus || '#3b82f6'}
                      onChange={(e) => handleColorChange('focus', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="labelColor">Label Color</Label>
                  <div className="mt-2 flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: colors.label || '#64748b' }}
                    ></div>
                    <Input
                      id="labelColor"
                      value={colors.label || '#64748b'}
                      onChange={(e) => handleColorChange('label', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="uiVariant">UI Variant</Label>
                  <Select 
                    value={settings.uiVariant || 'default'} 
                    onValueChange={(value) => handleChange('uiVariant', value)}
                  >
                    <SelectTrigger id="uiVariant" className="mt-1">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pre-defined style combinations
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isDarkMode" 
                    checked={settings.isDarkMode || false}
                    onCheckedChange={(checked) => handleChange('isDarkMode', checked)}
                  />
                  <Label htmlFor="isDarkMode">Dark Mode</Label>
                </div>
              </div>
              
              {renderPreview()}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="css" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customClass">Custom Class</Label>
                  <Input
                    id="customClass"
                    value={settings.customClass || ''}
                    onChange={(e) => handleChange('customClass', e.target.value)}
                    placeholder="e.g. my-custom-field"
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Add custom CSS classes to the field
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="customCss">Custom CSS</Label>
                  <Textarea
                    id="customCss"
                    value={settings.customCss || ''}
                    onChange={(e) => handleChange('customCss', e.target.value)}
                    placeholder=".my-custom-field { ... }"
                    className="mt-1 font-mono"
                    rows={6}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Add custom CSS styles for advanced customization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={() => onSave(settings)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
}

export default FieldAppearancePanel;
