import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface ReasonCardsProps {
  config: ProposalConfig;
  onNext: () => void;
  onPrev: () => void;
}

export const ReasonCards: React.FC<ReasonCardsProps> = ({ config, onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReasons, setLikedReasons] = useState<Record<string, boolean>>({});

  const reasons = config.reasons;
  const currentReason = reasons[currentIndex];

  const handleNextCard = () => {
    sound.playBoop();
    if (currentIndex < reasons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      sound.playSparkle();
      onNext();
    }
  };

  const handlePrevCard = () => {
    sound.playBoop();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleHeart = (id: string) => {
    sound.playPop();
    setLikedReasons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto text-center">
      {/* Progress pill */}
      <div className="flex items-center gap-1.5 mb-6">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-8 rounded-full bg-rose-500" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
      </div>

      <div className="w-full">
        {/* Section Heading */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
            Chapter 3 · Honest Truths
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display mt-1">
            A Few Reasons Why You Mean So Much
          </h2>
          <p className="text-xs sm:text-sm text-rose-800/75 mt-1 font-medium">
            (Just a few out of a million reasons… 🥺)
          </p>
        </div>

        {/* Carousel View Container */}
        <div className="relative my-4 min-h-[290px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReason.id}
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -40 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
              className={`w-full glass-card p-6 sm:p-7 rounded-3xl shadow-xl shadow-pink-100/70 border border-pink-200 text-left relative overflow-hidden bg-gradient-to-br ${currentReason.color || 'from-white to-pink-50'}`}
            >
              {/* Top tag and emoji */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-pink-200/80 text-[11px] font-bold text-rose-600 shadow-sm">
                  {currentReason.tag || `Reason #${currentIndex + 1}`}
                </span>
                <span className="text-3xl animate-bounce" style={{ animationDuration: '2.5s' }}>
                  {currentReason.emoji}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-rose-950 font-display">
                {currentReason.title}
              </h3>
              <p className="text-sm sm:text-base text-rose-900/85 mt-2.5 leading-relaxed font-medium">
                {currentReason.description}
              </p>

              {/* Interactive Like Stamp */}
              <div className="mt-6 pt-4 border-t border-pink-200/60 flex items-center justify-between">
                <button
                  onClick={() => toggleHeart(currentReason.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    likedReasons[currentReason.id]
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-300'
                      : 'bg-white/80 text-rose-600 border border-pink-200 hover:bg-pink-100/60'
                  }`}
                  aria-label="Stamp approval on this reason"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedReasons[currentReason.id] ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} />
                  <span>{likedReasons[currentReason.id] ? 'Saved to heart 💖' : 'Agree? Tap here 🥺'}</span>
                </button>

                <div className="flex items-center gap-1 text-xs text-rose-400 font-bold">
                  <span>{currentIndex + 1}</span>
                  <span>/</span>
                  <span>{reasons.length}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center justify-center gap-2 my-2">
          {reasons.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                sound.playBoop();
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-6 bg-rose-500' : 'w-2 bg-pink-200 hover:bg-pink-300'
              }`}
              aria-label={`Go to reason ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playBoop();
              if (currentIndex > 0) handlePrevCard();
              else onPrev();
            }}
            className="px-4 py-2.5 rounded-2xl border border-pink-200 text-rose-600 hover:bg-pink-50 font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentIndex > 0 ? 'Previous' : 'Back'}</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNextCard}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-400/30 flex items-center gap-2 hover:shadow-rose-400/45 transition-all cursor-pointer"
          >
            <span>{currentIndex < reasons.length - 1 ? 'Next Reason ✨' : 'Almost there… 💗'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
