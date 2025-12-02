

export interface Podcast {
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

export const podcasts: Podcast[] = [
  {
    id: 1,
    title: "Building Africa's Tech Future",
    host: "Adaora Okafor",
    description: "Insights on scaling fintech across emerging markets and the challenges of building payment infrastructure in Africa.",
    duration: "45 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    category: "Fintech",
    date: "Nov 28",
    episode: "Episode one"
  },
  {
    id: 2,
    title: "AI in African Agriculture",
    host: "Kwame Mensah",
    description: "How artificial intelligence is revolutionizing farming practices and empowering smallholder farmers across Ghana.",
    duration: "38 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    category: "AgriTech",
    date: "Nov 25",
    episode: "Episode two"
  },
  {
    id: 3,
    title: "Cloud Infrastructure for Africa",
    host: "Amina Hassan",
    description: "The journey of building scalable cloud solutions tailored for African businesses and overcoming connectivity challenges.",
    duration: "52 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    category: "Cloud Tech",
    date: "Nov 22",
    episode: "Episode three"
  },
  {
    id: 4,
    title: "Education Revolution",
    host: "Olumide Adeyemi",
    description: "Democratizing quality education through technology and reaching millions of students across 15 African countries.",
    duration: "41 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    category: "EdTech",
    date: "Nov 20",
    episode: "Episode four"
  },
  {
    id: 5,
    title: "Healthcare Without Borders",
    host: "Fatima Diallo",
    description: "Bridging the healthcare gap in rural communities through innovative telemedicine and mobile health solutions.",
    duration: "48 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    category: "HealthTech",
    date: "Nov 18",
    episode: "Episode five"
  },
  {
    id: 6,
    title: "The Future of E-Commerce",
    host: "Chioma Nwosu",
    description: "Building the Amazon of Africa and navigating logistics challenges in emerging markets.",
    duration: "44 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    category: "E-Commerce",
    date: "Nov 15",
    episode: "Episode six"
  },
  {
    id: 7,
    title: "Blockchain & Web3 in Africa",
    host: "Tendai Moyo",
    description: "Exploring the potential of decentralized technologies and cryptocurrency adoption across the continent.",
    duration: "50 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    category: "Blockchain",
    date: "Nov 12",
    episode: "Episode seven"
  },
  {
    id: 8,
    title: "Sustainable Energy Solutions",
    host: "Nia Kamau",
    description: "Innovative approaches to solving Africa's energy crisis through solar and renewable technologies.",
    duration: "46 min",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    category: "CleanTech",
    date: "Nov 10",
    episode: "Episode eight"
  }
];