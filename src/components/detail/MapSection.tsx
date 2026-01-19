import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Compass, MapPin } from 'lucide-react';

interface MapSectionProps {
  imageUrl?: string;
  routeId?: string;
  showRouteLink?: boolean;
  showDownloadGpx?: boolean;
  participantPhotos?: string[];
  participantCount?: number;
}

export default function MapSection({
  imageUrl,
  routeId,
  showRouteLink = true,
  showDownloadGpx = true,
  participantPhotos,
  participantCount,
}: MapSectionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden bg-muted border border-border">
      {/* Map placeholder or image */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Route map" 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Compass className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">Interactive Map</p>
            <p className="text-xs">Map coming soon</p>
          </div>
        </div>
      )}

      {/* Map controls overlay */}
      <div className="absolute top-3 left-3 flex gap-2">
        <button className="w-8 h-8 rounded bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
          <MapPin className="w-4 h-4" />
        </button>
      </div>

      {/* Participant photos overlay (for past events) */}
      {participantPhotos && participantPhotos.length > 0 && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex -space-x-2">
            {participantPhotos.slice(0, 4).map((photo, idx) => (
              <img 
                key={idx}
                src={photo} 
                alt="" 
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          {participantCount && participantCount > 4 && (
            <span className="text-xs text-white bg-black/60 px-2 py-1 rounded">
              {participantCount} people went
            </span>
          )}
        </div>
      )}

      {/* Bottom actions bar */}
      <div className="flex items-center justify-between p-3 bg-background border-t border-border">
        {showDownloadGpx && (
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Download className="w-4 h-4 mr-2" />
            Download GPX
          </Button>
        )}
        {showRouteLink && routeId && (
          <Button variant="link" size="sm" className="text-primary" asChild>
            <Link to={`/routes/${routeId}`}>
              Route details <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
