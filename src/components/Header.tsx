import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, User, ChevronDown, Plus } from "lucide-react";
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
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { CreateEventModal } from "./create-event";
import jackPhoto from "@/assets/jack-profile.jpeg";
const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { t } = useLanguage();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
              <path d="M8 21L12 13L16 21H8Z" className="fill-primary/60" />
              <path d="M3 21L9 9L15 21H3Z" className="fill-primary" />
              <circle cx="18" cy="5" r="3" className="fill-warning" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {t.brandName}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.events}
          </Link>
          <Link to="/routes" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.routes}
          </Link>
          <a href="#community" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t.nav.community}
          </a>
          <Button 
            variant="default" 
            size="sm" 
            className="font-semibold gap-2"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-4 w-4" />
            {t.nav.createEvent}
          </Button>
        </nav>

        {/* Right side - Search & Profile */}
        <div className="flex items-center gap-2">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                type="text"
                placeholder={t.nav.searchPlaceholder}
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
              
              <LanguageSwitcher />
              <ThemeToggle />
              
              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 h-10 hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={jackPhoto} alt="Jack" />
                      <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                        {profile?.displayName?.charAt(0).toUpperCase() || 'J'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-foreground">
                      {profile?.displayName || 'Jack'}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    {t.nav.myProfile}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile/edit')} className="cursor-pointer">
                    {t.nav.editProfile}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/events')} className="cursor-pointer">
                    {t.nav.myEvents}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    {t.nav.savedRoutes}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                    {t.nav.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      <CreateEventModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </header>
  );
};

export default Header;
