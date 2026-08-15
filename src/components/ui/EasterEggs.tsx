import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { sound } from '../../lib/sound';

interface ToastEgg {
  id: number;
  text: string;
  subtext?: string;
  emoji?: string;
}

export const EasterEggs: React.FC<{
  secretTrigger?: number;
  recipientName: string;
}> = ({ secretTrigger = 0, recipientName }) => {
  const [toasts, setToasts] = useState<ToastEgg[]>([]);
  const [clickSpamCount, setClickSpamCount] = useState(0);

  const eggMessages = [
    { text: "pssst… you're cute 🥰", subtext: "just thought you should know!" },
    { text: `Every second with ${recipientName} is pure magic ✨`, subtext: "literally scientific fact." },
    { text: "Okayyy stop clicking me 🥺💗", subtext: "you're giving me butterflies!!" },
    { text: "Achievement Unlocked 🏆", subtext: "Most Wonderful Human Award" },
    { text: "Reminder: You are deeply appreciated 🌸", subtext: "just in case you needed a reminder!" },
    { text: "Sending virtual hugs... 💌", subtext: "Delivered instantly!" },
  ];

  const triggerToast = (msgIdx?: number) => {
    sound.playSparkle();
    const idx = msgIdx !== undefined ? msgIdx : Math.floor(Math.random() * eggMessages.length);
    const chosen = eggMessages[idx];
    const newToast: ToastEgg = {
      id: Date.now(),
      text: chosen.text,
      subtext: chosen.subtext,
      emoji: '💖',
    };
    setToasts((prev) => [...prev.slice(-2), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  // Trigger when parent signals secret heart clicked
  useEffect(() => {
    if (secretTrigger > 0) {
      triggerToast(secretTrigger % eggMessages.length);
    }
  }, [secretTrigger]);

  // Keyboard shortcut listener: typing 'pookie' or pressing 'h' or 'l'
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-6);
      if (keyBuffer.includes('pookie') || e.key.toLowerCase() === 'l') {
        triggerToast(0);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Toast notifications container */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-xs">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="pointer-events-auto p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-pink-200 shadow-xl shadow-pink-200/50 flex items-start gap-3"
            >
              <div className="p-2 rounded-xl bg-pink-100/80 text-rose-500 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-rose-900 leading-tight">
                  {toast.text}
                </p>
                {toast.subtext && (
                  <p className="text-[11px] text-rose-700/80 mt-0.5 leading-snug">
                    {toast.subtext}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Secret floating tiny cute corner heart */}
      <div className="fixed bottom-3 left-4 z-40">
        <motion.button
          whileHover={{ scale: 1.3, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            const next = clickSpamCount + 1;
            setClickSpamCount(next);
            if (next >= 5) {
              triggerToast(2); // "Okayyy stop clicking me 😭💗"
              setClickSpamCount(0);
            } else {
              triggerToast();
            }
          }}
          className="p-2 rounded-full text-pink-300 hover:text-pink-500 hover:bg-white/80 transition-all opacity-60 hover:opacity-100"
          title="Secret heart 💌"
          aria-label="Secret Easter Egg Heart"
        >
          <Heart className="w-4 h-4 fill-current" />
        </motion.button>
      </div>
    </>
  );
};
