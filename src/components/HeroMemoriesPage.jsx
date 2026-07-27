import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComicBurstSVG } from './SpideyGraphics';
import { soundFX } from '../utils/soundFX';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Camera 
} from 'lucide-react';

export const HeroMemoriesPage = ({ nickname, onNext, onBack }) => {
  const [fullscreenPhotoIdx, setFullscreenPhotoIdx] = useState(null);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // All 5 User Uploaded Photos
  const memoryPhotos = [
    {
      id: 1,
      title: "HERO MEMORY #1: WEB SLINGER",
      src: "/images/user_spidey_1.jpg",
      fallbackSrc: "/images/hero1.svg",
      caption: "Spider-Man in dynamic action saving the birthday universe!",
      date: "JULY 27, 2026",
      tag: "LEGENDARY"
    },
    {
      id: 2,
      title: "HERO MEMORY #2: BIRTHDAY HEADQUARTERS",
      src: "/images/user_spidey_2.jpg",
      fallbackSrc: "/images/hero2.svg",
      caption: "Celebrating at Spider-Verse Birthday Headquarters!",
      date: "JULY 27, 2026",
      tag: "SPIDEY DAY"
    },
    {
      id: 3,
      title: "HERO MEMORY #3: SPIDEY SQUAD",
      src: "/images/user_spidey_3.jpg",
      fallbackSrc: "/images/hero3.svg",
      caption: "With Great Birthday Power Comes Great Birthday Fun!",
      date: "JULY 27, 2026",
      tag: "VICTORY"
    },
    {
      id: 4,
      title: "HERO MEMORY #4: SUPER POWERS",
      src: "/images/user_spidey_4.jpg",
      fallbackSrc: "/images/hero1.svg",
      caption: "Web-shooting hero reflexes in action!",
      date: "JULY 27, 2026",
      tag: "ACTION"
    },
    {
      id: 5,
      title: "HERO MEMORY #5: CHAMPION LEVEL",
      src: "/images/user_spidey_5.jpg",
      fallbackSrc: "/images/hero2.svg",
      caption: "Official Spider-Verse Birthday Champion!",
      date: "JULY 27, 2026",
      tag: "HERO LEVEL"
    },
  ];

  const handleOpenFullscreen = (idx) => {
    soundFX.playWebSling();
    setFullscreenPhotoIdx(idx);
  };

  const handleCloseFullscreen = () => {
    soundFX.playClick();
    setFullscreenPhotoIdx(null);
  };

  const handlePrevPhoto = (e) => {
    e?.stopPropagation();
    soundFX.playClick();
    setFullscreenPhotoIdx(prev => (prev === 0 ? memoryPhotos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e?.stopPropagation();
    soundFX.playClick();
    setFullscreenPhotoIdx(prev => (prev === memoryPhotos.length - 1 ? 0 : prev + 1));
  };

  const toggleNativeFullscreen = (e) => {
    e?.stopPropagation();
    soundFX.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsNativeFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsNativeFullscreen(false)).catch(() => {});
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto px-2"
    >
      <div className="bg-white p-6 sm:p-8 rounded-3xl comic-border comic-box-shadow-red relative overflow-hidden my-2">
        
        {/* Navigation Back Bar */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => {
              soundFX.playClick();
              onBack();
            }}
            className="px-4 py-2 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-lg rounded-2xl comic-border comic-box-shadow flex items-center space-x-2 cursor-pointer transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>← BACK TO MISSION</span>
          </button>

          <ComicBurstSVG text="HERO GALLERY" color="bg-[#FFCC00] text-black" rotate="rotate-2" />
        </div>

        {/* Page Title */}
        <h1 className="font-bangers text-4xl sm:text-5xl text-[#E62429] tracking-wider comic-text-shadow-red my-2 uppercase text-center leading-tight">
          HERO MEMORIES FOR {nickname?.toUpperCase() || 'HERO'}! 📷
        </h1>
        <p className="text-sm font-bold text-gray-700 text-center mb-6">
          Click any photo to view in Full-Screen Lightbox!
        </p>

        {/* Photo Gallery Grid (Displaying All 5 User Uploaded Photos) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {memoryPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleOpenFullscreen(idx)}
              className="bg-[#F8FAF9] p-4 rounded-2xl comic-border comic-box-shadow flex flex-col justify-between cursor-pointer group hover:border-[#E62429] transition-all relative overflow-hidden"
            >
              {/* Tag Badge */}
              <div className="absolute top-2 right-2 z-10 bg-[#E62429] text-white text-[10px] font-bangers px-2 py-0.5 rounded comic-border">
                {photo.tag}
              </div>

              {/* Photo Frame */}
              <div className="w-full h-52 bg-white rounded-xl comic-border overflow-hidden relative mb-3 group-hover:shadow-lg transition-shadow flex items-center justify-center p-2">
                <img 
                  src={photo.src}
                  onError={(e) => { e.target.src = photo.fallbackSrc; }}
                  alt={photo.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#FFCC00] text-black font-bangers text-sm px-3 py-1 rounded-full comic-border flex items-center space-x-1 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                    <span>FULL SCREEN</span>
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div>
                <h3 className="font-bangers text-xl text-[#E62429] tracking-wide leading-tight">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-700 font-bold mt-1 line-clamp-2">
                  {photo.caption}
                </p>
                <div className="mt-2 text-[10px] font-mono text-gray-500 font-semibold border-t border-gray-300 pt-1 flex justify-between items-center">
                  <span>DATE: {photo.date}</span>
                  <span className="text-[#E62429]">CLICK TO ZOOM 🔍</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <button
          onClick={() => {
            soundFX.playClick();
            onBack();
          }}
          className="w-full py-4 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-2xl tracking-wider rounded-2xl comic-border comic-box-shadow flex items-center justify-center space-x-2 cursor-pointer transition-all btn-shine-overlay"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>BACK TO BIRTHDAY MISSION 🚀</span>
        </button>

      </div>

      {/* FULL-SCREEN LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {fullscreenPhotoIdx !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none">
            
            {/* Top Controls */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center space-x-2 text-white font-bangers text-xl">
                <Camera className="w-6 h-6 text-[#FFCC00]" />
                <span>{memoryPhotos[fullscreenPhotoIdx].title}</span>
                <span className="text-xs text-gray-400 font-mono ml-2">
                  ({fullscreenPhotoIdx + 1} / {memoryPhotos.length})
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleNativeFullscreen}
                  className="p-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl comic-border transition-all flex items-center justify-center"
                  title="Toggle Fullscreen Mode"
                >
                  {isNativeFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleCloseFullscreen}
                  className="p-2.5 bg-[#E62429] hover:bg-red-600 text-white rounded-xl comic-border transition-all flex items-center justify-center cursor-pointer"
                  title="Close Fullscreen"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Center Image */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-6 p-3 bg-white/20 hover:bg-[#E62429] text-white rounded-full comic-border transition-all z-20 cursor-pointer"
                title="Previous Photo"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <motion.img
                key={fullscreenPhotoIdx}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={memoryPhotos[fullscreenPhotoIdx].src}
                onError={(e) => { e.target.src = memoryPhotos[fullscreenPhotoIdx].fallbackSrc; }}
                alt={memoryPhotos[fullscreenPhotoIdx].title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl comic-border shadow-2xl bg-white p-2"
              />

              <button
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-6 p-3 bg-white/20 hover:bg-[#E62429] text-white rounded-full comic-border transition-all z-20 cursor-pointer"
                title="Next Photo"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

            </div>

            {/* Bottom Caption Bar */}
            <div className="bg-[#131A26] border-2 border-white/30 text-white p-4 rounded-2xl text-center max-w-2xl mx-auto w-full z-10 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div>
                <p className="font-bangers text-lg text-[#FFCC00]">
                  {memoryPhotos[fullscreenPhotoIdx].caption}
                </p>
                <p className="text-xs text-gray-400 font-mono">SPIDEY BIRTHDAY HEADQUARTERS • {memoryPhotos[fullscreenPhotoIdx].date}</p>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={memoryPhotos[fullscreenPhotoIdx].src}
                  download={`spidey_memory_${fullscreenPhotoIdx + 1}.jpg`}
                  className="px-4 py-2 bg-[#E62429] hover:bg-red-600 text-white font-bangers text-sm rounded-xl comic-border flex items-center space-x-1 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>SAVE PHOTO</span>
                </a>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
