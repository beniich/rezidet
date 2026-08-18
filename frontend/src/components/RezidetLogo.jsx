import React from 'react';

export default function RezidetLogo({ className = "h-8", textClassName = "text-xl" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon portion (optional, but good to have) */}
      <svg viewBox="0 0 40 40" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" className="fill-orange-500" />
        <path d="M12 28V12H22C25 12 27 14 27 17C27 19.5 25.5 21 23 21.5L28 28H24L19.5 22H16V28H12ZM16 19H21.5C22.5 19 23.5 18.5 23.5 17C23.5 15.5 22.5 15 21.5 15H16V19Z" fill="white"/>
      </svg>
      
      {/* Text portion mimicking cPanel font style (bold, geometric, clean) */}
      <div className={`font-black tracking-tight ${textClassName}`} style={{ fontFamily: '"Montserrat", "Inter", sans-serif' }}>
        <span className="text-orange-500">RE</span>
        <span className="text-zinc-100">ZIDE</span>
        {/* Small symbol in front of the T at the top */}
        <sup className="text-orange-500 text-[0.45em] align-super relative top-[-0.3em] left-[0.05em] font-extrabold mr-[0.1em]">*</sup>
        <span className="text-zinc-100">T</span>
      </div>
    </div>
  );
}
