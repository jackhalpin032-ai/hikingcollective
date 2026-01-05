const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left content */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8">
              Adventures are better
              <br />
              with buddies
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
              Hiking Buddies is a non-profit community of outdoor and sport lovers. Join an upcoming hiking, climbing, cycling - you name it - event or organise your own and enjoy your adventures with like-minded people!
            </p>
          </div>

          {/* Right image */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
                alt="Hikers on a mountain trail at sunrise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
