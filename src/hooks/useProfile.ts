import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/profile';

const STORAGE_KEY = 'hiking_buddies_profile';

const defaultProfile: UserProfile = {
  id: crypto.randomUUID(),
  displayName: '',
  photoUrl: undefined,
  location: { city: '', country: '' },
  interests: [],
  experienceLevel: 'beginner',
  preferredHikeTypes: [],
  pace: 'moderate',
  bio: '',
  isPublic: true,
  stats: {
    eventsJoined: 0,
    routesCompleted: 0,
    followers: 0,
    following: 0
  },
  createdAt: new Date().toISOString()
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProfile(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const saveProfile = (data: Partial<UserProfile>) => {
    const updated = { ...(profile || defaultProfile), ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProfile(updated);
    return updated;
  };

  const createProfile = (data: Partial<UserProfile>) => {
    const newProfile = { ...defaultProfile, ...data, createdAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
    return newProfile;
  };

  const hasProfile = !!profile?.displayName;

  return { profile, isLoading, saveProfile, createProfile, hasProfile };
}
