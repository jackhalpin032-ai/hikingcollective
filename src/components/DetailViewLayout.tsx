import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface DetailViewLayoutProps {
  /** Title displayed in the sticky header */
  title: string;
  /** Main scrollable content */
  children: ReactNode;
  /** Fixed bottom action bar content */
  bottomActions?: ReactNode;
  /** Loading state content */
  isLoading?: boolean;
  loadingMessage?: string;
  /** Not found state */
  notFound?: boolean;
  notFoundContent?: ReactNode;
  /** Optional: hide default action buttons (heart, share) */
  hideActions?: boolean;
  /** Optional: custom action buttons to replace defaults */
  headerActions?: ReactNode;
  /** Optional: callback when back button is clicked (defaults to navigate(-1)) */
  onBack?: () => void;
}

export default function DetailViewLayout({
  title,
  children,
  bottomActions,
  isLoading = false,
  loadingMessage = 'Loading...',
  notFound = false,
  notFoundContent,
  hideActions = false,
  headerActions,
  onBack,
}: DetailViewLayoutProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">{loadingMessage}</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          {notFoundContent || (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Not Found</h1>
              <p className="text-muted-foreground mb-4">The requested item could not be found.</p>
              <Button onClick={handleBack}>Go Back</Button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-24">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground truncate">{title}</h1>
            </div>
            {headerActions ? (
              headerActions
            ) : !hideActions && (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Share2 className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto px-4 pt-6">
          {children}
        </div>
      </main>

      {/* Fixed bottom action bar */}
      {bottomActions && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            {bottomActions}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
