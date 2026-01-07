import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  OUTDOOR_INTERESTS, 
  HIKE_TYPES, 
  EXPERIENCE_LEVELS, 
  PACE_OPTIONS,
  UserProfile 
} from '@/types/profile';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { profile, isLoading, saveProfile, hasProfile } = useProfile();
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && profile) {
      setFormData(profile);
    }
  }, [isLoading, profile]);

  const updateField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (interest: string) => {
    const current = formData.interests || [];
    const updated = current.includes(interest) 
      ? current.filter(i => i !== interest)
      : [...current, interest];
    updateField('interests', updated);
  };

  const toggleHikeType = (type: string) => {
    const current = formData.preferredHikeTypes || [];
    const updated = current.includes(type) 
      ? current.filter(t => t !== type)
      : [...current, type];
    updateField('preferredHikeTypes', updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate save
    saveProfile(formData);
    setIsSaving(false);
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
    navigate('/profile');
  };

  if (isLoading || !formData.displayName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-foreground">Edit Profile</h1>
        <Button size="sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? '...' : <Check className="w-4 h-4" />}
        </Button>
      </div>

      <div className="px-6 py-6 max-w-lg mx-auto space-y-8">
        {/* Photo */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handlePhotoUpload}
            />
            {formData.photoUrl ? (
              <img 
                src={formData.photoUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-muted"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground">
                  {formData.displayName?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </label>
          <p className="text-sm text-muted-foreground mt-2">Tap to change photo</p>
        </div>

        {/* Basic info */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={formData.displayName || ''}
              onChange={(e) => updateField('displayName', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.location?.city || ''}
                onChange={(e) => updateField('location', { 
                  ...formData.location, 
                  city: e.target.value,
                  country: formData.location?.country || ''
                })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.location?.country || ''}
                onChange={(e) => updateField('location', { 
                  ...formData.location, 
                  city: formData.location?.city || '',
                  country: e.target.value 
                })}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) => updateField('bio', e.target.value)}
              className="mt-1 min-h-[100px]"
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {(formData.bio || '').length}/300
            </p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <Label className="mb-3 block">Experience level</Label>
          <div className="space-y-2">
            {EXPERIENCE_LEVELS.map(level => (
              <button
                key={level.value}
                onClick={() => updateField('experienceLevel', level.value)}
                className={`w-full p-3 rounded-lg text-left transition-colors border ${
                  formData.experienceLevel === level.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-foreground">{level.label}</span>
                <span className="text-sm text-muted-foreground ml-2">{level.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pace */}
        <div>
          <Label className="mb-3 block">Typical pace</Label>
          <div className="flex gap-2">
            {PACE_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => updateField('pace', option.value)}
                className={`flex-1 p-3 rounded-lg text-center transition-colors border ${
                  formData.pace === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-foreground text-sm">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <Label className="mb-3 block">Outdoor interests</Label>
          <div className="flex flex-wrap gap-2">
            {OUTDOOR_INTERESTS.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.interests?.includes(interest)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Hike types */}
        <div>
          <Label className="mb-3 block">Preferred hike types</Label>
          <div className="flex flex-wrap gap-2">
            {HIKE_TYPES.map(type => (
              <button
                key={type}
                onClick={() => toggleHikeType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formData.preferredHikeTypes?.includes(type)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="border-t border-border pt-6">
          <h2 className="font-semibold text-foreground mb-4">Privacy</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Public profile</p>
              <p className="text-sm text-muted-foreground">Anyone can view your profile</p>
            </div>
            <Switch
              checked={formData.isPublic ?? true}
              onCheckedChange={(checked) => updateField('isPublic', checked)}
            />
          </div>
        </div>

        {/* Save button (mobile sticky) */}
        <div className="pb-6">
          <Button className="w-full" size="lg" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
