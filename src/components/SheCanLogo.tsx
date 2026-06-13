import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SheCanLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-56 h-56 md:w-64 md:h-64'
  }[size];

  return (
    <div className={`relative ${dimensions} bg-[#FAF9F6] border border-[#E8E6E1] rounded-3xl overflow-hidden shadow-sm flex items-center justify-center select-none ${className}`}>
      {/* Background Graphic: Warm natural colors and silhouette */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background shape */}
        <rect width="200" height="200" fill="#E9E6DF" />
        <circle cx="100" cy="100" r="90" fill="#FAF9F6" opacity="0.4" />
        
        {/* SVG silhouette for the clean profile of she can head */}
        <path
          d="M 120 200 
             C 120 180, 150 160, 150 145
             C 150 135, 142 135, 140 125
             C 138 120, 148 115, 156 110
             C 162 105, 160 98, 152 98
             C 147 98, 153 90, 155 85
             C 157 80, 150 78, 144 80
             C 138 82, 142 74, 138 70
             C 132 65, 125 72, 120 68
             C 112 60, 115 50, 102 50
             C 90 50, 80 55, 74 65
             C 68 73, 62 70, 58 78
             C 53 85, 50 92, 54 100
             C 58 108, 52 115, 58 123
             C 63 130, 60 138, 68 145
             C 75 152, 72 165, 90 175
             C 100 180, 102 200, 102 200 Z"
          fill="#2D3021"
        />

        {/* Text Styling Overlay on the Head/Silhouette as per photo */}
        <text 
          x="100" 
          y="95" 
          textAnchor="middle" 
          fill="#FAF9F6" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="24"
          letterSpacing="0.05em"
        >
          She
        </text>
        
        <text 
          x="100" 
          y="125" 
          textAnchor="middle" 
          fill="#ffffff" 
          fontFamily="'Crimson Text', serif" 
          fontStyle="italic" 
          fontWeight="400" 
          fontSize="24"
        >
          Can!
        </text>

        <text 
          x="100" 
          y="142" 
          textAnchor="middle" 
          fill="#FAF9F6" 
          opacity="0.9"
          fontFamily="'Inter', sans-serif" 
          fontWeight="600" 
          fontSize="10" 
          letterSpacing="0.1em"
        >
          FOUNDATION
        </text>
      </svg>
    </div>
  );
};
