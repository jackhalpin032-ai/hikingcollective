import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Share2, ThumbsUp, ThumbsDown, Flag, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { modalVariants, modalTransition } from '@/components/PageTransition';

// ============ Shared Sub-components ============

interface OrganizerSectionProps {
  name: string;
  photo?: string;
  badge?: string;
  badgeColor?: string;
  rating?: number;
  eventsOrganised?: number;
  label?: string;
  onSendMessage?: () => void;
}

export function OrganizerSection({
  name,
  photo,
  badge,
  badgeColor = 'bg-primary',
  rating,
  eventsOrganised,
  label = 'Organizer',
  onSendMessage,
}: OrganizerSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">{label}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            {badge && (
              <Badge variant="secondary" className={`text-xs ${badgeColor} text-white`}>
                {badge}
              </Badge>
            )}
            {rating && eventsOrganised && (
              <p className="text-xs text-muted-foreground">
                ⭐ {rating} • {eventsOrganised} events organised
              </p>
            )}
          </div>
        </div>
        {onSendMessage && (
          <Button variant="outline" size="sm" onClick={onSendMessage}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Send a message
          </Button>
        )}
      </div>
    </div>
  );
}

// ============ Photos from Previous Events ============

interface PhotosFromEventsProps {
  images: string[];
  totalCount?: number;
  onSeeAll?: () => void;
}

export function PhotosFromEvents({ images, totalCount, onSeeAll }: PhotosFromEventsProps) {
  const displayImages = images.slice(0, 3);
  const remaining = totalCount ? totalCount - displayImages.length : 0;

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">
        Photos from Previous Events
      </h2>
      <div className="flex gap-2">
        {displayImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            {idx === displayImages.length - 1 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">+{remaining}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {onSeeAll && (
        <Button variant="link" className="p-0 h-auto text-primary text-sm mt-2" onClick={onSeeAll}>
          See past events <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

// ============ Comments Section ============

interface Comment {
  id: string;
  author: string;
  authorPhoto?: string;
  content: string;
  likes?: number;
  dislikes?: number;
}

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
  onClearAll?: () => void;
}

export function CommentsSection({ comments, onAddComment, onClearAll }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-foreground mb-3 uppercase text-xs tracking-wider text-muted-foreground">
        Comments
      </h2>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={comment.authorPhoto} alt={comment.author} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                {comment.author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">{comment.author}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-xs">
                  <Flag className="w-3 h-3" />
                  Report
                </button>
                <button className="text-primary text-xs font-medium">Reply</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[60px] resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          {onClearAll && (
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onClearAll}>
              Clear all
            </Button>
          )}
          <Button size="sm" onClick={handleSubmit} disabled={!newComment.trim()}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============ Description Section ============

interface DescriptionSectionProps {
  title?: string;
  content: string;
  disclaimer?: string;
  maxLength?: number;
}

export function DescriptionSection({ title = 'Description', content, disclaimer, maxLength = 200 }: DescriptionSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = content.length > maxLength;
  const displayContent = shouldTruncate && !expanded ? content.slice(0, maxLength) + '...' : content;

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-foreground mb-2 uppercase text-xs tracking-wider text-muted-foreground">{title}</h2>
      <p className="text-muted-foreground leading-relaxed text-sm">{displayContent}</p>
      {shouldTruncate && (
        <Button
          variant="link"
          className="p-0 h-auto text-primary text-sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show less' : 'Show more'} ▾
        </Button>
      )}
      {disclaimer && (
        <Card className="p-3 mt-4 bg-muted/50 border-muted">
          <p className="text-xs text-muted-foreground italic">
            <span className="font-semibold">Disclaimer: </span>
            {disclaimer}
          </p>
        </Card>
      )}
    </div>
  );
}

// ============ Main Layout ============

interface DetailViewLayoutProps {
  /** Date/time line shown at top */
  dateInfo?: ReactNode;
  /** Organizer chip shown below date */
  organizerChip?: ReactNode;
  /** Main title */
  title: string;
  /** Quick stats row (activity, distance, elevation, duration) */
  statsRow?: ReactNode;
  /** Participants/actions row */
  participantsRow?: ReactNode;
  /** Map section - appears in center column */
  mapSection?: ReactNode;
  /** Left column content */
  leftColumn?: ReactNode;
  /** Right column content (comments, etc.) */
  rightColumn?: ReactNode;
  /** Main scrollable content (fallback for single column) */
  children: ReactNode;
  /** Loading state */
  isLoading?: boolean;
  loadingMessage?: string;
  /** Not found state */
  notFound?: boolean;
  notFoundContent?: ReactNode;
  /** Optional: callback when close button is clicked */
  onClose?: () => void;
}

export default function DetailViewLayout({
  dateInfo,
  organizerChip,
  title,
  statsRow,
  participantsRow,
  mapSection,
  leftColumn,
  rightColumn,
  children,
  isLoading = false,
  loadingMessage = 'Loading...',
  notFound = false,
  notFoundContent,
  onClose,
}: DetailViewLayoutProps) {
  const navigate = useNavigate();

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{loadingMessage}</div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        {notFoundContent || (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Not Found</h1>
            <p className="text-muted-foreground mb-4">The requested item could not be found.</p>
            <Button onClick={handleClose}>Go Back</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={modalVariants}
      transition={modalTransition}
    >
      {/* Close button - fixed in top right */}
      <button
        onClick={handleClose}
        className="fixed top-4 right-4 z-[60] p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-muted transition-colors shadow-lg"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content with page scrolling */}
      <div className="min-h-full">
        {/* Header bar */}
        <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            {/* Logo - links to homepage */}
            <Link to="/" className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L4 10L4 24H24V10L14 2Z" fill="hsl(var(--primary))" />
                <path d="M10 18C10 16 12 14 14 14C16 14 18 16 18 18" stroke="hsl(var(--warning))" strokeWidth="2" strokeLinecap="round" />
                <circle cx="14" cy="10" r="2" fill="hsl(var(--warning))" />
              </svg>
              <span className="text-xl font-bold italic text-primary hidden sm:block">The Hiking Collective</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              {/* Spacer for close button */}
              <div className="w-10" />
            </div>
          </div>
        </div>

        {/* Main 3-column layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Event/Route Info */}
            <div className="lg:border-r border-border p-6">
              {/* Date info line */}
              {dateInfo && (
                <div className="text-sm text-muted-foreground mb-2">
                  {dateInfo}
                </div>
              )}

              {/* Organizer/Creator chip */}
              {organizerChip && (
                <div className="mb-3">
                  {organizerChip}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>

              {/* Stats row */}
              {statsRow && (
                <div className="mb-4">
                  {statsRow}
                </div>
              )}

              {/* Participants/Actions row */}
              {participantsRow && (
                <div className="mb-4">
                  {participantsRow}
                </div>
              )}

              {/* Left column specific content or fallback to children */}
              {leftColumn || children}
            </div>

            {/* Center Column - Map */}
            <div className="lg:border-r border-border p-6 bg-muted/30 hidden lg:block">
              {mapSection && (
                <div className="lg:sticky lg:top-20">
                  {mapSection}
                </div>
              )}
            </div>

            {/* Right Column - Comments/Discussion */}
            <div className="p-6 hidden lg:block">
              {rightColumn}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
