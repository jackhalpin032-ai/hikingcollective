import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 21L12 13L16 21H8Z" fill="hsl(var(--primary) / 0.6)" />
                <path d="M3 21L9 9L15 21H3Z" fill="hsl(var(--primary))" />
                <circle cx="18" cy="5" r="3" fill="hsl(var(--warning))" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">{t.brandName}</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.imprint}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.about}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.contact}
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
