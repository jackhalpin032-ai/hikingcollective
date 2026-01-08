import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import RouteFilters, { FilterState } from './RouteFilters';

interface RouteFiltersMobileProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

export default function RouteFiltersMobile({ 
  filters, 
  onFiltersChange, 
  activeFilterCount, 
  onClearAll 
}: RouteFiltersMobileProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Filter Routes</DrawerTitle>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
                <X className="w-3 h-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </DrawerHeader>
        <ScrollArea className="flex-1 px-4">
          <div className="py-4">
            <RouteFilters 
              filters={filters} 
              onFiltersChange={onFiltersChange}
              activeFilterCount={activeFilterCount}
              onClearAll={onClearAll}
            />
          </div>
        </ScrollArea>
        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button className="w-full">
              Show Results
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
