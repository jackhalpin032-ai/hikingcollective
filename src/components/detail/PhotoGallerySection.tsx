import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Download, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoGallerySectionProps {
  images: string[];
  title?: string;
  showDownloadGpx?: boolean;
  showMapPlaceholder?: boolean;
}

export default function PhotoGallerySection({
  images,
  title,
  showDownloadGpx = true,
  showMapPlaceholder = true,
}: PhotoGallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="rounded-xl overflow-hidden bg-muted border border-border">
        <div className="aspect-[4/3] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Compass className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-medium">No photos yet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main large image */}
      <div className="relative rounded-xl overflow-hidden bg-muted group">
        <img
          src={images[activeIndex]}
          alt={title || 'Route photo'}
          className="w-full aspect-[4/3] object-cover transition-transform duration-300"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setShowFullscreen(true)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
        >
          <Expand className="w-5 h-5" />
        </button>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                activeIndex === idx
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Map placeholder */}
      {showMapPlaceholder && (
        <div className="rounded-xl overflow-hidden bg-muted border border-border">
          <div className="aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M0,100 Q50,80 100,90 T200,70 T300,100 T400,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary"
                />
                <circle cx="50" cy="85" r="4" fill="currentColor" className="text-primary" />
                <circle cx="350" cy="85" r="4" fill="currentColor" className="text-destructive" />
              </svg>
            </div>
            <div className="text-center text-muted-foreground z-10">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs">Coming soon</p>
            </div>
          </div>
          {showDownloadGpx && (
            <div className="flex items-center justify-center p-3 bg-background border-t border-border">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download GPX
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Elevation profile */}
      <div className="rounded-xl overflow-hidden bg-muted border border-border p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Elevation Profile
        </h3>
        <div className="h-24 relative">
          <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="elevationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d="M0,70 Q30,65 60,50 T120,35 T180,45 T240,25 T300,40 T360,30 T400,50 L400,80 L0,80 Z"
              fill="url(#elevationGradient)"
            />
            <path
              d="M0,70 Q30,65 60,50 T120,35 T180,45 T240,25 T300,40 T360,30 T400,50"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            <circle cx="240" cy="25" r="4" fill="hsl(var(--primary))" />
            <text x="240" y="15" textAnchor="middle" className="text-[10px] fill-primary font-medium">
              Summit
            </text>
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
            <span>0 km</span>
            <span>7 km</span>
            <span>14 km</span>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            <span className="text-2xl">×</span>
          </button>
          <img
            src={images[activeIndex]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
