import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Award,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Mail,
  Gift,
  ShieldCheck,
  Stars,
  Camera
} from 'lucide-react';
import { PookieMascot } from '../ui/PookieMascot';
import { sound } from '../../lib/sound';
import { ProposalConfig } from '../../types';

interface CelebrationProps {
  config: ProposalConfig;
  isExtraCute?: boolean;
  onRestart: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({
  config,
  isExtraCute = false,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'certificate' | 'letter' | 'perks' | 'memories'>('certificate');

  // Trigger high-energy confetti cannon upon mounting
  useEffect(() => {
    sound.playCelebration();

    // Multistage celebratory confetti burst
    const end = Date.now() + 3500;
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FFF0F5', '#FFD700'];

    (function frame() {
      confetti({
        particleCount: isExtraCute ? 4 : 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: isExtraCute ? 4 : 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [isExtraCute]);

  const handleCopyAnnouncement = () => {
    sound.playSparkle();
    const text = `IT'S OFFICIAL!! 💗 I said YES to ${config.senderName}! 💍✨ Best day ever! 💕`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 max-w-2xl mx-auto text-center relative z-10">
      {/* Top Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 12 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs sm:text-sm tracking-wider shadow-lg shadow-rose-300 mb-3 uppercase animate-pulse-heart"
      >
        <Sparkles className="w-4 h-4" />
        <span>💗 IT'S OFFICIAL 💗</span>
        <Sparkles className="w-4 h-4" />
      </motion.div>

      {/* Mascot in full celebration mode */}
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="my-2"
      >
        <PookieMascot mood="celebrating" size="lg" />
      </motion.div>

      {/* Celebratory Headlines */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl md:text-5xl font-black text-rose-600 font-display leading-tight tracking-tight mt-2"
      >
        YOU SAID YES! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-xl sm:text-2xl font-extrabold text-[#4A2835] mt-1 font-display"
      >
        Best day ever 🥺💗
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm sm:text-base text-rose-800/80 font-medium mt-1"
      >
        Officially promoted to: <span className="font-bold text-rose-600">MY POOKIE</span> 💗
      </motion.p>

      {/* Navigation Tabs for Celebration Hub */}
      <div className="mt-8 mb-4 flex items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-pink-100/80 backdrop-blur-md border border-pink-200 shadow-inner max-w-md w-full">
        <button
          onClick={() => {
            sound.playBoop();
            setActiveTab('certificate');
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'certificate'
              ? 'bg-white text-rose-600 shadow-md'
              : 'text-rose-700/70 hover:text-rose-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certificate</span>
        </button>

        <button
          onClick={() => {
            sound.playBoop();
            setActiveTab('letter');
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'letter'
              ? 'bg-white text-rose-600 shadow-md'
              : 'text-rose-700/70 hover:text-rose-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Love Letter</span>
        </button>

        <button
          onClick={() => {
            sound.playBoop();
            setActiveTab('perks');
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'perks'
              ? 'bg-white text-rose-600 shadow-md'
              : 'text-rose-700/70 hover:text-rose-900'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Perks</span>
        </button>

        <button
          onClick={() => {
            sound.playBoop();
            setActiveTab('memories');
          }}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'memories'
              ? 'bg-white text-rose-600 shadow-md'
              : 'text-rose-700/70 hover:text-rose-900'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Memories</span>
        </button>
      </div>

      {/* Active Tab Content Area */}
      <div className="w-full">
        {/* TAB 1: Certificate of Pookie */}
        {activeTab === 'certificate' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-2xl shadow-rose-200/50 border-2 border-dashed border-pink-300 text-left relative overflow-hidden"
          >
            {/* Certificate Header Stamp */}
            <div className="flex items-center justify-between border-b border-pink-200/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">
                  💍
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-rose-950 font-display tracking-wider">
                    OFFICIAL CERTIFICATE OF AFFECTION
                  </h3>
                  <p className="text-[10px] sm:text-xs text-rose-500 font-medium">
                    Issued under the Authority of True Affection
                  </p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-rose-400 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                LIFETIME VALIDITY
              </span>
            </div>

            {/* Certificate Body */}
            <div className="space-y-3 py-2 text-center sm:text-left">
              <p className="text-xs sm:text-sm text-rose-800/80">
                This document certifies that on this memorable day of <span className="font-bold text-rose-950 underline">{currentDate}</span>:
              </p>
              <div className="py-2 text-center">
                <h4 className="text-2xl sm:text-3xl font-black text-rose-600 font-display tracking-tight">
                  {config.recipientName}
                </h4>
                <p className="text-xs text-rose-500 font-semibold font-handwriting text-base">
                  (a.k.a. The Sweetest Human in the Universe)
                </p>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/85 leading-relaxed text-center sm:text-left">
                Has officially accepted the title of <strong className="text-rose-600">My Favorite Person & Forever Pookie</strong> to{' '}
                <strong className="text-rose-950">{config.senderName}</strong>, entitling both parties to infinite laughter, unlimited snacks, cozy hugs, and eternal companionship.
              </p>
            </div>

            {/* Official Seal and Signature */}
            <div className="mt-6 pt-4 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-white flex items-center justify-center shadow-md font-bold text-xs">
                  ★ SEAL ★
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-rose-950">Verified With Hugs</p>
                  <p className="text-[10px] text-rose-500">Non-transferable & 100% Real</p>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="font-handwriting text-xl text-rose-600 font-bold">
                  {config.senderName} 💖
                </p>
                <p className="text-[10px] text-rose-400 uppercase tracking-wider font-semibold">
                  Authorized Signatory
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Love Letter */}
        {activeTab === 'letter' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-rose-200/40 border border-pink-200 text-left relative bg-gradient-to-b from-white via-rose-50/40 to-pink-50/60"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-100">
              <div className="flex items-center gap-2 text-rose-500 font-bold text-xs sm:text-sm">
                <Mail className="w-4 h-4" />
                <span>A Letter From My Heart</span>
              </div>
              <span className="text-[11px] font-handwriting text-rose-400 text-base">To my favorite person</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-rose-950 font-display mb-3">
              {config.letter.greeting.replace('Pookie', config.recipientName)}
            </h3>

            <div className="space-y-3 text-sm sm:text-base text-rose-900/90 leading-relaxed font-medium">
              {config.letter.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Promises Checklist */}
            <div className="my-5 p-4 rounded-2xl bg-white/80 border border-pink-200 shadow-sm">
              <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Our Promises
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-rose-900/85">
                {config.letter.pookiePact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature */}
            <div className="mt-4 pt-3 border-t border-pink-200/60 text-right">
              <p className="text-xs text-rose-500 font-medium">{config.letter.closing}</p>
              <p className="font-handwriting text-2xl text-rose-600 font-bold mt-1">
                {config.letter.signature.replace('Your Name', config.senderName)}
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 3: Perks */}
        {activeTab === 'perks' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left"
          >
            {config.perks.map((perk) => (
              <div
                key={perk.id}
                className="glass-card p-4 sm:p-5 rounded-2xl border border-pink-200 shadow-md shadow-pink-100/50 hover:shadow-lg transition-shadow flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-rose-500 flex items-center justify-center shrink-0 font-bold text-lg">
                  🎁
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-rose-950 font-display">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-rose-800/80 mt-1 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 4: Memories */}
        {activeTab === 'memories' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left"
          >
            {config.memories.map((mem) => (
              <div
                key={mem.id}
                className="p-4 rounded-2xl bg-white border border-pink-200 shadow-md shadow-rose-100 flex flex-col justify-between"
                style={{ transform: `rotate(${mem.rotation || 0}deg)` }}
              >
                <div className="w-full h-28 rounded-xl bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex items-center justify-center text-4xl mb-3 shadow-inner">
                  {mem.emoji}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                    {mem.date}
                  </span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-rose-950 font-display mt-0.5">
                    {mem.caption}
                  </h4>
                  <p className="text-[11px] text-rose-800/80 mt-1 font-handwriting text-base">
                    "{mem.note}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Share / Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <motion.button
          id="share-announcement-button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCopyAnnouncement}
          className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-400/30 flex items-center justify-center gap-2 hover:shadow-rose-400/50 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard! 💕' : 'Copy Announcement 💌'}</span>
        </motion.button>

        <button
          onClick={() => {
            sound.playBoop();
            onRestart();
          }}
          className="w-full sm:w-1/2 py-3 px-4 rounded-2xl bg-white/90 border border-pink-200 text-rose-600 font-bold text-sm hover:bg-pink-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Journey</span>
        </button>
      </div>

      {/* Sweet Footer Note */}
      <p className="mt-8 text-xs text-rose-400 font-medium">
        Made with all my love for {config.recipientName} 🌸
      </p>
    </div>
  );
};
