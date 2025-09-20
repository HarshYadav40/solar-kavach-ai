import React from 'react';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base space gradient */}
      <div className="absolute inset-0 space-bg" />
      
      {/* Aurora layers with different animations */}
      <div className="absolute inset-0">
        {/* Primary aurora wave */}
        <div 
          className="absolute top-0 left-0 w-[200%] h-full aurora-animate opacity-60"
          style={{
            background: 'linear-gradient(135deg, transparent 20%, hsl(160 100% 50% / 0.3) 40%, hsl(200 100% 60% / 0.4) 60%, hsl(280 100% 70% / 0.3) 80%, transparent 100%)',
            transform: 'translateX(-50%) translateY(-10%) rotate(-2deg)',
          }}
        />
        
        {/* Secondary aurora wave */}
        <div 
          className="absolute top-0 left-0 w-[180%] h-full aurora-glow opacity-40"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, hsl(200 100% 60% / 0.2) 50%, hsl(160 100% 50% / 0.3) 70%, transparent 90%)',
            transform: 'translateX(-30%) translateY(-5%) rotate(1deg)',
            animationDelay: '3s',
          }}
        />
        
        {/* Tertiary subtle glow */}
        <div 
          className="absolute top-0 left-0 w-[220%] h-full"
          style={{
            background: 'radial-gradient(ellipse at center top, hsl(280 100% 70% / 0.1) 0%, transparent 50%)',
            animation: 'aurora-flow 25s ease-in-out infinite reverse',
            animationDelay: '8s',
          }}
        />
      </div>
      
      {/* Subtle stars overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, hsl(180 100% 80%), transparent),
            radial-gradient(1px 1px at 40px 70px, hsl(160 100% 70%), transparent),
            radial-gradient(1px 1px at 90px 40px, hsl(200 100% 80%), transparent),
            radial-gradient(1px 1px at 130px 80px, hsl(280 100% 80%), transparent),
            radial-gradient(1px 1px at 160px 30px, hsl(180 100% 70%), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }} />
      </div>
    </div>
  );
};

export default AuroraBackground;