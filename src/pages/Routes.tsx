import { useState, useMemo } from 'react';
import { Compass, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RouteCard from '@/components/routes/RouteCard';
import RouteFilters, { FilterState } from '@/components/routes/RouteFilters';
import RouteFiltersMobile from '@/components/routes/RouteFiltersMobile';
import { FocusCards, type FocusCard } from '@/components/ui/focus-cards';
import { irishRoutes, filterOptions } from '@/data/routes';
import { useIsMobile } from '@/hooks/use-mobile';

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

// Featured routes for the hero section
const featuredRoutes: (FocusCard & { id: string })[] = [
  {
    id: 'carrauntoohil',
    title: "Carrauntoohil Summit",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3387&auto=format&fit=crop",
  },
  {
    id: 'glendalough-spinc',
    title: "Glendalough Valley",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=3387&auto=format&fit=crop",
  },
  {
    id: 'cliffs-moher',
    title: "Cliffs of Moher",
    src: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=3387&auto=format&fit=crop",
  },
];

export default function Routes() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const isMobile = useIsMobile();
  
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
      // Difficulty
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(route.difficulty)) {
        return false;
      }
      
      // Technicality
      if (filters.technicality.length > 0 && !filters.technicality.includes(route.technicality)) {
        return false;
      }
      
      // Distance
      if (route.distance < filters.distanceRange[0] || route.distance > filters.distanceRange[1]) {
        return false;
      }
      
      // Duration
      if (filters.duration.length > 0) {
        const matchesDuration = filters.duration.some(label => {
          const option = filterOptions.duration.find(d => d.label === label);
          if (!option) return false;
          return route.duration >= option.min && route.duration < option.max;
        });
        if (!matchesDuration) return false;
      }
      
      // Features
      if (filters.features.length > 0) {
        const hasFeature = filters.features.some(f => route.features.includes(f));
        if (!hasFeature) return false;
      }
      
      // Highlights
      if (filters.highlights.length > 0) {
        const hasHighlight = filters.highlights.some(h => route.highlights.includes(h));
        if (!hasHighlight) return false;
      }
      
      // Facilities
      if (filters.facilities.length > 0) {
        const hasFacility = filters.facilities.some(f => route.facilities.includes(f));
        if (!hasFacility) return false;
      }
      
      // Accessibility
      if (filters.accessibility.length > 0) {
        const hasAccessibility = filters.accessibility.some(a => route.accessibility.includes(a));
        if (!hasAccessibility) return false;
      }
      
      // Route Type
      if (filters.routeType.length > 0 && !filters.routeType.includes(route.routeType)) {
        return false;
      }
      
      // Season
      if (filters.season.length > 0 && !filters.season.includes(route.season)) {
        return false;
      }
      
      return true;
    });
  }, [filters]);
  
  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-muted/50 to-background pt-8 pb-10 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Browse Hiking Routes
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Discover Ireland's most beautiful trails. From gentle coastal walks to challenging mountain summits—find your next adventure.
            </p>
            
            {/* Featured Routes with FocusCards */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">Featured Trails</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                {featuredRoutes.map((card, index) => (
                  <Link 
                    key={card.id} 
                    to={`/routes/${card.id}`}
                    className="group rounded-lg relative bg-muted overflow-hidden h-48 md:h-64 w-full transition-all duration-300 ease-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img
                      src={card.src}
                      alt={card.title}
                      className="object-cover absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <span className="text-lg md:text-xl font-semibold text-white drop-shadow-lg">
                        {card.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Mobile Filter Bar */}
        {isMobile && (
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {filteredRoutes.length} {filteredRoutes.length === 1 ? 'route' : 'routes'}
              </span>
              <RouteFiltersMobile
                filters={filters}
                onFiltersChange={setFilters}
                activeFilterCount={activeFilterCount}
                onClearAll={clearAllFilters}
              />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <section className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            {!isMobile && (
              <aside className="w-72 flex-shrink-0">
                <div className="sticky top-24">
                  <RouteFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    activeFilterCount={activeFilterCount}
                    onClearAll={clearAllFilters}
                  />
                </div>
              </aside>
            )}
            
            {/* Routes Grid */}
            <div className="flex-1">
              {/* Desktop count header */}
              {!isMobile && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {filteredRoutes.length} {filteredRoutes.length === 1 ? 'route' : 'routes'} found
                    </span>
                  </div>
                </div>
              )}
              
              {/* Routes */}
              {filteredRoutes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoutes.map((route) => (
                    <RouteCard key={route.id} route={route} />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                    <Compass className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No routes found
                  </h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Try adjusting your filters to discover more adventures. Ireland has so many beautiful trails waiting for you!
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
