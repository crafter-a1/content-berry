
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InputTextField } from './inputs/InputTextField';

// Mock component to simulate field config panel
export function FieldConfigPanel() {
  const [activeTab, setActiveTab] = useState('basic');
  const [fieldName, setFieldName] = useState('Text Field');
  const [apiId, setApiId] = useState('text_field');
  const [placeholder, setPlaceholder] = useState('Enter text...');
  const [helpText, setHelpText] = useState('This is a help text');
  const [keyFilter, setKeyFilter] = useState('none');
  const [required, setRequired] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="field-name">Field Name</Label>
                <Input 
                  id="field-name" 
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="Enter field name" 
                />
                <p className="text-xs text-muted-foreground">
                  The name shown to users in forms
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-id">API ID</Label>
                <Input 
                  id="api-id" 
                  value={apiId}
                  onChange={(e) => setApiId(e.target.value)}
                  placeholder="Enter API ID" 
                />
                <p className="text-xs text-muted-foreground">
                  The ID used in API calls and database
                </p>
              </div>
              
              <InputTextField
                id="placeholder"
                label="Placeholder"
                value={placeholder}
                onChange={setPlaceholder}
                placeholder="Enter placeholder text"
                helpText="Text shown when the field is empty"
              />
              
              <InputTextField
                id="help-text"
                label="Help Text"
                value={helpText}
                onChange={setHelpText}
                placeholder="Enter help text"
                helpText="Explanatory text shown below the field"
              />

              <div className="space-y-2">
                <Label>Key Filter</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={keyFilter === 'none' ? 'default' : 'outline'}
                    onClick={() => setKeyFilter('none')}
                    className="justify-start"
                  >
                    None
                  </Button>
                  <Button 
                    variant={keyFilter === 'letters' ? 'default' : 'outline'}
                    onClick={() => setKeyFilter('letters')}
                    className="justify-start"
                  >
                    Letters Only
                  </Button>
                  <Button 
                    variant={keyFilter === 'numbers' ? 'default' : 'outline'}
                    onClick={() => setKeyFilter('numbers')}
                    className="justify-start"
                  >
                    Numbers Only
                  </Button>
                  <Button 
                    variant={keyFilter === 'alphanumeric' ? 'default' : 'outline'}
                    onClick={() => setKeyFilter('alphanumeric')}
                    className="justify-start"
                  >
                    Alphanumeric
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="validation">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="required">Required Field</Label>
              </div>
              
              <p className="text-sm text-muted-foreground">
                More validation options will be available here based on the field type.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-center text-sm text-muted-foreground">
                Appearance settings will be available here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-center text-sm text-muted-foreground">
                Advanced settings like conditional logic, custom code, etc. will be available here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
