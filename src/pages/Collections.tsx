import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CollectionGrid } from '@/components/collections/CollectionGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, SlidersHorizontal, Plus, Grid, List } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CollectionForm } from '@/components/collections/CollectionForm';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// Define a proper type for the Collection
interface Collection {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  fields: number;
  items?: number;
  lastUpdated: string;
  status: 'published' | 'draft';
}

// Initial collections data with proper typing
const initialCollections: Collection[] = [
  {
    id: "products",
    title: "Products",
    icon: "P",
    iconColor: "blue",
    fields: 8,
    items: 12,
    lastUpdated: "2 hours ago",
    status: "published" as const
  },
  {
    id: "blog-posts",
    title: "Blog Posts",
    icon: "B",
    iconColor: "green",
    fields: 12,
    items: 36,
    lastUpdated: "1 day ago",
    status: "published" as const
  },
  {
    id: "users",
    title: "Users",
    icon: "U",
    iconColor: "orange",
    fields: 6,
    items: 128,
    lastUpdated: "3 days ago",
    status: "published" as const
  },
  {
    id: "events",
    title: "Events",
    icon: "E",
    iconColor: "purple",
    fields: 10,
    items: 18,
    lastUpdated: "1 week ago",
    status: "draft" as const
  },
  {
    id: "testimonials",
    title: "Testimonials",
    icon: "T",
    iconColor: "teal",
    fields: 5,
    items: 24,
    lastUpdated: "2 weeks ago",
    status: "draft" as const
  }
];

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('latest');
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Handler for when a new collection is created
  const handleCollectionCreated = (newCollection: Collection) => {
    setCollections(prevCollections => [...prevCollections, newCollection]);
    toast({
      title: "Collection added",
      description: `${newCollection.title} has been added to your collections`,
    });
  };

  const filteredCollections = collections.filter(collection => 
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Collections</h1>
            <p className="text-gray-500">Manage your content structure and data models</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cms-blue hover:bg-blue-700 mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Collection</DialogTitle>
                <DialogDescription>
                  Define the structure for a new type of content in your CMS.
                </DialogDescription>
              </DialogHeader>
              <CollectionForm onCollectionCreated={handleCollectionCreated} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search collections..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Sort: {sortOption === 'latest' ? 'Latest' : sortOption === 'oldest' ? 'Oldest' : 'Alphabetical'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                  <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="alphabetical">Alphabetical</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-cms-blue text-white' : 'text-gray-500'}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-cms-blue text-white' : 'text-gray-500'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <CollectionGrid 
          collections={filteredCollections} 
          viewMode={viewMode}
          sortOption={sortOption}
          onCreateNew={() => setIsDialogOpen(true)}
        />
        
        {filteredCollections.length === 0 && searchQuery === '' && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">No collections found. Create your first collection to get started.</p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-cms-blue hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Collection
            </Button>
          </div>
        )}
        
        {filteredCollections.length === 0 && searchQuery !== '' && (
          <div className="text-center mt-12">
            <p className="text-gray-500">No collections matching "{searchQuery}"</p>
            <Button 
              variant="ghost" 
              onClick={() => setSearchQuery('')}
              className="mt-2"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
