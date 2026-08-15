import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, RotateCcw, Sparkles, Copy, Check, Heart, Edit3 } from 'lucide-react';
import { ProposalConfig } from '../../types';
import { sound } from '../../lib/sound';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProposalConfig;
  onSaveConfig: (newConfig: ProposalConfig) => void;
  onResetDefaults: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ProposalConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playSparkle();
    onSaveConfig(formData);
    onClose();
  };

  const handleShareCustomLink = () => {
    sound.playSparkle();
    const params = new URLSearchParams();
    params.set('to', formData.recipientName);
    params.set('nick', formData.recipientNickname);
    params.set('from', formData.senderName);
    params.set('q', formData.question);
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden flex flex-col max-h-[90vh] my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-pink-100 text-rose-500">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-rose-950 text-base font-display">
                  Personalize Your Proposal
                </h3>
                <p className="text-xs text-rose-500 font-medium">
                  Customize names & question in 1 click
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                sound.playBoop();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-pink-100 text-rose-400 hover:text-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1 text-left text-xs sm:text-sm">
            {/* Recipient Name */}
            <div>
              <label className="block font-bold text-rose-900 mb-1">
                Recipient’s Name / Nickname 💌
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) =>
                  setFormData({ ...formData, recipientName: e.target.value })
                }
                placeholder="e.g. Pookie / Emma / Baby"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-pink-50/30 text-rose-950 font-medium"
              />
            </div>

            {/* Recipient Cute Pet Name */}
            <div>
              <label className="block font-bold text-rose-900 mb-1">
                Pet Name / Term of Endearment 🌸
              </label>
              <input
                type="text"
                value={formData.recipientNickname}
                onChange={(e) =>
                  setFormData({ ...formData, recipientNickname: e.target.value })
                }
                placeholder="e.g. Cutie Pie / Gorgeous"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-pink-50/30 text-rose-950 font-medium"
              />
            </div>

            {/* Sender Name */}
            <div>
              <label className="block font-bold text-rose-900 mb-1">
                Your Name / Signature ✍️
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
                placeholder="e.g. Alex / Your Favorite Human"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-pink-50/30 text-rose-950 font-medium"
              />
            </div>

            {/* Proposal Question */}
            <div>
              <label className="block font-bold text-rose-900 mb-1">
                The Big Question 💍
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder="e.g. Will you be my pookie? / Will you be my girlfriend?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-pink-50/30 text-rose-950 font-medium"
              />
            </div>

            {/* Shareable Link Generator */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleShareCustomLink}
                className="w-full py-2.5 px-3 rounded-xl bg-pink-100 text-rose-600 font-bold flex items-center justify-center gap-1.5 hover:bg-pink-200/80 transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Personalized Link Copied!' : 'Copy Shareable Link With These Names'}</span>
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-pink-50/50 border-t border-pink-100 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                sound.playBoop();
                onResetDefaults();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl text-rose-500 hover:bg-pink-100/60 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playBoop();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl border border-pink-200 text-rose-600 hover:bg-pink-100 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold shadow-md shadow-rose-300 flex items-center gap-1.5 hover:shadow-rose-400 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
