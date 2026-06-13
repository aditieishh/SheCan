import React from 'react';
import { motion } from 'motion/react';
import { SheCanLogo } from './SheCanLogo';
import { Sparkles, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#FAF9F6] via-[#F3F1ED] to-[#FAF9F6] border-b border-[#E8E6E1]/90 relative overflow-hidden py-16 px-6 sm:px-12 text-center flex flex-col items-center">
      {/* Background soft blurs for atmosphere */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#7C8363] opacity-[0.05] rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-[#D4A373] opacity-[0.05] rounded-full blur-3xl -z-10"></div>



      {/* Logo in the center for high brand recognition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 drop-shadow-md"
      >
        <SheCanLogo size="md" className="hover:scale-105 duration-300 transition-transform" />
      </motion.div>

      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2D3021] font-bold max-w-3xl leading-[1.15] tracking-tight mb-4"
      >
        Every woman has a voice. <br/>
        We are here to <span className="font-light italic text-[#7C8363]">amplify</span> it.
      </motion.h1>

      {/* Centered Mission Statement / Quote */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed italic font-serif">
          "Together, we can break down barriers and empower women. At She Can Foundation, we believe that if we all do our part, there is no challenge too great to overcome. Join us in our mission to create a world where every woman has the opportunity to thrive and succeed."
        </p>
        <div className="mt-4 flex flex-col items-center">
          <span className="font-serif font-bold text-sm text-[#2D3021] tracking-wide">
            REETA MISHRA
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#7C8363] font-bold mt-0.5">
            Founder & President, She Can Foundation
          </span>
        </div>
      </motion.div>

      {/* CTA down-arrow hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, repeat: Infinity, repeatType: "reverse", duration: 1 }}
        className="flex flex-col items-center gap-1 text-[#8C8C8C] text-xs uppercase tracking-widest mt-2 cursor-pointer"
        onClick={() => {
          const contactSection = document.getElementById('interactive-sections');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span>Connect With Us Below</span>
        <ArrowDown size={14} className="text-[#7C8363] mt-1" />
      </motion.div>
    </div>
  );
};
