import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { SheCanLogo } from '../components/SheCanLogo';
import { ArrowLeft, BookOpen, Quote, Target, Award, Compass, Heart } from 'lucide-react';

const OurStory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#3D3D3D] selection:bg-[#7C8363] selection:text-white">
      
      {/* Navigation Header */}
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between border-b border-[#E8E6E1] bg-[#FAF9F6]/85 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#7C8363] rounded-full flex items-center justify-center shadow-inner hover:scale-105 transition-transform duration-300">
            <span className="text-white font-serif font-bold text-lg uppercase italic">S</span>
          </div>
          <span className="font-serif text-lg md:text-2xl font-semibold tracking-tight text-[#2D3021]">
            She Can Foundation
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/donate')}
            className="text-xs font-bold uppercase tracking-widest text-[#7C8363] hover:text-[#5C5C5C] transition-colors"
          >
            Donate ❤️
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5C5C5C] hover:text-[#7C8363] transition-colors"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>
      </nav>

      {/* Banner Area */}
      <div className="relative py-20 px-6 sm:px-12 md:px-24 bg-gradient-to-br from-[#FAF9F6] via-[#F3F1ED] to-[#E9E6DF] border-b border-[#E8E6E1]/70 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#7C8363] opacity-[0.04] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D4A373] opacity-[0.04] rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <SheCanLogo size="md" className="shadow-md hover:rotate-2 transition-transform duration-300" />
        </motion.div>

        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#7C8363] font-bold text-xs uppercase tracking-[0.25em] mb-3 block"
        >
          Our Sacred Journey
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2D3021] font-bold max-w-4xl leading-tight mb-6"
        >
          Empowering the voices, dreams, <br/>
          and destinies of <span className="font-light italic text-[#7C8363]">every woman</span>.
        </motion.h1>
      </div>

      {/* Content Layout Grid */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-16">
        
        {/* Founders Statement Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-[#E8E6E1] p-8 md:p-12 rounded-[28px] shadow-sm relative overflow-hidden"
        >
          <div className="absolute -top-4 -left-4 text-[#7C8363] opacity-[0.06] select-none">
            <Quote size={120} />
          </div>
          
          <div className="relative space-y-6 z-10">
            <h3 className="text-xl md:text-2xl font-serif text-[#2D3021] italic leading-relaxed text-center sm:text-left">
              "We noticed an ongoing barrier for women in professional leadership, specialized mentoring fields, and personal development spheres. She Can Foundation rose from a humble conviction: when you empower a single woman, you elevate a whole civilization."
            </h3>
            
            <div className="border-t border-[#E8E6E1] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-serif font-bold text-base text-[#2D3021] tracking-wide">
                  REETA MISHRA
                </span>
                <span className="text-xs uppercase tracking-widest text-[#7C8363] font-semibold mt-0.5">
                  Founder & President, She Can Foundation
                </span>
              </div>
              <Compass className="text-[#7C8363] stroke-[1.5]" size={36} />
            </div>
          </div>
        </motion.div>

        {/* Narrative Sections */}
        <div className="space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-[#7C8363]">
              <BookOpen size={18} />
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#7C8363]">The Catalyst</h2>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D3021] font-semibold leading-tight">
              A Vision Born Out of Empathy & Action
            </h3>
            <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed">
              Every revolution begins of a simple realisation. For She Can Foundation, it began when Founder Reeta Mishra witnessed first-hand the profound gap in guidance, networking possibilities, and access to career portals for aspiring young women across our societies. The systemic glass ceiling of professional ecosystems doesn't merely withhold access; it withholds the active encouragement necessary to thrive.
            </p>
            <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed">
              In response, she engineered a simple, high-impact framework. What started as micro-circle support workshops rapidly evolved into a verified foundation of professional growth. We focused on eliminating systemic boundaries by integrating active mentorship, community training programs, and academic scholarships under a single umbrella.
            </p>
          </motion.div>

          {/* Pillars Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-[#E8E6E1]/90 rounded-2xl space-y-3"
            >
              <div className="w-10 h-10 bg-[#7C8363]/10 border border-[#7C8363]/25 text-[#7C8363] rounded-xl flex items-center justify-center">
                <Target size={18} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2D3021]">Our Ultimate Aim</h4>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                To build an inclusive global model of active mentorship, creating bridges between underrepresented female cohorts and international professional ecosystems.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-white border border-[#E8E6E1]/90 rounded-2xl space-y-3"
            >
              <div className="w-10 h-10 bg-[#7C8363]/10 border border-[#7C8363]/25 text-[#7C8363] rounded-xl flex items-center justify-center">
                <Heart size={18} />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2D3021]">Core Core Values</h4>
              <p className="text-xs text-[#5C5C5C] leading-relaxed">
                Operating with radical inclusivity, absolute empathy, transparent structural accountability, and an unwavering commitment to women-led global advancement.
              </p>
            </motion.div>

          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 pt-6"
          >
            <div className="flex items-center gap-2 text-[#7C8363]">
              <Award size={18} />
              <h2 className="text-xs uppercase font-bold tracking-widest text-[#7C8363]">Creating Lasting Impact</h2>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D3021] font-semibold leading-tight">
              A World Where Every Woman Thrives
            </h3>
            <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed">
              We continue to expand our reach, offering digital guidance portals, remote education opportunities, and partnerships with socially conscious brands worldwide. She Can is structured entirely upon collaborative efforts, peer support portals, and dedicated, expert volunteers giving guidance across multiple major fields.
            </p>
            <p className="text-[#5C5C5C] text-sm sm:text-base leading-relaxed">
              Whether you are an established industry veteran seeking to make a difference, or a young student with infinite ambition, you are welcome here. We believe that if we all do our part, there is no barrier too great, no glass ceiling too strong, and no future that we cannot reshape together.
            </p>
          </motion.div>

        </div>

        {/* Closing CTA Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#2D3021] text-white p-8 md:p-12 rounded-[28px] text-center space-y-6"
        >
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#FAF9F6]">
            Ready to rewrite your story?
          </h3>
          <p className="text-xs md:text-sm text-white/75 max-w-lg mx-auto">
            Get in touch with us through the interactive contact coordinates, or explore options to become a volunteer partner today.
          </p>
          <button 
            onClick={() => navigate('/donate')} 
            className="px-6 py-3 bg-[#7C8363] hover:bg-[#6A7054] text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-md transition-all cursor-pointer"
          >
            Donate to Our Foundation
          </button>
        </motion.div>

      </div>

      {/* Footer */}
      <footer className="h-16 border-t border-[#E8E6E1] bg-[#FAF9F6] text-[#8C8C8C] flex flex-col sm:flex-row items-center px-6 md:px-12 justify-between gap-2 py-3 sm:py-0 text-center text-xs mt-auto">
        <span>© {new Date().getFullYear()} She Can Foundation. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <span className="hover:text-[#7C8363] transition-colors cursor-pointer" onClick={() => navigate('/admin')}>Admin Console</span>
        </div>
      </footer>
    </div>
  );
};

export default OurStory;
