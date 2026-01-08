import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vortex } from "@/components/ui/vortex";
import { ArrowRight, Mountain } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <Vortex
        backgroundColor="hsl(var(--background))"
        baseHue={142}
        rangeHue={60}
        particleCount={500}
        baseSpeed={0.1}
        rangeSpeed={1.0}
        baseRadius={1}
        rangeRadius={2}
        rangeY={200}
        containerClassName="absolute inset-0"
        className="flex items-center justify-center h-full w-full"
      >
        <div className="container max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left content */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Mountain className="w-4 h-4" />
                Join the adventure
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
                Adventures are better
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
                  with buddies
                </span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
                The Hiking Collective is a non-profit community of outdoor and sport lovers. Join an upcoming hiking, climbing, cycling - you name it - event or organise your own!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link to="/events">
                    Browse Events
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                  <Link to="/routes">
                    Explore Routes
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right image */}
            <div className="order-1 md:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-2xl ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
                  alt="Hikers on a mountain trail at sunrise"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Vortex>
    </section>
  );
};

export default Hero;
