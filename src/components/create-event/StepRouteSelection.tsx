import { useState, useMemo } from 'react';
import { Map, ArrowUpDown, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import RouteFilters, { FilterState } from '@/components/routes/RouteFilters';
import RouteFiltersMobile from '@/components/routes/RouteFiltersMobile';
import { SelectableRouteCard } from './SelectableRouteCard';
import { irishRoutes, filterOptions } from '@/data/routes';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StepRouteSelectionProps {
  selectedRouteId: string | null;
  onSelect: (routeId: string | null) => void;
  onContinue: () => void;
}

type SortOption = 'name-asc' | 'name-desc' | 'distance-asc' | 'distance-desc' | 'duration-asc' | 'duration-desc';

const initialFilters: FilterState = {
  difficulty: [],
  technicality: [],
  distanceRange: [0, 40],
  duration: [],
  features: [],
  highlights: [],
  facilities: [],
  accessibility: [],
  routeType: [],
  season: [],
};

export function StepRouteSelection({ selectedRouteId, onSelect, onContinue }: StepRouteSelectionProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const isMobile = useIsMobile();
  const [routesGridRef] = useAutoAnimate();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.difficulty.length;
    count += filters.technicality.length;
    count += filters.duration.length;
    count += filters.features.length;
    count += filters.highlights.length;
    count += filters.facilities.length;
    count += filters.accessibility.length;
    count += filters.routeType.length;
    count += filters.season.length;
    if (filters.distanceRange[0] > 0 || filters.distanceRange[1] < 40) count += 1;
    return count;
  }, [filters]);

  const filteredRoutes = useMemo(() => {
    return irishRoutes.filter(route => {
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(route.difficulty)) {
        return false;
      }
      if (filters.technicality.length > 0 && !filters.technicality.includes(route.technicality)) {
        return false;
      }
      if (route.distance < filters.distanceRange[0] || route.distance > filters.distanceRange[1]) {
        return false;
      }
      if (filters.duration.length > 0) {
        const matchesDuration = filters.duration.some(label => {
          const option = filterOptions.duration.find(d => d.label === label);
          if (!option) return false;
          return route.duration >= option.min && route.duration < option.max;
        });
        if (!matchesDuration) return false;
      }
      if (filters.features.length > 0) {
        const hasFeature = filters.features.some(f => route.features.includes(f));
        if (!hasFeature) return false;
      }
      if (filters.highlights.length > 0) {
        const hasHighlight = filters.highlights.some(h => route.highlights.includes(h));
        if (!hasHighlight) return false;
      }
      if (filters.facilities.length > 0) {
        const hasFacility = filters.facilities.some(f => route.facilities.includes(f));
        if (!hasFacility) return false;
      }
      if (filters.accessibility.length > 0) {
        const hasAccessibility = filters.accessibility.some(a => route.accessibility.includes(a));
        if (!hasAccessibility) return false;
      }
      if (filters.routeType.length > 0 && !filters.routeType.includes(route.routeType)) {
        return false;
      }
      if (filters.season.length > 0 && !filters.season.includes(route.season)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const sortedRoutes = useMemo(() => {
    const sorted = [...filteredRoutes];
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'distance-asc':
        sorted.sort((a, b) => a.distance - b.distance);
        break;
      case 'distance-desc':
        sorted.sort((a, b) => b.distance - a.distance);
        break;
      case 'duration-asc':
        sorted.sort((a, b) => a.duration - b.duration);
        break;
      case 'duration-desc':
        sorted.sort((a, b) => b.duration - a.duration);
        break;
    }
    return sorted;
  }, [filteredRoutes, sortBy]);

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  const handleRouteSelect = (routeId: string) => {
    if (selectedRouteId === routeId) {
      onSelect(null); // Deselect if already selected
    } else {
      onSelect(routeId);
    }
  };

  const selectedRoute = selectedRouteId 
    ? irishRoutes.find(r => r.id === selectedRouteId)
    : null;

  return (
    <div className="flex flex-col h-full -mx-4 md:-mx-8">
      {/* Header */}
      <div className="text-center px-4 md:px-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Pick a route for your group 🗺️
        </h2>
        <p className="text-muted-foreground">
          Choose from our collection of tried-and-tested routes, or skip to add your own later.
        </p>
      </div>

      {/* Mobile Filter Bar */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b px-4 py-3 mb-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              {sortedRoutes.length} {sortedRoutes.length === 1 ? 'route' : 'routes'}
            </span>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px] h-9 bg-background">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="distance-asc">Shortest</SelectItem>
                  <SelectItem value="distance-desc">Longest</SelectItem>
                  <SelectItem value="duration-asc">Quickest</SelectItem>
                  <SelectItem value="duration-desc">Longest time</SelectItem>
                </SelectContent>
              </Select>
              <RouteFiltersMobile
                filters={filters}
                onFiltersChange={setFilters}
                activeFilterCount={activeFilterCount}
                onClearAll={clearAllFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-4 md:px-8 min-h-0">
        {/* Desktop Sidebar Filters */}
        {!isMobile && (
          <aside className="w-64 flex-shrink-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <RouteFilters
                filters={filters}
                onFiltersChange={setFilters}
                activeFilterCount={activeFilterCount}
                onClearAll={clearAllFilters}
              />
            </ScrollArea>
          </aside>
        )}

        {/* Routes Grid */}
        <div className="flex-1 min-w-0">
          {/* Desktop header */}
          {!isMobile && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {sortedRoutes.length} {sortedRoutes.length === 1 ? 'route' : 'routes'} found
                </span>
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px] bg-background">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="distance-asc">Shortest distance</SelectItem>
                  <SelectItem value="distance-desc">Longest distance</SelectItem>
                  <SelectItem value="duration-asc">Quickest</SelectItem>
                  <SelectItem value="duration-desc">Longest time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Routes */}
          <ScrollArea className={isMobile ? "h-[calc(100vh-22rem)]" : "h-[calc(100vh-22rem)]"}>
            {sortedRoutes.length > 0 ? (
              <div ref={routesGridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
                {sortedRoutes.map((route) => (
                  <SelectableRouteCard
                    key={route.id}
                    route={route}
                    isSelected={selectedRouteId === route.id}
                    onSelect={handleRouteSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Compass className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No routes found
                </h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Try adjusting your filters to discover more routes.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Footer with selection info and continue button */}
      <div className="sticky bottom-0 bg-background border-t px-4 md:px-8 py-4 mt-4">
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            {selectedRoute ? (
              <>
                <img 
                  src={selectedRoute.thumbnail} 
                  alt={selectedRoute.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selectedRoute.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedRoute.distance} km • {selectedRoute.location}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No route selected (optional)
              </p>
            )}
          </div>
          <Button 
            size="lg" 
            onClick={onContinue}
            className="px-8 flex-shrink-0"
          >
            {selectedRoute ? 'Continue' : 'Skip for now'}
          </Button>
        </div>
      </div>
    </div>
  );
}
