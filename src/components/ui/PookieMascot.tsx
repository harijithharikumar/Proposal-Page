import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../../lib/sound';

interface PookieMascotProps {
  mood?: 'happy' | 'shy' | 'excited' | 'pleading' | 'celebrating';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onPookieClick?: () => void;
}

export const PookieMascot: React.FC<PookieMascotProps> = ({
  mood = 'shy',
  size = 'lg',
  interactive = true,
  onPookieClick,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showHeartBursts, setShowHeartBursts] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-60 h-60 sm:w-72 sm:h-72',
  }[size];

  const handleClick = () => {
    if (!interactive) return;
    setClickCount((prev) => prev + 1);
    sound.playPop();

    setShowHeartBursts(true);
    setTimeout(() => setShowHeartBursts(false), 900);

    if (onPookieClick) {
      onPookieClick();
    }
  };

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive heart bursts on click */}
      {showHeartBursts && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * 60,
                y: Math.sin((angle * Math.PI) / 180) * 60,
                opacity: 0,
                scale: 1.2,
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 font-bold text-lg"
            >
              💗
            </motion.div>
          ))}
        </div>
      )}

      {/* Floating Sparkles around mascot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
      >
        <span className="absolute -top-2 right-2 text-xl animate-twinkle">✨</span>
        <span className="absolute bottom-4 -left-3 text-lg animate-twinkle" style={{ animationDelay: '1.2s' }}>🌸</span>
        <span className="absolute top-8 -right-4 text-sm animate-twinkle" style={{ animationDelay: '0.6s' }}>💫</span>
      </motion.div>

      {/* Main Mascot Vector Body */}
      <motion.div
        className={`${sizeClasses} cursor-pointer relative z-10`}
        onClick={handleClick}
        animate={
          mood === 'celebrating'
            ? {
                y: [0, -18, 0, -10, 0],
                rotate: [-2, 4, -4, 2, 0],
                scale: [1, 1.06, 0.98, 1.04, 1],
              }
            : isHovered
            ? { scale: 1.05, y: -6 }
            : {
                y: [0, -6, 0],
                rotate: [-1, 1, -1],
              }
        }
        transition={{
          repeat: Infinity,
          duration: mood === 'celebrating' ? 1.8 : 3.2,
          ease: 'easeInOut',
        }}
        whileTap={{ scale: 0.92, rotate: -3 }}
        aria-label="Cute Pookie Mascot"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="bodyGrad" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFF0F5" />
              <stop offset="100%" stopColor="#FFDEEB" />
            </radialGradient>
            <radialGradient id="earGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFB6C1" />
              <stop offset="100%" stopColor="#FF8DA1" />
            </radialGradient>
            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FF6B8B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D6D" />
              <stop offset="100%" stopColor="#FF758F" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Ear */}
          <motion.ellipse
            cx="65"
            cy="52"
            rx="18"
            ry="32"
            transform="rotate(-15 65 52)"
            fill="url(#bodyGrad)"
            stroke="#FFB6C1"
            strokeWidth="3.5"
            animate={{ rotate: isHovered ? [-15, -22, -15] : -15 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <ellipse
            cx="65"
            cy="52"
            rx="10"
            ry="20"
            transform="rotate(-15 65 52)"
            fill="url(#earGrad)"
            opacity="0.8"
          />

          {/* Right Ear */}
          <motion.ellipse
            cx="135"
            cy="52"
            rx="18"
            ry="32"
            transform="rotate(15 135 52)"
            fill="url(#bodyGrad)"
            stroke="#FFB6C1"
            strokeWidth="3.5"
            animate={{ rotate: isHovered ? [15, 22, 15] : 15 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <ellipse
            cx="135"
            cy="52"
            rx="10"
            ry="20"
            transform="rotate(15 135 52)"
            fill="url(#earGrad)"
            opacity="0.8"
          />

          {/* Cute Little Tiny Bear/Bunny Hair Tuft */}
          <path
            d="M94 72 Q100 62 106 72"
            stroke="#FFA8BD"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Main Round Squishy Head & Body */}
          <rect
            x="40"
            y="65"
            width="120"
            height="115"
            rx="58"
            fill="url(#bodyGrad)"
            stroke="#FFA8BD"
            strokeWidth="3.5"
          />

          {/* Cheeks Blush */}
          <ellipse
            cx="58"
            cy="125"
            rx="14"
            ry="9"
            fill="url(#blushGrad)"
            className={isHovered ? 'animate-pulse' : ''}
          />
          <ellipse
            cx="142"
            cy="125"
            rx="14"
            ry="9"
            fill="url(#blushGrad)"
            className={isHovered ? 'animate-pulse' : ''}
          />

          {/* Adorable Large Glossy Eyes */}
          {mood === 'celebrating' ? (
            // Joyful Happy Crescent Eyes
            <g stroke="#3D202A" strokeWidth="4.5" strokeLinecap="round" fill="none">
              <path d="M68 112 Q77 100 86 112" />
              <path d="M114 112 Q123 100 132 112" />
            </g>
          ) : (
            // Big Sparkling Anime Eyes
            <g>
              {/* Left Eye */}
              <circle cx="77" cy="110" r="11.5" fill="#381D2A" />
              {/* Primary Glint */}
              <circle cx="74" cy="106" r="4.5" fill="#FFFFFF" />
              {/* Secondary Tiny Glint */}
              <circle cx="81" cy="113" r="2.2" fill="#FFFFFF" />
              {/* Star Sparkle Glint */}
              <circle cx="78" cy="109" r="1.2" fill="#FFB6C1" />

              {/* Right Eye */}
              <circle cx="123" cy="110" r="11.5" fill="#381D2A" />
              {/* Primary Glint */}
              <circle cx="120" cy="106" r="4.5" fill="#FFFFFF" />
              {/* Secondary Tiny Glint */}
              <circle cx="127" cy="113" r="2.2" fill="#FFFFFF" />
              {/* Star Sparkle Glint */}
              <circle cx="124" cy="109" r="1.2" fill="#FFB6C1" />
            </g>
          )}

          {/* Cute Nose & Whimsical Mouth */}
          <ellipse cx="100" cy="118" rx="3.5" ry="2.5" fill="#FF6B8B" />
          {mood === 'pleading' || mood === 'shy' ? (
            // 3-style cute mouth (omega mouth: :3)
            <path
              d="M93 124 Q97 129 100 125 Q103 129 107 124"
              stroke="#4A2835"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Open cute happy mouth with tiny tongue
            <g>
              <path
                d="M92 123 Q100 136 108 123 Z"
                fill="#FF6B8B"
                stroke="#4A2835"
                strokeWidth="2"
              />
              <path
                d="M96 128 Q100 132 104 128"
                fill="#FFA8BD"
              />
            </g>
          )}

          {/* Cute Paws Holding a Pink Heart */}
          <g transform="translate(0, 10)">
            {/* Heart being held */}
            <motion.path
              d="M100 138 C100 138, 86 120, 72 130 C60 138, 66 156, 100 178 C134 156, 140 138, 128 130 C114 120, 100 138, 100 138 Z"
              fill="url(#heartGrad)"
              stroke="#FFF"
              strokeWidth="2"
              filter="url(#softGlow)"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
            <path
              d="M80 134 Q76 138 78 144"
              stroke="#FFA8BD"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Left Paw */}
            <ellipse
              cx="74"
              cy="146"
              rx="9"
              ry="7"
              fill="#FFFFFF"
              stroke="#FFA8BD"
              strokeWidth="2.5"
            />
            {/* Right Paw */}
            <ellipse
              cx="126"
              cy="146"
              rx="9"
              ry="7"
              fill="#FFFFFF"
              stroke="#FFA8BD"
              strokeWidth="2.5"
            />
          </g>

          {/* Little Bottom Feet */}
          <ellipse cx="78" cy="180" rx="14" ry="7" fill="#FFFFFF" stroke="#FFA8BD" strokeWidth="2.5" />
          <ellipse cx="122" cy="180" rx="14" ry="7" fill="#FFFFFF" stroke="#FFA8BD" strokeWidth="2.5" />
        </svg>
      </motion.div>
    </div>
  );
};
