import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComicBurstSVG } from './SpideyGraphics';
import { soundFX } from '../utils/soundFX';
import { ShieldCheck, Sparkles, KeyRound } from 'lucide-react';

export const Stage1HeroAccess = ({ nickname, setNickname, onNext }) => {
  const [nameInput, setNameInput] = useState(nickname || '');
  const [passcode, setPasscode] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickUnlock = (e) => {
    e.preventDefault();
    const cleaned = nameInput.trim();
    if (!cleaned) {
      soundFX.playError();
      setErrorMsg('⚠️ ENTER YOUR HERO NICKNAME!');
      return;
    }
    if (passcode.trim() !== '0727') {
      soundFX.playError();
      setErrorMsg('❌ PASSCODE IS 0727 (JULY 27TH)!');
      return;
    }

    setErrorMsg('');
    soundFX.playSuccess();
    setIsUnlocking(true);

    setNickname(cleaned);
    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, x: -150, rotate: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <div className="bg-white p-6 sm:p-7 rounded-3xl comic-border comic-box-shadow-red relative overflow-hidden">
        
        {/* Stage Badge */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-[#E62429] text-white px-3 py-0.5 rounded-full font-bangers text-xs comic-border shadow-sm">
            STAGE 1 / 4 • HEADQUARTERS ACCESS
          </span>
          <ComicBurstSVG text="HERO CLEARANCE!" color="bg-[#FFCC00] text-black" rotate="-rotate-2" />
        </div>

        <h2 className="font-bangers text-3xl sm:text-4xl text-[#E62429] tracking-wide mt-2 mb-1 comic-text-shadow-red">
          ENTER SPIDEY BIRTHDAY HEADQUARTERS!
        </h2>
        <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">
          Claim your Superhero Identity and unlock the Birthday Mission!
        </p>

        {/* User's exact 'images (1).png' Spider-Man Web Shooting Pose with Smooth Slow Floating Physics */}
        <div className="my-2 flex justify-center">
          <motion.div 
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
            className="w-36 h-36 relative flex items-center justify-center cursor-pointer"
          >
            <img 
              src="/images/spidey_web_shooting_pose.png" 
              alt="Spider-Man Landing Pose" 
              className="w-full h-full object-contain filter drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleQuickUnlock} className="space-y-4">
          
          {/* Input 1: Hero Nickname */}
          <div className="text-left">
            <label className="text-xs font-bangers text-[#E62429] tracking-wider block mb-1">
              1. HERO NICKNAME:
            </label>
            <div className="relative">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  soundFX.playClick();
                }}
                placeholder="e.g. PETER PARKER / SPIDEY KID"
                maxLength={20}
                className="w-full px-4 py-3 bg-[#F8FAF9] text-black font-bold rounded-2xl comic-border focus:outline-none focus:ring-4 focus:ring-[#E62429] animate-web-glow uppercase placeholder:text-gray-400 text-center tracking-wider text-lg"
                autoFocus
              />
              <Sparkles className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#E62429] pointer-events-none" />
            </div>
          </div>

          {/* Input 2: Access Passcode */}
          <div className="text-left">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bangers text-black tracking-wider">
                2. MISSION PASSCODE (JULY 27TH):
              </label>
              <button
                type="button"
                onClick={() => {
                  setPasscode('0727');
                  soundFX.playClick();
                }}
                className="text-[11px] font-bold text-[#E62429] underline hover:text-black cursor-pointer"
              >
                AUTO-FILL (0727)
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  soundFX.playClick();
                }}
                placeholder="ENTER 0727"
                maxLength={4}
                className="w-full px-4 py-3 bg-[#F8FAF9] text-[#E62429] font-bangers text-2xl rounded-2xl comic-border focus:outline-none focus:ring-4 focus:ring-[#E62429] text-center tracking-widest placeholder:text-gray-400 placeholder:font-sans placeholder:text-sm"
              />
              <KeyRound className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {errorMsg && (
            <motion.p 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-[#E62429] font-bangers text-base tracking-wide"
            >
              {errorMsg}
            </motion.p>
          )}

          {/* Unlock Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            type="submit"
            disabled={isUnlocking}
            className="w-full py-4 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow transform transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2 btn-shine-overlay"
          >
            {isUnlocking ? (
              <span className="animate-pulse text-[#FFCC00]">ACCESS GRANTED! 🕸️</span>
            ) : (
              <>
                <ShieldCheck className="w-7 h-7 text-[#FFCC00]" />
                <span>UNLOCK MISSION HEADQUARTERS 🚀</span>
              </>
            )}
          </motion.button>

        </form>

      </div>
    </motion.div>
  );
};
