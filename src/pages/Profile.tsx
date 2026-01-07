import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
import ProfileStats from '@/components/profile/ProfileStats';
import ReviewCard from '@/components/profile/ReviewCard';
import ActivityCard from '@/components/profile/ActivityCard';
import jackPhoto from '@/assets/jack-profile.jpeg';
import { 
  Settings, 
  Mountain,
  MessageSquare,
  ChevronRight,
  MapPin,
  Leaf,
  Calendar,
  Route as RouteIcon,
  Bike
} from 'lucide-react';

// Mock data for Jack's enhanced profile
const jackProfile = {
  displayName: 'Jack',
  age: 30,
  location: { city: 'Munich', country: 'Germany' },
  experienceLevel: 'intermediate' as const,
  bio: 'Outdoor enthusiast who loves exploring the Alps. Always up for a challenging hike or a relaxed nature walk with good company!',
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
    eventName: "Zugspitze Summit",
    date: "Nov 2024"
  },
  {
    content: "Great energy and really knows the trails. Would definitely join his events again!",
    reviewerName: "Marcus",
    eventName: "Partnachklamm Trail",
    date: "Oct 2024"
  },
  {
    content: "Jack kept the pace perfect for everyone. Really inclusive and fun experience!",
    reviewerName: "Elena",
    eventName: "Schliersee Loop",
    date: "Sep 2024"
  }
];

const activities = [
  {
    organizer: { name: "Jack", additionalCount: 8 },
    title: "Wendelstein sunrise hike",
    time: "5:30",
    location: "Munich",
    transport: "Car",
    difficulty: "T3",
    distance: "14km",
    elevation: "1240m",
    duration: "5h 30min",
    status: 'organiser' as const,
  },
  {
    organizer: { name: "Lisa", additionalCount: 12 },
    title: "Herzogstand panorama trail",
    time: "8:00",
    location: "Munich",
    transport: "Train",
    difficulty: "T2",
    distance: "12km",
    elevation: "890m",
    duration: "4h",
    status: 'going' as const,
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isLoading, hasProfile } = useProfile();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'recent' | 'past' | 'organised'>('upcoming');

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

  // Use Jack's data if available, otherwise fall back to profile data
  const displayProfile = jackProfile;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-8">
        {/* Profile Header */}
        <div className="relative px-6 pt-8 pb-6">
          <div className="max-w-lg mx-auto text-center">
            {/* Settings button */}
            <button 
              onClick={() => navigate('/profile/edit')}
              className="absolute right-6 top-8 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <img 
                src={jackPhoto}
                alt={displayProfile.displayName}
                className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl"
              />
              {displayProfile.sustainableTravel && (
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
                  <Leaf className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Name & Title */}
            <h1 className="text-2xl font-bold text-foreground mb-1">{displayProfile.displayName}</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-primary font-semibold flex items-center gap-1">
                <Mountain className="w-4 h-4" />
                Trail Explorer
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                {displayProfile.reviews} reviews
              </span>
            </div>

            {/* Quick Info Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                {displayProfile.age} y.o.
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                <Leaf className="w-3 h-3 text-primary" />
                Sustainer
              </Badge>
              <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                <span className="text-base">🇩🇪</span>
                Based in {displayProfile.location.country}
              </Badge>
            </div>

            {/* Experience Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card">
                <Mountain className="w-3 h-3 mr-1" />
                {displayProfile.stats.yearsHiking} years hiking
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card">
                <Calendar className="w-3 h-3 mr-1" />
                {displayProfile.stats.eventsOrganised} events organised
              </Badge>
            </div>

            {/* Difficulty & Stats Row */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card flex items-center gap-1">
                <div className="flex -space-x-1">
                  <span className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[8px] font-bold text-white">T3</span>
                  <span className="w-4 h-4 rounded-full bg-orange-400 flex items-center justify-center text-[8px] font-bold text-white">T4</span>
                  <span className="w-4 h-4 rounded-full bg-rose-400 flex items-center justify-center text-[8px] font-bold text-white">T6</span>
                </div>
                {displayProfile.stats.hikesCompleted} hikes completed
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card">
                <Bike className="w-3 h-3 mr-1" />
                {displayProfile.stats.cyclingActivities} Cycling activities
              </Badge>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card">
                <RouteIcon className="w-3 h-3 mr-1" />
                {displayProfile.stats.routesCreated} routes created
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs bg-card">
                <Mountain className="w-3 h-3 mr-1" />
                {displayProfile.stats.viaFerrataActivities} Via Ferrata activities
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 mb-6">
          <div className="max-w-lg mx-auto">
            {/* Time Period Tabs */}
            <div className="flex items-center justify-center gap-4 mb-4 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                LAST MONTH | 5
              </button>
              <button className="text-foreground font-bold border-b-2 border-primary pb-1">
                ALL TIME | 62
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                LAST YEAR | 38
              </button>
            </div>

            <ProfileStats 
              stats={displayProfile.allTimeStats}
              distance={displayProfile.totalDistance}
              elevation={displayProfile.totalElevation}
            />
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="px-6 mb-8">
          <div className="max-w-lg mx-auto">
            <div className="flex justify-center gap-4">
              {Object.entries(displayProfile.difficultyBreakdown).map(([level, count]) => (
                <DifficultyBadge key={level} level={level} count={count} />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <div className="px-6 max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground">JACK'S REVIEWS ({displayProfile.reviews})</h2>
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

        {/* Activities Section */}
        <div className="px-6">
          <div className="max-w-lg mx-auto">
            <h2 className="font-bold text-foreground mb-4">JACK'S ACTIVITIES</h2>
            
            {/* Activity Tabs */}
            <div className="flex gap-4 mb-6 overflow-x-auto pb-2 text-sm">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`whitespace-nowrap pb-1 transition-colors ${activeTab === 'upcoming' ? 'text-foreground font-bold border-b-2 border-primary' : 'text-muted-foreground'}`}
              >
                Upcoming | 2
              </button>
              <button 
                onClick={() => setActiveTab('recent')}
                className={`whitespace-nowrap pb-1 transition-colors ${activeTab === 'recent' ? 'text-foreground font-bold border-b-2 border-primary' : 'text-muted-foreground'}`}
              >
                Recent | 3
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`whitespace-nowrap pb-1 transition-colors ${activeTab === 'past' ? 'text-foreground font-bold border-b-2 border-primary' : 'text-muted-foreground'}`}
              >
                Past | 45
              </button>
              <button 
                onClick={() => setActiveTab('organised')}
                className={`whitespace-nowrap pb-1 transition-colors ${activeTab === 'organised' ? 'text-foreground font-bold border-b-2 border-primary' : 'text-muted-foreground'}`}
              >
                Organised | 12
              </button>
            </div>

            {/* Activity Cards */}
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <ActivityCard key={idx} {...activity} />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button className="flex-1 rounded-full" size="lg">
                Follow
              </Button>
              <Button variant="outline" className="flex-1 rounded-full" size="lg">
                Message
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
