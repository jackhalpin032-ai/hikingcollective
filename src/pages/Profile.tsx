import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
import ProfileStats from '@/components/profile/ProfileStats';
import ReviewCard from '@/components/profile/ReviewCard';
import ActivityCard from '@/components/profile/ActivityCard';
import HikingBuddies from '@/components/profile/HikingBuddies';
import FavoriteTrails from '@/components/profile/FavoriteTrails';
import RecentActivityFeed from '@/components/profile/RecentActivityFeed';
import jackPhoto from '@/assets/jack-profile.jpeg';
import { 
  Settings, 
  Mountain,
  MessageSquare,
  ChevronRight,
  Leaf,
  Calendar,
  Route as RouteIcon,
  Bike,
  Users,
  Sparkles,
  TrendingUp
} from 'lucide-react';

// Mock data for Jack's enhanced profile
const jackProfile = {
  displayName: 'Jack',
  age: 30,
  location: { city: 'Dublin', country: 'Ireland' },
  experienceLevel: 'intermediate' as const,
  bio: 'Outdoor enthusiast who loves exploring the Wicklow Mountains and wild Atlantic coastline. Always up for a challenging hike or a relaxed nature walk with good company!',
  stats: {
    yearsHiking: 3,
    eventsOrganised: 12,
    hikesCompleted: 45,
    cyclingActivities: 8,
    routesCreated: 18,
    viaFerrataActivities: 6,
  },
  allTimeStats: {
    hiking: 45,
    cycling: 8,
    climbing: 3,
    viaFerrata: 6,
  },
  reviews: 28,
  totalDistance: '289km',
  totalElevation: '24,560m',
  difficultyBreakdown: {
    T1: 2,
    T2: 28,
    T3: 18,
    T4: 5,
    T5: 12,
    T6: 2,
  },
  interests: ['Hiking', 'Photography', 'Camping', 'Trail Running'],
  sustainableTravel: true,
};

const reviews = [
  {
    content: "Jack is an amazing organiser! The hike was well planned and he made sure everyone was comfortable throughout.",
    reviewerName: "Sarah",
    eventName: "Carrauntoohil Summit",
    date: "Nov 2024"
  },
  {
    content: "Great energy and really knows the trails. Would definitely join his events again!",
    reviewerName: "Marcus",
    eventName: "Glendalough Valley",
    date: "Oct 2024"
  },
  {
    content: "Jack kept the pace perfect for everyone. Really inclusive and fun experience!",
    reviewerName: "Elena",
    eventName: "Bray to Greystones",
    date: "Sep 2024"
  }
];

const hikingBuddies = [
  {
    name: "Aoife",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 12,
    lastHike: "2 days ago"
  },
  {
    name: "Ciaran",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 8,
    lastHike: "1 week ago"
  },
  {
    name: "Sinead",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    hikesTogther: 6,
    lastHike: "2 weeks ago"
  },
];

const favoriteTrails = [
  {
    name: "Glendalough",
    location: "Wicklow",
    timesHiked: 8,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop"
  },
  {
    name: "Howth Cliff",
    location: "Dublin",
    timesHiked: 12,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=300&h=200&fit=crop"
  },
  {
    name: "Carrauntoohil",
    location: "Kerry",
    timesHiked: 3,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=200&fit=crop"
  },
  {
    name: "Croagh Patrick",
    location: "Mayo",
    timesHiked: 2,
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=300&h=200&fit=crop"
  },
];

