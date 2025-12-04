import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { PodcastSection } from "./components/Podcast";
import { WebinarSection } from "./components/Webinars";
import { CommunitySection } from "./components/Community";
import { VideoPlaylist } from "./components/VideoPlaylist";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <main>
        <Navbar />
        <HeroSection />
        <VideoPlaylist />
        <PodcastSection />
        <WebinarSection />
        <CommunitySection />
      </main>
    </div>
  );
}
