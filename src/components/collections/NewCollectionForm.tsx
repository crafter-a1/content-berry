
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { adaptCollectionFormData } from '@/utils/formAdapters';
import { CollectionFormData } from '@/services/CollectionService';

interface NewCollectionFormProps {
  onCollectionCreated: (data: CollectionFormData) => void;
  onClose: () => void;
}

export function NewCollectionForm({ onCollectionCreated, onClose }: NewCollectionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    apiId: '',
    description: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.apiId.trim()) {
      newErrors.apiId = 'API ID is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.apiId)) {
      newErrors.apiId = 'API ID must contain only lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const adaptedData = adaptCollectionFormData(formData);
    onCollectionCreated(adaptedData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const generateApiId = () => {
    if (formData.name) {
      const apiId = formData.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      setFormData(prev => ({ ...prev, apiId }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Collection Name <span className="text-red-500">*</span></Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter collection name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiId">
            API ID <span className="text-red-500">*</span>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="ml-2 text-xs h-6"
              onClick={generateApiId}
            >
              Generate from name
            </Button>
          </Label>
          <Input
            id="apiId"
            name="apiId"
            value={formData.apiId}
            onChange={handleChange}
            placeholder="Enter API ID (e.g., blog-posts)"
            className={errors.apiId ? 'border-red-500' : ''}
          />
          {errors.apiId && <p className="text-red-500 text-sm">{errors.apiId}</p>}
          <p className="text-gray-500 text-xs">This ID will be used in API endpoints and code</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the purpose of this collection"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Create Collection
        </Button>
      </div>
    </form>
  );
}
