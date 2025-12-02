"use client";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Headphones,
  X,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { Button } from "./ui/Button";
import { podcasts } from "@/lib/podcastData";
import { Badge } from "@/components/ui/badge";

interface Podcast {
  id: number;
  title: string;
  host: string;
  description: string;
  duration: string;
  imageUrl: string;
  audioUrl: string;
  category: string;
  date: string;
  episode?: string;
}

export function PodcastSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [fullPlayerOpen, setFullPlayerOpen] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const audioRefs = useRef<Map<number, HTMLAudioElement>>(new Map());
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullPlayerAudioRef = useRef<HTMLAudioElement | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioRefs.current.clear();
    };
  }, []);

  const handleMouseEnter = (podcast: Podcast) => {
    setHoveredId(podcast.id);

    // Delay audio playback to prevent accidental triggers
    hoverTimeoutRef.current = setTimeout(() => {
      if (hoveredId === podcast.id) return;

      // Pause any currently playing audio
      audioRefs.current.forEach((audio, id) => {
        if (id !== podcast.id) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      // Get or create audio element
      let audio = audioRefs.current.get(podcast.id);
      if (!audio) {
        audio = new Audio(podcast.audioUrl);
        audio.volume = 0.6;
        audio.preload = "metadata";
        audioRefs.current.set(podcast.id, audio);
      }

      // Play audio with error handling
      audio.play().catch((err) => {
        console.log("Audio playback failed:", err);
      });

      setPlayingId(podcast.id);
    }, 500);
  };

  const handleMouseLeave = (podcastId: number) => {
    setHoveredId(null);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    const audio = audioRefs.current.get(podcastId);
    if (audio) {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume = Math.max(0, audio.volume - 0.1);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0.6;
          setPlayingId(null);
        }
      }, 50);
    }
  };

  const togglePlayPause = (podcast: Podcast, e: React.MouseEvent) => {
    e.stopPropagation();

    // Stop hover preview audio
    audioRefs.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    // Open full player
    setSelectedPodcast(podcast);
    setFullPlayerOpen(true);
    setPlayingId(podcast.id);
  };

  return (
    <section className="py-16 bg-background">
      <div className="px-4 md:px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 py-2 px-4 rounded-full border border-primary/30">
                  <Headphones className="w-4 h-4" />
                  Tech X Podcast
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sansita font-bold text-foreground mb-2">
                Voices of Innovation
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
                Deep conversations with Africa&apos;s leading entrepreneurs,
                innovators, and visionaries shaping the future of technology.
              </p>
            </div>

            <Button
              variant="ghost"
              className="hidden lg:flex hover:text-primary"
            >
              Show all
            </Button>
          </div>
        </div>

        {/* Podcast Grid - Spotify Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {podcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              isHovered={hoveredId === podcast.id}
              isPlaying={playingId === podcast.id}
              onMouseEnter={() => handleMouseEnter(podcast)}
              onMouseLeave={() => handleMouseLeave(podcast.id)}
              onPlayPause={(e) => togglePlayPause(podcast, e)}
            />
          ))}
        </div>
      </div>

      {/* Full Podcast Player Modal */}
      {fullPlayerOpen && selectedPodcast && (
        <FullPodcastPlayer
          podcast={selectedPodcast}
          audioRef={fullPlayerAudioRef}
          onClose={() => {
            setFullPlayerOpen(false);
            setPlayingId(null);
            if (fullPlayerAudioRef.current) {
              fullPlayerAudioRef.current.pause();
            }
          }}
        />
      )}
    </section>
  );
}

interface PodcastCardProps {
  podcast: Podcast;
  isHovered: boolean;
  isPlaying: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onPlayPause: (e: React.MouseEvent) => void;
}

function PodcastCard({
  podcast,
  isHovered,
  isPlaying,
  onMouseEnter,
  onMouseLeave,
  onPlayPause,
}: PodcastCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group cursor-pointer"
    >
      {/* Card Container */}
      <div className="bg-card/50 rounded-lg p-3 md:p-4 transition-all duration-300 hover:bg-card">
        {/* Image Container */}
        <div className="relative mb-3 md:mb-4">
          <div className="relative aspect-square rounded-md overflow-hidden shadow-lg">
            {/* Podcast Image */}
            <img
              src={podcast.imageUrl}
              alt={podcast.title}
              className={`
                w-full h-full object-cover
                transition-all duration-300
                ${isHovered ? "scale-105" : "scale-100"}
              `}
            />

            {/* Hover Overlay */}
            <div
              className={`
                absolute inset-0 bg-black/40
                transition-opacity duration-300
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
            />

            {/* Playing Wave Effect */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex gap-1 items-end h-8">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-wave"
                      style={{
                        animationDelay: `${i * 0.15}s`,
                        height: "100%",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Play Button */}
            <div
              className={`
                absolute bottom-2 right-2
                transition-all duration-300
                ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }
              `}
            >
              <Button
                variant="default"
                size="icon"
                onClick={onPlayPause}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary hover:bg-primary/90 hover:scale-110 shadow-xl transition-all duration-200"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground fill-current" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground fill-current ml-0.5" />
                )}
              </Button>
            </div>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="absolute top-2 left-2">
                <div className="flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-medium text-white">
                    Playing
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
            <Badge variant="secondary" className="mb-2">{podcast.episode}</Badge>
          <h3 className="font-sansita font-bold text-sm md:text-base text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">
            {podcast.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mb-1">
            {podcast.host}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <span>{podcast.date}</span>
            <span>•</span>
            <span>{podcast.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add wave animation styles
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes wave {
      0%, 100% { 
        height: 30%; 
        opacity: 0.7;
      }
      50% { 
        height: 100%; 
        opacity: 1;
      }
    }
    .animate-wave {
      animation: wave 0.8s ease-in-out infinite;
    }
  `;
  if (!document.querySelector("style[data-podcast-animation]")) {
    style.setAttribute("data-podcast-animation", "true");
    document.head.appendChild(style);
  }
}

// Full Podcast Player Component
interface FullPodcastPlayerProps {
  podcast: Podcast;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  onClose: () => void;
}

function FullPodcastPlayer({
  podcast,
  audioRef,
  onClose,
}: FullPodcastPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = new Audio(podcast.audioUrl);
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    // Auto-play when modal opens
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => console.log("Autoplay failed:", err));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [podcast, audioRef, volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(duration, audioRef.current.currentTime + seconds)
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-card to-card/80 rounded-2xl shadow-2xl overflow-hidden border border-border/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors flex items-center justify-center group"
        >
          <X className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Podcast Cover */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isPlaying ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Animated Overlay when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                    <div className="flex gap-1.5 items-end h-12">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-primary rounded-full animate-wave"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            height: "100%",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Podcast Info & Controls */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Info */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30 mb-3">
                  <Headphones className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    {podcast.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-sansita font-bold text-foreground mb-2">
                  {podcast.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Hosted by{" "}
                  <span className="text-foreground font-semibold">
                    {podcast.host}
                  </span>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {podcast.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
                    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:scale-110
                    [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                      (currentTime / duration) * 100
                    }%, hsl(var(--muted)) ${
                      (currentTime / duration) * 100
                    }%, hsl(var(--muted)) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(-15)}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="default"
                    size="icon"
                    onClick={togglePlayPause}
                    className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-110 transition-all shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-primary-foreground fill-current" />
                    ) : (
                      <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip(15)}
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="hidden md:flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-2 bg-muted rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                      [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
