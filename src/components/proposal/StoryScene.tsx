import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface StorySceneProps {
  config: ProposalConfig;
  onNext: () => void;
  onPrev: () => void;
}

export const StoryScene: React.FC<StorySceneProps> = ({ config, onNext, onPrev }) => {
  const [stage, setStage] = useState(0);

  const handleNextStage = () => {
    sound.playBoop();
    if (stage < 2) {
      setStage(stage + 1);
    } else {
      sound.playSparkle();
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto text-center">
      {/* Progress pill */}
      <div className="flex items-center gap-1.5 mb-6">
        <span className="h-2 w-8 rounded-full bg-rose-500" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-pink-100/60 relative overflow-hidden"
      >
        {/* Soft corner sparkle */}
        <div className="absolute top-3 right-3 text-rose-300">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        {/* Playful Floating Hearts */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-rose-100/80 flex items-center justify-center text-rose-500 shadow-inner">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
                Chapter 1 · A Tiny Thought
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display leading-snug">
                Sooo… I have something very important to ask you.
              </h2>
              <p className="text-sm sm:text-base text-rose-800/80 font-medium">
                (Okay, my hands are a little shaky typing this 🥺👉👈)
              </p>
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
                Chapter 1 · Hear me out
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display leading-snug">
                Before I say it, there are a few things I want to remind you…
              </h2>
              <p className="text-sm sm:text-base text-rose-800/80 font-medium">
                Because you deserve to know just how much you mean to me. 🌸
              </p>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
                Chapter 1 · Ready?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display leading-snug">
                Take a deep breath, {config.recipientName}…
              </h2>
              <p className="text-sm sm:text-base text-rose-800/80 font-medium">
                I promise this comes straight from the heart 💌
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playBoop();
              if (stage > 0) setStage(stage - 1);
              else onPrev();
            }}
            className="px-4 py-2.5 rounded-2xl border border-pink-200 text-rose-600 hover:bg-pink-50 font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleNextStage}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-400/30 flex items-center gap-2 hover:shadow-rose-400/45 transition-all cursor-pointer"
          >
            <span>{stage === 2 ? 'Just one last thing…' : 'Continue 💗'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
