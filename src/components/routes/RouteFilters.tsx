import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { filterOptions } from '@/data/routes';

export interface FilterState {
  difficulty: string[];
  technicality: string[];
  distanceRange: [number, number];
  duration: string[];
  features: string[];
  highlights: string[];
  facilities: string[];
  accessibility: string[];
  routeType: string[];
  season: string[];
}

interface RouteFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFilterCount: number;
  onClearAll: () => void;
}

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'default' | 'difficulty';
  difficultyLevel?: 'easy' | 'moderate' | 'hard';
}

function FilterChip({ label, isActive, onClick, variant = 'default', difficultyLevel }: FilterChipProps) {
  const difficultyStyles = {
    easy: 'data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-700 data-[active=true]:border-emerald-300',
    moderate: 'data-[active=true]:bg-amber-100 data-[active=true]:text-amber-700 data-[active=true]:border-amber-300',
    hard: 'data-[active=true]:bg-rose-100 data-[active=true]:text-rose-700 data-[active=true]:border-rose-300'
  };
  
  return (
    <button
      onClick={onClick}
      data-active={isActive}
      className={cn(
        "px-3 py-1.5 text-sm rounded-full border transition-all duration-200",
        "hover:bg-muted/80 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary",
        variant === 'difficulty' && difficultyLevel && difficultyStyles[difficultyLevel]
      )}
    >
      {label}
    </button>
  );
}

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = false }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
          {title}
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3 animate-accordion-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function RouteFilters({ filters, onFiltersChange, activeFilterCount, onClearAll }: RouteFiltersProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [category]: updated });
  };
  
  const updateDistanceRange = (value: number[]) => {
    onFiltersChange({ ...filters, distanceRange: [value[0], value[1]] });
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs h-7">
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>
      
      <div className="space-y-5">
        {/* Difficulty */}
        <FilterGroup title="Difficulty" defaultOpen>
          <div className="flex flex-wrap gap-2">
            {filterOptions.difficulty.map((level) => (
              <FilterChip
                key={level}
                label={level.charAt(0).toUpperCase() + level.slice(1)}
                isActive={filters.difficulty.includes(level)}
                onClick={() => toggleFilter('difficulty', level)}
                variant="difficulty"
                difficultyLevel={level}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Technicality */}
        <FilterGroup title="Technicality" defaultOpen>
          <div className="flex flex-wrap gap-2">
            {filterOptions.technicality.map((level) => (
              <FilterChip
                key={level}
                label={level}
                isActive={filters.technicality.includes(level)}
                onClick={() => toggleFilter('technicality', level)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Distance */}
        <FilterGroup title="Distance" defaultOpen>
          <div className="px-1">
            <Slider
              value={filters.distanceRange}
              onValueChange={updateDistanceRange}
              min={0}
              max={40}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{filters.distanceRange[0]} km</span>
              <span>{filters.distanceRange[1]} km</span>
            </div>
          </div>
        </FilterGroup>
        
        {/* Duration */}
        <FilterGroup title="Duration">
          <div className="flex flex-wrap gap-2">
            {filterOptions.duration.map((option) => (
              <FilterChip
                key={option.label}
                label={option.label}
                isActive={filters.duration.includes(option.label)}
                onClick={() => toggleFilter('duration', option.label)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Route Features */}
        <FilterGroup title="Route Features">
          <div className="flex flex-wrap gap-2">
            {filterOptions.features.map((feature) => (
              <FilterChip
                key={feature}
                label={feature}
                isActive={filters.features.includes(feature)}
                onClick={() => toggleFilter('features', feature)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Highlights */}
        <FilterGroup title="Highlights">
          <div className="flex flex-wrap gap-2">
            {filterOptions.highlights.map((highlight) => (
              <FilterChip
                key={highlight}
                label={highlight}
                isActive={filters.highlights.includes(highlight)}
                onClick={() => toggleFilter('highlights', highlight)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Facilities */}
        <FilterGroup title="Facilities">
          <div className="flex flex-wrap gap-2">
            {filterOptions.facilities.map((facility) => (
              <FilterChip
                key={facility}
                label={facility}
                isActive={filters.facilities.includes(facility)}
                onClick={() => toggleFilter('facilities', facility)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Accessibility */}
        <FilterGroup title="Accessibility">
          <div className="flex flex-wrap gap-2">
            {filterOptions.accessibility.map((option) => (
              <FilterChip
                key={option}
                label={option}
                isActive={filters.accessibility.includes(option)}
                onClick={() => toggleFilter('accessibility', option)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Route Type */}
        <FilterGroup title="Route Type">
          <div className="flex flex-wrap gap-2">
            {filterOptions.routeType.map((type) => (
              <FilterChip
                key={type}
                label={type === 'out-back' ? 'Out & back' : type === 'point-to-point' ? 'Point-to-point' : 'Loop'}
                isActive={filters.routeType.includes(type)}
                onClick={() => toggleFilter('routeType', type)}
              />
            ))}
          </div>
        </FilterGroup>
        
        {/* Season */}
        <FilterGroup title="Season">
          <div className="flex flex-wrap gap-2">
            {filterOptions.season.map((season) => (
              <FilterChip
                key={season}
                label={season === 'all-year' ? 'All year' : season.charAt(0).toUpperCase() + season.slice(1)}
                isActive={filters.season.includes(season)}
                onClick={() => toggleFilter('season', season)}
              />
            ))}
          </div>
        </FilterGroup>
      </div>
    </div>
  );
}
