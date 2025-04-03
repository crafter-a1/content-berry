
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ComponentsPanel } from '@/components/components/ComponentsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FieldLayoutPanel } from '@/components/fields/FieldLayoutPanel';
import { useState } from 'react';

export default function Components() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6">Components</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="components">UI Components</TabsTrigger>
            <TabsTrigger value="fields">Field Types</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components">
            <Card className="border-gray-100">
              <CardContent className="p-6">
                <ComponentsPanel />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="fields">
            <Card className="border-gray-100">
              <CardContent className="p-6">
                <FieldLayoutPanel />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
