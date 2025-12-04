export interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  videos: Video[];
  gradient: string;
  accentColor: string;
  textColor: string;
  badgeColor: string;
}

export const playlists: Playlist[] = [
  {
    id: 1,
    name: "Startup Stories",
    description: "From idea to unicorn - Real stories from African founders",
    gradient: "from-purple-600 via-pink-600 to-rose-500",
    accentColor: "bg-purple-500",
    textColor: "text-purple-400",
    badgeColor: "bg-purple-500/20 border-purple-500/30",
    videos: [
      {
        id: 1,
        title: "Building Flutterwave: The African Payment Giant",
        description:
          "How Olugbenga Agboola built one of Africa's most valuable startups",
        duration: "24:15",
        views: "45K",
        thumbnail:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Fintech",
      },
      {
        id: 2,
        title: "Andela's Journey to $1.5B Valuation",
        description: "The story of Africa's tech talent revolution",
        duration: "32:40",
        views: "38K",
        thumbnail:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "EdTech",
      },
      {
        id: 3,
        title: "Jumia's IPO: Africa Goes to Wall Street",
        description: "The first African unicorn to list on NYSE",
        duration: "28:30",
        views: "52K",
        thumbnail:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "E-commerce",
      },
      {
        id: 4,
        title: "Paystack's $200M Stripe Acquisition",
        description: "How two Nigerian founders sold to Silicon Valley",
        duration: "19:45",
        views: "41K",
        thumbnail:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Fintech",
      },
      {
        id: 5,
        title: "Chipper Cash: Pan-African Payments",
        description: "Connecting Africa's fragmented payment systems",
        duration: "26:20",
        views: "35K",
        thumbnail:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Fintech",
      },
    ],
  },
  {
    id: 2,
    name: "Tech Innovations",
    description: "Cutting-edge technology solving Africa's biggest challenges",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    accentColor: "bg-teal-500",
    textColor: "text-teal-400",
    badgeColor: "bg-teal-500/20 border-teal-500/30",
    videos: [
      {
        id: 6,
        title: "AI-Powered Agriculture: Feeding the Future",
        description: "Using machine learning to optimize crop yields",
        duration: "21:35",
        views: "29K",
        thumbnail:
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "AgriTech",
      },
      {
        id: 7,
        title: "Blockchain for Supply Chain Transparency",
        description: "Tracking goods from farm to market",
        duration: "18:50",
        views: "22K",
        thumbnail:
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Blockchain",
      },
      {
        id: 8,
        title: "Drones Delivering Medicine to Rural Areas",
        description: "Revolutionary healthcare logistics",
        duration: "23:15",
        views: "31K",
        thumbnail:
          "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "HealthTech",
      },
      {
        id: 9,
        title: "Solar-Powered Internet for Remote Villages",
        description: "Connecting the unconnected",
        duration: "25:40",
        views: "27K",
        thumbnail:
          "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Infrastructure",
      },
    ],
  },
  {
    id: 3,
    name: "Funding & Investment",
    description: "Master classes on raising capital and scaling businesses",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    accentColor: "bg-orange-500",
    textColor: "text-orange-400",
    badgeColor: "bg-orange-500/20 border-orange-500/30",
    videos: [
      {
        id: 10,
        title: "How to Pitch to Y Combinator",
        description: "Lessons from successful YC African founders",
        duration: "30:25",
        views: "56K",
        thumbnail:
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "Fundraising",
      },
      {
        id: 11,
        title: "Venture Capital in Africa: The Landscape",
        description: "Understanding African VC ecosystem",
        duration: "27:10",
        views: "43K",
        thumbnail:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "VC",
      },
      {
        id: 12,
        title: "Building a $10M ARR SaaS in Lagos",
        description: "From bootstrap to Series A",
        duration: "35:50",
        views: "38K",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        category: "SaaS",
      },
    ],
  },
];
