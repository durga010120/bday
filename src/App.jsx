import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { SpiderWebCornerSVG } from './components/SpideyGraphics';
import { HangingSpideyOverlay } from './components/HangingSpideyOverlay';
import { WebCursorTrail } from './components/WebCursorTrail';
import { SpideyParticleBackground } from './components/SpideyParticleBackground';

import { Stage1HeroAccess } from './components/Stage1HeroAccess';
import { Stage2BirthdayCake } from './components/Stage2BirthdayCake';
import { Stage3WebArcade } from './components/Stage3WebArcade';
import { Stage4GiftVault } from './components/Stage4GiftVault';
import { HeroMemoriesPage } from './components/HeroMemoriesPage';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [isMemoriesPage, setIsMemoriesPage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('spidey_hero_nickname') || '';
  });

  useEffect(() => {
    if (nickname) {
      localStorage.setItem('spidey_hero_nickname', nickname);
    }
  }, [nickname]);

  const handleNextStage = () => {
    if (currentStage < 4) {
      setCurrentStage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStage = () => {
    if (isMemoriesPage) {
      setIsMemoriesPage(false);
    } else if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartMission = () => {
    setCurrentStage(1);
    setIsMemoriesPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-gray-900 relative selection:bg-[#E62429] selection:text-white overflow-x-hidden">
      
      {/* Interactive Web Shooting Particle Trail on Cursor Move */}
      <WebCursorTrail />

      {/* Floating Dynamic Spidey Particle Background */}
      <SpideyParticleBackground />

      {/* Background Web Corner Decorative Overlays */}
      <SpiderWebCornerSVG position="top-left" />
      <SpiderWebCornerSVG position="top-right" />
      <SpiderWebCornerSVG position="bottom-left" />
      <SpiderWebCornerSVG position="bottom-right" />

      {/* Cute Upside-Down Hanging Spider-Man Overlay */}
      <HangingSpideyOverlay />

      {/* Header Bar with Back Button Handler */}
      <Header 
        currentStage={currentStage} 
        nickname={nickname}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isMemoriesPage={isMemoriesPage}
        onBack={handlePrevStage}
      />

      {/* Main Screen Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10 my-4">
        <AnimatePresence mode="wait">
          {isMemoriesPage ? (
            <HeroMemoriesPage 
              key="memoriesPage" 
              nickname={nickname} 
              onBack={() => setIsMemoriesPage(false)} 
            />
          ) : (
            <>
              {currentStage === 1 && (
                <Stage1HeroAccess 
                  key="stage1" 
                  nickname={nickname} 
                  setNickname={setNickname} 
                  onNext={handleNextStage} 
                />
              )}

              {currentStage === 2 && (
                <Stage2BirthdayCake 
                  key="stage2" 
                  nickname={nickname} 
                  onNext={handleNextStage} 
                />
              )}

              {currentStage === 3 && (
                <Stage3WebArcade 
                  key="stage3" 
                  nickname={nickname} 
                  onNext={handleNextStage} 
                />
              )}

              {currentStage === 4 && (
                <Stage4GiftVault 
                  key="stage4" 
                  nickname={nickname} 
                  onRestart={handleRestartMission}
                  onOpenMemoriesPage={() => setIsMemoriesPage(true)}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 text-center text-xs text-gray-600 font-bold border-t-2 border-black/10 relative z-10 bg-white">
        <p>🕸️ SPIDER-VERSE BIRTHDAY HEADQUARTERS • CREATED WITH LOVE BY MOUNIKA FOR YOUR SPECIAL DAY 🎂</p>
      </footer>

    </div>
  );
}
