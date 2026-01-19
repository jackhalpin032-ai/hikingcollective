import { useState, useEffect } from 'react';
import { z } from 'zod';
import { UserProfile } from '@/types/profile';

const STORAGE_KEY = 'hiking_collective_profile';

// Zod schema for validating localStorage data
const UserProfileSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  photoUrl: z.string().optional(),
  location: z.object({
    city: z.string(),
    country: z.string()
  }),
  interests: z.array(z.string()),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  preferredHikeTypes: z.array(z.string()),
  pace: z.enum(['slow', 'moderate', 'fast']),
  bio: z.string(),
  isPublic: z.boolean(),
  stats: z.object({
    eventsJoined: z.number(),
    routesCompleted: z.number(),
    followers: z.number(),
    following: z.number()
  }),
  createdAt: z.string()
});

const generateId = () => {
  // Avoid direct `crypto.randomUUID()` at module init; it's not supported everywhere.
  const c: any = (globalThis as any).crypto;
  if (c?.randomUUID) return String(c.randomUUID());
  if (c?.getRandomValues) {
    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);
    return Array.from(bytes, (b: number) => b.toString(16).padStart(2, '0')).join('');
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const createDefaultProfile = (): UserProfile => ({
  id: generateId(),
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
});

const createJackProfile = (): UserProfile => ({
  id: generateId(),
  displayName: 'Jack',
  photoUrl: undefined,
  location: { city: 'Dublin', country: 'Ireland' },
  interests: ['Hiking', 'Nature', 'Photography'],
  experienceLevel: 'intermediate',
  preferredHikeTypes: ['Mountain', 'Coastal'],
  pace: 'moderate',
  bio: 'Passionate about exploring the Irish wilderness and connecting with fellow outdoor enthusiasts.',
  isPublic: true,
  stats: {
    eventsJoined: 47,
    routesCompleted: 32,
    followers: 156,
    following: 89
  },
  createdAt: new Date().toISOString()
});

export function useProfile() {
const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // Use safeParse to handle malformed JSON and validation in one step
      const parseResult = UserProfileSchema.safeParse((() => {
        try {
          return JSON.parse(stored);
        } catch {
          // Return null for malformed JSON - safeParse will reject it
          return null;
        }
      })());

      if (parseResult.success) {
        setProfile(parseResult.data as UserProfile);
      } else {
        console.error('Invalid profile data in localStorage, resetting to default');
        localStorage.removeItem(STORAGE_KEY);
        setProfile(createJackProfile());
      }
    } else {
      // Pre-populate with Jack's default profile for demo
      setProfile(createJackProfile());
    }
    setIsLoading(false);
  }, []);

  const saveProfile = (data: Partial<UserProfile>): UserProfile | null => {
    const base = profile || createDefaultProfile();
    const updated: UserProfile = {
      ...base,
      ...data,
      location: { ...base.location, ...(data.location || {}) },
      stats: { ...base.stats, ...(data.stats || {}) }
    };
    // Validate before saving
    try {
      UserProfileSchema.parse(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setProfile(updated);
      return updated;
    } catch (error) {
      console.error('Invalid profile data, not saving');
      return profile;
    }
  };

  const createProfile = (data: Partial<UserProfile>) => {
    const newProfile = { ...createDefaultProfile(), ...data, createdAt: new Date().toISOString() };
    // Validate before saving
    try {
      UserProfileSchema.parse(newProfile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
      return newProfile;
    } catch (error) {
      console.error('Invalid profile data, not creating');
      return null;
    }
  };

  const hasProfile = !!profile?.displayName;

  return { profile, isLoading, saveProfile, createProfile, hasProfile };
}
