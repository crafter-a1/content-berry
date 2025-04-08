
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface FieldDebuggerProps {
  fieldData: any;
  apiResponse?: any;
  isLoading?: boolean;
}

export function FieldDebugger({ fieldData, apiResponse, isLoading = false }: FieldDebuggerProps) {
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-md">Field Debug Information</CardTitle>
        <CardDescription>Details about the field and API operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Field Data to be Sent</h3>
            <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40">
              {JSON.stringify(fieldData, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-1">API Response {isLoading && '(Loading...)'}</h3>
            <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-auto max-h-40">
              {apiResponse 
                ? JSON.stringify(apiResponse, null, 2)
                : isLoading
                ? 'Waiting for response...'
                : 'No response yet'}
            </pre>
          </div>

          <div>
            <h3 className="font-medium mb-1">Troubleshooting Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Ensure all required field properties are provided</li>
              <li>Check that collection ID is valid and exists in the database</li>
              <li>Verify API ID is unique within the collection</li>
              <li>Ensure Supabase connection is working properly</li>
              <li>Check browser console for any JavaScript errors</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FieldDebugger;
