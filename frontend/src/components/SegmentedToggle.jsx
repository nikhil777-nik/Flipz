import React, { useState } from 'react';

/**
 * Apple WWDC 2025 Liquid Glass Segmented Toggle Switch
 * 
 * Features:
 * - Real frosted glass backdrop filter (blur 24px, saturate 180%)
 * - SVG liquid distortion refraction filter
 * - Translucent white glass tint with top reflection gradient
 * - 1px white border with inner highlights and soft outer drop shadows
 * - Floating dark pill (#2F3245) with smooth spring transition
 * - Active text (White), Inactive text (Muted Blue-Gray)
 */
const SegmentedToggle = ({ initialTab = 'shop', onChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleToggle = (tab) => {
    setActiveTab(tab);
    if (onChange) {
      onChange(tab);
    }
  };

  return (
    <div className="relative inline-flex items-center justify-center p-2 select-none">
      {/* SVG Liquid Refraction Distortion Filter (Only affects this component) */}
      <svg className="hidden pointer-events-none absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          </filter>
        </defs>
      </svg>

      {/* Main Glass Pill Container */}
      <div 
        className="relative flex items-center p-1.5 rounded-[9999px] bg-white/75 backdrop-blur-[24px] backdrop-saturate-[180%] border border-white/90 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.07),0_4px_16px_rgba(0,0,0,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 min-w-[340px] sm:min-w-[420px]"
        style={{ filter: 'url(#liquid-glass-distortion)' }}
      >
        {/* Soft Top Reflection Gradient Overlay */}
        <div className="absolute inset-0 rounded-[9999px] bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none" />

        {/* Floating Dark Active Pill (#2F3245) */}
        <div 
          className="absolute top-1.5 bottom-1.5 rounded-[9999px] bg-[#2F3245] shadow-[0_10px_22px_-2px_rgba(47,50,69,0.45),0_4px_8px_-1px_rgba(47,50,69,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.45,0.64,1)] pointer-events-none"
          style={{
            left: activeTab === 'shop' ? '6px' : 'calc(50% + 3px)',
            width: 'calc(50% - 9px)'
          }}
        >
          {/* Active Pill Inner Reflection Highlight */}
          <div className="absolute inset-0 rounded-[9999px] bg-gradient-to-b from-white/20 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Tab Buttons */}
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'shop'}
          onClick={() => handleToggle('shop')}
          className={`relative z-10 flex-1 py-3 px-6 text-center font-heading text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors duration-300 cursor-pointer outline-none focus:outline-none ${
            activeTab === 'shop' ? 'text-white' : 'text-[#64748B] hover:text-[#334155]'
          }`}
        >
          SHOP EDITION
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'creator'}
          onClick={() => handleToggle('creator')}
          className={`relative z-10 flex-1 py-3 px-6 text-center font-heading text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-colors duration-300 cursor-pointer outline-none focus:outline-none ${
            activeTab === 'creator' ? 'text-white' : 'text-[#64748B] hover:text-[#334155]'
          }`}
        >
          CREATOR EDITION
        </button>
      </div>
    </div>
  );
};

export default SegmentedToggle;
