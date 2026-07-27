import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ComicBurstSVG } from './SpideyGraphics';
import { soundFX } from '../utils/soundFX';
import { Camera, Scroll, X, RotateCcw, Trophy, Heart, Award, Sparkles } from 'lucide-react';

export const Stage4GiftVault = ({ nickname, onRestart, onOpenMemoriesPage }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenGift = () => {
    soundFX.playExplosion();
    setIsOpened(true);

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#E62429', '#FFCC00', '#000000'] });
      confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FFFFFF', '#E62429', '#FFCC00'] });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md sm:max-w-xl mx-auto text-center"
    >
      <div className="bg-white p-5 sm:p-7 rounded-3xl comic-border comic-box-shadow-red relative overflow-hidden">
        
        {/* Stage Badge */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-[#FFCC00] text-black px-3.5 py-1 rounded-full font-bangers text-sm comic-border shadow-md">
            STAGE 4 / 4 • GIFT VAULT & OUTRO
          </span>
          <ComicBurstSVG text="SECRET VAULT!" color="bg-[#E62429] text-white" rotate="-rotate-2" />
        </div>

        {!isOpened ? (
          /* Gift Box Prompt */
          <div>
            <h2 className="font-bangers text-3xl sm:text-4xl text-[#E62429] tracking-wide mt-2 mb-1 comic-text-shadow-red">
              OPEN YOUR SUPERHERO GIFT, {nickname?.toUpperCase() || 'HERO'}! 🎁
            </h2>
            <p className="text-xs sm:text-sm text-gray-800 font-bold mb-4">
              Tap the glowing Spider-Man chest to unbox your secret gifts from Mounika!
            </p>

            <div 
              onClick={handleOpenGift}
              className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-6 flex items-center justify-center cursor-pointer group"
            >
              <motion.div 
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-full h-full bg-[#E62429] rounded-3xl comic-border comic-box-shadow flex flex-col items-center justify-center relative shadow-2xl group-hover:scale-105 transition-transform overflow-hidden"
              >
                <div className="absolute inset-y-0 w-10 bg-white border-x-2 border-black"></div>
                <div className="absolute inset-x-0 h-10 bg-white border-y-2 border-black"></div>
                
                <div className="z-10 bg-white p-3 rounded-full comic-border shadow-lg w-20 h-20 flex items-center justify-center">
                  <img 
                    src="/images/spidey_logo.png" 
                    alt="Spider-Man Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="w-full py-4 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-3xl tracking-wider rounded-2xl comic-border comic-box-shadow animate-pulse cursor-pointer btn-shine-overlay"
            >
              UNBOX SUPERHERO GIFTS! 💥
            </motion.button>
          </div>
        ) : (
          /* Unboxed Gift Hub & Grand Outro */
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            
            <div className="w-14 h-14 bg-[#E62429] rounded-full comic-border mx-auto flex items-center justify-center text-white shadow-xl animate-bounce my-2">
              <Trophy className="w-8 h-8 text-[#FFCC00]" />
            </div>

            {/* High-Contrast Hero Banner */}
            <div className="my-2">
              <h1 className="font-bangers text-3xl sm:text-4xl text-[#E62429] tracking-wider uppercase leading-tight">
                LOTS OF LOVE & SPIDEY HUGS FOR
              </h1>
              <div className="font-bangers text-4xl sm:text-5xl text-[#E62429] tracking-widest uppercase my-2">
                <span className="bg-[#FFCC00] text-black px-5 py-1.5 rounded-2xl comic-border inline-block transform -rotate-1 shadow-md">
                  {nickname || 'CHAMPION'}! ❤️
                </span>
              </div>
              <p className="text-xs font-bold text-[#E62429] font-mono mt-1">
                🎁 A SPECIAL BIRTHDAY GIFT CREATED WITH LOVE BY MOUNIKA ❤️
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-800 mb-4 font-bold">
              Pick a secret unboxed hero item below:
            </p>

            {/* 3 Interactive Hero Gift Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 max-w-lg mx-auto">
              
              {/* Card 1: HERO MEMORIES */}
              <div 
                onClick={() => {
                  soundFX.playWebSling();
                  onOpenMemoriesPage();
                }}
                className="p-3.5 bg-white rounded-2xl comic-border comic-box-shadow flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-[#F8FAF9]"
              >
                <div className="w-11 h-11 rounded-full bg-[#E62429] text-white flex items-center justify-center mb-1.5 comic-border shadow-md">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="font-bangers text-lg text-[#E62429] tracking-wider">HERO MEMORIES</h3>
                <p className="text-[10px] font-bold text-gray-600 mt-0.5">Photo Gallery 📷</p>
              </div>

              {/* Card 2: SECRET LETTER */}
              <div 
                onClick={() => {
                  soundFX.playWebSling();
                  setActiveModal('letter');
                }}
                className="p-3.5 bg-white rounded-2xl comic-border comic-box-shadow flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-[#F8FAF9]"
              >
                <div className="w-11 h-11 rounded-full bg-[#FFCC00] text-black flex items-center justify-center mb-1.5 comic-border shadow-md">
                  <Scroll className="w-5 h-5" />
                </div>
                <h3 className="font-bangers text-lg text-black tracking-wider">SECRET LETTER</h3>
                <p className="text-[10px] font-bold text-gray-600 mt-0.5">From Mounika 📜</p>
              </div>

              {/* Card 3: HERO CERTIFICATE */}
              <div 
                onClick={() => {
                  soundFX.playSuccess();
                  setActiveModal('certificate');
                }}
                className="p-3.5 bg-[#FFF8E7] rounded-2xl comic-border comic-box-shadow flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-yellow-50"
              >
                <div className="w-11 h-11 rounded-full bg-black text-[#FFCC00] flex items-center justify-center mb-1.5 comic-border shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bangers text-lg text-[#E62429] tracking-wider">HERO BADGE</h3>
                <p className="text-[10px] font-bold text-gray-600 mt-0.5">Certificate 🏆</p>
              </div>

            </div>

            {/* Spider Logo Emblem */}
            <div className="my-2 flex flex-col items-center justify-center">
              <div className="px-4 py-1 bg-white text-black font-bangers text-base rounded-2xl comic-border comic-box-shadow transform -rotate-1 mb-1">
                BEST BIRTHDAY EVER! 🎉
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/images/spidey_logo.png" 
                  alt="Spider Logo"
                  className="w-full h-full object-contain filter drop-shadow-md animate-pulse"
                />
              </div>
            </div>

            {/* Restart Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundFX.playWebSling();
                onRestart();
              }}
              className="w-full mt-2 py-3.5 bg-black hover:bg-gray-900 text-white font-bangers text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow transform transition-all flex items-center justify-center space-x-2 cursor-pointer btn-shine-overlay"
            >
              <RotateCcw className="w-6 h-6 text-[#FFCC00]" />
              <span>RESTART BIRTHDAY MISSION 🔄</span>
            </motion.button>

          </motion.div>
        )}

      </div>

      {/* Modal Overlays */}
      <AnimatePresence>
        
        {/* Modal 1: Secret Letter from Mounika */}
        {activeModal === 'letter' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-lg p-6 rounded-3xl comic-border comic-box-shadow-red relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => {
                  soundFX.playClick();
                  setActiveModal(null);
                }}
                className="absolute top-4 right-4 p-2 bg-[#E62429] text-white rounded-full comic-border hover:bg-red-600 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-4">
                <Scroll className="w-7 h-7 text-[#E62429]" />
                <h3 className="font-bangers text-3xl text-[#E62429] tracking-wide">SECRET HERO WEB-SCROLL</h3>
              </div>
              <div className="bg-[#FFF8E7] text-black p-5 rounded-2xl comic-border space-y-3 text-left font-serif shadow-inner">
                <p className="font-bold text-lg font-bangers text-[#E62429] tracking-wider">
                  DEAR {nickname?.toUpperCase() || 'HERO'},
                </p>
                <p className="text-sm leading-relaxed">
                  Happy Birthday! 🎉 This special Spider-Man birthday web experience was created with lots of love as a secret gift for you from your best friend <strong>Mounika</strong>!
                </p>
                <p className="text-sm leading-relaxed">
                  With great birthday power comes great birthday fun! On this special <strong>July 27th Spidey Day</strong>, we celebrate your courage, kindness, and awesome superhero spirit! Keep swinging high and dreaming big!
                </p>
                <p className="font-bold text-right font-bangers text-xl text-[#E62429] flex items-center justify-end space-x-1">
                  <span>- WITH LOVE, MOUNIKA</span>
                  <Heart className="w-5 h-5 text-[#E62429] fill-current" />
                  <span>🕸️</span>
                </p>
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setActiveModal(null);
                }}
                className="w-full mt-5 py-3 bg-[#E62429] text-white font-bangers text-xl rounded-xl comic-border hover:bg-red-600 transition-colors cursor-pointer"
              >
                CLOSE INSPECTION ✕
              </button>

            </motion.div>
          </div>
        )}

        {/* Modal 2: Official Superhero Certificate of Excellence */}
        {activeModal === 'certificate' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-lg p-6 rounded-3xl comic-border comic-box-shadow-red relative max-h-[90vh] overflow-y-auto text-center"
            >
              <button 
                onClick={() => {
                  soundFX.playClick();
                  setActiveModal(null);
                }}
                className="absolute top-4 right-4 p-2 bg-[#E62429] text-white rounded-full comic-border hover:bg-red-600 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-8 border-[#FFCC00] bg-[#F8FAF9] p-5 rounded-2xl comic-border relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#E62429] rounded-full opacity-20"></div>

                <Award className="w-14 h-14 text-[#E62429] mx-auto mb-2 animate-bounce" />

                <h3 className="font-bangers text-3xl text-[#E62429] tracking-wider uppercase">
                  OFFICIAL SPIDER-VERSE CERTIFICATE
                </h3>
                <p className="text-xs font-mono text-gray-600 font-bold uppercase tracking-widest mb-3">
                  ★ CERTIFICATE OF SUPERHERO EXCELLENCE ★
                </p>

                <div className="my-3 py-2 border-y-2 border-black/20">
                  <p className="text-xs font-bold text-gray-700">THIS IS PROUDLY PRESENTED TO</p>
                  <h2 className="font-bangers text-4xl text-black tracking-widest uppercase my-1 text-[#E62429]">
                    {nickname?.toUpperCase() || 'CHAMPION'}
                  </h2>
                  <p className="text-xs text-gray-800 font-bold px-2">
                    For displaying bravery, superpower joy, and unbeatable superhero spirit on July 27th!
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-2 text-left font-mono text-[11px] text-gray-700 font-bold">
                  <div>
                    <p className="text-[#E62429]">PRESENTED BY:</p>
                    <p className="text-black font-bangers text-lg">MOUNIKA ❤️</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#E62429]">OFFICIAL DATE:</p>
                    <p className="text-black font-bangers text-lg">JULY 27, 2026</p>
                  </div>
                </div>

              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setActiveModal(null);
                }}
                className="w-full mt-5 py-3 bg-[#E62429] text-white font-bangers text-xl rounded-xl comic-border hover:bg-red-600 transition-colors cursor-pointer"
              >
                CLAIM CERTIFICATE 🏆
              </button>

            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </motion.div>
  );
};
