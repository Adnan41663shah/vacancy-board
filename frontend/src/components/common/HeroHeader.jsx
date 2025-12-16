import React, { useState, useEffect } from 'react';
import { Play, Search, Bell, Phone, Video, ArrowRight } from 'lucide-react';

const HeroHeader = () => {
  const [typingText, setTypingText] = useState('');

  const scrollToJobs = () => {
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Typing animation
  useEffect(() => {
    const text = "Find Jobs Where Diversity Thrives";
    let index = 0;
    let typing = true;
    let timeoutId;
    let isCleaningUp = false;

    const typeChar = () => {
      if (isCleaningUp) return;
      
      if (typing) {
        if (index < text.length) {
          setTypingText(text.substring(0, index + 1));
          index++;
          // Slower typing: 120ms for regular chars, 180ms for spaces
          const delay = text.charAt(index - 1) === ' ' ? 180 : 120;
          timeoutId = setTimeout(typeChar, delay);
        } else {
          typing = false;
          // Wait longer before erasing (4 seconds)
          timeoutId = setTimeout(typeChar, 4000);
        }
      } else {
        // Erase character by character for smooth animation
        if (index > 0) {
          index--;
          setTypingText(text.substring(0, index));
          timeoutId = setTimeout(typeChar, 80);
        } else {
          typing = true;
          index = 0;
          // Wait before starting again
          timeoutId = setTimeout(typeChar, 800);
        }
      }
    };

    timeoutId = setTimeout(typeChar, 800);
    return () => {
      isCleaningUp = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
      <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
        
        {/* --- LEFT COLUMN: CONTENT --- */}
        <div className="space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8 z-10 relative">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-yellow-100 flex items-center justify-center text-orange-500">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor" />
            </div>
            <span className="text-gray-600 font-medium text-xs sm:text-sm tracking-wide">
              Inclusive workplaces for all.
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight relative min-h-[1.2em] sm:min-h-[1.3em] md:min-h-[1.4em]">
            {/* Hidden text to reserve space and prevent layout shift */}
            <span className="invisible inline-block max-w-full" aria-hidden="true">
              Find Jobs Where Diversity Thrives|
            </span>
            {/* Typing text positioned absolutely over the invisible text */}
            <span className="absolute top-0 left-0 inline-block max-w-full bg-gradient-to-r from-orange-500 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              {typingText}
              <span className="typing-cursor ml-1 text-orange-500">|</span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
            Search for roles in organizations prioritizing diversity and inclusion that align with your values.
          </p>

          {/* Browse Vacancies Button */}
          <button
            onClick={scrollToJobs}
            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
          >
            <span>Browse Vacancies</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
        </div>

        {/* --- RIGHT COLUMN: IMAGES & GRAPHICS --- */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] flex items-center justify-center lg:justify-end">
          
          {/* Top Shadow Overlay - Above Content - Responsive */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[130px] md:h-[160px] lg:h-[180px] xl:h-[220px] z-50 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 20%, rgba(255, 255, 255, 0.6) 45%, rgba(0, 0, 0, 0.25) 60%, rgba(0, 0, 0, 0.12) 80%, transparent 100%)'
            }}
          />
          
          {/* Abstract Swirl Line (SVG) */}
          <div className="absolute left-[-30px] sm:left-[-40px] lg:left-[-50px] top-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 z-20 pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse-slow">
              <path 
                d="M 50 150 C 0 100, 50 0, 150 50" 
                fill="none" 
                stroke="url(#gradient-line)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" /> {/* Orange */}
                  <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Purple Background Panel/Grid */}
          <div className="absolute right-0 top-4 bottom-4 sm:top-6 sm:bottom-6 md:top-8 md:bottom-8 lg:top-10 lg:bottom-10 w-[85%] sm:w-[82%] md:w-[81%] lg:w-[80%] bg-gradient-to-br from-orange-400 via-gray-300 to-purple-500 rounded-2xl sm:rounded-3xl overflow-hidden opacity-90 z-0">
             {/* Grid overlay pattern */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
             </div>
          </div>

          {/* Main Person Image */}
          {/* Image positioned on left border of purple background */}
          <div className="absolute z-10 w-full h-full flex items-start left-[-10%] sm:left-[18%] md:left-[19%] lg:left-[-10%]">
             <div className="relative h-[85%] sm:h-[88%] md:h-[89%] lg:h-[90%] w-auto flex items-end">
               <img 
                 src="https://png.pngtree.com/png-vector/20230918/ourmid/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_10094381.png" 
                 alt="Happy professional man" 
                 className="h-full w-auto object-contain"
               />
             </div>
          </div>

          {/* Floating Card: find dream job */}
          <div 
            className="absolute top-4 right-2 sm:top-8 sm:right-6 lg:top-20 lg:right-10 bg-white/40 backdrop-blur-md border border-white/50 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-lg z-20 w-28 sm:w-32 lg:w-40 text-center"
            style={{
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            <p className="text-gray-900 font-bold text-xs sm:text-sm mb-1 sm:mb-2">Find Your Dream Job</p>
            <button 
              onClick={scrollToJobs}
              className="bg-white text-purple-600 text-xs font-bold py-1 px-2 sm:px-4 rounded-full shadow-sm"
            >
              Find
            </button>
          </div>

          {/* Floating Card: Job Available */}
          <div className="absolute bottom-16 sm:bottom-24 lg:bottom-32 right-16 translate-x-1 sm:translate-x-2 lg:translate-x-4 bg-white/80 backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-xl z-20 flex items-center space-x-2 sm:space-x-3 border border-white/60">
            <div className="bg-orange-500 p-1.5 sm:p-2 rounded-full text-white flex items-center justify-center">
              <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div>
              <p className="text-gray-800 font-bold text-xs sm:text-sm">Job available</p>
            </div>
          </div>

          {/* Floating Card: Video Call */}
          <div className="absolute bottom-0 sm:bottom-12 md:bottom-10 lg:bottom-8 xl:bottom-10 left-4 sm:left-6 md:left-4 lg:left-[-10px] xl:left-[30px] bg-white p-1.5 sm:p-2 md:p-2 lg:p-2.5 rounded-xl sm:rounded-2xl shadow-2xl z-[10] w-28 sm:w-24 md:w-28 lg:w-40 xl:w-44 border border-gray-100">
             <div className="relative rounded-lg sm:rounded-xl overflow-hidden h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-full bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Video caller" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                   <div className="bg-red-500 rounded-full p-0.5 sm:p-1"><Phone className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white fill-current"/></div>
                   <div className="bg-white/30 backdrop-blur rounded-full p-0.5 sm:p-1"><Video className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white"/></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroHeader;

