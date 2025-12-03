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
        behavior: "smooth",
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
    <section className="relative xl:min-h-screen bg-background overflow-hidden">
      {/* Main Video Player Area - Mobile First */}
      <div className="relative w-full h-auto md:aspect-video md:max-h-[70vh] lg:max-h-[85vh]">
        {/* Fade transition effect */}
        <div
          className={`absolute inset-0 bg-background transition-opacity duration-300 z-10 pointer-events-none ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Video Container - Full width on mobile */}
        <div className="relative w-full h-[30vh] md:h-full">
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
                // src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                //   activeContent.videoUrl
                // )}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

          {/* Content Overlay */}
          <div className="absolute -bottom-5 inset-0 flex flex-col justify-end p-4 pb-8 md:p-10 lg:p-16">
            <div className="max-w-2xl">
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-sm px-2.5 py-1 rounded-full mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium text-primary uppercase tracking-wide">
                  {activeContent.tag}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-sansita font-bold mb-1.5 md:mb-3 text-foreground leading-tight">
                {activeContent.title}
              </h1>

              {/* Subtitle */}
              <p className="text-sm md:text-xl lg:text-2xl text-muted-foreground mb-2 md:mb-2">
                {activeContent.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs md:text-base lg:text-lg text-muted-foreground/90 max-w-xl mb-4 md:mb-6 line-clamp-2">
                {activeContent.description}
              </p>

              {/* Action Buttons - Mobile */}
              <div className="md:hidden flex items-stretch gap-2">
                <Button
                  variant="hero"
                  size="sm"
                  className="gap-2 w-full text-sm"
                  onClick={() => setIsPlayingModal(true)}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Journey
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  className="gap-2 w-full text-sm"
                >
                  <Info className="w-4 h-4" />
                  More Info
                </Button>
              </div>

              {/* Action Buttons - Tablet & Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="gap-2 w-auto text-sm"
                  onClick={() => setIsPlayingModal(true)}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Journey
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="gap-2 w-auto text-sm"
                >
                  <Info className="w-4 h-4" />
                  More Info
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls - Top Right */}
        {/* <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 flex items-center gap-2 sm:gap-3 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-background/30 backdrop-blur-sm border border-muted-foreground/20 hover:bg-background/50 w-8 h-8 sm:w-10 sm:h-10"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </Button>
        </div> */}

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
          <div className="h-full bg-primary w-1/3 transition-all duration-300" />
        </div>
      </div>

      {/* Carousel Section - Below Video */}
      <div className="relative bg-background py-4 sm:py-6 md:py-8 mt-1 px-4 sm:px-6 lg:px-16">
        <div className="container">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-display font-semibold text-foreground">
              Featured Entrepreneurs
            </h2>
            <div className="hidden sm:flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-muted-foreground/30 hover:border-primary hover:bg-primary/10 w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => scrollCarousel("left")}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-muted-foreground/30 hover:border-primary hover:bg-primary/10 w-8 h-8 sm:w-10 sm:h-10"
                onClick={() => scrollCarousel("right")}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-3 sm:pb-4 -mx-4 px-4 pt-4 sm:pt-7 snap-x snap-mandatory"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-4">
          <div className="relative w-full max-w-5xl">
            {/* Close Button */}
            <button
              onClick={() => setIsPlayingModal(false)}
              className="absolute -top-8 sm:-top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
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
        relative flex-shrink-0 w-56 sm:w-64 md:w-72 h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden cursor-pointer
        transition-all duration-300 ease-out snap-start
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
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          content.thumbnailGradient
        } transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${content.thumbnailGradient} flex items-center justify-center text-white font-bold text-xs sm:text-sm`}
          >
            {content.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-white text-xs sm:text-sm leading-tight truncate">
              {content.title}
            </h3>
            <p className="text-white/70 text-[10px] sm:text-xs truncate">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Tag */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
          {content.tag}
        </span>
      </div>

      {/* Play Icon on Hover */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
        </div>
      </div>
    </div>
  );
}
