import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { PookieMascot } from '../ui/PookieMascot';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface HeroProps {
  config: ProposalConfig;
  onNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onNext }) => {
  const handleProceed = () => {
    sound.playPop();
    sound.playSparkle();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] sm:min-h-[80vh] px-4 py-8 text-center max-w-xl mx-auto">
      {/* Decorative Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-rose-600 text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-4"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Special Delivery for {config.recipientName}</span>
        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
      </motion.div>

      {/* Mascot Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 18, stiffness: 200, delay: 0.3 }}
        className="relative my-3"
      >
        <PookieMascot mood="shy" size="lg" onPookieClick={() => sound.playPop()} />
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2835] tracking-tight font-display mt-2"
      >
        {config.heroGreeting.replace('pookie', config.recipientName)}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-base sm:text-lg text-rose-900/80 font-medium mt-3 max-w-md mx-auto leading-relaxed"
      >
        {config.heroSubtext}
      </motion.p>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-8 flex flex-col items-center gap-2.5 w-full max-w-xs"
      >
        <motion.button
          id="hero-start-button"
          onClick={handleProceed}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="w-full relative group overflow-hidden px-8 py-4 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-bold text-lg sm:text-xl shadow-xl shadow-rose-400/35 border border-pink-300 hover:shadow-rose-400/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          {/* Shimmer light bar across button */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          
          <span>Okayyy, show me 🥺</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Playful microcopy */}
        <motion.span
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="text-xs sm:text-sm text-rose-700/80 font-handwriting text-base"
        >
          ✨ I promise this is worth it 🥺 ✨
        </motion.span>
      </motion.div>
    </div>
  );
};
