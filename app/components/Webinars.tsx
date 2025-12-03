import { Calendar, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

const webinars = [
  {
    id: 1,
    title: "Raising Your First $1M: A Founder's Guide",
    date: "Dec 15, 2024",
    time: "3:00 PM WAT",
    attendees: 234,
    speakers: [
      { name: "Tunde Kehinde", avatar: "TK" },
      { name: "Maya Horgan", avatar: "MH" },
    ],
    isLive: false,
    isUpcoming: true,
  },
  {
    id: 2,
    title: "Building Remote-First Teams in Africa",
    date: "Dec 22, 2024",
    time: "2:00 PM WAT",
    attendees: 156,
    speakers: [{ name: "Seni Sulyman", avatar: "SS" }],
    isLive: false,
    isUpcoming: true,
  },
  {
    id: 3,
    title: "The State of African Venture Capital 2024",
    date: "Live Now",
    time: "",
    attendees: 412,
    speakers: [
      { name: "Kola Aina", avatar: "KA" },
      { name: "Eghosa Omoigui", avatar: "EO" },
    ],
    isLive: true,
    isUpcoming: false,
  },
];

export function WebinarSection() {
  return (
    <section
      id="webinars"
      className="py-24 bg-background relative overflow-hidden px-8 lg:px-16"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />

      <div className="container px-4 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Live & Upcoming
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Join our Space
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Join live sessions with industry leaders and gain exclusive
              insights into Africa&apos;s tech landscape.
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Webinar Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <article
              key={webinar.id}
              className={`group relative p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                webinar.isLive
                  ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {/* Live Badge */}
              {webinar.isLive && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
                  LIVE
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {webinar.date}
                </div>
                {webinar.time && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {webinar.time}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                {webinar.title}
              </h3>

              {/* Speakers */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-2">
                  {webinar.speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-card"
                    >
                      {speaker.avatar}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {webinar.speakers.map((s) => s.name).join(", ")}
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {webinar.attendees} registered
                </div>
                <Button variant={webinar.isLive ? "hero" : "glass"} size="sm">
                  {webinar.isLive ? "Join Now" : "Register"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
