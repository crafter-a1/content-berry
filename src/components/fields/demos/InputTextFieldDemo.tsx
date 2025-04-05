
import React, { useState } from 'react';
import { InputTextField } from '../inputs/InputTextField';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function InputTextFieldDemo() {
  const [basicValue, setBasicValue] = useState('');
  const [floatLabelValue, setFloatLabelValue] = useState('');
  const [filledValue, setFilledValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');
  const [alignValue, setAlignValue] = useState('');
  const [invalidValue, setInvalidValue] = useState('');
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Basic Input</Label>
            <InputTextField 
              id="basic-input"
              label="Name"
              value={basicValue}
              onChange={setBasicValue}
              placeholder="Enter your name"
              helpText="This is a standard text input field"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Float Label</Label>
            <InputTextField 
              id="float-label"
              label="Email"
              value={floatLabelValue}
              onChange={setFloatLabelValue}
              placeholder="Enter your email"
              floatLabel={true}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Filled Style</Label>
            <InputTextField 
              id="filled-input"
              label="Phone Number"
              value={filledValue}
              onChange={setFilledValue}
              placeholder="Enter your phone number"
              filled={true}
              keyFilter="numbers"
              helpText="Only numbers are allowed"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Label Position</Label>
            <InputTextField 
              id="position-input"
              label="Address"
              value={positionValue}
              onChange={setPositionValue}
              placeholder="Enter your address"
              labelPosition="left"
              labelWidth={30}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Field with Placeholder</Label>
            <InputTextField 
              id="placeholder-input"
              label="Website"
              value=""
              onChange={() => {}}
              placeholder="https://example.com"
              helpText="Enter the URL of your website"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Text Alignment</Label>
            <InputTextField 
              id="align-input"
              label="Amount"
              value={alignValue}
              onChange={setAlignValue}
              placeholder="0.00"
              textAlign="right"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Error State</Label>
            <InputTextField 
              id="invalid-input"
              label="Username"
              value={invalidValue}
              onChange={setInvalidValue}
              invalid={true}
              errorMessage="Username is already taken"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Disabled State</Label>
            <InputTextField 
              id="disabled-input"
              label="Role"
              value="User"
              onChange={()=>{}}
              helpText="Contact admin to change your role"
              disabled
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Label className="mb-2 block">Required Field</Label>
            <InputTextField 
              id="required-input"
              label="Full Name"
              value=""
              onChange={()=>{}}
              placeholder="Enter your full name"
              required={true}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Different Field Sizes</h3>
        <div className="grid grid-cols-1 gap-4">
          <InputTextField 
            id="small-input"
            label="Small Input"
            value=""
            onChange={()=>{}}
            placeholder="Small size input"
            fieldSize="small"
          />
          
          <InputTextField 
            id="medium-input"
            label="Medium Input"
            value=""
            onChange={()=>{}}
            placeholder="Medium size input (default)"
            fieldSize="medium"
          />
          
          <InputTextField 
            id="large-input"
            label="Large Input"
            value=""
            onChange={()=>{}}
            placeholder="Large size input"
            fieldSize="large"
          />
        </div>
      </div>
    </div>
  );
}
