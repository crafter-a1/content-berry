
import { CollectionCard } from './CollectionCard';

interface Collection {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  fields: number;
  items?: number;
  lastUpdated: string;
}

interface CollectionGridProps {
  collections: Collection[];
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          id={collection.id}
          title={collection.title}
          icon={collection.icon}
          iconColor={collection.iconColor}
          fields={collection.fields}
          items={collection.items}
          lastUpdated={collection.lastUpdated}
        />
      ))}
      
      <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center p-6 min-h-[200px]">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <span className="text-2xl text-gray-400">+</span>
        </div>
        <p className="text-gray-600">Create Collection</p>
      </div>
    </div>
  );
}
