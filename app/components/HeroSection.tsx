'use client';
import { useState, useRef } from "react";
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/Button";

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

interface FeaturedContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  thumbnailGradient: string;
  tag: string;
  initials: string;
}

const featuredContent: FeaturedContent[] = [
  {
    id: 1,
    title: "Adaora Okafor",
    subtitle: "CEO, FinStack Technologies",
    description: "From Lagos to global fintech dominance. Watch how Adaora built Africa's fastest-growing payment infrastructure.",
    videoUrl: "https://www.youtube.com/watch?v=oX7OduG1YmI",
    thumbnailGradient: "from-primary/80 to-gold-dark/60",
    tag: "Featured This Week",
    initials: "AO"
  },
  {
    id: 2,
    title: "Kwame Mensah",
    subtitle: "Founder, AgriTech Ghana",
    description: "Revolutionizing African agriculture through AI-powered solutions. A story of innovation and resilience.",
    videoUrl: "https://www.youtube.com/watch?v=hmtuvNfytjM",
    thumbnailGradient: "from-teal/80 to-emerald-600/60",
    tag: "Trending Now",
    initials: "KM"
  },
  {
    id: 3,
    title: "Amina Hassan",
    subtitle: "CTO, CloudNine Africa",
    description: "Building cloud infrastructure for the continent. How one woman is changing Africa's digital landscape.",
    videoUrl: "https://www.youtube.com/watch?v=5KmopXwjXik",
    thumbnailGradient: "from-purple-600/80 to-pink-500/60",
    tag: "Editor's Pick",
    initials: "AH"
  },
  {
    id: 4,
    title: "Olumide Adeyemi",
    subtitle: "CEO, EduLearn Africa",
    description: "Democratizing education across 15 African countries. The journey of Africa's EdTech pioneer.",
    videoUrl: "https://www.youtube.com/watch?v=1_gJp2uAjO0",
    thumbnailGradient: "from-orange-500/80 to-red-600/60",
    tag: "New Episode",
    initials: "OA"
  },
  {
    id: 5,
    title: "Fatima Diallo",
    subtitle: "Founder, HealthBridge",
    description: "Connecting rural communities to healthcare. A mission-driven approach to African healthtech.",
    videoUrl: "https://www.youtube.com/watch?v=5zvnFM2BXqY",
    thumbnailGradient: "from-cyan-500/80 to-blue-600/60",
    tag: "Spotlight",
    initials: "FD"
  }
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeContent = featuredContent[activeIndex];
  const isYouTube = getYouTubeVideoId(activeContent.videoUrl) !== null;

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleContentChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Main Video Player Area - Netflix Style */}
      <div className="relative w-full aspect-video max-h-[85vh]">
        {/* Fade transition effect */}
        <div
          className={`absolute inset-0 bg-background transition-opacity duration-300 z-10 pointer-events-none ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Video or YouTube Player */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {isYouTube ? (
            <iframe
              width="100%"
              height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(activeContent.videoUrl)}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
              title={activeContent.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={activeContent.videoUrl} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
              <span className="text-sm font-medium text-primary">
                {activeContent.tag}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sansita font-bold mb-3 text-foreground">
              {activeContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              {activeContent.subtitle}
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mb-6">
              {activeContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="hero"
                size="lg"
                className="gap-2"
                onClick={() => setIsPlayingModal(true)}
              >
                <Play className="w-5 h-5 fill-current" />
                Start Journey
              </Button>
              <Button variant="glass" size="lg" className="gap-2">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Video Controls - Top Right */}
        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/30 backdrop-blur-sm border border-muted-foreground/20 hover:bg-background/50"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <div className="h-full bg-primary w-1/3 transition-all duration-300" />
        </div>
      </div>

      {/* Carousel Section - Below Video */}
      <div className="relative bg-background py-8 mt-1 lg:px-16">
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Featured Entrepreneurs
            </h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
                onClick={() => scrollCarousel("left")}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
                onClick={() => scrollCarousel("right")}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 pt-7"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredContent.map((content, index) => (
              <CarouselCard
                key={content.id}
                content={content}
                isActive={index === activeIndex}
                onClick={() => handleContentChange(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isPlayingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={() => setIsPlayingModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="bg-background rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video w-full">
                {isYouTube ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      activeContent.videoUrl
                    )}?autoplay=1&controls=1`}
                    title={activeContent.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video autoPlay controls className="w-full h-full">
                    <source src={activeContent.videoUrl} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface CarouselCardProps {
  content: FeaturedContent;
  isActive: boolean;
  onClick: () => void;
}

function CarouselCard({ content, isActive, onClick }: CarouselCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative flex-shrink-0 w-72 h-40 rounded-lg overflow-hidden cursor-pointer
        transition-all duration-300 ease-out
        ${isActive ? "ring-2 ring-primary scale-105" : "hover:scale-105"}
      `}
    >
      {/* Video Preview */}
      <video
        ref={videoRef}
        muted
        playsInline
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      >
        <source src={content.videoUrl} type="video/mp4" />
      </video>

      {/* Gradient Thumbnail */}
      <div className={`absolute inset-0 bg-gradient-to-br ${content.thumbnailGradient} transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${content.thumbnailGradient} flex items-center justify-center text-white font-bold text-sm`}>
            {content.initials}
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm leading-tight">
              {content.title}
            </h3>
            <p className="text-white/70 text-xs">{content.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Tag */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
          {content.tag}
        </span>
      </div>

      {/* Play Icon on Hover */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-6 h-6 text-white fill-white" />
        </div>
      </div>
    </div>
  );
}
