
import { CollectionFormData } from "@/services/CollectionService";

/**
 * Adapts form data from CollectionForm to match the expected CollectionFormData interface
 */
export function adaptCollectionFormData(formData: { 
  name?: string; 
  description?: string; 
  apiId?: string; 
}): CollectionFormData {
  return {
    name: formData.name || '', // Ensure name is always provided
    apiId: formData.apiId || '', // Ensure apiId is always provided
    description: formData.description,
  };
}
