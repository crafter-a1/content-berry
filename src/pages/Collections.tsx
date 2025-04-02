
import { MainLayout } from '@/components/layout/MainLayout';
import { CollectionGrid } from '@/components/collections/CollectionGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const collections = [
  {
    id: "products",
    title: "Products",
    icon: "P",
    iconColor: "blue",
    fields: 8,
    items: 12,
    lastUpdated: "2 hours ago"
  },
  {
    id: "blog-posts",
    title: "Blog Posts",
    icon: "B",
    iconColor: "green",
    fields: 12,
    items: 36,
    lastUpdated: "1 day ago"
  },
  {
    id: "users",
    title: "Users",
    icon: "U",
    iconColor: "orange",
    fields: 6,
    items: 128,
    lastUpdated: "3 days ago"
  },
  {
    id: "events",
    title: "Events",
    icon: "E",
    iconColor: "purple",
    fields: 10,
    items: 18,
    lastUpdated: "1 week ago"
  },
  {
    id: "testimonials",
    title: "Testimonials",
    icon: "T",
    iconColor: "teal",
    fields: 5,
    items: 24,
    lastUpdated: "2 weeks ago"
  }
];

export default function Collections() {
  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Collections</h1>
          <Button className="bg-cms-blue hover:bg-blue-700">+ New Collection</Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search collections..."
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort: Latest</span>
            </Button>
          </div>
        </div>
        
        <CollectionGrid collections={collections} />
      </div>
    </MainLayout>
  );
}
