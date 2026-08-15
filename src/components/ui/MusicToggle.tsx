import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../../lib/sound';

interface MusicToggleProps {
  onOpenCustomizer?: () => void;
  onSecretHeart?: () => void;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  onOpenCustomizer,
  onSecretHeart,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide the initial "Play our little soundtrack" prompt after 9 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleBgm = () => {
    const nextState = sound.toggleBGM();
    setIsPlaying(nextState);
    setShowTooltip(false);
  };

  const handleToggleMute = () => {
    const nextMute = sound.toggleMute();
    setIsMuted(nextMute);
    if (nextMute) {
      setIsPlaying(false);
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none flex items-center justify-between max-w-5xl mx-auto">
      {/* Left: Little secret Easter egg badge */}
      <div className="pointer-events-auto flex items-center gap-2">
        <motion.button
          id="secret-heart-button"
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            sound.playSparkle();
            if (onSecretHeart) onSecretHeart();
          }}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 text-xs font-semibold text-rose-500 shadow-sm hover:bg-pink-50 hover:border-pink-300 transition-all"
          title="Secret heart! Click me"
          aria-label="Secret Love Note"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          </motion.span>
          <span className="hidden sm:inline text-[11px] text-rose-400 font-medium">for you 🌸</span>
        </motion.button>
      </div>

      {/* Right: Audio and Settings Controls */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Play Soundtrack Button */}
        <div className="relative">
          <motion.button
            id="soundtrack-toggle-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleBgm}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all shadow-sm border ${
              isPlaying
                ? 'bg-rose-500 text-white border-rose-400 shadow-rose-200'
                : 'bg-white/80 backdrop-blur-md text-rose-600 border-pink-200 hover:bg-pink-50'
            }`}
            aria-label={isPlaying ? 'Pause romantic soundtrack' : 'Play romantic soundtrack'}
          >
            <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span className="hidden xs:inline">
              {isPlaying ? 'Soundtrack Playing' : 'Play Soundtrack 🎵'}
            </span>

            {/* Equalizer animation when playing */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
                <span className="w-0.5 bg-white rounded-full animate-pulse h-2" />
                <span className="w-0.5 bg-white rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-white rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </motion.button>

          {/* First-time prompt bubble */}
          <AnimatePresence>
            {showTooltip && !isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-0 top-full mt-2 w-48 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pink-200 text-center pointer-events-auto"
              >
                <div className="text-[11px] font-bold text-rose-500 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  Tap for music!
                </div>
                <p className="text-[10px] text-rose-800/70 mt-0.5 leading-snug">
                  Soft romantic music box sound ✨
                </p>
                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-t border-l border-pink-200 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mute/Unmute Sound FX Button */}
        <motion.button
          id="soundfx-mute-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleMute}
          className="p-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 text-rose-500 hover:bg-pink-50 shadow-sm"
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>

        {/* Live Customize Button */}
        {onOpenCustomizer && (
          <motion.button
            id="customize-settings-button"
            whileHover={{ scale: 1.1, rotate: 30 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              sound.playBoop();
              onOpenCustomizer();
            }}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 text-rose-500 hover:bg-pink-50 shadow-sm"
            title="Personalize proposal details"
            aria-label="Customize proposal settings"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </header>
  );
};
