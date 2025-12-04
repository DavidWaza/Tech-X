"use client";
import { useState, useRef } from "react";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Plus,
  Video,
} from "lucide-react";
import { Button } from "./ui/Button";
import {
  playlists,
  Playlist,
  Video as VideoProps,
} from "@/lib/videoPlaylistData";

export function VideoPlaylist() {
  const [selectedVideo, setSelectedVideo] = useState<VideoProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const scrollPlaylist = (playlistId: number, direction: "left" | "right") => {
    const container = scrollRefs.current.get(playlistId);
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(201, 48, 44, 0.12) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(30, 132, 73, 0.1) 0%, transparent 50%)',
            filter: 'blur(60px)',
            animation: 'gradient-shift 15s ease infinite'
          }}
        />
      </div>
      
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
      `}</style>

      <div className="relative z-10 px-4 md:px-6 lg:px-20">
        {/* ================= HEADER ================= */}
        <div className="mb-20">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest border border-border rounded-full px-4 py-2 mb-4">
            <Video className="w-4 h-4" />
            Tech X Playlist
          </span>

          <h2 className="text-4xl md:text-5xl font-sansita font-bold text-foreground mb-4">
            Our Journey
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Explore inspiring stories, innovations, and insights from
            Africa&apos;s tech ecosystem. Each journey is unique, every story
            matters.
          </p>
        </div>

        {/* ================= PLAYLIST SECTIONS ================= */}
        <div className="space-y-24">
          {playlists.map((playlist: Playlist) => (
            <PlaylistRow
              key={playlist.id}
              playlist={playlist}
              onScroll={(direction) => scrollPlaylist(playlist.id, direction)}
              scrollRef={(el) => {
                if (el) scrollRefs.current.set(playlist.id, el);
              }}
              onVideoClick={(video) => {
                setSelectedVideo(video);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* ================= VIDEO MODAL ================= */}
      {isModalOpen && selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </section>
  );
}

/* ================= PLAYLIST ROW ================= */

interface PlaylistRowProps {
  playlist: Playlist;
  onVideoClick: (video: VideoProps) => void;
  onScroll: (direction: "left" | "right") => void;
  scrollRef: (el: HTMLDivElement | null) => void;
}

function PlaylistRow({
  playlist,
  onVideoClick,
  onScroll,
  scrollRef,
}: PlaylistRowProps) {
  return (
    <div className="relative pb-16">
      <div className="absolute -bottom-8 left-0 right-0">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      </div>

      {/* ===== HEADER ===== */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-border/40">
        <div>
          <h3 className="text-2xl md:text-3xl font-sansita font-semibold text-foreground mb-2 tracking-tight">
            {playlist.name}
          </h3>

          <div className="w-14 h-0.5 bg-border/60 mb-3" />

          <p className="text-sm text-muted-foreground max-w-xl">
            {playlist.description}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onScroll("left")}
            className="rounded-full border border-border text-foreground hover:bg-muted"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onScroll("right")}
            className="rounded-full border border-border text-foreground hover:bg-muted"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* ===== VIDEOS ===== */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          maskImage:
            "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
        }}
      >
        {playlist.videos.map((video: VideoProps) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => onVideoClick(video)}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= VIDEO CARD ================= */

function VideoCard({
  video,
  onClick,
}: {
  video: VideoProps;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative shrink-0 w-[320px] md:w-[380px] rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 ${
        isHovered ? "scale-[1.03]" : "scale-100"
      }`}
    >
      <div className="relative aspect-video bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* ✅ Mature Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium rounded-md border border-border/60 text-muted-foreground bg-background/70 backdrop-blur-sm">
            {video.category}
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 rounded-md">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-xs text-white">{video.duration}</span>
        </div>

        {/* Play Button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-7 h-7 text-black fill-black ml-1" />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="font-sansita font-semibold text-white mb-2 line-clamp-2">
            {video.title}
          </h4>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Eye className="w-3 h-3" />
            <span>{video.views} views</span>
          </div>
        </div>

        {/* Watchlist */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 left-3 w-8 h-8 rounded-full border border-white/60 flex items-center justify-center bg-black/30"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

/* ================= VIDEO MODAL ================= */

function VideoModal({
  video,
  onClose,
}: {
  video: VideoProps;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="relative w-full max-w-6xl">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              video.videoUrl
            )}?autoplay=1`}
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="mt-6 bg-card/40 rounded-xl p-6 border border-border/40">
          <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
          <p className="text-muted-foreground">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ================= YOUTUBE HELPER ================= */

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : "";
}