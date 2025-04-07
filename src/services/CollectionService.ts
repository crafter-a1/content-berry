import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export interface ValidationSettings {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  url?: boolean;
  unique?: boolean;
  message?: string;
  maxTags?: number;
  [key: string]: any;
}

export interface Collection {
  id: string;
  title: string;
  apiId: string;
  description?: string;
  status: string;
  fields?: any[];
  createdAt: string;
  updatedAt: string;
  icon?: string;
  iconColor?: string;
  items?: number;
  lastUpdated?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CollectionFormData {
  name: string;
  apiId: string;
  description?: string;
  status?: string;
  settings?: Record<string, any>;
}

export interface CollectionField {
  id: string;
  name: string;
  apiId: string;
  type: string;
  description?: string;
  required: boolean;
  settings?: Record<string, any>;
  sort_order?: number;
  collection_id?: string;
  validation?: ValidationSettings;
  appearance?: Record<string, any>;
  advanced?: Record<string, any>;
  helpText?: string;
  ui_options?: Record<string, any>;
}

const mapSupabaseCollection = (collection: Database['public']['Tables']['collections']['Row']): Collection => {
  return {
    id: collection.id,
    title: collection.title,
    apiId: collection.api_id,
    description: collection.description || undefined,
    status: collection.status,
    createdAt: collection.created_at,
    updatedAt: collection.updated_at,
    icon: collection.icon || 'file',
    iconColor: collection.icon_color || 'gray',
    items: 0,
    lastUpdated: collection.updated_at,
    created_at: collection.created_at,
    updated_at: collection.updated_at
  };
};

const mapSupabaseField = (field: Database['public']['Tables']['fields']['Row']): CollectionField => {
  const settings = field.settings as Record<string, any> || {};
  
  return {
    id: field.id,
    name: field.name,
    apiId: field.api_id,
    type: field.type,
    description: field.description || undefined,
    required: field.required || false,
    settings: settings,
    sort_order: field.sort_order || 0,
    collection_id: field.collection_id || undefined,
    validation: settings.validation || {},
    appearance: settings.appearance || {},
    advanced: settings.advanced || {},
    helpText: settings.helpText || '',
    ui_options: settings.ui_options || {}
  };
};

export const CollectionService = {
  getFieldsForCollection: async (collectionId: string): Promise<CollectionField[]> => {
    try {
      const { data: fields, error } = await supabase
        .from('fields')
        .select('*')
        .eq('collection_id', collectionId)
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching fields:', error);
        throw error;
      }
      
      return fields.map(mapSupabaseField);
    } catch (error) {
      console.error('Failed to fetch fields:', error);
      return [];
    }
  },
  
