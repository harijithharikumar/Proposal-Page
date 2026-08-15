import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, RotateCcw, ArrowLeft } from 'lucide-react';
import { PookieMascot } from '../ui/PookieMascot';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface GentleNoSceneProps {
  config: ProposalConfig;
  onRestart: () => void;
  onReturnToQuestion: () => void;
}

export const GentleNoScene: React.FC<GentleNoSceneProps> = ({
  config,
  onRestart,
  onReturnToQuestion,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-pink-100/60 text-center relative overflow-hidden"
      >
        <div className="my-2">
          <PookieMascot mood="shy" size="md" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-rose-500 text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>Pure Warmth & Respect</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display leading-snug">
          That’s completely okay, {config.recipientName}. 💗
        </h2>

        <p className="text-sm sm:text-base text-rose-900/85 font-medium mt-3 leading-relaxed">
          Thank you so much for being honest and for taking the time to go through this silly little page. You are still an extraordinarily special person to me, and my respect and care for you will never change.
        </p>

        <p className="text-xs sm:text-sm text-rose-700/80 mt-2 font-handwriting text-lg">
          No pressure, no awkwardness, just gratitude for having you in my life. 🌸
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playBoop();
              onReturnToQuestion();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-pink-200 text-rose-600 hover:bg-pink-50 font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Question</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sound.playBoop();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-400/30 flex items-center justify-center gap-2 hover:shadow-rose-400/40 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start From Beginning</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
