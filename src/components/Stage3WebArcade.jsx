import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ComicBurstSVG } from './SpideyGraphics';
import { soundFX } from '../utils/soundFX';
import { ArrowRight, Target, Heart } from 'lucide-react';

export const Stage3WebArcade = ({ nickname, onNext }) => {
  const balloonsConfig = [
    { 
      id: 0, 
      color: 'bg-[#E62429]', 
      badge: '⚡', 
      title: 'SUPER FRIEND', 
      letters: '1 / 4', 
      reward: 'JOY & LAUGHTER',
      message: 'Mounika says: You bring endless joy and smiles to everyone around you!',
      floatAnim: { y: [-8, 8, -8], rotate: [-4, 4, -4], scale: [0.98, 1.03, 0.98] },
      duration: 3.2
    },
    { 
      id: 1, 
      color: 'bg-black text-white', 
      badge: '🛡️', 
      title: 'HERO COURAGE', 
      letters: '2 / 4', 
      reward: 'SHINE BRIGHT',
      message: 'Mounika says: Keep shining bright and chasing your biggest dreams!',
      floatAnim: { y: [8, -8, 8], rotate: [4, -4, 4], scale: [1.02, 0.97, 1.02] },
      duration: 2.8
    },
    { 
      id: 2, 
      color: 'bg-[#FFCC00] text-black', 
      badge: '🕸️', 
      title: 'SPIDEY BOND', 
      letters: '3 / 4', 
      reward: 'BEST FRIEND',
      message: 'Mounika says: So grateful for our awesome superhero friendship!',
      floatAnim: { y: [-10, 6, -10], rotate: [-5, 5, -5], scale: [0.97, 1.04, 0.97] },
      duration: 3.5
    },
    { 
      id: 3, 
      color: 'bg-[#E62429]', 
      badge: '🏆', 
      title: 'BIRTHDAY LEGEND', 
      letters: '4 / 4', 
      reward: 'JULY 27TH',
      message: 'Mounika says: Wishing you the happiest Spider-Man Birthday ever!',
      floatAnim: { y: [6, -10, 6], rotate: [5, -5, 5], scale: [1.03, 0.98, 1.03] },
      duration: 3.0
    },
  ];

  const [poppedStates, setPoppedStates] = useState([false, false, false, false]);
  const [shootingIndex, setShootingIndex] = useState(null);
  const [lastCallout, setLastCallout] = useState('');

  const calloutTexts = ["THWIP! 🕸️", "SECRET REVEALED! 💥", "BAM! 🔥", "REVEALED BY MOUNIKA! 🚀"];

  const handleShootBalloon = (idx) => {
    if (poppedStates[idx] || shootingIndex !== null) return;

    soundFX.playWebSling();
    setShootingIndex(idx);

    setTimeout(() => {
      soundFX.playPop();
      
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#E62429', '#FFCC00', '#000000', '#FFFFFF']
      });

      const updated = [...poppedStates];
      updated[idx] = true;
      setPoppedStates(updated);
      setShootingIndex(null);

      setLastCallout(calloutTexts[idx % calloutTexts.length]);

      if (updated.every(b => b)) {
        setTimeout(() => {
          soundFX.playSuccess();
        }, 300);
      }
    }, 220);
  };

  const isAllPopped = poppedStates.every(b => b);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md sm:max-w-lg mx-auto text-center"
    >
      <div className="bg-white p-6 sm:p-7 rounded-3xl comic-border comic-box-shadow-red relative overflow-hidden">
        
        {/* Stage Badge */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-[#E62429] text-white px-3.5 py-1 rounded-full font-bangers text-xs comic-border shadow-sm">
            STAGE 3 / 4 • WEB ARCADE
          </span>
          <ComicBurstSVG text="SECRET REVEAL!" color="bg-[#FFCC00] text-black" rotate="rotate-2" />
        </div>

        <h2 className="font-bangers text-3xl sm:text-4xl text-[#E62429] tracking-wide mt-2 mb-1 comic-text-shadow-red">
          WEB-SHOOTER MESSAGE REVEAL 🕸️
        </h2>
        <p className="text-xs sm:text-sm text-gray-800 font-bold mb-4">
          Pop each balloon with spider webs to reveal secret birthday messages from Mounika!
        </p>

        {/* Comic Action Callout Display */}
        {lastCallout && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [1.3, 1] }}
            className="mb-2 text-2xl font-bangers text-[#E62429] tracking-widest animate-pulse"
          >
            {lastCallout}
          </motion.div>
        )}

        {/* 4 Interactive Balloons / Unlocked Hero Cards Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto my-4">
          {balloonsConfig.map((item, idx) => {
            const isPopped = poppedStates[idx];
            const isShootingThis = shootingIndex === idx;

            return (
              <div key={item.id} className="relative h-48 flex items-center justify-center">
                
                {/* Web Strand Laser Animation */}
                {isShootingThis && (
                  <motion.div 
                    initial={{ height: 0, opacity: 1 }}
                    animate={{ height: "100%", opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-0 w-2.5 bg-gradient-to-t from-[#E62429] via-white to-[#FFCC00] rounded-full z-30 shadow-[0_0_20px_#E62429]"
                  />
                )}

                <AnimatePresence mode="wait">
                  {!isPopped ? (
                    /* Floating 3D Balloon with Dynamic Sway Physics */
                    <motion.button
                      key="balloon"
                      animate={item.floatAnim}
                      transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.12, rotate: 0 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleShootBalloon(idx)}
                      className={`w-32 h-38 ${item.color} rounded-[50%_50%_50%_50%/40%_40%_60%_60%] comic-border comic-box-shadow flex flex-col items-center justify-center relative cursor-pointer group shadow-2xl overflow-hidden transition-shadow`}
                    >
                      {/* Glossy Reflection Highlight */}
                      <div className="absolute top-3 left-4 w-5 h-8 bg-white/35 rounded-full transform -rotate-45"></div>

                      {/* Balloon String Sway */}
                      <motion.div 
                        animate={{ rotate: [-8, 8, -8] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 w-0.5 h-8 bg-black/80 origin-top"
                      />

                      {/* Hover Target Crosshair Overlay */}
                      <div className="absolute inset-0 bg-[#E62429]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                        <Target className="w-10 h-10 text-[#FFCC00] animate-spin" />
                      </div>

                      <span className="text-3xl drop-shadow-md z-10">{item.badge}</span>
                      <span className="font-bangers text-xs sm:text-sm text-white tracking-wider mt-1 z-10 drop-shadow-[1.5px_1.5px_0_#000]">
                        POP TO REVEAL! 🕸️
                      </span>
                    </motion.button>
                  ) : (
                    /* Revealed Secret Message Power Card */
                    <motion.div
                      key="heroCard"
                      initial={{ scale: 0, rotateY: 180 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className="w-36 h-44 bg-[#FFF8E7] border-4 border-[#E62429] rounded-2xl comic-box-shadow p-2.5 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl"
                    >
                      <div className="absolute top-1 right-1 text-[9px] bg-[#E62429] text-white px-1.5 py-0.5 rounded font-bangers">
                        {item.letters}
                      </div>

                      <div className="text-2xl mt-0.5">{item.badge}</div>

                      <div>
                        <h4 className="font-bangers text-sm text-[#E62429] tracking-wider leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-serif text-gray-900 leading-tight mt-1 px-1 font-bold">
                          "{item.message}"
                        </p>
                      </div>

                      <span className="text-[9px] font-mono text-green-800 bg-green-100 px-1.5 py-0.5 rounded-full border border-green-500 w-full uppercase font-bold flex items-center justify-center space-x-1">
                        <span>REVEALED BY MOUNIKA</span>
                        <Heart className="w-2.5 h-2.5 text-[#E62429] fill-current" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Complete Hero Message Banner */}
        {isAllPopped && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="my-3 p-4 bg-[#E62429] text-white rounded-2xl comic-border comic-box-shadow font-bangers text-2xl tracking-wide leading-tight"
          >
            ALL SECRET MESSAGES REVEALED! 🎉
            <p className="text-xs font-bold text-[#FFCC00] mt-1 tracking-normal font-sans">
              "Mounika wishes you the happiest Spider-Man Birthday ever, {nickname || 'Josh'}!" ❤️
            </p>
          </motion.div>
        )}

        {/* Next Stage Button */}
        {isAllPopped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundFX.playWebSling();
              onNext();
            }}
            className="w-full mt-2 py-4 bg-black hover:bg-gray-900 text-white font-bangers text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow transition-all flex items-center justify-center space-x-2 cursor-pointer animate-pulse btn-shine-overlay"
          >
            <span>UNLOCK SECRET GIFT VAULT 🎁</span>
            <ArrowRight className="w-6 h-6 text-[#FFCC00]" />
          </motion.button>
        )}

      </div>
    </motion.div>
  );
};
