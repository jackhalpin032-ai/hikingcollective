import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  MapPin, 
  Settings, 
  Calendar, 
  Route, 
  Users, 
  ChevronRight,
  Mountain,
  Gauge
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isLoading, hasProfile } = useProfile();

  useEffect(() => {
    if (!isLoading && !hasProfile) {
      navigate('/profile/onboarding');
    }
  }, [isLoading, hasProfile, navigate]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const experienceLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate', 
    advanced: 'Advanced'
  };

  const paceLabels = {
    slow: 'Slow pace',
    moderate: 'Moderate pace',
    fast: 'Fast pace'
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Profile header */}
        <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-8 pb-6">
          <div className="max-w-lg mx-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {profile.photoUrl ? (
                  <img 
                    src={profile.photoUrl} 
                    alt={profile.displayName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background shadow-lg">
                    <span className="text-2xl font-bold text-primary">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-foreground">{profile.displayName}</h1>
                  {(profile.location.city || profile.location.country) && (
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {[profile.location.city, profile.location.country].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigate('/profile/edit')}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Experience badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="gap-1">
                <Mountain className="w-3 h-3" />
                {experienceLabels[profile.experienceLevel]}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Gauge className="w-3 h-3" />
                {paceLabels[profile.pace]}
              </Badge>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-foreground text-sm leading-relaxed mb-6">{profile.bio}</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-foreground">{profile.stats.eventsJoined}</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{profile.stats.routesCompleted}</p>
                <p className="text-xs text-muted-foreground">Routes</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{profile.stats.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{profile.stats.following}</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="px-6 py-6 max-w-lg mx-auto">
          {profile.interests.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => (
                  <Badge key={interest} variant="outline" className="bg-primary/5 border-primary/20 text-foreground">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile.preferredHikeTypes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Preferred Hikes</h2>
              <div className="flex flex-wrap gap-2">
                {profile.preferredHikeTypes.map(type => (
                  <Badge key={type} variant="outline" className="bg-muted">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mb-8">
            <Button className="flex-1">Follow</Button>
            <Button variant="outline" className="flex-1">Message</Button>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            <Card 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => navigate('/events')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Upcoming Events</p>
                  <p className="text-sm text-muted-foreground">2 events this month</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Route className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Saved Routes</p>
                  <p className="text-sm text-muted-foreground">5 favourite routes</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>

            <Card className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Past Events</p>
                  <p className="text-sm text-muted-foreground">{profile.stats.eventsJoined} events attended</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
