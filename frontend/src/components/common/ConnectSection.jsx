import React from 'react';
import { ArrowRight } from 'lucide-react';

const ConnectSection = () => {
  // Placeholder text from the image
  const textParagraph1 = "Bridging the gap between talent and opportunity is what we do best. We don't just list jobs; we curate connections with forward-thinking organizations that align with your career goals, skills, and personal values.";

  const textParagraph2 = "Stop sending resumes into the void. Our platform ensures your profile reaches the right hiring managers, streamlining the recruitment process so you can focus on preparing for your next big interview rather than searching for openings.";

  const scrollToJobs = () => {
    const jobsSection = document.getElementById('jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-white py-8 sm:py-10 md:py-12 overflow-hidden font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
          
          {/* --- LEFT COLUMN: ISOMETRIC ILLUSTRATION --- */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start relative w-full order-2 lg:order-1">
            {/* Added a subtle orange glow effect behind the image to enhance 
              the platform look from the original design.
            */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-3/4 h-3/4 bg-orange-200/50 blur-[40px] sm:blur-[50px] md:blur-[60px] -z-10 rounded-full"></div>
            
            <img 
              src="/image.png" 
              alt="Isometric business strategy illustration with data screens and platform" 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain relative z-10"
            />
          </div>

          {/* --- RIGHT COLUMN: CONTENT --- */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 w-full order-1 lg:order-2">
            
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
              We Help You Connect With The <span className='text-purple-500'>Organisation</span> 
            </h2>

            {/* Body Text */}
            <div className="space-y-3 sm:space-y-4 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
              <p>{textParagraph1}</p>
              <p>{textParagraph2}</p>
            </div>

            {/* Buttons Container */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              
              {/* Button 1: Get Started (Solid Orange) */}
              <button 
                onClick={scrollToJobs}
                className="group bg-orange-500 hover:bg-orange-600 transition-all text-white pl-5 sm:pl-6 md:pl-8 pr-2 py-1.5 sm:py-2 rounded-full font-semibold flex items-center text-xs sm:text-sm md:text-base"
              >
                <span className="mr-2 sm:mr-3 md:mr-4">Get Started</span>
                {/* White circle with orange arrow */}
                <div className="bg-white text-orange-500 rounded-full p-1 sm:p-1.5 md:p-2 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                </div>
              </button>

              {/* Button 2: Upload Resume (Outline Orange) */}
              <button 
                onClick={scrollToJobs}
                className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 transition-colors px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base"
              >
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;

