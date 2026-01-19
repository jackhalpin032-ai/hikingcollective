import { useLanguage } from "@/i18n/LanguageContext";

const Mission = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop"
              alt={t.mission.imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t.mission.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.mission.description}
            </p>
            <a
              href="#"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              {t.mission.learnMore}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
