export interface ReasonItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tag?: string;
  color?: string;
}

export interface MemoryItem {
  id: string;
  caption: string;
  date?: string;
  emoji: string;
  note: string;
  rotation?: number;
}

export interface PookiePerk {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProposalConfig {
  recipientName: string;
  recipientNickname: string;
  senderName: string;
  question: string;
  subQuestion: string;
  heroGreeting: string;
  heroSubtext: string;
  complimentNotification: {
    sender: string;
    app: string;
    preview: string;
    punchline: string;
    reactionText: string;
  };
  reasons: ReasonItem[];
  memories: MemoryItem[];
  perks: PookiePerk[];
  letter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    pookiePact: string[];
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    bgStyle: 'pastel-pink' | 'peachy-blush' | 'lavender-dream';
  };
}

export type SceneState = 
  | 'hero'
  | 'intro'
  | 'compliment'
  | 'reasons'
  | 'mini_game'
  | 'proposal'
  | 'celebration'
  | 'gentle_no';
