import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base space gradient with enhanced depth */}
      <div className="absolute inset-0 space-bg" />
      
      {/* Enhanced aurora layers with more dynamic animations */}
      <div className="absolute inset-0">
        {/* Primary aurora wave - more vibrant */}
        <div 
          className="absolute top-0 left-0 w-[300%] h-[120%] aurora-animate opacity-50"
          style={{
            background: 'linear-gradient(135deg, transparent 15%, hsl(160 100% 45% / 0.4) 35%, hsl(200 100% 55% / 0.5) 55%, hsl(280 100% 65% / 0.4) 75%, hsl(160 100% 50% / 0.3) 85%, transparent 100%)',
            transform: 'translateX(-60%) translateY(-15%) rotate(-3deg)',
          }}
        />
        
        {/* Secondary aurora wave - enhanced movement */}
        <div 
          className="absolute top-0 left-0 w-[250%] h-[110%] aurora-glow opacity-35"
          style={{
            background: 'linear-gradient(45deg, transparent 25%, hsl(200 100% 60% / 0.3) 45%, hsl(160 100% 50% / 0.4) 65%, hsl(280 100% 70% / 0.2) 85%, transparent 95%)',
            transform: 'translateX(-40%) translateY(-8%) rotate(2deg)',
            animationDelay: '2s',
          }}
        />
        
        {/* Tertiary aurora layer */}
        <div 
          className="absolute top-0 left-0 w-[280%] h-full aurora-animate opacity-25"
          style={{
            background: 'linear-gradient(90deg, transparent 20%, hsl(280 100% 70% / 0.3) 40%, hsl(200 100% 60% / 0.2) 60%, hsl(160 100% 50% / 0.3) 80%, transparent 100%)',
            animation: 'aurora-flow 35s ease-in-out infinite reverse',
            animationDelay: '5s',
            transform: 'translateX(-50%) translateY(-12%) rotate(1deg)',
          }}
        />
        
        {/* Ambient aurora glow */}
        <div 
          className="absolute top-0 left-0 w-[220%] h-full"
          style={{
            background: 'radial-gradient(ellipse at center top, hsl(160 100% 50% / 0.15) 0%, hsl(280 100% 70% / 0.1) 30%, transparent 60%)',
            animation: 'aurora-flow 25s ease-in-out infinite reverse',
            animationDelay: '8s',
          }}
        />
      </div>
      
      {/* Enhanced stars overlay with twinkling effect */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full animate-pulse" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, hsl(180 100% 80%), transparent),
            radial-gradient(1px 1px at 40px 70px, hsl(160 100% 70%), transparent),
            radial-gradient(1px 1px at 90px 40px, hsl(200 100% 80%), transparent),
            radial-gradient(1px 1px at 130px 80px, hsl(280 100% 80%), transparent),
            radial-gradient(1px 1px at 160px 30px, hsl(180 100% 70%), transparent),
            radial-gradient(2px 2px at 200px 50px, hsl(160 100% 60%), transparent),
            radial-gradient(1px 1px at 250px 90px, hsl(200 100% 75%), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 150px',
          animation: 'aurora-glow 8s ease-in-out infinite alternate',
        }} />
      </div>
      
      {/* Subtle overlay to ensure content readability */}
      <div className="absolute inset-0 bg-background/5 backdrop-blur-[0.5px]" />
    </div>
  );
};

export default AuroraBackground;