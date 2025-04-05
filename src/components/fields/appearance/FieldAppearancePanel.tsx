
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorPicker } from '@/components/ui/color-picker';
import { Button } from '@/components/ui/button';

interface FieldAppearancePanelProps {
  fieldType: string | null;
  initialData?: any;
  onSave: (data: any) => void;
}

export function FieldAppearancePanel({ fieldType, initialData = {}, onSave }: FieldAppearancePanelProps) {
  const [activeTab, setActiveTab] = useState('layout');
  
  // Layout settings
  const [floatLabel, setFloatLabel] = useState(initialData?.floatLabel || false);
  const [filled, setFilled] = useState(initialData?.filled || false);
  const [textAlign, setTextAlign] = useState(initialData?.textAlign || 'left');
  const [labelPosition, setLabelPosition] = useState(initialData?.labelPosition || 'top');
  const [labelWidth, setLabelWidth] = useState(initialData?.labelWidth || 30);
  
  // Style settings
  const [showBorder, setShowBorder] = useState(initialData?.showBorder !== false);
  const [showBackground, setShowBackground] = useState(initialData?.showBackground || false);
  const [roundedCorners, setRoundedCorners] = useState(initialData?.roundedCorners || 'medium');
  const [fieldSize, setFieldSize] = useState(initialData?.fieldSize || 'medium');
  const [labelSize, setLabelSize] = useState(initialData?.labelSize || 'medium');
  const [uiVariant, setUiVariant] = useState(initialData?.uiVariant || 'default');
  
  // Advanced settings
  const [customClass, setCustomClass] = useState(initialData?.customClass || '');
  const [customCss, setCustomCss] = useState(initialData?.customCss || '');
  const [isDarkMode, setIsDarkMode] = useState(initialData?.isDarkMode || false);
  
  // Color settings
  const [colors, setColors] = useState(initialData?.colors || {
    border: '',
    text: '',
    background: '',
    focus: '',
    label: ''
  });
  
  // Update settings when initialData changes
  useEffect(() => {
    if (initialData) {
      setFloatLabel(initialData.floatLabel || false);
      setFilled(initialData.filled || false);
      setTextAlign(initialData.textAlign || 'left');
      setLabelPosition(initialData.labelPosition || 'top');
      setLabelWidth(initialData.labelWidth || 30);
      setShowBorder(initialData.showBorder !== false);
      setShowBackground(initialData.showBackground || false);
      setRoundedCorners(initialData.roundedCorners || 'medium');
      setFieldSize(initialData.fieldSize || 'medium');
      setLabelSize(initialData.labelSize || 'medium');
      setUiVariant(initialData.uiVariant || 'default');
      setCustomClass(initialData.customClass || '');
      setCustomCss(initialData.customCss || '');
      setIsDarkMode(initialData.isDarkMode || false);
      setColors(initialData.colors || {
        border: '',
        text: '',
        background: '',
        focus: '',
        label: ''
      });
    }
  }, [initialData]);
  
  // Immediately save changes when any setting is updated
  useEffect(() => {
    handleSave();
  }, [
    floatLabel, 
    filled, 
    textAlign, 
    labelPosition, 
    labelWidth, 
    showBorder, 
    showBackground, 
    roundedCorners,
    fieldSize,
    labelSize,
    uiVariant
  ]);
  
  const handleSave = () => {
    const appearanceData = {
      floatLabel,
      filled,
      textAlign,
      labelPosition,
      labelWidth,
      showBorder,
      showBackground,
      roundedCorners,
      fieldSize,
      labelSize,
      uiVariant,
      customClass,
      customCss,
      isDarkMode,
      colors
    };
    
    onSave(appearanceData);
  };
  
  const handleColorChange = (type: string, value: string) => {
    setColors((prev) => ({
      ...prev,
      [type]: value
    }));
    
    // Save after color change
    handleSave();
  };
  
  const handleCustomSettingsSave = () => {
    handleSave();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Appearance Settings</h2>
      <p className="text-gray-500">
        Customize how your field looks and behaves
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="floatLabel">Floating Label</Label>
                    <p className="text-sm text-gray-500">
                      Label floats above the input when focused or filled
                    </p>
                  </div>
                  <Switch
                    id="floatLabel"
                    checked={floatLabel}
                    onCheckedChange={setFloatLabel}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="filled">Filled Style</Label>
                    <p className="text-sm text-gray-500">
                      Input has a background color
                    </p>
                  </div>
                  <Switch
                    id="filled"
                    checked={filled}
                    onCheckedChange={setFilled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textAlign">Text Alignment</Label>
                  <Select
                    value={textAlign}
                    onValueChange={setTextAlign}
                  >
                    <SelectTrigger id="textAlign">
                      <SelectValue placeholder="Text alignment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="labelPosition">Label Position</Label>
                  <Select
                    value={labelPosition}
                    onValueChange={setLabelPosition}
                  >
                    <SelectTrigger id="labelPosition">
                      <SelectValue placeholder="Label position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {labelPosition === 'left' && (
                  <div className="space-y-2">
                    <Label htmlFor="labelWidth">
                      Label Width (%) - {labelWidth}%
                    </Label>
                    <Input
                      id="labelWidth"
                      type="range"
                      min={10}
                      max={50}
                      value={labelWidth}
                      onChange={(e) => setLabelWidth(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="style">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="showBorder">Show Border</Label>
                  <p className="text-sm text-gray-500">
                    Display a border around the input
                  </p>
                </div>
                <Switch
                  id="showBorder"
                  checked={showBorder}
                  onCheckedChange={setShowBorder}
                />
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="showBackground">Show Background</Label>
                  <p className="text-sm text-gray-500">
                    Display a background color
                  </p>
                </div>
                <Switch
                  id="showBackground"
                  checked={showBackground}
                  onCheckedChange={setShowBackground}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roundedCorners">Corner Radius</Label>
                <Select
                  value={roundedCorners}
                  onValueChange={setRoundedCorners}
                >
                  <SelectTrigger id="roundedCorners">
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
              
              <div className="space-y-2">
                <Label htmlFor="fieldSize">Field Size</Label>
                <Select
                  value={fieldSize}
                  onValueChange={setFieldSize}
                >
                  <SelectTrigger id="fieldSize">
                    <SelectValue placeholder="Field size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="labelSize">Label Size</Label>
                <Select
                  value={labelSize}
                  onValueChange={setLabelSize}
                >
                  <SelectTrigger id="labelSize">
                    <SelectValue placeholder="Label size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="uiVariant">UI Variant</Label>
                <Select
                  value={uiVariant}
                  onValueChange={setUiVariant}
                >
                  <SelectTrigger id="uiVariant">
                    <SelectValue placeholder="UI variant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="underlined">Underlined</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="colors">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label>Border Color</Label>
                <div className="flex items-center space-x-2">
                  <ColorPicker
                    value={colors.border || ''}
                    onChange={(value) => handleColorChange('border', value)}
                    presetColors={[
                      "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b",
                      "#ef4444", "#f97316", "#f59e0b", "#eab308",
                      "#84cc16", "#10b981", "#06b6d4", "#3b82f6"
                    ]}
                  />
                  <Input 
                    value={colors.border || ''}
                    onChange={(e) => handleColorChange('border', e.target.value)}
                    placeholder="#e2e8f0"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex items-center space-x-2">
                  <ColorPicker
                    value={colors.text || ''}
                    onChange={(value) => handleColorChange('text', value)}
                    presetColors={[
                      "#0f172a", "#1e293b", "#334155", "#64748b",
                      "#94a3b8", "#cbd5e1", "#e2e8f0", "#f1f5f9"
                    ]}
                  />
                  <Input 
                    value={colors.text || ''}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    placeholder="#1e293b"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex items-center space-x-2">
                  <ColorPicker
                    value={colors.background || ''}
                    onChange={(value) => handleColorChange('background', value)}
                    presetColors={[
                      "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1",
                      "#94a3b8", "#64748b", "#475569", "#334155"
                    ]}
                  />
                  <Input 
                    value={colors.background || ''}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    placeholder="#f1f5f9"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Focus Color</Label>
                <div className="flex items-center space-x-2">
                  <ColorPicker
                    value={colors.focus || ''}
                    onChange={(value) => handleColorChange('focus', value)}
                    presetColors={[
                      "#3b82f6", "#06b6d4", "#10b981", "#84cc16",
                      "#eab308", "#f59e0b", "#f97316", "#ef4444"
                    ]}
                  />
                  <Input 
                    value={colors.focus || ''}
                    onChange={(e) => handleColorChange('focus', e.target.value)}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Label Color</Label>
                <div className="flex items-center space-x-2">
                  <ColorPicker
                    value={colors.label || ''}
                    onChange={(value) => handleColorChange('label', value)}
                    presetColors={[
                      "#64748b", "#475569", "#334155", "#1e293b",
                      "#0f172a", "#94a3b8", "#cbd5e1", "#e2e8f0"
                    ]}
                  />
                  <Input 
                    value={colors.label || ''}
                    onChange={(e) => handleColorChange('label', e.target.value)}
                    placeholder="#64748b"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customClass">Custom CSS Class</Label>
                <Input 
                  id="customClass"
                  value={customClass}
                  onChange={(e) => setCustomClass(e.target.value)}
                  placeholder="e.g. my-custom-field"
                />
                <p className="text-xs text-gray-500">
                  Add custom CSS classes to the field
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customCss">Custom CSS</Label>
                <Textarea 
                  id="customCss"
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  placeholder="e.g. color: red; font-weight: bold;"
                  rows={5}
                />
                <p className="text-xs text-gray-500">
                  Add custom CSS styles to the field
                </p>
              </div>
              
              <div className="flex flex-row items-center justify-between space-x-2">
                <div>
                  <Label htmlFor="isDarkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">
                    Enable dark mode styles for this field
                  </p>
                </div>
                <Switch
                  id="isDarkMode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={handleCustomSettingsSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Save Custom Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FieldAppearancePanel;
