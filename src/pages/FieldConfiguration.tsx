
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, ArrowLeft, Save, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldTypeSelector } from '@/components/fields/FieldTypeSelector';
import { FieldConfigPanel } from '@/components/fields/FieldConfigPanel';
import { FieldList } from '@/components/fields/FieldList';
import { toast } from '@/hooks/use-toast';

const fieldTypes = [
  { id: 'text', name: 'Text', description: 'Single line text field' },
  { id: 'textarea', name: 'Text Area', description: 'Multi-line text field' },
  { id: 'number', name: 'Number', description: 'Numeric field with validation' },
  { id: 'date', name: 'Date', description: 'Date picker field' },
  { id: 'boolean', name: 'Boolean', description: 'True/False toggle field' },
  { id: 'select', name: 'Select', description: 'Dropdown selection field' },
  { id: 'relation', name: 'Relation', description: 'Relationship to another collection' },
  { id: 'media', name: 'Media', description: 'Image, video, or document upload' },
  { id: 'json', name: 'JSON', description: 'Structured JSON data field' },
  { id: 'color', name: 'Color', description: 'Color picker field' },
];

export default function FieldConfiguration() {
  const { collectionId } = useParams();
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('fields');
  
  // Mock data for fields - in a real app this would come from an API
  const [fields, setFields] = useState([
    { 
      id: 'title', 
      name: 'Title',
      type: 'text',
      required: true,
      description: 'The title of the content item',
      settings: { 
        minLength: 3, 
        maxLength: 100,
        placeholder: 'Enter title...'
      }
    },
    { 
      id: 'description', 
      name: 'Description',
      type: 'textarea',
      required: false,
      description: 'A detailed description',
      settings: { 
        minLength: 0, 
        maxLength: 500,
        placeholder: 'Enter description...'
      }
    }
  ]);

  const selectFieldType = (typeId: string) => {
    setSelectedFieldType(typeId);
    setSelectedFieldId(null);
  };

  const selectField = (fieldId: string) => {
    setSelectedFieldId(fieldId);
    setSelectedFieldType(null);
  };

  const handleSaveField = (fieldData: any) => {
    if (selectedFieldId) {
      // Update existing field
      setFields(fields.map(field => 
        field.id === selectedFieldId ? {...field, ...fieldData} : field
      ));
      toast({
        title: "Field updated",
        description: `The field "${fieldData.name}" has been updated.`,
      });
    } else {
      // Add new field
      const newField = {
        id: `field-${Date.now()}`,
        ...fieldData,
        type: selectedFieldType
      };
      setFields([...fields, newField]);
      toast({
        title: "Field created",
        description: `The field "${fieldData.name}" has been created.`,
      });
    }
    
    // Reset selection
    setSelectedFieldId(null);
    setSelectedFieldType(null);
  };

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/collections">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold mb-1">Field Configuration</h1>
              <p className="text-gray-500">
                {collectionId ? `Configuring fields for "${collectionId}" collection` : 'Configure fields for your collection'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button className="bg-cms-blue hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="fields" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fields" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Fields List Panel */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-center">
                    Fields
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setSelectedFieldId(null);
                        setSelectedFieldType(null);
                        setActiveTab('fields');
                      }}
                      className="h-8 gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Field
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    All fields defined for this collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FieldList 
                    fields={fields} 
                    onSelectField={selectField} 
                    selectedFieldId={selectedFieldId}
                  />
                </CardContent>
              </Card>
              
              {/* Field Type Selector or Configuration Panel */}
              <Card className="col-span-1 lg:col-span-2">
                {!selectedFieldType && !selectedFieldId ? (
                  <>
                    <CardHeader>
                      <CardTitle className="text-lg">Field Types</CardTitle>
                      <CardDescription>
                        Select a field type to add to your collection
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldTypeSelector 
                        fieldTypes={fieldTypes} 
                        onSelectFieldType={selectFieldType} 
                      />
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {selectedFieldId ? 'Edit Field' : 'New Field'}
                      </CardTitle>
                      <CardDescription>
                        {selectedFieldId 
                          ? 'Modify the field properties' 
                          : `Configure your new ${fieldTypes.find(t => t.id === selectedFieldType)?.name} field`
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FieldConfigPanel
                        fieldType={selectedFieldType || (selectedFieldId ? fields.find(f => f.id === selectedFieldId)?.type : null)}
                        fieldData={selectedFieldId ? fields.find(f => f.id === selectedFieldId) : undefined}
                        onSave={handleSaveField}
                        onCancel={() => {
                          setSelectedFieldId(null);
                          setSelectedFieldType(null);
                        }}
                      />
                    </CardContent>
                  </>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="validation">
            <Card>
              <CardHeader>
                <CardTitle>Field Validation Rules</CardTitle>
                <CardDescription>
                  Configure validation rules for your collection fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Validation configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="layout">
            <Card>
              <CardHeader>
                <CardTitle>Form Layout</CardTitle>
                <CardDescription>
                  Arrange how fields appear in your content forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Layout configuration coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
