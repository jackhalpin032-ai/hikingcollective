const Mission = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&h=600&fit=crop"
              alt="Hiker exploring a canyon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What we stand for
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We are a community of outdoor sports lovers and restless mountains explorers and we believe it is more fun to do it together. Most of events are organized by passionate community members, just like you, and therefore free of charge except transportation and personal costs.
            </p>
            <a
              href="#"
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              More about community rules and values
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
