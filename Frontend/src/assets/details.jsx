import { Home, Bell, MessageSquare, Users, Bookmark, Search, Image, Video, BarChart, ChevronDown, MoreHorizontal, Heart, MessageCircle, Share2, UserCircle, PlusCircle, Settings, LogOut, Camera, Code } from 'lucide-react';

export const helpItems = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    title: "Connect with Others",
    description: "Find individuals who share your interests and passions.",
    bgColor: "bg-blue-100",
    textColor:"text-blue-700"
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-emerald-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V2zm-2 12H6V6h12v8z" />
      </svg>
    ),
    title: "Build Genuine Bonds",
    description: "Foster meaningful friendships that last a lifetime.",
    bgColor: "bg-emerald-100",
    textColor:"text-emerald-700"
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-fuchsia-700"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.89 0 1.73-.13 2.5-.37V12h-2v8c-2.21 0-4-1.79-4-4s1.79-4 4-4c.48 0 .93.1 1.33.26L17 12.33V2z" />
      </svg>
    ),
    title: "Explore New Experiences",
    description:
      "Discover new activities and adventures with your new friends.",
    bgColor: "bg-fuchsia-100",
    textColor:"text-fuchsia-700"
  },
];

export const features = [
  {
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V2zm-2 12H6V6h12v8z" />
      </svg>
    ),
    title: "Seamless Messaging",
    description: "Chat instantly and securely with your new connections.",
    bgColor: "bg-blue-100",
    textColor:"text-blue-700"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
      </svg>
    ),
    title: "Event Planning",
    description: "Organize and join local events with your community.",
    bgColor: "bg-emerald-100",
    textColor:"text-emerald-700"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-rose-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    title: "Location-Based Matching",
    description: "Discover friends nearby who share your interests.",
    bgColor: "bg-rose-100",
    textColor:"text-rose-700"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    title: "Personalized Profiles",
    description: "Showcase your personality and what makes you unique.",
    bgColor: "bg-amber-100",
    textColor:"text-amber-700"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 6v10.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5h2v5.5c0 1.1.9 2 2 2s2-.9 2-2V6h2zm-4 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
    title: "Interest Groups",
    description: "Join communities based on your hobbies and passions.",
    bgColor: "bg-violet-100",
    textColor:"text-violet-700"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19c-3.87 0-7-3.13-7-7V6.39l7-3.11 7 3.11V13c0 3.87-3.13 7-7 7zm0-14.5L7.5 8.5 9 10l3-3 5.5 5.5 1.5-1.5L12 5.5z" />
      </svg>
    ),
    title: "Privacy & Security",
    description: "Your data and interactions are kept safe and secure.",
    bgColor: "bg-teal-100",
    textColor:"text-teal-700"
  },
];

export const steps = [
  {
    icon: (
      <svg className="w-12 h-12 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm-2.73-4.36L7.1 11.23l1.41-1.41 2.12 2.12L16.27 8l1.41 1.41-5.65 5.65-2.82-2.82z" />
      </svg>
    ),
    title: "Sign Up",
    description: "Create your free account in minutes.",
    bgColor: "bg-sky-200",
    textColor:"text-sky-700",
    emoji:"📝 🔐 👤➕",
  },
  {
    icon: (
      <svg className="w-12 h-12 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9H9V7h2v2zm0 4h-2v2h2v-2zm4-4h-2V7h2v2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
    title: "Build Your Profile",
    description: "Tell us about your interests and preferences.",
    bgColor: "bg-green-300",
    textColor:"text-green-800",
    emoji:"🛠️ 👤 🧩 📋"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-fuchsia-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
      </svg>
    ),
    title: "Discover Matches",
    description: "Our smart algorithm suggests compatible friends.",
    bgColor: "bg-fuchsia-200",
    textColor:"text-pink-800",
    emoji:"🔍 💞 🧬 👥 🎯"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h2v2h-2v-2zm-2 0h-2v2h2v-2zm6 0h2v2h-2v-2zm2 0h2v2h-2v-2z" />
      </svg>
    ),
    title: "Connect & Chat",
    description: "Reach out and start conversations easily.",
    bgColor: "bg-orange-200",
    textColor:"text-orange-700",
    emoji:"💬 📱 🤝 📨 🔗"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-red-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h2v2h-2v-2zm-2 0h-2v2h2v-2zm6 0h2v2h-2v-2zm2 0h2v2h-2v-2z" />
      </svg>
    ),
    title: "Plan Activities",
    description: "Organize meetups and explore shared interests.",
    bgColor: "bg-red-200",
    textColor:"text-red-700",
    emoji:"📅 🗓️ 🤗 🎉 📍"
  },
  {
    icon: (
      <svg className="w-12 h-12 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 19c-3.87 0-7-3.13-7-7V6.39l7-3.11 7 3.11V13c0 3.87-3.13 7-7 7zm0-14.5L7.5 8.5 9 10l3-3 5.5 5.5 1.5-1.5L12 5.5z" />
      </svg>
    ),
    title: "Build Friendships",
    description: "Enjoy lasting connections and new experiences.",
    bgColor: "bg-teal-200",
    textColor:"text-teal-700",
    emoji:"🤝 🫂 💖 👫 🌱"
  },
];

