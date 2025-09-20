import React from 'react';
import { Card } from '@/components/ui/card';

interface SolarDiskProps {
  className?: string;
}

const SolarDisk = ({ className }: SolarDiskProps) => {
  // Mock solar activity data
  const activeRegions = [
    { id: 'AR3500', x: 30, y: 40, risk: 'high', intensity: 0.8 },
    { id: 'AR3501', x: 60, y: 20, risk: 'medium', intensity: 0.5 },
    { id: 'AR3502', x: 45, y: 70, risk: 'low', intensity: 0.3 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'hsl(var(--solar-red))';
      case 'medium': return 'hsl(var(--solar-orange))';
      case 'low': return 'hsl(var(--aurora-green))';
      default: return 'hsl(var(--aurora-green))';
    }
  };

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-aurora">Solar Disk Monitor</h3>
      
      {/* Solar disk visualization */}
      <div className="relative w-full max-w-sm mx-auto aspect-square">
        {/* Sun background */}
        <div 
          className="absolute inset-0 rounded-full solar-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--solar-orange)) 0%, hsl(var(--solar-red)) 70%, hsl(220 20% 8%) 100%)',
          }}
        />
        
        {/* Solar surface texture */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, hsl(var(--solar-orange) / 0.8) 5%, transparent 15%),
              radial-gradient(circle at 70% 20%, hsl(var(--solar-red) / 0.6) 8%, transparent 18%),
              radial-gradient(circle at 40% 80%, hsl(var(--solar-orange) / 0.7) 6%, transparent 16%),
              radial-gradient(circle at 80% 60%, hsl(var(--solar-red) / 0.5) 4%, transparent 14%)
            `,
          }}
        />
        
        {/* Active regions */}
        {activeRegions.map((region) => (
          <div
            key={region.id}
            className="absolute group cursor-pointer transition-all duration-300 hover:scale-125"
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Region marker */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white/50 animate-pulse"
              style={{
                backgroundColor: getRiskColor(region.risk),
                boxShadow: `0 0 ${region.intensity * 20}px ${getRiskColor(region.risk)}`,
              }}
            />
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
              {region.id} ({region.risk.toUpperCase()})
            </div>
          </div>
        ))}
        
        {/* Center crosshair */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-white/20" />
          <div className="absolute w-full h-px bg-white/20" />
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
          <span>Monitoring {activeRegions.length} Active Regions</span>
        </div>
      </div>
    </Card>
  );
};

export default SolarDisk;