const recentActivity = [
  {
    type: 'hike' as const,
    title: "Completed Bray to Greystones cliff walk",
    description: "7km coastal trail with stunning sea views",
    timeAgo: "2 days ago",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=100&h=100&fit=crop",
    participants: [
      { name: "Aoife", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
      { name: "Ciaran", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
      { name: "Emma" },
    ]
  },
  {
    type: 'group' as const,
    title: "Joined Wicklow Hikers group",
    description: "Now part of a community of 234 local hikers",
    timeAgo: "5 days ago",
  },
  {
    type: 'achievement' as const,
    title: "Earned 'Peak Bagger' badge",
    description: "Completed 10 summit hikes in Ireland",
    timeAgo: "1 week ago",
  },
  {
    type: 'photo' as const,
    title: "Shared 5 photos from Glendalough",
    description: "Your photos got 23 likes from the community",
    timeAgo: "1 week ago",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=100&h=100&fit=crop"
  },
  {
    type: 'review' as const,
    title: "Left a review for Sarah",
    description: "Rated 5 stars for the Wicklow Way hike",
    timeAgo: "2 weeks ago",
  },
];

const activities = [
  {
    id: '1',
    organizer: { name: "Jack", additionalCount: 8 },
    title: "Carrauntoohil sunrise hike",
    time: "5:30",
    location: "Dublin",
    transport: "Car",
    difficulty: "T3",
    distance: "14km",
    elevation: "1040m",
    duration: "6h",
    status: 'organiser' as const,
  },
  {
    id: '2',
    organizer: { name: "Lisa", additionalCount: 12 },
    title: "Wicklow Way scenic trail",
    time: "8:00",
    location: "Dublin",
    transport: "Bus",
    difficulty: "T2",
    distance: "12km",
    elevation: "450m",
    duration: "4h",
    status: 'going' as const,
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isLoading, hasProfile } = useProfile();
  const [activeTab, setActiveTab] = useState<'activity' | 'upcoming' | 'past' | 'organised'>('activity');

  useEffect(() => {
    if (!isLoading && !hasProfile) {
      navigate('/profile/onboarding');
    }
  }, [isLoading, hasProfile, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const displayProfile = jackProfile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-8">
        {/* Profile Header - More compact and social */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="max-w-lg mx-auto">
            {/* Settings button */}
            <button 
              onClick={() => navigate('/profile/edit')}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Avatar with online indicator */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img 
                  src={jackPhoto}
                  alt={displayProfile.displayName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-xl"
                />
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full border-2 border-background" />
                {displayProfile.sustainableTravel && (
                  <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground p-1 rounded-full shadow-lg">
                    <Leaf className="w-3 h-3" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-foreground">{displayProfile.displayName}</h1>
                  <Badge className="bg-primary/10 text-primary text-[10px] border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Trail Explorer
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                  <span className="text-base">🇮🇪</span>
                  Dublin, Ireland
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{displayProfile.stats.hikesCompleted}</strong> hikes
                  </span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">156</strong> followers
                  </span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">89</strong> following
                  </span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {displayProfile.bio}
            </p>

            {/* Action buttons */}
            <div className="flex gap-2 mb-4">
              <Button className="flex-1 rounded-full h-9" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Follow
              </Button>
              <Button variant="outline" className="flex-1 rounded-full h-9" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                Message
              </Button>
            </div>

            {/* Quick stats row */}
            <div className="flex items-center justify-between bg-card rounded-xl p-3 border border-border/50">
              <div className="text-center flex-1">
                <p className="text-lg font-bold text-foreground">{displayProfile.stats.yearsHiking}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Years</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center flex-1">
                <p className="text-lg font-bold text-foreground">{displayProfile.totalDistance}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Distance</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center flex-1">
                <p className="text-lg font-bold text-foreground">{displayProfile.reviews}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Reviews</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center flex-1">
                <p className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  4.9
                </p>
                <p className="text-[10px] text-muted-foreground uppercase">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hiking Buddies Section */}
        <div className="px-6 mb-6">
          <div className="max-w-lg mx-auto">
            <HikingBuddies buddies={hikingBuddies} onViewAll={() => {}} />
          </div>
        </div>

        {/* Favorite Trails Section */}
        <div className="px-6 mb-6">
          <div className="max-w-lg mx-auto">
            <FavoriteTrails trails={favoriteTrails} onViewAll={() => {}} />
          </div>
        </div>

        {/* Activity/Content Tabs */}
        <div className="px-6">
          <div className="max-w-lg mx-auto">
            {/* Tabs */}
            <div className="flex gap-1 mb-4 bg-muted/50 rounded-xl p-1">
              <button 
                onClick={() => setActiveTab('activity')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'activity' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Activity
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'upcoming' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'past' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Past
              </button>
              <button 
                onClick={() => setActiveTab('organised')}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'organised' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Organised
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'activity' && (
              <div className="animate-fade-in">
                <RecentActivityFeed activities={recentActivity} />
              </div>
            )}

            {activeTab === 'upcoming' && (
              <div className="space-y-4 animate-fade-in">
                {activities.map((activity, idx) => (
                  <ActivityCard key={idx} {...activity} />
                ))}
              </div>
            )}

            {activeTab === 'past' && (
              <div className="space-y-4 animate-fade-in">
                <div className="text-center py-8 text-muted-foreground">
                  <Mountain className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">45 past hikes</p>
                  <p className="text-sm">View Jack's hiking history</p>
                </div>
              </div>
            )}

            {activeTab === 'organised' && (
              <div className="space-y-4 animate-fade-in">
                {activities.filter(a => a.status === 'organiser').map((activity, idx) => (
                  <ActivityCard key={idx} {...activity} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 mb-6">
          <div className="px-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Reviews ({displayProfile.reviews})
              </h2>
              <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                Show all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto px-6 pb-2 -mx-6">
            <div className="flex gap-4 px-6 snap-x snap-mandatory max-w-lg mx-auto">
              {reviews.map((review, idx) => (
                <ReviewCard key={idx} {...review} />
              ))}
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown - Compact */}
        <div className="px-6 mb-6">
          <div className="max-w-lg mx-auto">
            <h3 className="font-bold text-foreground mb-3 text-sm">Trail Difficulty Breakdown</h3>
            <div className="flex justify-between gap-2">
              {Object.entries(displayProfile.difficultyBreakdown).map(([level, count]) => (
                <DifficultyBadge key={level} level={level} count={count} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
