
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { ThemeTab } from './ThemeTab';
import { ColorsTab } from './ColorsTab';
import { UIVariantsTab } from './UIVariantsTab';
import { CustomCSSTab } from './CustomCSSTab';
import { toast } from '@/hooks/use-toast';

interface AppearanceSettings {
  textAlign?: string;
  labelPosition?: string;
  labelWidth?: number;
  floatLabel?: boolean;
  filled?: boolean;
  showBorder?: boolean;
  showBackground?: boolean;
  roundedCorners?: string;
  fieldSize?: string;
  labelSize?: string;
  width?: number;
  display_mode?: string;
  showCharCount?: boolean;
  uiVariant?: string;
  isDarkMode?: boolean;
  customClass?: string;
  customCss?: string;
  colors?: {
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    labelColor?: string;
    helpTextColor?: string;
  };
}

const appearanceSchema = z.object({
  textAlign: z.enum(['left', 'center', 'right']).default('left'),
  labelPosition: z.enum(['top', 'left', 'right']).default('top'),
  labelWidth: z.number().min(10).max(90).default(30),
  floatLabel: z.boolean().default(false),
  filled: z.boolean().default(false),
  showBorder: z.boolean().default(true),
  showBackground: z.boolean().default(false),
  roundedCorners: z.enum(['none', 'small', 'medium', 'large']).default('medium'),
  fieldSize: z.enum(['small', 'medium', 'large']).default('medium'),
  labelSize: z.enum(['small', 'medium', 'large']).default('medium'),
  width: z.number().min(10).max(100).default(100),
  display_mode: z.enum(['default', 'compact', 'expanded']).default('default'),
  showCharCount: z.boolean().optional(),
  uiVariant: z.string().optional(),
  isDarkMode: z.boolean().default(false),
  customClass: z.string().optional(),
  customCss: z.string().optional(),
  colors: z.object({
    textColor: z.string().optional(),
    backgroundColor: z.string().optional(),
    borderColor: z.string().optional(),
    labelColor: z.string().optional(),
    helpTextColor: z.string().optional(),
  }).optional(),
});

interface FieldAppearancePanelProps {
  fieldType: string | null;
  initialData?: AppearanceSettings;
  onSave: (data: AppearanceSettings) => void;
}

export function FieldAppearancePanel({ fieldType, initialData = {}, onSave }: FieldAppearancePanelProps) {
  const [activeTab, setActiveTab] = useState<string>('layout');
  const [colorSettings, setColorSettings] = useState({
    textColor: initialData?.colors?.textColor || '',
    backgroundColor: initialData?.colors?.backgroundColor || '',
    borderColor: initialData?.colors?.borderColor || '',
    labelColor: initialData?.colors?.labelColor || '',
    helpTextColor: initialData?.colors?.helpTextColor || '',
  });

  const form = useForm<AppearanceSettings>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      textAlign: initialData.textAlign || 'left',
      labelPosition: initialData.labelPosition || 'top',
      labelWidth: initialData.labelWidth || 30,
      floatLabel: initialData.floatLabel || false,
      filled: initialData.filled || false,
      showBorder: initialData.showBorder !== false,
      showBackground: initialData.showBackground || false,
      roundedCorners: initialData.roundedCorners || 'medium',
      fieldSize: initialData.fieldSize || 'medium',
      labelSize: initialData.labelSize || 'medium',
      width: initialData.width || 100,
      display_mode: initialData.display_mode || 'default',
      showCharCount: initialData.showCharCount || false,
      uiVariant: initialData.uiVariant || 'default',
      isDarkMode: initialData.isDarkMode || false,
      customClass: initialData.customClass || '',
      customCss: initialData.customCss || '',
      colors: initialData.colors || {
        textColor: '',
        backgroundColor: '',
        borderColor: '',
        labelColor: '',
        helpTextColor: '',
      },
    },
  });
  
  const handleSubmit = (data: AppearanceSettings) => {
    try {
      // Combine form data with color settings
      const combinedData = {
        ...data,
        colors: colorSettings,
      };
      
      onSave(combinedData);
      
      toast({
        title: "Appearance updated",
        description: "Field appearance settings have been saved",
      });
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      toast({
        title: "Error saving appearance",
        description: "There was a problem saving your appearance settings. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleColorUpdate = (colors: any) => {
    setColorSettings(colors);
    // Immediately update combined data since color tab doesn't have its own submit button
    const formValues = form.getValues();
    onSave({
      ...formValues,
      colors: colors,
    });
  };
  
  const handleThemeUpdate = (theme: any) => {
    // Update form values with theme settings
    form.setValue('textAlign', theme.textAlign || 'left');
    form.setValue('labelPosition', theme.labelPosition || 'top');
    form.setValue('fieldSize', theme.fieldSize || 'medium');
    form.setValue('filled', theme.filled || false);
    form.setValue('roundedCorners', theme.roundedCorners || 'medium');
    
    // Submit form with updated values
    handleSubmit(form.getValues());
  };
  
  const handleUIVariantUpdate = (variant: string) => {
    form.setValue('uiVariant', variant);
    handleSubmit(form.getValues());
  };
  
  const handleCustomCSSUpdate = (css: string) => {
    form.setValue('customCss', css);
    handleSubmit(form.getValues());
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="layout" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="layout">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="textAlign"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Alignment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select text alignment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="labelPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select label position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              {form.watch('labelPosition') !== 'top' && (
                <FormField
                  control={form.control}
                  name="labelWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label Width (%)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            defaultValue={[field.value]}
                            min={10}
                            max={90}
                            step={5}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                          <div className="flex justify-between">
                            <span className="text-xs text-muted-foreground">10%</span>
                            <span className="text-xs font-medium">{field.value}%</span>
                            <span className="text-xs text-muted-foreground">90%</span>
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="floatLabel"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Floating Label</FormLabel>
                        <FormDescription>
                          Label floats to top when field is active
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="filled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Filled Style</FormLabel>
                        <FormDescription>
                          Field has a filled background
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="showBorder"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Show Border</FormLabel>
                        <FormDescription>
                          Display border around the field
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="roundedCorners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rounded Corners</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select corner style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fieldSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select field size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="labelSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select label size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Width (%)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[field.value]}
                          min={10}
                          max={100}
                          step={5}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">10%</span>
                          <span className="text-xs font-medium">{field.value}%</span>
                          <span className="text-xs text-muted-foreground">100%</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {['text', 'textarea'].includes(fieldType || '') && (
                <FormField
                  control={form.control}
                  name="showCharCount"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Show Character Count</FormLabel>
                        <FormDescription>
                          Display character count below the field
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 mt-4">
                Save Layout Settings
              </Button>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="theme">
          <ThemeTab onUpdate={handleThemeUpdate} initialData={initialData} />
        </TabsContent>
        
        <TabsContent value="colors">
          <ColorsTab onUpdate={handleColorUpdate} initialColors={initialData?.colors} />
        </TabsContent>
        
        <TabsContent value="advanced">
          <div className="space-y-6 py-4">
            <Tabs defaultValue="ui-variants">
              <TabsList>
                <TabsTrigger value="ui-variants">UI Variants</TabsTrigger>
                <TabsTrigger value="custom-css">Custom CSS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ui-variants">
                <UIVariantsTab onUpdate={handleUIVariantUpdate} initialVariant={initialData?.uiVariant} />
              </TabsContent>
              
              <TabsContent value="custom-css">
                <CustomCSSTab onUpdate={handleCustomCSSUpdate} initialCSS={initialData?.customCss} />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
