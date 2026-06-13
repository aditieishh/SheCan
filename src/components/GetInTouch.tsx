import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, MessageSquareCode, ArrowRight } from 'lucide-react';

export const GetInTouch: React.FC = () => {
  const contactItems = [
    {
      icon: <Mail className="text-[#7C8363]" size={20} />,
      label: 'President Email Support',
      value: 'president@shecanfoundation.org',
      href: 'mailto:president@shecanfoundation.org',
      actionLabel: 'Send an email',
    },
    {
      icon: <Phone className="text-[#7C8363]" size={20} />,
      label: 'Official Helpline Desk',
      value: '+91-8283841830',
      href: 'tel:+918283841830',
      actionLabel: 'Call support lines',
    },
    {
      icon: <Linkedin className="text-[#7C8363]" size={20} />,
      label: 'LinkedIn Community',
      value: 'She Can Foundation',
      href: 'https://www.linkedin.com/company/shecanfoundation',
      actionLabel: 'Connect with company profile',
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F6] border-t border-b border-[#E8E6E1] py-16 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative Natural Backdrop Accent Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#7C8363] opacity-[0.03] rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto text-center space-y-10">
        
        {/* Welcome Section Header */}
        <div className="space-y-3">

          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2D3021] font-bold"
          >
            Get In Touch
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#5C5C5C] max-w-xl mx-auto leading-relaxed"
          >
            We would love to coordinate with you. Contact our global headquarters directly or explore our verified corporate portals.
          </motion.p>
        </div>

        {/* 3-Column Touchpoint Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index + 0.2 }}
              className="bg-white/60 hover:bg-white border border-[#E8E6E1]/90 hover:border-[#7C8363]/60 shadow-sm hover:shadow-md rounded-2xl p-6 text-center flex flex-col items-center justify-between gap-4 group transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon Ring wrapper */}
              <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E8E6E1] flex items-center justify-center group-hover:bg-[#7C8363]/10 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Informative credentials label */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8C8C] block">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[#2D3021] break-all block">
                  {item.value}
                </span>
              </div>

              {/* Action Link button */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C8363] tracking-wide mt-2">
                {item.actionLabel}
                <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
};
