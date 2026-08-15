import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowLeft, Stars } from 'lucide-react';
import { PookieMascot } from '../ui/PookieMascot';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface ProposalQuestionProps {
  config: ProposalConfig;
  onYes: (isExtraCute?: boolean) => void;
  onNo: () => void;
  onPrev: () => void;
}

export const ProposalQuestion: React.FC<ProposalQuestionProps> = ({
  config,
  onYes,
  onNo,
  onPrev,
}) => {
  const [hoveredYes, setHoveredYes] = useState<string | null>(null);

  const handleYes = (isCute = false) => {
    sound.playCelebration();
    onYes(isCute);
  };

  const handleNo = () => {
    sound.playGentle();
    onNo();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 max-w-xl mx-auto text-center relative">
      {/* Soft Romantic Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Progress pill */}
      <div className="flex items-center gap-1.5 mb-6 relative z-10">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-8 rounded-full bg-rose-500" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className="w-full glass-card p-6 sm:p-9 rounded-3xl shadow-2xl shadow-rose-200/60 relative overflow-hidden z-10 border border-pink-200/80"
      >
        {/* Cute Mascot with shy pleading mood */}
        <div className="my-2">
          <PookieMascot mood="pleading" size="md" />
        </div>

        {/* Small Intro Lead */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-widest text-rose-500 mb-1"
        >
          Okay… here goes nothing 🥺
        </motion.p>

        {/* The Big Proposal Question */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2835] font-display leading-tight mt-2"
        >
          {config.question}
        </motion.h2>

        {/* Sub-question */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm sm:text-base text-rose-700/80 font-medium font-handwriting text-lg mt-2"
        >
          {config.subQuestion}
        </motion.p>

        {/* The Primary YES Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
          {/* Main YES button */}
          <motion.button
            id="proposal-yes-button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredYes('standard')}
            onMouseLeave={() => setHoveredYes(null)}
            onClick={() => handleYes(false)}
            className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-rose-400/40 hover:shadow-rose-400/60 border border-pink-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            <span>YES 💗</span>
          </motion.button>

          {/* Extra Cute YES button */}
          <motion.button
            id="proposal-yes-cuter-button"
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setHoveredYes('cute')}
            onMouseLeave={() => setHoveredYes(null)}
            onClick={() => handleYes(true)}
            className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 text-white font-extrabold text-lg sm:text-xl shadow-xl shadow-pink-400/40 hover:shadow-pink-400/60 border border-pink-200 flex items-center justify-center gap-2 transition-all cursor-pointer relative overflow-hidden"
          >
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>YES, OF COURSE 💕</span>
          </motion.button>
        </div>

        {/* Respectful, non-deceptive NO / Maybe button */}
        <div className="mt-6 pt-4 border-t border-pink-100/80 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playBoop();
              onPrev();
            }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-pink-50 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Take me back</span>
          </button>

          <button
            id="proposal-no-button"
            onClick={handleNo}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-600 hover:bg-rose-50/80 transition-colors cursor-pointer"
          >
            I need a little time
          </button>
        </div>
      </motion.div>
    </div>
  );
};
