import { ProposalConfig } from '../types';

export const initialProposalConfig: ProposalConfig = {
  recipientName: "Cutie",
  recipientNickname: "My Favorite",
  senderName: "Your Favorite Person",
  question: "Will you be my pookie?",
  subQuestion: "(forever and always? 🥺👉👈)",
  heroGreeting: "Hiiiii pookie 🥺💗",
  heroSubtext: "I made a tiny little something for you…",
  complimentNotification: {
    sender: "You 💌",
    app: "Messages",
    preview: "Hey cutie! 💖",
    punchline: "Yours. Obviously. 🙄💗",
    reactionText: "Literally makes my heart skip a beat every single time."
  },
  reasons: [
    {
      id: "smile",
      title: "Your Smile",
      description: "How your whole face lights up and instantly makes even the hardest day feel lighter.",
      emoji: "✨",
      tag: "Pure Sunshine",
      color: "from-rose-100 to-pink-100"
    },
    {
      id: "better-days",
      title: "Making Everyday Moments Special",
      description: "Even running simple errands or sitting in quiet comfort feels special with you.",
      emoji: "🧸",
      tag: "My Favorite Company",
      color: "from-amber-50 to-rose-100"
    },
    {
      id: "laugh",
      title: "Your Laugh",
      description: "That genuine little laugh of yours that stays in my head long after we say goodbye.",
      emoji: "🫧",
      tag: "Favorite Sound",
      color: "from-pink-100 to-purple-100"
    },
    {
      id: "little-things",
      title: "The Little Things You Do",
      description: "The subtle expressions, thoughtful habits, and gestures you make without even realizing.",
      emoji: "🌸",
      tag: "Effortlessly Sweet",
      color: "from-rose-50 to-pink-100"
    },
    {
      id: "basically-you",
      title: "Basically… Just You",
      description: "Your kind heart, your humor, your warmth, and everything that makes you who you are.",
      emoji: "💖",
      tag: "Irreplaceable",
      color: "from-red-50 to-rose-100"
    }
  ],
  memories: [
    {
      id: "m1",
      caption: "Talking for hours...",
      date: "Core Memory #1",
      emoji: "🌙",
      note: "Losing track of time completely and wishing the conversation wouldn't end.",
      rotation: -3
    },
    {
      id: "m2",
      caption: "That silly laughing moment",
      date: "Core Memory #2",
      emoji: "😂",
      note: "My cheeks hurt from smiling so much with you.",
      rotation: 2
    },
    {
      id: "m3",
      caption: "When it really hit me",
      date: "Core Memory #3",
      emoji: "💌",
      note: "Catching myself staring at my phone smiling like an idiot.",
      rotation: -2
    }
  ],
  perks: [
    {
      id: "p1",
      title: "Unlimited Warm Hugs",
      description: "Available whenever you need comfort, celebrating, or just because.",
      icon: "Heart"
    },
    {
      id: "p2",
      title: "Emergency Snack Support",
      description: "Favorite treats, warm drinks, and comfort food delivered on demand.",
      icon: "Cookie"
    },
    {
      id: "p3",
      title: "VIP Priority Response",
      description: "Your messages and calls always come first, no matter what.",
      icon: "Sparkles"
    },
    {
      id: "p4",
      title: "Your Biggest Cheerleader",
      description: "Always in your corner, celebrating your wins and lifting you up.",
      icon: "Kiss"
    }
  ],
  letter: {
    greeting: "Dear Pookie,",
    paragraphs: [
      "I don't know where the days will take us, but I know with complete certainty that I want you by my side for every step.",
      "You bring so much gentle warmth, laughter, and ease into my life. Every time I get to talk to you is the highlight of my day, and I am so grateful for you.",
      "Thank you for being your wonderfully kind, funny, and beautiful self. I promise to always listen, make you smile, share my snacks, and cherish every single moment we have together."
    ],
    closing: "Forever & always,",
    signature: "— Your favorite person (hopefully) 🥺💗",
    pookiePact: [
      "To always send sweet morning and goodnight messages",
      "To give you the warmest hugs whenever you need them",
      "To never let you go to sleep wondering if you're cared for",
      "To always be your safe place and biggest supporter"
    ]
  },
  theme: {
    primaryColor: "#FF6B8B",
    accentColor: "#FF8EAA",
    bgStyle: "pastel-pink"
  }
};
