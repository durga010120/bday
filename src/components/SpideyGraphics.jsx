import React from 'react';
import { motion } from 'framer-motion';

// Spider-Man Component rendering the user's uploaded images with background blending
export const SpiderMaskSVG = ({ className = "w-28 h-32", animated = true, imageIndex = 1 }) => {
  const imageSrc = `/images/user_spidey_${imageIndex}.jpg`;

  return (
    <motion.div 
      className={`relative inline-block ${className} cursor-pointer group select-none`}
      whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
      whileTap={{ scale: 0.94 }}
    >
      <div className={`w-full h-full relative z-10 ${animated ? 'animate-bounce' : ''}`}>
        <div className="w-full h-full rounded-2xl comic-border overflow-hidden bg-white shadow-md flex items-center justify-center p-1">
          <img 
            src={imageSrc} 
            onError={(e) => { e.target.src = "/images/spidey_head_real.svg"; }}
            alt="Spider-Man Hero" 
            className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Spider-Man Chest Emblem Icon
export const SpiderEmblemSVG = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M50,30 C45,20 35,20 30,25 C30,35 45,45 50,55 C55,45 70,35 70,25 C65,20 55,20 50,30 Z" fill="#000" />
    <ellipse cx="50" cy="62" rx="12" ry="16" fill="#000" />
    <path d="M45,55 C25,40 10,50 5,60 M45,60 C20,60 5,75 2,85 M45,65 C25,75 10,90 8,98 M45,70 C30,85 20,95 18,100" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M55,55 C75,40 90,50 95,60 M55,60 C80,60 95,75 98,85 M55,65 C75,75 90,90 92,98 M55,70 C70,85 80,95 82,100" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

// Spider Web Corner Decorative Overlay
export const SpiderWebCornerSVG = ({ position = "top-left" }) => {
  const rotation = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180"
  }[position];

  return (
    <svg 
      className={`absolute ${rotation} w-24 h-24 sm:w-36 sm:h-36 pointer-events-none opacity-25 text-[#E62429] z-0`}
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      <line x1="0" y1="0" x2="100" y2="0" strokeWidth="2" />
      <line x1="0" y1="0" x2="0" y2="100" strokeWidth="2" />
      <line x1="0" y1="0" x2="100" y2="100" />
      <line x1="0" y1="0" x2="85" y2="45" />
      <line x1="0" y1="0" x2="45" y2="85" />
      <path d="M 25 0 Q 25 25 0 25" />
      <path d="M 50 0 Q 50 50 0 50" />
      <path d="M 75 0 Q 75 75 0 75" />
      <path d="M 100 0 Q 100 100 0 100" />
    </svg>
  );
};

// Comic Callout Burst Badge
export const ComicBurstSVG = ({ text = "POW!", color = "bg-[#FFCC00] text-black", rotate = "-rotate-3" }) => (
  <div className={`inline-block transform ${rotate} transition-transform hover:scale-110 shadow-sm`}>
    <div className={`relative px-3.5 py-1 rounded-md font-bangers tracking-wider text-lg sm:text-xl font-black comic-border comic-box-shadow ${color}`}>
      {text}
    </div>
  </div>
);

// High Quality Superhero Figure rendering user uploaded spidey image
export const ChibiSpideySVG = ({ message = "BEST BIRTHDAY EVER!", imageIndex = 4 }) => (
  <div className="relative w-full max-w-[240px] mx-auto my-2 flex flex-col items-center justify-center">
    
    {/* Speech Bubble */}
    <div className="relative mb-3 px-4 py-2 bg-white text-black font-bangers text-lg rounded-2xl comic-border comic-box-shadow transform -rotate-1 z-20">
      {message}
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black"></div>
    </div>

    {/* Superhero Figure using user image */}
    <div className="relative transform hover:scale-105 transition-transform cursor-pointer flex flex-col items-center">
      <div className="w-24 h-28 z-10 relative bg-white p-1 rounded-2xl comic-border shadow-md">
        <img 
          src={`/images/user_spidey_${imageIndex}.jpg`}
          onError={(e) => { e.target.src = "/images/user_spidey_1.jpg"; }}
          alt="Spider-Man Hero" 
          className="w-full h-full object-contain mix-blend-multiply animate-bounce"
        />
      </div>
    </div>

  </div>
);
