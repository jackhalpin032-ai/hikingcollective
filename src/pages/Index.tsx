import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActivityTags from "@/components/ActivityTags";
import Mission from "@/components/Mission";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ActivityTags />
          <Mission />
          <EventsSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
