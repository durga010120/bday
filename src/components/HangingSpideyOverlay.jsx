import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '../utils/soundFX';

export const HangingSpideyOverlay = () => {
  const [showSpeech, setShowSpeech] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSpideyClick = () => {
    soundFX.playWebSling();
    setIsFlipping(true);
    setShowSpeech(true);

    setTimeout(() => {
      setIsFlipping(false);
    }, 650);

    setTimeout(() => {
      setShowSpeech(false);
    }, 3000);
  };

  return (
    <div className="fixed top-0 right-3 sm:right-10 z-40 pointer-events-none select-none">
      <motion.div 
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center pointer-events-auto cursor-pointer group"
        onClick={handleSpideyClick}
      >
        {/* Transparent Web Line Strand */}
        <div className="w-1 bg-gradient-to-b from-black via-gray-300 to-white h-12 sm:h-16 shadow-sm relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#E62429] rounded-full animate-ping"></div>
        </div>

        {/* Speech Bubble */}
        <AnimatePresence>
          {showSpeech && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, x: -10 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="absolute -left-44 top-14 bg-white text-black font-bangers text-xs sm:text-sm px-3.5 py-2 rounded-2xl comic-border comic-box-shadow whitespace-nowrap z-50 shadow-2xl"
            >
              SWINGING BY FOR YOUR BIRTHDAY! 🕸️🎂
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-8 border-l-black"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User's exact 'hanging at top right side.png' image */}
        <motion.div 
          animate={isFlipping ? { rotate: [0, 360], scale: [1, 1.25, 1] } : { rotate: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="relative -mt-1 group-hover:scale-110 transition-transform w-24 h-28 sm:w-28 sm:h-32"
        >
          <img 
            src="/images/spidey_top_right_hanging.png" 
            alt="Hanging Spider-Man"
            className="w-full h-full object-contain filter drop-shadow-lg"
          />
        </motion.div>

      </motion.div>
    </div>
  );
};
