import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/useProfile';
import { 
  OUTDOOR_INTERESTS, 
  HIKE_TYPES, 
  EXPERIENCE_LEVELS, 
  PACE_OPTIONS,
  UserProfile 
} from '@/types/profile';
import { Camera, ChevronRight, ChevronLeft, MapPin, User, Mountain, Gauge, Heart } from 'lucide-react';

type OnboardingData = Partial<UserProfile>;

const TOTAL_STEPS = 6;

export function OnboardingFlow() {
  const navigate = useNavigate();
  const { createProfile } = useProfile();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    displayName: '',
    photoUrl: undefined,
    location: { city: '', country: '' },
    interests: [],
    experienceLevel: 'beginner',
    preferredHikeTypes: [],
    pace: 'moderate',
    bio: ''
  });

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else handleComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = () => {
    try {
      console.log('Completing profile with data:', data);
      const savedProfile = createProfile(data);
      console.log('Profile saved:', savedProfile);
      navigate('/profile');
    } catch (e) {
      console.error('Failed to complete onboarding:', e);
      toast.error('Could not save your profile. Please try again.');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return true; // Photo is optional
      case 2: return data.displayName && data.displayName.length >= 2;
      case 3: return true; // Location optional
      case 4: return true; // Interests optional
      case 5: return true; // Experience/pace optional
      case 6: return true; // Bio optional
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
          <Button variant="ghost" size="sm" onClick={handleComplete} className="text-muted-foreground">
            Skip all
          </Button>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col">
        {step === 1 && (
          <StepPhoto 
            photoUrl={data.photoUrl} 
            onUpdate={(photoUrl) => updateData({ photoUrl })} 
          />
        )}
        {step === 2 && (
          <StepName 
            displayName={data.displayName || ''} 
            onUpdate={(displayName) => updateData({ displayName })} 
          />
        )}
        {step === 3 && (
          <StepLocation 
            location={data.location || { city: '', country: '' }} 
            onUpdate={(location) => updateData({ location })} 
          />
        )}
        {step === 4 && (
          <StepInterests 
            interests={data.interests || []}
            hikeTypes={data.preferredHikeTypes || []}
            onUpdate={(interests, hikeTypes) => updateData({ interests, preferredHikeTypes: hikeTypes })} 
          />
        )}
        {step === 5 && (
          <StepExperience 
            experienceLevel={data.experienceLevel || 'beginner'}
            pace={data.pace || 'moderate'}
            onUpdate={(experienceLevel, pace) => updateData({ experienceLevel, pace })} 
          />
        )}
        {step === 6 && (
          <StepBio 
            bio={data.bio || ''} 
            onUpdate={(bio) => updateData({ bio })} 
          />
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 flex gap-3">
        {step > 1 && (
          <Button variant="outline" size="lg" onClick={prevStep} className="flex-1">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        )}
        <Button 
          size="lg" 
          onClick={nextStep} 
          disabled={!canProceed()}
          className="flex-1"
        >
          {step === TOTAL_STEPS ? 'Complete' : 'Continue'}
          {step < TOTAL_STEPS && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}

function StepPhoto({ photoUrl, onUpdate }: { photoUrl?: string; onUpdate: (url?: string) => void }) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Camera className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Add a profile photo</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">
        Help other hikers recognize you on the trail
      </p>
      
      <label className="cursor-pointer">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handlePhotoUpload}
        />
        {photoUrl ? (
          <div className="relative">
            <img 
              src={photoUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center hover:border-primary transition-colors">
            <Camera className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </label>
      <p className="text-sm text-muted-foreground mt-4">Tap to upload</p>
    </div>
  );
}

function StepName({ displayName, onUpdate }: { displayName: string; onUpdate: (name: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <User className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">What's your name?</h1>
      <p className="text-muted-foreground mb-8">
        This is how other hikers will know you
      </p>
      
      <Input
        type="text"
        placeholder="Your display name"
        value={displayName}
        onChange={(e) => onUpdate(e.target.value)}
        className="text-lg h-14"
        autoFocus
      />
    </div>
  );
}

function StepLocation({ location, onUpdate }: { 
  location: { city: string; country: string }; 
  onUpdate: (loc: { city: string; country: string }) => void 
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <MapPin className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Where are you based?</h1>
      <p className="text-muted-foreground mb-8">
        Find hikes and hikers near you
      </p>
      
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="City"
          value={location.city}
          onChange={(e) => onUpdate({ ...location, city: e.target.value })}
          className="text-lg h-14"
        />
        <Input
          type="text"
          placeholder="Country"
          value={location.country}
          onChange={(e) => onUpdate({ ...location, country: e.target.value })}
          className="text-lg h-14"
        />
      </div>
    </div>
  );
}

function StepInterests({ interests, hikeTypes, onUpdate }: { 
  interests: string[]; 
  hikeTypes: string[];
  onUpdate: (interests: string[], hikeTypes: string[]) => void 
}) {
  const toggleInterest = (interest: string) => {
    const updated = interests.includes(interest) 
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    onUpdate(updated, hikeTypes);
  };

  const toggleHikeType = (type: string) => {
    const updated = hikeTypes.includes(type) 
      ? hikeTypes.filter(t => t !== type)
      : [...hikeTypes, type];
    onUpdate(interests, updated);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">What do you enjoy?</h1>
      <p className="text-muted-foreground mb-6">
        Select your outdoor interests
      </p>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {OUTDOOR_INTERESTS.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              interests.includes(interest)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {interest}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground mb-4 text-sm font-medium">Preferred hike types</p>
      <div className="flex flex-wrap gap-2">
        {HIKE_TYPES.map(type => (
          <button
            key={type}
            onClick={() => toggleHikeType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              hikeTypes.includes(type)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepExperience({ experienceLevel, pace, onUpdate }: { 
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  pace: 'slow' | 'moderate' | 'fast';
  onUpdate: (level: 'beginner' | 'intermediate' | 'advanced', pace: 'slow' | 'moderate' | 'fast') => void 
}) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Mountain className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Your experience</h1>
      <p className="text-muted-foreground mb-6">
        Helps match you with the right hikes
      </p>
      
      <p className="text-sm font-medium text-foreground mb-3">Experience level</p>
      <div className="space-y-2 mb-8">
        {EXPERIENCE_LEVELS.map(level => (
          <button
            key={level.value}
            onClick={() => onUpdate(level.value, pace)}
            className={`w-full p-4 rounded-xl text-left transition-colors border-2 ${
              experienceLevel === level.value
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <span className="font-semibold text-foreground">{level.label}</span>
            <span className="text-sm text-muted-foreground ml-2">{level.description}</span>
          </button>
        ))}
      </div>

      <p className="text-sm font-medium text-foreground mb-3">Typical pace</p>
      <div className="flex gap-2">
        {PACE_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => onUpdate(experienceLevel, option.value)}
            className={`flex-1 p-4 rounded-xl text-center transition-colors border-2 ${
              pace === option.value
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <Gauge className={`w-5 h-5 mx-auto mb-1 ${pace === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="font-semibold text-foreground text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepBio({ bio, onUpdate }: { bio: string; onUpdate: (bio: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Heart className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h1>
      <p className="text-muted-foreground mb-8">
        Why do you love the outdoors?
      </p>
      
      <Textarea
        placeholder="I love hiking because..."
        value={bio}
        onChange={(e) => onUpdate(e.target.value)}
        className="text-base min-h-[150px] resize-none"
        maxLength={300}
      />
      <p className="text-sm text-muted-foreground mt-2 text-right">{bio.length}/300</p>
    </div>
  );
}
