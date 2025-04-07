
import React, { useState, useEffect } from 'react';
import { ValidationSettings } from '@/services/CollectionService';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { adaptInputChangeEvent } from '@/utils/inputAdapters';

interface FieldValidationPanelProps {
  fieldType: string | null;
  initialData: ValidationSettings;
  onUpdate: (data: ValidationSettings) => void;
}

export function FieldValidationPanel({ 
  fieldType, 
  initialData, 
  onUpdate 
}: FieldValidationPanelProps) {
  const [settings, setSettings] = useState<ValidationSettings>(initialData || {});
  
  useEffect(() => {
    setSettings(initialData || {});
  }, [initialData, fieldType]);

  const updateSetting = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onUpdate(newSettings);
  };

  const handleRequiredChange = (checked: boolean) => {
    updateSetting('required', checked);
  };

  const renderTextValidation = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormItem>
          <FormLabel>Min Length</FormLabel>
          <FormControl>
            <Input
              type="number" 
              min={0}
              value={settings.minLength || ''}
              onChange={(e) => updateSetting('minLength', parseInt(e.target.value) || null)}
            />
          </FormControl>
          <FormDescription>
            Minimum number of characters
          </FormDescription>
        </FormItem>
        
        <FormItem>
          <FormLabel>Max Length</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              min={0}
              value={settings.maxLength || ''}
              onChange={(e) => updateSetting('maxLength', parseInt(e.target.value) || null)}
            />
          </FormControl>
          <FormDescription>
            Maximum number of characters
          </FormDescription>
        </FormItem>
      </div>
      
      <FormItem>
        <FormLabel>Pattern</FormLabel>
        <FormControl>
          <Input 
            placeholder="Regular expression pattern"
            value={settings.pattern || ''}
            onChange={adaptInputChangeEvent((value) => updateSetting('pattern', value))}
          />
        </FormControl>
        <FormDescription>
          Regex pattern for validation (e.g. ^[a-zA-Z0-9]+$)
        </FormDescription>
      </FormItem>
    </>
  );

  const renderNumberValidation = () => (
    <div className="grid grid-cols-2 gap-4">
      <FormItem>
        <FormLabel>Min Value</FormLabel>
        <FormControl>
          <Input 
            type="number"
            value={settings.min ?? ''}
            onChange={(e) => updateSetting('min', e.target.value ? parseFloat(e.target.value) : null)}
          />
        </FormControl>
        <FormDescription>
          Minimum allowed value
        </FormDescription>
      </FormItem>
      
      <FormItem>
        <FormLabel>Max Value</FormLabel>
        <FormControl>
          <Input 
            type="number"
            value={settings.max ?? ''}
            onChange={(e) => updateSetting('max', e.target.value ? parseFloat(e.target.value) : null)}
          />
        </FormControl>
        <FormDescription>
          Maximum allowed value
        </FormDescription>
      </FormItem>
    </div>
  );

  const renderEmailValidation = () => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <FormLabel>Email Validation</FormLabel>
        <FormDescription>
          Validate that input is a valid email address
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={settings.email === true}
          onCheckedChange={(checked) => updateSetting('email', checked)}
        />
      </FormControl>
    </FormItem>
  );

  const renderUrlValidation = () => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <FormLabel>URL Validation</FormLabel>
        <FormDescription>
          Validate that input is a valid URL
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={settings.url === true}
          onCheckedChange={(checked) => updateSetting('url', checked)}
        />
      </FormControl>
    </FormItem>
  );

  const renderUniqueValidation = () => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <FormLabel>Unique Value</FormLabel>
        <FormDescription>
          Field value must be unique across all entries
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={settings.unique === true}
          onCheckedChange={(checked) => updateSetting('unique', checked)}
        />
      </FormControl>
    </FormItem>
  );

  const renderCustomErrorMessage = () => (
    <FormItem>
      <FormLabel>Custom Error Message</FormLabel>
      <FormControl>
        <Input 
          placeholder="This field is invalid"
          value={settings.message || ''}
          onChange={adaptInputChangeEvent((value) => updateSetting('message', value))}
        />
      </FormControl>
      <FormDescription>
        Message to display when validation fails
      </FormDescription>
    </FormItem>
  );

  const renderFieldTypeValidation = () => {
    switch(fieldType) {
      case 'text':
      case 'textarea':
      case 'password':
      case 'slug':
      case 'mask':
      case 'markdown':
      case 'wysiwyg':
      case 'blockeditor':
        return (
          <>
            {renderTextValidation()}
            {renderCustomErrorMessage()}
          </>
        );
      case 'email':
        return (
          <>
            {renderEmailValidation()}
            {renderTextValidation()}
            {renderCustomErrorMessage()}
          </>
        );
      case 'url':
        return (
          <>
            {renderUrlValidation()}
            {renderTextValidation()}
            {renderCustomErrorMessage()}
          </>
        );
      case 'number':
        return (
          <>
            {renderNumberValidation()}
            {renderCustomErrorMessage()}
          </>
        );
      case 'tags':
        return (
          <>
            <FormItem>
              <FormLabel>Max Tags</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min={0}
                  value={settings.maxTags || ''}
                  onChange={(e) => updateSetting('maxTags', parseInt(e.target.value) || null)}
                />
              </FormControl>
              <FormDescription>
                Maximum number of tags allowed
              </FormDescription>
            </FormItem>
            {renderCustomErrorMessage()}
          </>
        );
      default:
        return (
          fieldType ? (
            <div className="py-4 text-center text-gray-500">
              <p>Basic validation settings available for {fieldType} fields.</p>
              {renderCustomErrorMessage()}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">
              <p>Please select a field to configure validation.</p>
            </div>
          )
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Field Validation</h3>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Required Field</FormLabel>
              <FormDescription>
                Users must fill out this field
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={settings.required === true}
                onCheckedChange={handleRequiredChange}
              />
            </FormControl>
          </FormItem>

          {renderUniqueValidation()}
          {renderFieldTypeValidation()}
        </CardContent>
      </Card>
    </div>
  );
}

export default FieldValidationPanel;
