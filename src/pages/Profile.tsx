import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import DifficultyBadge from '@/components/profile/DifficultyBadge';
import ProfileStats from '@/components/profile/ProfileStats';
import ReviewCard from '@/components/profile/ReviewCard';
import ActivityCard from '@/components/profile/ActivityCard';
import HikingBuddies from '@/components/profile/HikingBuddies';
import FavoriteTrails from '@/components/profile/FavoriteTrails';
import RecentActivityFeed from '@/components/profile/RecentActivityFeed';
import jackPhoto from '@/assets/jack-profile.jpeg';
import {
  mockProfile,
  mockReviews,
  mockHikingBuddies,
  mockFavoriteTrails,
  mockRecentActivity,
  mockActivities,
} from '@/data/mockProfile';
import { getEmptyStateCopy } from '@/lib/emptyStates';
import { 
  Settings, 
  Mountain,
  MessageSquare,
  ChevronRight,
  Leaf,
  Calendar,
  Users,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isLoading } = useProfile();
  const [activeTab, setActiveTab] = useState<'activity' | 'upcoming' | 'past' | 'organised'>('activity');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Use real profile data if available, otherwise fall back to mock
  const displayProfile = profile?.displayName ? {
    ...mockProfile,
    displayName: profile.displayName,
    bio: profile.bio || mockProfile.bio,
    location: profile.location.city ? profile.location : mockProfile.location,
    experienceLevel: profile.experienceLevel || mockProfile.experienceLevel,
    interests: profile.interests.length > 0 ? profile.interests : mockProfile.interests,
  } : mockProfile;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex flex-col">
        <Header />
      
      <main className="flex-1 pb-8">
        {/* Desktop Layout Container */}
        <div className="container max-w-6xl mx-auto px-6 pt-6">
          
          {/* Desktop: Two Column Layout */}
          <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-8">
            
            {/* Left Column - Profile Info (Sticky on Desktop) */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              {/* Profile Header */}
              <div className="relative pb-4">
                {/* Settings button */}
                <button 
                  onClick={() => navigate('/profile/edit')}
                  className="absolute right-0 top-0 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* Avatar with online indicator */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={profile?.photoUrl || jackPhoto}
                      alt={displayProfile.displayName}
                      className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-background shadow-xl"
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
                      <h1 className="text-xl lg:text-2xl font-bold text-foreground">{displayProfile.displayName}</h1>
                      <Badge className="bg-primary/10 text-primary text-[10px] border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Trail Explorer
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <span className="text-base">🇮🇪</span>
                      {displayProfile.location.city}, {displayProfile.location.country}
                    </p>
                    <div className="flex items-center gap-3 text-xs lg:text-sm">
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
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {displayProfile.bio}
                </p>

                {/* Social Proof Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0 px-3 py-1 text-xs font-medium">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    Attended {displayProfile.stats.hikesCompleted} hikes
                  </Badge>
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-0 px-3 py-1 text-xs font-medium">
                    <Users className="w-3 h-3 mr-1.5" />
                    Hiked with {mockHikingBuddies.reduce((acc, b) => acc + b.hikesTogther, 0)} people
                  </Badge>
                  <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 border-0 px-3 py-1 text-xs font-medium">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    Community contributor
                  </Badge>
                  {displayProfile.stats.eventsOrganised > 5 && (
                    <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 border-0 px-3 py-1 text-xs font-medium">
                      <Mountain className="w-3 h-3 mr-1.5" />
                      Organised {displayProfile.stats.eventsOrganised} adventures
                    </Badge>
                  )}
                </div>

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
                <div className="flex items-center justify-between bg-card rounded-xl p-3 lg:p-4 border border-border/50">
                  <div className="text-center flex-1">
                    <p className="text-lg lg:text-xl font-bold text-foreground">{displayProfile.stats.yearsHiking}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground uppercase">Years</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center flex-1">
                    <p className="text-lg lg:text-xl font-bold text-foreground">{displayProfile.totalDistance}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground uppercase">Distance</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center flex-1">
                    <p className="text-lg lg:text-xl font-bold text-foreground">{displayProfile.reviews}</p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground uppercase">Reviews</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center flex-1">
                    <p className="text-lg lg:text-xl font-bold text-primary flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      4.9
                    </p>
                    <p className="text-[10px] lg:text-xs text-muted-foreground uppercase">Rating</p>
                  </div>
                </div>
              </div>

              {/* Hiking Buddies - Desktop sidebar */}
              <div className="mb-6 mt-6">
                <HikingBuddies buddies={mockHikingBuddies} onViewAll={() => {}} />
              </div>

              {/* Difficulty Breakdown - Desktop sidebar */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-3 text-sm">Trail Difficulty Breakdown</h3>
                <div className="flex justify-between gap-2">
                  {Object.entries(displayProfile.difficultyBreakdown).map(([level, count]) => (
                    <DifficultyBadge key={level} level={level} count={count} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:pt-0 pt-6">
              {/* Favorite Trails Section */}
              <div className="mb-6">
                <FavoriteTrails trails={mockFavoriteTrails} onViewAll={() => {}} />
              </div>

              {/* Activity/Content Tabs */}
              <div className="mb-6">
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
                    <RecentActivityFeed activities={mockRecentActivity} />
                  </div>
                )}

                {activeTab === 'upcoming' && (
                  <div className="space-y-4 animate-fade-in">
                    {mockActivities.map((activity, idx) => (
                      <ActivityCard key={idx} {...activity} />
                    ))}
                  </div>
                )}

                {activeTab === 'past' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="text-center py-8 text-muted-foreground">
                      <Mountain className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">{displayProfile.stats.hikesCompleted} past hikes</p>
                      <p className="text-sm">View {displayProfile.displayName}'s hiking history</p>
                    </div>
                  </div>
                )}

                {activeTab === 'organised' && (
                  <div className="space-y-4 animate-fade-in">
                    {mockActivities.filter(a => a.status === 'organiser').map((activity, idx) => (
                      <ActivityCard key={idx} {...activity} />
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Reviews ({displayProfile.reviews})
                  </h2>
                  <button className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                    Show all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockReviews.map((review, idx) => (
                    <ReviewCard key={idx} {...review} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      </div>
    </PageTransition>
  );
}