export const testimonials = [
  {
    quote: "Friendify has completely changed my social life. I've met so many amazing people and found genuine connections. Highly recommend!",
    author: "Jane Doe",
    role: "Happy User",
    image: "https://placehold.co/100x100/A78BFA/FFFFFF?text=JD", // Placeholder for user image
    bgColor: "bg-pink-200"
  },
  {
    quote: "The best app for finding like-minded friends. The events feature is fantastic, and I love how easy it is to connect with people.",
    author: "John Smith",
    role: "Community Member",
    image: "https://placehold.co/100x100/60A5FA/FFFFFF?text=JS", // Placeholder for user image
    bgColor: "bg-teal-200"
  },
  {
    quote: "I was skeptical at first, but Friendify exceeded my expectations. I've found a fantastic group of friends to share my hobbies with.",
    author: "Emily White",
    role: "New Friend Finder",
    image: "https://placehold.co/100x100/F472B6/FFFFFF?text=EW", // Placeholder for user image
    bgColor: "bg-indigo-200"
  },
];
export const posts = [
  {
    id: 1,
    userName: "Briansky",
    userHandle: "@briansky",
    time: "8 minutes ago",
    text: "Beautiful art ✨ #art #aesthetics #wallstreet #wallpaper #photography",
    imageUrl: "https://placehold.co/600x400/D1D5DB/1F2937?text=Abstract+Art", // Placeholder image
    likes: "326k",
    comments: "123",
    shares: "148",
    userAvatar: "https://placehold.co/40x40/B3E0FF/1F2937?text=B" // Placeholder avatar
  },
  {
    id: 2,
    userName: "CreativeMind",
    userHandle: "@creativemind",
    time: "2 hours ago",
    text: "Just finished a new design project. What do you think? #design #uiux #webdesign",
    imageUrl: "https://placehold.co/600x350/C5E3BF/1F2937?text=Web+Design", // Placeholder image
    likes: "1.2k",
    comments: "45",
    shares: "20",
    userAvatar: "https://placehold.co/40x40/FFDDC1/1F2937?text=C" // Placeholder avatar
  },
  {
    id: 3,
    userName: "ArtLover",
    userHandle: "@artlover",
    time: "5 hours ago",
    text: "Exploring new techniques in digital painting. So much to learn! #digitalart #painting #creative",
    imageUrl: "https://placehold.co/600x450/B0E0E6/1F2937?text=Digital+Painting",
    likes: "800",
    comments: "30",
    shares: "15",
    userAvatar: "https://placehold.co/40x40/ADD8E6/1F2937?text=A"
  },
  {
    id: 4,
    userName: "TechGeek",
    userHandle: "@techgeek",
    time: "1 day ago",
    text: "Just got my hands on the new AI dev kit. Excited to build something cool! #AI #tech #innovation",
    imageUrl: "https://placehold.co/600x380/DDA0DD/1F2937?text=AI+Dev+Kit",
    likes: "2.5k",
    comments: "70",
    shares: "40",
    userAvatar: "https://placehold.co/40x40/E6E6FA/1F2937?text=T"
  },
  {
    id: 5,
    userName: "FoodieFan",
    userHandle: "@foodiefan",
    time: "2 days ago",
    text: "Cooked up a storm tonight! This homemade pasta is a game-changer. 🍝 #cooking #foodlover #pasta",
    imageUrl: "https://placehold.co/600x420/F0F8FF/1F2937?text=Homemade+Pasta",
    likes: "950",
    comments: "50",
    shares: "25",
    userAvatar: "https://placehold.co/40x40/FFF0F5/1F2937?text=F"
  },
  {
    id: 6,
    userName: "Wanderlust",
    userHandle: "@wanderlust",
    time: "3 days ago",
    text: "Chasing sunsets in the mountains. Every view is breathtaking! 🏞️ #travel #mountains #sunset",
    imageUrl: "https://placehold.co/600x400/D8BFD8/1F2937?text=Mountain+Sunset",
    likes: "3.1k",
comments: "90",
    shares: "60",
    userAvatar: "https://placehold.co/40x40/FFDAB9/1F2937?text=W"
  },
  {
    id: 7,
    userName: "Bookworm",
    userHandle: "@bookworm",
    time: "4 days ago",
    text: "Lost in a good book. What are you currently reading? 📖 #books #reading #fiction",
    imageUrl: "https://placehold.co/600x400/ADD8E6/1F2937?text=Reading+Book",
    likes: "600",
    comments: "25",
    shares: "10",
    userAvatar: "https://placehold.co/40x40/B0E0E6/1F2937?text=B"
  },
  {
    id: 8,
    userName: "FitnessGuru",
    userHandle: "@fitnessguru",
    time: "5 days ago",
    text: "Just crushed a new PR at the gym! Consistency is key. 💪 #fitness #workout #gymlife",
    imageUrl: "https://placehold.co/600x400/F0FFF0/1F2937?text=Gym+Workout",
    likes: "1.8k",
    comments: "55",
    shares: "30",
    userAvatar: "https://placehold.co/40x40/98FB98/1F2937?text=G"
  },
  {
    id: 9,
    userName: "NatureLover",
    userHandle: "@naturelover",
    time: "6 days ago",
    text: "Morning walk in the park. So peaceful! 🌳 #nature #park #peace",
    imageUrl: "https://placehold.co/600x400/ADD8E6/1F2937?text=Park+Walk",
    likes: "1.1k",
    comments: "40",
    shares: "22",
    userAvatar: "https://placehold.co/40x40/B0E0E6/1F2937?text=N"
  },
  {
    id: 10,
    userName: "GamerPro",
    userHandle: "@gamerpro",
    time: "1 week ago",
    text: "Epic win tonight! Who else is playing this game? 🎮 #gaming #gamer #esports",
    imageUrl: "https://placehold.co/600x400/F0F8FF/1F2937?text=Gaming+Setup",
    likes: "2.9k",
    comments: "100",
    shares: "75",
    userAvatar: "https://placehold.co/40x40/E6E6FA/1F2937?text=G"
  }
];