  createField: async (collectionId: string, fieldData: Partial<CollectionField>): Promise<CollectionField> => {
    try {
      const { validation, appearance, advanced, apiId, ...restData } = fieldData;
      
      const field = {
        name: fieldData.name || 'New Field',
        api_id: apiId || fieldData.name?.toLowerCase().replace(/\s+/g, '_') || 'new_field',
        type: fieldData.type || 'text',
        collection_id: collectionId,
        description: fieldData.description || null,
        required: fieldData.required || false,
        settings: {
          ...restData.settings || {},
          validation: validation || {},
          appearance: appearance || {},
          advanced: advanced || {}
        },
        sort_order: fieldData.sort_order || 0,
      };
      
      const { data, error } = await supabase
        .from('fields')
        .insert([field])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating field:', error);
        throw error;
      }
      
      return mapSupabaseField(data);
    } catch (error) {
      console.error('Failed to create field:', error);
      return { 
        id: `mock-${Date.now()}`, 
        name: fieldData.name || 'New Field',
        apiId: fieldData.apiId || 'new_field',
        type: fieldData.type || 'text',
        required: fieldData.required || false,
        collection_id: collectionId,
        validation: fieldData.validation || {},
        appearance: fieldData.appearance || {},
        advanced: fieldData.advanced || {}
      };
    }
  },
  
  updateField: async (collectionId: string, fieldId: string, fieldData: Partial<CollectionField>): Promise<CollectionField> => {
    try {
      const updateData: any = {};
      
      if (fieldData.name) updateData.name = fieldData.name;
      if (fieldData.apiId) updateData.api_id = fieldData.apiId;
      if (fieldData.type) updateData.type = fieldData.type;
      if (fieldData.description !== undefined) updateData.description = fieldData.description;
      if (fieldData.required !== undefined) updateData.required = fieldData.required;
      if (fieldData.sort_order !== undefined) updateData.sort_order = fieldData.sort_order;
      
      const settingsToUpdate: Record<string, any> = {};
      
      const { data: currentField } = await supabase
        .from('fields')
        .select('settings')
        .eq('id', fieldId)
        .single();
          
      const currentSettings = currentField?.settings || {};
      
      if (fieldData.settings) {
        Object.assign(settingsToUpdate, currentSettings, fieldData.settings);
      } else {
        Object.assign(settingsToUpdate, currentSettings);
      }
      
      if (fieldData.validation) {
        settingsToUpdate.validation = {
          ...(currentSettings.validation || {}),
          ...fieldData.validation
        };
      }
      
      if (fieldData.appearance) {
        settingsToUpdate.appearance = {
          ...(currentSettings.appearance || {}),
          ...fieldData.appearance
        };
      }
      
      if (fieldData.advanced) {
        settingsToUpdate.advanced = {
          ...(currentSettings.advanced || {}),
          ...fieldData.advanced
        };
      }
      
      updateData.settings = settingsToUpdate;
      
      const { data, error } = await supabase
        .from('fields')
        .update(updateData)
        .eq('id', fieldId)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating field:', error);
        throw error;
      }
      
      return mapSupabaseField(data);
    } catch (error) {
      console.error('Failed to update field:', error);
      return { 
        id: fieldId, 
        name: fieldData.name || 'Unknown Field',
        apiId: fieldData.apiId || 'unknown_field',
        type: fieldData.type || 'text',
        required: fieldData.required !== undefined ? fieldData.required : true,
        collection_id: collectionId,
        validation: fieldData.validation || {},
        appearance: fieldData.appearance || {},
        advanced: fieldData.advanced || {}
      };
    }
  },
  
  deleteField: async (collectionId: string, fieldId: string): Promise<{ success: boolean }> => {
    try {
      const { error } = await supabase
        .from('fields')
        .delete()
        .eq('id', fieldId);
      
      if (error) {
        console.error('Error deleting field:', error);
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Failed to delete field:', error);
      return { success: false };
    }
  },
  
  fetchCollections: async (): Promise<Collection[]> => {
    try {
      const { data: collections, error } = await supabase
        .from('collections')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching collections:', error);
        throw error;
      }
      
      const mappedCollections = collections.map(mapSupabaseCollection);
      
      for (const collection of mappedCollections) {
        try {
          const { count: fieldCount, error: fieldsError } = await supabase
            .from('fields')
            .select('*', { count: 'exact', head: true })
            .eq('collection_id', collection.id);
          
          if (!fieldsError) {
            collection.fields = new Array(fieldCount || 0);
          }
          
          const { count: itemCount, error: itemsError } = await supabase
            .from('content_items')
            .select('*', { count: 'exact', head: true })
            .eq('collection_id', collection.id);
            
          if (!itemsError) {
            collection.items = itemCount || 0;
          }
        } catch (countError) {
          console.error(`Error counting related data for collection ${collection.id}:`, countError);
        }
      }
      
      return mappedCollections;
    } catch (error) {
      console.error('Failed to fetch collections:', error);
      
      return [
        {
          id: 'col1',
          title: 'Blog Posts',
          apiId: 'blog_posts',
          description: 'Collection of blog posts',
          status: 'published',
          fields: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          icon: 'file-text',
          iconColor: 'blue',
          items: 5,
          lastUpdated: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'col2',
          title: 'Products',
          apiId: 'products',
          description: 'Collection of products',
          status: 'published',
          fields: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          icon: 'shopping-bag',
          iconColor: 'green',
          items: 12,
          lastUpdated: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  },
  
  createCollection: async (collectionData: CollectionFormData): Promise<Collection> => {
    try {
      const newCollection = {
        title: collectionData.name,
        api_id: collectionData.apiId,
        description: collectionData.description || null,
        status: collectionData.status || 'draft',
        icon: 'file',
        icon_color: 'gray',
      };
      
      const { data, error } = await supabase
        .from('collections')
        .insert([newCollection])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating collection:', error);
        throw error;
      }
      
      return mapSupabaseCollection(data);
    } catch (error) {
      console.error('Failed to create collection:', error);
      
      return {
        id: `col-${Date.now()}`,
        title: collectionData.name,
        apiId: collectionData.apiId,
        description: collectionData.description,
        status: collectionData.status || 'draft',
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        icon: 'file',
        iconColor: 'gray',
        items: 0,
        lastUpdated: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
  },
  
  getContentItems: async (collectionId: string): Promise<any[]> => {
    try {
      const { data: contentItems, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('collection_id', collectionId)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching content items:', error);
        throw error;
      }
      
      return contentItems;
    } catch (error) {
      console.error('Failed to fetch content items:', error);
      
      return [
        {
          id: `item-${Date.now()}-1`,
          collection_id: collectionId,
          data: { title: 'Test Item 1' },
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: `item-${Date.now()}-2`,
          collection_id: collectionId,
          data: { title: 'Test Item 2' },
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  }
};

export const {
  getFieldsForCollection,
  createField,
  updateField,
  deleteField,
  fetchCollections,
  createCollection,
  getContentItems
} = CollectionService;
