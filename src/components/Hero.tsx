import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Mountain className="w-4 h-4" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
              {t.hero.titleLine1}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {t.hero.titleLine2}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start w-full">
              <Button size="lg" className="rounded-full px-6 sm:px-8" asChild>
                <Link to="/events">
                  {t.hero.browseEvents}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6 sm:px-8" asChild>
                <Link to="/routes">
                  {t.hero.exploreRoutes}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-2xl ring-1 ring-border">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format&q=75"
                srcSet="
                  https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&auto=format&q=75 400w,
                  https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=450&fit=crop&auto=format&q=75 600w,
                  https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format&q=75 800w,
                  https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=900&fit=crop&auto=format&q=75 1200w
                "
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={t.hero.imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
