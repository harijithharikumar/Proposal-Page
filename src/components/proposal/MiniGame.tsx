import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface MiniGameProps {
  config: ProposalConfig;
  onNext: () => void;
  onPrev: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  char: string;
}

export const MiniGame: React.FC<MiniGameProps> = ({ config, onNext, onPrev }) => {
  const [score, setScore] = useState(0);
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPassed, setIsPassed] = useState(false);

  const TARGET_SCORE = 4;

  const commentary = [
    "Catch the heart to continue… 💗",
    "Quick reflexes! 🥺",
    "You're doing great…",
    "Almost there…",
    "Perfect! You're ready. 🏆",
  ];

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPassed) return;

    const newScore = score + 1;
    setScore(newScore);
    sound.playHeartCatch(newScore);

    // Particle burst coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      const speed = Math.random() * 50 + 40;
      return {
        id: Date.now() + i,
        x: rect.width / 2,
        y: rect.height / 2,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        char: ['💗', '✨', '🌸', '💖', '⭐'][i % 5],
      };
    });

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 700);

    if (newScore >= TARGET_SCORE) {
      sound.playSparkle();
      setIsPassed(true);
    } else {
      // Move heart randomly within bounds
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 120;
      setHeartPos({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto text-center">
      {/* Progress pill */}
      <div className="flex items-center gap-1.5 mb-6">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-8 rounded-full bg-rose-500" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-pink-100/60 relative overflow-hidden"
      >
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
          Chapter 4 · A Quick Pause
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display mt-1">
          {isPassed ? "You did it! 🥺🎉" : "Catch The Heart 💗"}
        </h2>

        <p className="text-sm text-rose-800/80 font-medium mt-1">
          {commentary[score]}
        </p>

        {/* Love Gauge Progress Bar */}
        <div className="w-full max-w-xs mx-auto my-5 bg-pink-100/80 p-1 rounded-full border border-pink-200 shadow-inner">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300 relative"
            style={{ width: `${(score / TARGET_SCORE) * 100}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] pr-1 font-bold text-white">
              {score}/{TARGET_SCORE}
            </span>
          </div>
        </div>

        {/* Interactive Play Arena */}
        <div className="relative h-52 sm:h-56 rounded-2xl bg-gradient-to-b from-pink-50/70 to-rose-100/40 border border-pink-200/80 flex items-center justify-center overflow-hidden my-4">
          <AnimatePresence>
            {!isPassed ? (
              <motion.button
                key="active-heart"
                id="catch-heart-game-target"
                onClick={handleHeartClick}
                animate={{
                  x: heartPos.x,
                  y: heartPos.y,
                  scale: [1, 1.15, 1],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 1.2 },
                  rotate: { repeat: Infinity, duration: 1.5 },
                  type: 'spring',
                  damping: 14,
                  stiffness: 180,
                }}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.85 }}
                className="relative p-4 rounded-full bg-white/90 border-2 border-pink-300 shadow-lg shadow-rose-300/50 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Tap to catch heart"
              >
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-rose-500 text-rose-500" />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-sm whitespace-nowrap">
                  Catch me!
                </span>

                {/* Particle burst effects */}
                {particles.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{ x: p.dx, y: p.dy, opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-base font-bold"
                  >
                    {p.char}
                  </motion.span>
                ))}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-500 shadow-md mb-2">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="font-extrabold text-rose-950 text-lg font-display">
                  Official Score: 100/100
                </h4>
                <p className="text-xs text-rose-700/90 font-medium max-w-xs mt-1">
                  “Okay… I think you’re officially ready for what comes next.” 🥺
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playBoop();
              onPrev();
            }}
            className="px-4 py-2.5 rounded-2xl border border-pink-200 text-rose-600 hover:bg-pink-50 font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (isPassed) {
                sound.playSparkle();
                onNext();
              } else {
                // Auto solve if user wants to skip
                sound.playSparkle();
                setIsPassed(true);
                setScore(TARGET_SCORE);
              }
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-400/30 flex items-center gap-2 hover:shadow-rose-400/45 transition-all cursor-pointer"
          >
            <span>{isPassed ? "I'm ready 🥺" : "Skip ahead ✨"}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