export const allActivities = [
  { id: 1, type: "follow", userName: "Derea", time: "3m", userAvatar: "https://placehold.co/30x30/A0D9FF/1F2937?text=D" },
  { id: 2, type: "like", userName: "Edinb", time: "22m", userAvatar: "https://placehold.co/30x30/FFC0CB/1F2937?text=E" },
  { id: 3, type: "like", userName: "Praha_", time: "10h", userAvatar: "https://placehold.co/30x30/D3F8FF/1F2937?text=P" },
  { id: 4, type: "like", userName: "Praha_", time: "10h", userAvatar: "https://placehold.co/30x30/D3F8FF/1F2937?text=P" },
  { id: 5, type: "follow", userName: "Chandra", time: "1d", userAvatar: "https://placehold.co/30x30/D9FFD9/1F2937?text=C" },
  { id: 6, type: "like", userName: "Rohan", time: "2d", userAvatar: "https://placehold.co/30x30/FFCCE5/1F2937?text=R" },
  { id: 7, type: "follow", userName: "Sophia", time: "3d", userAvatar: "https://placehold.co/30x30/ADD8E6/1F2937?text=S" },
  { id: 8, type: "like", userName: "Liam", time: "4d", userAvatar: "https://placehold.co/30x30/F0FFF0/1F2937?text=L" },
];

export const allSuggestions = [
  { id: 1, userName: "Najid", relation: "Followed by Dina", userAvatar: "https://placehold.co/30x30/C0E0A0/1F2937?text=N" },
  { id: 2, userName: "Sharle Dare", relation: "Followed", userAvatar: "https://placehold.co/30x30/FFB6C1/1F2937?text=S" },
  { id: 3, userName: "Divasurvey", relation: "Suggested by you", userAvatar: "https://placehold.co/30x30/FFE4B5/1F2937?text=D" },
  { id: 4, userName: "Jhonason", relation: "Followed by anshas", userAvatar: "https://placehold.co/30x30/ADD8E6/1F2937?text=J" },
  { id: 5, userName: "Priya Sharma", relation: "You might know", userAvatar: "https://placehold.co/30x30/CCEEFF/1F2937?text=P" },
  { id: 6, userName: "Amit Singh", relation: "Suggested for you", userAvatar: "https://placehold.co/30x30/D9FFD9/1F2937?text=A" },
  { id: 7, userName: "Jessica Lee", relation: "Popular this week", userAvatar: "https://placehold.co/30x30/FFEFD5/1F2937?text=J" },
  { id: 8, userName: "Mark Davis", relation: "Friends of friends", userAvatar: "https://placehold.co/30x30/E0FFFF/1F2937?text=M" },
];

export const allShortcuts = [
    { id: 1, name: "Art and drawing", icon: PlusCircle },
    { id: 2, name: "Dribble Pro", icon: Settings },
    { id: 3, name: "Behance Creative", icon: Image },
    { id: 4, name: "One Piece fish", icon: Bookmark },
    { id: 5, name: "Photography Club", icon: Camera },
    { id: 6, name: "Coding Community", icon: Code },
  ];
