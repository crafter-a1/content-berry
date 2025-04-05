
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface DatePickerFieldProps {
  id: string;
  label?: string;
  value?: Date | string;
  onChange: (value: Date | string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  className?: string;
  customClass?: string;
  dateFormat?: string;
}

export function DatePickerField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select a date',
  required = false,
  helpText,
  className,
  customClass,
  dateFormat = 'PPP'
}: DatePickerFieldProps) {
  const [date, setDate] = useState<Date | undefined>(
    value instanceof Date ? value : value ? new Date(value) : undefined
  );
  
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onChange(newDate || '');
  };

  return (
    <div className={cn('space-y-2', className, customClass)}>
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, dateFormat) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {helpText && (
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {helpText}
        </p>
      )}
    </div>
  );
}

export default DatePickerField;
