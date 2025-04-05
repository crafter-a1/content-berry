
import React, { useState } from "react";
import { InputTextField } from "../inputs/InputTextField";
import { Card, CardContent } from "@/components/ui/card";

export function InputTextFieldDemo() {
  const [basicValue, setBasicValue] = useState("");
  const [requiredValue, setRequiredValue] = useState("");
  const [helpTextValue, setHelpTextValue] = useState("");
  const [lettersValue, setLettersValue] = useState("");
  const [numbersValue, setNumbersValue] = useState("");
  const [invalidValue, setInvalidValue] = useState("invalid@example");
  const [disabledValue, setDisabledValue] = useState("Disabled input");
  
  // Fixed handler functions to match expected types
  const handleBasicChange = (value: string) => {
    setBasicValue(value);
  };
  
  const handleRequiredChange = (value: string) => {
    setRequiredValue(value);
  };
  
  const handleHelpTextChange = (value: string) => {
    setHelpTextValue(value);
  };
  
  const handleLettersChange = (value: string) => {
    setLettersValue(value);
  };
  
  const handleNumbersChange = (value: string) => {
    setNumbersValue(value);
  };
  
  const handleInvalidChange = (value: string) => {
    setInvalidValue(value);
  };

  return (
    <div className="grid gap-8">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Basic Text Input</h3>
          <InputTextField
            id="basic-input"
            label="Basic Input"
            value={basicValue}
            onChange={handleBasicChange}
            placeholder="Enter text here"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Required Field</h3>
          <InputTextField
            id="required-input"
            label="Required Input"
            value={requiredValue}
            onChange={handleRequiredChange}
            placeholder="This field is required"
            required={true}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">With Help Text</h3>
          <InputTextField
            id="help-text-input"
            label="Username"
            value={helpTextValue}
            onChange={handleHelpTextChange}
            placeholder="Enter your username"
            helpText="Your username must be unique"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Letters Only</h3>
          <InputTextField
            id="letters-input"
            label="Name"
            value={lettersValue}
            onChange={handleLettersChange}
            placeholder="Enter your name"
            keyFilter="letters"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Numbers Only</h3>
          <InputTextField
            id="numbers-input"
            label="Age"
            value={numbersValue}
            onChange={handleNumbersChange}
            placeholder="Enter your age"
            keyFilter="numbers"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Invalid State</h3>
          <InputTextField
            id="invalid-input"
            label="Email"
            value={invalidValue}
            onChange={handleInvalidChange}
            helpText="Please enter a valid email address"
          />
          <div className="text-red-500 text-sm mt-1">Invalid email format</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Disabled Input</h3>
          <InputTextField
            id="disabled-input"
            label="Read Only"
            value={disabledValue}
            onChange={() => {}}
            helpText="This field cannot be modified"
          />
        </CardContent>
      </Card>
      
      {/* Remove or fix size property which doesn't exist on InputTextField */}
    </div>
  );
}

export default InputTextFieldDemo;
