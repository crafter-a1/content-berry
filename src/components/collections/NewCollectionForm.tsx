
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { adaptCollectionFormData } from '@/utils/formAdapters';
import { CollectionFormData } from '@/services/CollectionService';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Collection name must be at least 2 characters.",
  }),
  apiId: z.string().min(2, {
    message: "API ID must be at least 2 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "API ID can only contain lowercase letters, numbers, and hyphens.",
  }),
  description: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

interface NewCollectionFormProps {
  onCollectionCreated: (data: CollectionFormData) => void;
  onClose: () => void;
}

export function NewCollectionForm({ onCollectionCreated, onClose }: NewCollectionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      apiId: "",
      description: "",
      status: "draft",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Use the adapter to ensure compatibility with the service
      const adaptedData = adaptCollectionFormData(values);
      onCollectionCreated(adaptedData);
    } catch (error) {
      console.error("Failed to create collection:", error);
      // Reset submitting state in case of error
      setIsSubmitting(false);
    }
  }

  // Auto-generate API ID from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    
    // Only auto-generate if user hasn't manually edited the API ID or if it's empty
    if (!form.getValues("apiId")) {
      const apiId = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      form.setValue("apiId", apiId);
    }
  };

  const generateApiId = () => {
    const name = form.getValues("name");
    if (name) {
      const apiId = name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      form.setValue("apiId", apiId);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter collection name" 
                  {...field} 
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="apiId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>API ID <span className="text-red-500">*</span></FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-6"
                  onClick={generateApiId}
                >
                  Generate from name
                </Button>
              </div>
              <FormControl>
                <Input 
                  placeholder="Enter API ID (e.g., blog-posts)" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                This ID will be used in API endpoints and code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the purpose of this collection"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of what this collection is used for
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Set the visibility status of this collection
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Collection"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
