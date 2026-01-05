import { Search } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L4 10L4 24H24V10L14 2Z" fill="hsl(var(--primary))" />
            <path d="M10 18C10 16 12 14 14 14C16 14 18 16 18 18" stroke="hsl(var(--warning))" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="10" r="2" fill="hsl(var(--warning))" />
          </svg>
          <span className="text-xl font-bold italic text-primary">Hiking Buddies</span>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Events
          </a>
          <a href="#routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Routes
          </a>
          <a href="#community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <Button variant="outline" size="sm" className="font-semibold">
            Create event
          </Button>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="h-9 w-9 rounded-full bg-muted overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
