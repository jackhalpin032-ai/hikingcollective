import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, User, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import jackPhoto from "@/assets/jack-profile.jpeg";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { profile, hasProfile } = useProfile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L4 10L4 24H24V10L14 2Z" fill="hsl(var(--primary))" />
            <path d="M10 18C10 16 12 14 14 14C16 14 18 16 18 18" stroke="hsl(var(--warning))" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="10" r="2" fill="hsl(var(--warning))" />
          </svg>
          <span className="text-xl font-bold italic text-primary">The Hiking Collective</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Routes
          </Link>
          <a href="#community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <Button variant="outline" size="sm" className="font-semibold" asChild>
            <Link to="/events">Create event</Link>
          </Button>
        </nav>

        {/* Right side - Search & Profile */}
        <div className="flex items-center gap-3">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 md:w-64 h-9"
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 h-10 hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={jackPhoto} alt="Jack" />
                      <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                        {hasProfile && profile?.displayName 
                          ? profile.displayName.charAt(0).toUpperCase() 
                          : 'J'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-foreground">
                      {hasProfile && profile?.displayName ? profile.displayName : 'Guest'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile/edit')} className="cursor-pointer">
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/events')} className="cursor-pointer">
                    My Events
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Saved Routes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
