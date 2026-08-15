import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Heart, Sparkles, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface ComplimentSceneProps {
  config: ProposalConfig;
  onNext: () => void;
  onPrev: () => void;
}

export const ComplimentScene: React.FC<ComplimentSceneProps> = ({ config, onNext, onPrev }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    sound.playSparkle();
    setIsRevealed(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-8 max-w-lg mx-auto text-center">
      {/* Progress pill */}
      <div className="flex items-center gap-1.5 mb-6">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-8 rounded-full bg-rose-500" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
        <span className="h-2 w-2 rounded-full bg-rose-200" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-pink-100/60 relative overflow-hidden"
      >
        <span className="text-xs uppercase tracking-wider font-bold text-rose-400">
          Chapter 2 · The Little Things
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4A2835] font-display mt-2 leading-snug">
          Do you know what my favorite notification is?
        </h2>

        {/* Interactive Phone Notification Mockup */}
        <div className="my-6">
          {!isRevealed ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReveal}
              className="p-5 rounded-2xl bg-gradient-to-b from-rose-50 to-pink-100/60 border-2 border-dashed border-pink-300 cursor-pointer flex flex-col items-center justify-center gap-3 transition-all hover:bg-rose-100/50"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md animate-bounce">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-rose-900 text-base">
                  1 New Message
                </p>
                <p className="text-xs text-rose-600/80 mt-0.5 font-medium">
                  Tap to open 💌
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-pink-200 shadow-xl shadow-rose-200/40 text-left relative overflow-hidden"
            >
              {/* Notification Header */}
              <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 rounded-md bg-rose-500 text-white">
                    <MessageCircle className="w-3 h-3" />
                  </div>
                  <span>{config.complimentNotification.app}</span>
                </div>
                <span>Just Now</span>
              </div>

              {/* Notification Sender & Content */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                  {config.recipientName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-rose-950">{config.recipientName}</span>
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  </div>
                  <p className="text-lg font-extrabold text-rose-600 mt-1 font-display">
                    {config.complimentNotification.punchline}
                  </p>
                  <p className="text-xs sm:text-sm text-rose-800/80 mt-1.5 leading-relaxed font-medium">
                    {config.complimentNotification.reactionText}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-pink-100 flex items-center justify-between text-[11px] text-rose-500 font-medium">
                <span>Sent with all my love</span>
                <span className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  Irreplaceable
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Buttons */}
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
              if (!isRevealed) {
                handleReveal();
              } else {
                sound.playPop();
                onNext();
              }
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-400/30 flex items-center gap-2 hover:shadow-rose-400/45 transition-all cursor-pointer"
          >
            <span>{isRevealed ? 'There is more… 🌸' : 'Open it 🥺'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
