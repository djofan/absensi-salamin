import React from 'react';

export const ClassIllustrationHeader: React.FC = () => {
  return (
    <div className="relative w-full h-56 bg-gradient-to-b from-[#60a5fa] via-[#438ef5] to-[#2563eb] overflow-hidden select-none">
      {/* Background clouds and subtle geometric shapes */}
      <div className="absolute top-3 left-10 w-24 h-8 bg-white/20 rounded-full blur-sm" />
      <div className="absolute top-10 right-16 w-36 h-10 bg-white/15 rounded-full blur-sm" />
      <div className="absolute -top-6 right-0 w-32 h-32 bg-sky-300/30 rounded-full blur-xl" />

      {/* Subtle school motifs in sky */}
      <svg className="absolute top-6 left-1/3 w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <svg className="absolute top-16 right-8 w-4 h-4 text-white/30" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
      </svg>

      {/* Cartoon Kids Artwork reproduction */}
      <svg className="absolute bottom-2 right-1 w-52 h-44 drop-shadow-md" viewBox="0 0 220 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="boy-character">
          {/* Boy Body & Backpack */}
          <ellipse cx="145" cy="155" rx="36" ry="40" fill="#1d4ed8" />
          <path d="M120 145 C115 130, 115 160, 122 175" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          <path d="M170 145 C175 130, 175 160, 168 175" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          {/* Backpack top loop */}
          <path d="M138 115 Q145 105 152 115" stroke="#ea580c" strokeWidth="4" fill="none" />

          {/* Boy Neck */}
          <rect x="139" y="115" width="12" height="12" rx="4" fill="#fed7aa" />

          {/* Boy Face */}
          <circle cx="145" cy="85" r="32" fill="#fed7aa" />

          {/* Boy Hair (Spiky purple-blue hair) */}
          <path d="M115 80 C115 50, 130 40, 145 42 C160 40, 178 52, 178 78 C172 74, 165 72, 155 76 C145 70, 135 72, 128 78 Z" fill="#2563eb" />
          {/* Hair spikes */}
          <path d="M125 45 Q120 28 135 34" fill="#1e40af" stroke="#1e40af" strokeWidth="3" />
          <path d="M140 40 Q145 22 155 32" fill="#1e40af" stroke="#1e40af" strokeWidth="3" />
          <path d="M155 42 Q168 28 172 40" fill="#1e40af" stroke="#1e40af" strokeWidth="3" />

          {/* Boy Eyes & Eyebrows */}
          <ellipse cx="134" cy="80" rx="4.5" ry="6.5" fill="#1e293b" />
          <circle cx="135.5" cy="78" r="1.5" fill="#ffffff" />
          <ellipse cx="156" cy="80" rx="4.5" ry="6.5" fill="#1e293b" />
          <circle cx="157.5" cy="78" r="1.5" fill="#ffffff" />
          <path d="M129 70 Q134 67 139 70" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <path d="M151 70 Q156 67 161 70" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <circle cx="127" cy="87" r="5" fill="#fca5a5" opacity="0.6" />
          <circle cx="163" cy="87" r="5" fill="#fca5a5" opacity="0.6" />

          {/* Wide Happy Open Mouth */}
          <path d="M136 88 Q145 102 154 88 Z" fill="#991b1b" />
          <path d="M139 90 Q145 96 151 90" fill="#f43f5e" />
          <path d="M136 88 Q145 90 154 88" stroke="#7f1d1d" strokeWidth="1" />
        </g>

        <g id="girl-character">
          {/* Girl peeking in front */}
          <ellipse cx="80" cy="165" rx="32" ry="34" fill="#a855f7" />
          {/* Hair back */}
          <circle cx="60" cy="115" r="18" fill="#475569" />
          <circle cx="102" cy="115" r="18" fill="#475569" />

          {/* Girl Face */}
          <circle cx="80" cy="118" r="28" fill="#ffedd5" />

          {/* Girl bangs */}
          <path d="M56 112 C60 92, 95 90, 104 110 C96 104, 88 104, 80 106 C72 104, 64 105, 56 112 Z" fill="#334155" />

          {/* Girl closed happy eyes */}
          <path d="M68 116 Q73 111 78 116" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M85 116 Q90 111 95 116" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Cheeks */}
          <circle cx="66" cy="122" r="4.5" fill="#f43f5e" opacity="0.5" />
          <circle cx="96" cy="122" r="4.5" fill="#f43f5e" opacity="0.5" />

          {/* Sweet smile */}
          <path d="M76 124 Q81 131 87 124" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {/* Text over the illustration */}
      <div className="absolute top-16 left-6 z-10 max-w-[200px]">
        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
          12th Standard
        </h2>
        <p className="text-xs font-medium text-sky-100/90 mt-1 drop-shadow-sm tracking-wide">
          St. Marry Ser Sec School
        </p>
      </div>
    </div>
  );
};

export const StudentDetailsHeader: React.FC<{ studentName: string; className: string; dob: string }> = ({
  studentName,
  className,
  dob,
}) => {
  return (
    <div className="relative w-full h-56 bg-gradient-to-r from-blue-700 via-sky-600 to-blue-600 overflow-hidden select-none">
      {/* Background school students photo with cool cyan/blue overlay */}
      <img
        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
        alt="School campus students"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 scale-105"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // graceful fallback
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Subtle blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3b82f6]/60 via-[#2563eb]/70 to-[#1d4ed8]/90" />

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-4 w-32 h-32 bg-sky-400/20 rounded-full blur-2xl" />

      {/* Student Name & Meta Info */}
      <div className="absolute top-16 left-6 z-10 text-white">
        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow">
          {studentName}
        </h2>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-sky-100 font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            {className}
          </span>
          <span className="text-sky-300">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-sky-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Dob : {dob}
          </span>
        </div>
      </div>
    </div>
  );
};
