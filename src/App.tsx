/**
 * Premium Interactive "Pookie" Love Proposal Experience
 * Maximum Pookie Energy™ — Soft, Adorable, Wholesome & Romantic
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ProposalConfig, SceneState } from './types';
import { initialProposalConfig } from './config/proposal';
import { FloatingBackground } from './components/ui/FloatingBackground';
import { MusicToggle } from './components/ui/MusicToggle';
import { EasterEggs } from './components/ui/EasterEggs';
import { CustomizerModal } from './components/ui/CustomizerModal';

// Scenes
import { Hero } from './components/proposal/Hero';
import { StoryScene } from './components/proposal/StoryScene';
import { ComplimentScene } from './components/proposal/ComplimentScene';
import { ReasonCards } from './components/proposal/ReasonCards';
import { MiniGame } from './components/proposal/MiniGame';
import { ProposalQuestion } from './components/proposal/ProposalQuestion';
import { Celebration } from './components/proposal/Celebration';
import { GentleNoScene } from './components/proposal/GentleNoScene';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneState>('hero');
  const [config, setConfig] = useState<ProposalConfig>(initialProposalConfig);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [secretTriggerCount, setSecretTriggerCount] = useState(0);
  const [isExtraCuteYes, setIsExtraCuteYes] = useState(false);

  // Parse URL search parameters for 1-click sharing (e.g. ?to=Emma&from=Liam)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const q = params.get('q');
      const nick = params.get('nick');

      if (to || from || q || nick) {
        setConfig((prev) => ({
          ...prev,
          recipientName: to || prev.recipientName,
          recipientNickname: nick || to || prev.recipientNickname,
          senderName: from || prev.senderName,
          question: q || prev.question,
          heroGreeting: `Hiiiii ${to || 'pookie'} 🥺💗`,
        }));
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const handleSceneChange = (nextScene: SceneState) => {
    setCurrentScene(nextScene);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFEBEF]">
      {/* Soft Ambient Floating Hearts & Gradient Orbs */}
      <FloatingBackground intensity={currentScene === 'celebration' ? 'high' : 'medium'} />

      {/* Top Header: Music, Audio FX & Live Personalization */}
      <MusicToggle
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onSecretHeart={() => setSecretTriggerCount((c) => c + 1)}
      />

      {/* Hidden Easter Egg Toasts & Triggers */}
      <EasterEggs
        secretTrigger={secretTriggerCount}
        recipientName={config.recipientName}
      />

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center pt-16 pb-12 px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {currentScene === 'hero' && (
            <motion.div
              key="scene-hero"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <Hero config={config} onNext={() => handleSceneChange('intro')} />
            </motion.div>
          )}

          {currentScene === 'intro' && (
            <motion.div
              key="scene-intro"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <StoryScene
                config={config}
                onNext={() => handleSceneChange('compliment')}
                onPrev={() => handleSceneChange('hero')}
              />
            </motion.div>
          )}

          {currentScene === 'compliment' && (
            <motion.div
              key="scene-compliment"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <ComplimentScene
                config={config}
                onNext={() => handleSceneChange('reasons')}
                onPrev={() => handleSceneChange('intro')}
              />
            </motion.div>
          )}

          {currentScene === 'reasons' && (
            <motion.div
              key="scene-reasons"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <ReasonCards
                config={config}
                onNext={() => handleSceneChange('mini_game')}
                onPrev={() => handleSceneChange('compliment')}
              />
            </motion.div>
          )}

          {currentScene === 'mini_game' && (
            <motion.div
              key="scene-mini-game"
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <MiniGame
                config={config}
                onNext={() => handleSceneChange('proposal')}
                onPrev={() => handleSceneChange('reasons')}
              />
            </motion.div>
          )}

          {currentScene === 'proposal' && (
            <motion.div
              key="scene-proposal"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <ProposalQuestion
                config={config}
                onYes={(isExtraCute) => {
                  setIsExtraCuteYes(!!isExtraCute);
                  handleSceneChange('celebration');
                }}
                onNo={() => handleSceneChange('gentle_no')}
                onPrev={() => handleSceneChange('mini_game')}
              />
            </motion.div>
          )}

          {currentScene === 'celebration' && (
            <motion.div
              key="scene-celebration"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              <Celebration
                config={config}
                isExtraCute={isExtraCuteYes}
                onRestart={() => handleSceneChange('hero')}
              />
            </motion.div>
          )}

          {currentScene === 'gentle_no' && (
            <motion.div
              key="scene-gentle-no"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full"
            >
              <GentleNoScene
                config={config}
                onRestart={() => handleSceneChange('hero')}
                onReturnToQuestion={() => handleSceneChange('proposal')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Live Customizer Modal */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={(updated) => setConfig(updated)}
        onResetDefaults={() => setConfig(initialProposalConfig)}
      />
    </div>
  );
}
