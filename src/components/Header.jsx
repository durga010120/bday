import React from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { soundFX } from '../utils/soundFX';

export const Header = ({ 
  currentStage, 
  nickname, 
  isMuted, 
  setIsMuted, 
  isMemoriesPage, 
  onBack 
}) => {
  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundFX.setMuted(nextState);
  };

  const showBackButton = isMemoriesPage || currentStage > 1;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-4 border-black px-4 py-2.5 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Left: Back Button & Spidey Logo & Nickname */}
        <div className="flex items-center space-x-2">
          {showBackButton && (
            <button
              onClick={() => {
                soundFX.playClick();
                onBack();
              }}
              className="p-2 bg-[#E62429] hover:bg-red-600 text-white rounded-xl comic-border transition-all active:scale-95 cursor-pointer shadow-sm flex items-center justify-center mr-1"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* User's exact removed background spidy-logo.png */}
          <div className="w-9 h-9 flex items-center justify-center">
            <img 
              src="/images/spidey_logo.png" 
              alt="Spidey Logo" 
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-bangers text-lg leading-none text-[#E62429] tracking-wider">
              SPIDEY HEADQUARTERS
            </span>
            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-tight">
              HERO: <span className="text-black font-extrabold">{nickname || 'CHAMPION'}</span>
            </span>
          </div>
        </div>

        {/* Center: Stage Progress Tracker */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1.5">
            <span className="font-bangers text-xs sm:text-sm text-[#E62429] tracking-wider uppercase">
              {isMemoriesPage ? 'HERO GALLERY' : `MISSION STAGE ${currentStage}/4`}
            </span>
          </div>
          
          <div className="w-24 sm:w-36 h-2 bg-gray-200 rounded-full border border-black overflow-hidden mt-1">
            <div 
              className="h-full bg-gradient-to-r from-[#E62429] via-[#FFCC00] to-[#E62429] transition-all duration-500"
              style={{ width: isMemoriesPage ? '100%' : `${(currentStage / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Sound Mute Toggle */}
        <button
          onClick={toggleMute}
          className="p-2 bg-[#E62429] hover:bg-red-600 text-white rounded-xl comic-border transition-all active:scale-95 cursor-pointer shadow-sm"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
        </button>

      </div>
    </header>
  );
};
