import { MapPin, ExternalLink } from 'lucide-react';

interface GettingThereSectionProps {
  meetingPoint: string;
  mapLink?: string;
  price?: string;
}

export default function GettingThereSection({ meetingPoint, mapLink, price }: GettingThereSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">
        Getting There
      </h2>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground text-sm font-medium w-28 flex-shrink-0">Meeting point:</span>
          <span className="text-sm text-foreground">{meetingPoint}</span>
        </div>
        {mapLink && (
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground text-sm w-28 flex-shrink-0" />
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <MapPin className="w-3 h-3" />
              View on map
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        {price && (
          <div className="flex items-start gap-2">
            <span className="text-muted-foreground text-sm font-medium w-28 flex-shrink-0">Price:</span>
            <span className="text-sm text-foreground">{price}</span>
          </div>
        )}
      </div>
    </div>
  );
}
