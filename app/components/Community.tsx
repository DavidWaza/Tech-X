import { Mail, Users, MessageSquare, GraduationCap, ArrowRight, Check } from "lucide-react";
import { Button } from "./ui/Button";

const communityFeatures = [
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Connect with thousands of tech enthusiasts, founders, and innovators across Africa.",
    stats: "12,000+ Members",
    action: "Join Forum",
    href: "#forum",
  },
  {
    icon: GraduationCap,
    title: "Mentorship Program",
    description: "Get paired with experienced mentors in your field for personalized guidance and support.",
    stats: "500+ Mentors",
    action: "Find a Mentor",
    href: "#mentorship",
  },
  {
    icon: Users,
    title: "Exclusive Membership",
    description: "Access premium content, events, and networking opportunities with our membership plans.",
    stats: "Premium Benefits",
    action: "Become a Member",
    href: "#membership",
  },
];

const membershipBenefits = [
  "Early access to all webinars and events",
  "Exclusive podcast episodes and content",
  "Direct access to industry leaders",
  "Priority mentorship matching",
  "Monthly networking sessions",
  "Job board and opportunities",
];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="py-10 lg:py-24 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden px-3 lg:px-16"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="xl:container px-4 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Join the Movement
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-4">
            Be Part of Africa's Tech Community
          </h2>
          <p className="text-muted-foreground text-lg">
            Connect, learn, and grow with a vibrant community of innovators
            shaping the future of technology in Africa.
          </p>
        </div>

        {/* Community Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <article
                key={idx}
                className="group relative p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-primary">
                      {feature.stats}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:text-primary"
                    >
                      {feature.action}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Newsletter & Membership Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Newsletter Subscription */}
          <div className="relative p-8 md:p-10 rounded-2xl border border-border bg-card overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get weekly insights delivered to your inbox
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter for the latest tech news, startup
                stories, funding announcements, and exclusive content from
                Africa's innovation ecosystem.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
                <Button type="submit" className="whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                Join 25,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="relative p-8 md:p-10 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-2xl">
                    Premium Membership
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock exclusive benefits
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">$29</div>
                  <div className="text-xs text-muted-foreground">per month</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {membershipBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" className="w-full">
                Become a Member
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about our community programs?
          </p>
          <Button variant="outline" size="lg">
            Contact Community Team
          </Button>
        </div>
      </div>
    </section>
  );
}
