import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { useProfile } from "@/hooks/useProfile";
import { Input } from "./ui/input";

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
          <span className="text-xl font-bold italic text-primary">Hiking Buddies</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Events
          </Link>
          <a href="#routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Routes
          </a>
          <a href="#community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <Button variant="outline" size="sm" className="font-semibold" asChild>
            <Link to="/events">Create event</Link>
          </Button>
        </nav>

        {/* Right side - Search */}
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
              <Link to="/profile" className="h-9 w-9 rounded-full bg-muted overflow-hidden block">
                {hasProfile && profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : hasProfile && profile?.displayName ? (
                  <div className="h-full w-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
