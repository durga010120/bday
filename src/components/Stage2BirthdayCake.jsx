import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ComicBurstSVG } from './SpideyGraphics';
import { soundFX } from '../utils/soundFX';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Stage2BirthdayCake = ({ nickname, onNext }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [isWishGranted, setIsWishGranted] = useState(false);
  const [isWebBlowing, setIsWebBlowing] = useState(false);

  const triggerConfetti = () => {
    const count = 220;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60, colors: ['#E62429', '#FFFFFF', '#FFCC00'] });
    fire(0.2, { spread: 70, colors: ['#FFFFFF', '#E62429', '#000000'] });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 130, startVelocity: 25, decay: 0.92, colors: ['#FFCC00', '#E62429'] });
  };

  const handleBlowCandles = () => {
    if (isWishGranted || isWebBlowing) return;
    
    soundFX.playWebSling();
    setIsWebBlowing(true);

    // Extinguish candles sequentially as spider web sweeps across them!
    [0, 1, 2, 3, 4].forEach((idx) => {
      setTimeout(() => {
        soundFX.playBlow();
        setCandlesLit(prev => {
          const updated = [...prev];
          updated[idx] = false;
          return updated;
        });
      }, 180 + idx * 140);
    });

    // Complete blowing sequence
    setTimeout(() => {
      soundFX.playSuccess();
      triggerConfetti();
      setIsWishGranted(true);
      setIsWebBlowing(false);
    }, 1050);
  };

  const handleSingleCandle = (idx) => {
    if (!candlesLit[idx] || isWebBlowing) return;
    soundFX.playBlow();
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    if (updated.every(c => !c)) {
      setTimeout(() => {
        soundFX.playSuccess();
        triggerConfetti();
        setIsWishGranted(true);
      }, 300);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="bg-white p-5 sm:p-6 rounded-3xl comic-border comic-box-shadow-red relative overflow-hidden flex flex-col justify-between">
        
        {/* Stage Badge */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-[#E62429] text-white px-3 py-0.5 rounded-full font-bangers text-xs comic-border shadow-sm">
            STAGE 2 / 4 • BIRTHDAY CAKE
          </span>
          <ComicBurstSVG text="BAM!" color="bg-[#FFCC00] text-black" rotate="-rotate-3" />
        </div>

        {/* 3D Bold Title & Upside Down Spidey */}
        <div className="my-1 relative">
          <motion.div 
            animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-20 absolute top-0 right-0 pointer-events-none z-10 hidden sm:block"
          >
            <img 
              src="/images/spidey_upside_down_pose.png" 
              alt="Upside Down Spider-Man"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </motion.div>

          <h1 className="font-bangers text-3xl sm:text-4xl text-[#E62429] tracking-wider leading-tight uppercase">
            HAPPY BIRTHDAY,
          </h1>
          <div className="font-bangers text-3xl sm:text-4xl text-black tracking-wider uppercase flex items-center justify-center space-x-2">
            <span>{nickname || 'CHAMPION'}!</span>
            <span>🎂</span>
          </div>
          <p className="text-xs font-bold text-gray-700 mt-1">
            Make a wish and blow out your Spider-Man Candles!
          </p>
        </div>

        {/* 3-Tier Birthday Cake Container */}
        <div className="relative w-full max-w-[270px] mx-auto my-4 flex flex-col items-center justify-end">
          
          {/* Animated Spider Web Beam Sweeping Across Candles */}
          <AnimatePresence>
            {isWebBlowing && (
              <motion.div 
                initial={{ left: "-15%", opacity: 0 }}
                animate={{ left: "115%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute top-1 w-20 h-20 pointer-events-none z-40 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#E62429] via-white to-[#FFCC00] rounded-full blur-sm opacity-90 animate-ping"></div>
                <div className="absolute text-3xl drop-shadow-xl animate-spin">🕸️</div>
                <div className="absolute text-sm text-[#FFCC00] font-bangers -bottom-2 whitespace-nowrap animate-pulse">
                  THWIP! ⚡
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candles Row */}
          <div className="flex justify-center space-x-3 mb-1 z-20">
            {candlesLit.map((isLit, idx) => (
              <div 
                key={idx}
                onClick={() => handleSingleCandle(idx)}
                className="flex flex-col items-center cursor-pointer group relative"
              >
                {/* Flame / Smoke Container */}
                <div className="h-8 flex items-end justify-center relative">
                  {isLit ? (
                    <div className="relative flex items-center justify-center">
                      {/* Outer Flame Glow Aura */}
                      <div className="absolute w-6 h-8 bg-[#FFCC00]/30 rounded-full blur-sm animate-pulse"></div>
                      
                      {/* Outer Flame Body */}
                      <div className="w-4 h-6 bg-gradient-to-t from-[#FF2A00] via-[#FF8800] to-[#FFCC00] rounded-full animate-flame shadow-[0_0_14px_#FFCC00]" />
                      
                      {/* Inner White Hot Flame Core */}
                      <div className="absolute bottom-0.5 w-2 h-3.5 bg-white rounded-full opacity-90 animate-flame" />
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 1.8, opacity: 1, y: 0 }}
                      animate={{ scale: 1, opacity: 0.6, y: -6 }}
                      transition={{ duration: 0.5 }}
                      className="w-4 h-5 text-xs flex flex-col items-center justify-center z-30"
                    >
                      <span className="animate-bounce">💨</span>
                      <span className="text-[8px] text-[#FFCC00] font-mono">✨</span>
                    </motion.div>
                  )}
                </div>

                {/* Candle Body */}
                <div className="w-3.5 h-8 bg-gradient-to-b from-white via-red-100 to-[#E62429] border border-black rounded-t-sm shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-black/20"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1 (Top) */}
          <div className="w-34 h-13 bg-[#E62429] rounded-t-xl comic-border relative flex items-center justify-center overflow-hidden z-15 shadow-sm">
            <div className="absolute top-0 inset-x-0 h-2.5 bg-white/40 rounded-t-xl"></div>
            <span className="font-bangers text-white text-lg tracking-widest">SPIDEY DAY</span>
          </div>

          {/* Tier 2 (Middle) */}
          <div className="w-52 h-14 bg-white comic-border relative flex items-center justify-center overflow-hidden z-10 -mt-1 shadow-sm">
            <div className="absolute top-0 inset-x-0 h-2.5 bg-[#FFCC00]"></div>
            <span className="font-bangers text-[#E62429] text-lg sm:text-xl tracking-wider uppercase">
              JULY 27TH • SPIDEY DAY
            </span>
          </div>

          {/* Tier 3 (Bottom) */}
          <div className="w-64 h-16 bg-[#E62429] rounded-b-xl comic-border relative flex items-center justify-center overflow-hidden -mt-1 shadow-md">
            <div className="absolute top-0 inset-x-0 h-3 bg-white/30"></div>
            <div className="flex space-x-2 text-sm items-center font-bangers text-white tracking-widest text-lg">
              <span>🕸️</span>
              <span>HAPPY BIRTHDAY</span>
              <span>🕸️</span>
            </div>
          </div>

        </div>

        {/* Wish Granted Banner */}
        {isWishGranted ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="my-2 p-3 bg-[#FFCC00] text-black rounded-2xl comic-border comic-box-shadow font-bangers text-xl tracking-wide flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-6 h-6 text-[#E62429]" />
            <span>WISH GRANTED, CHAMPION! 🎉</span>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleBlowCandles}
            disabled={isWebBlowing}
            className="w-full mt-2 py-3.5 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-xl sm:text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow transition-all flex items-center justify-center space-x-2 cursor-pointer btn-shine-overlay"
          >
            {isWebBlowing ? (
              <span className="animate-pulse text-[#FFCC00]">BLOWING SPIDER WEBS... 🕸️</span>
            ) : (
              <>
                <span>SPIDER-WEB BLOW CANDLES! 🕸️🕯️</span>
              </>
            )}
          </motion.button>
        )}

        {/* Next Stage Button */}
        {isWishGranted && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              soundFX.playWebSling();
              onNext();
            }}
            className="w-full mt-2 py-3.5 bg-black hover:bg-gray-900 text-white font-bangers text-xl sm:text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow transition-all flex items-center justify-center space-x-2 cursor-pointer animate-pulse btn-shine-overlay"
          >
            <span>GO TO WEB ARCADE 🚀</span>
            <ArrowRight className="w-6 h-6 text-[#FFCC00]" />
          </motion.button>
        )}

      </div>
    </motion.div>
  );
};
