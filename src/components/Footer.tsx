const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2L4 10L4 24H24V10L14 2Z" fill="hsl(var(--primary))" />
              <path d="M10 18C10 16 12 14 14 14C16 14 18 16 18 18" stroke="hsl(var(--warning))" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="10" r="2" fill="hsl(var(--warning))" />
            </svg>
            <span className="text-lg font-bold italic text-primary">Hiking Buddies</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Imprint
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 Hiking Buddies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
