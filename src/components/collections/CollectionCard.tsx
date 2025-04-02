
import { Link } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface CollectionCardProps {
  id: string;
  title: string;
  fields: number;
  items?: number;
  lastUpdated: string;
  icon?: string;
  iconColor?: string;
  className?: string;
}

export function CollectionCard({ 
  id,
  title, 
  fields, 
  items = 0,
  lastUpdated, 
  icon = 'P',
  iconColor = 'blue',
  className 
}: CollectionCardProps) {
  
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden",
      className
    )}>
      <div className="relative p-4">
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/collections/${id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/collections/${id}/fields`}>Configure Fields</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/content/${id}`}>View Content</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div 
          className={`text-4xl font-bold mb-4 text-${iconColor}-500`}
          style={{ color: iconColor === 'blue' ? '#0067ff' : iconColor === 'green' ? '#22c55e' : iconColor === 'orange' ? '#f97316' : iconColor === 'purple' ? '#8b5cf6' : iconColor === 'teal' ? '#14b8a6' : '#0067ff' }}
        >
          {icon}
        </div>

        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        <div className="text-sm text-gray-500">
          {items > 0 && (
            <span>{items} items • </span>
          )}
          <span>{fields} fields</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
}
