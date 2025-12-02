import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { PodcastSection } from "./components/Podcast";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main>
        <Navbar />
        <HeroSection />
        <PodcastSection />
      </main>
    </div>
  );
}
