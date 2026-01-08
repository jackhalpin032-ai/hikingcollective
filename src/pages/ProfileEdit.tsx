import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  OUTDOOR_INTERESTS, 
  HIKE_TYPES, 
  EXPERIENCE_LEVELS, 
  PACE_OPTIONS,
  UserProfile 
} from '@/types/profile';
import { ArrowLeft, Camera, Check, User, MapPin, Compass, Heart, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { profile, isLoading, saveProfile } = useProfile();
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
    await new Promise(resolve => setTimeout(resolve, 300));
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
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-foreground text-lg">Edit Profile</h1>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="hidden lg:flex">
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
          <Button size="icon" onClick={handleSave} disabled={isSaving} className="lg:hidden">
            {isSaving ? '...' : <Check className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Sidebar - Photo & Basic Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Photo */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <label className="cursor-pointer relative group">
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
                        className="w-28 h-28 rounded-full object-cover border-4 border-muted group-hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                        <span className="text-4xl font-bold text-muted-foreground">
                          {formData.displayName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-9 h-9 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </label>
                  <p className="text-sm text-muted-foreground mt-3">Click to change photo</p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy - Desktop sidebar */}
            <Card className="hidden lg:block">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">Public profile</p>
                    <p className="text-xs text-muted-foreground">Anyone can view</p>
                  </div>
                  <Switch
                    checked={formData.isPublic ?? true}
                    onCheckedChange={(checked) => updateField('isPublic', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save button - Desktop sidebar */}
            <Button className="w-full hidden lg:flex" size="lg" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save changes'}
            </Button>
          </div>

          {/* Main Content */}
          <div className="mt-6 lg:mt-0 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    value={formData.displayName || ''}
                    onChange={(e) => updateField('displayName', e.target.value)}
                    className="mt-1.5"
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
                      className="mt-1.5"
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
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio || ''}
                    onChange={(e) => updateField('bio', e.target.value)}
                    className="mt-1.5 min-h-[100px] resize-none"
                    maxLength={300}
                    placeholder="Tell others about yourself..."
                  />
                  <p className="text-xs text-muted-foreground mt-1.5 text-right">
                    {(formData.bio || '').length}/300
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Experience & Pace */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  Experience & Pace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Experience level</Label>
                  <div className="grid gap-2 lg:grid-cols-3">
                    {EXPERIENCE_LEVELS.map(level => (
                      <button
                        key={level.value}
                        onClick={() => updateField('experienceLevel', level.value)}
                        className={`p-3 rounded-lg text-left transition-all border ${
                          formData.experienceLevel === level.value
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="font-medium text-foreground block">{level.label}</span>
                        <span className="text-xs text-muted-foreground">{level.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Typical pace</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {PACE_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateField('pace', option.value)}
                        className={`p-3 rounded-lg text-center transition-all border ${
                          formData.pace === option.value
                            ? 'border-primary bg-primary/5 ring-1 ring-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="font-medium text-foreground text-sm">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests & Preferences */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Interests & Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Outdoor interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {OUTDOOR_INTERESTS.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.interests?.includes(interest)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Preferred hike types</Label>
                  <div className="flex flex-wrap gap-2">
                    {HIKE_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleHikeType(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.preferredHikeTypes?.includes(type)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy - Mobile only */}
            <Card className="lg:hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Save button - Mobile */}
            <div className="pb-6 lg:hidden">
              <Button className="w-full" size="lg" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
