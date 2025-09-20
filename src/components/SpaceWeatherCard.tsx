import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Zap, Shield, Satellite } from 'lucide-react';

interface SpaceWeatherCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  risk?: 'low' | 'medium' | 'high';
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

const SpaceWeatherCard = ({
  title,
  value,
  unit,
  trend,
  risk = 'low',
  icon,
  description,
  className
}: SpaceWeatherCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-aurora-green" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-solar-red" />;
      case 'stable': return <Minus className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getRiskBadgeVariant = () => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getRiskClass = () => {
    switch (risk) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return 'risk-low';
    }
  };

  return (
    <Card className={`glass-card p-4 hover:bg-card/80 transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        </div>
        {trend && getTrendIcon()}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant={getRiskBadgeVariant()}
            className={`text-xs ${getRiskClass()}`}
          >
            {risk.toUpperCase()} RISK
          </Badge>
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </Card>
  );
};

// Preset components for specific space weather metrics
export const SolarFlareCard = () => (
  <SpaceWeatherCard
    title="Solar Flare Risk"
    value="M2.1"
    trend="up"
    risk="medium"
    icon={<Zap className="w-4 h-4" />}
    description="Moderate flare activity detected"
  />
);

export const GeomagneticCard = () => (
  <SpaceWeatherCard
    title="Geomagnetic Activity"
    value="Kp 4"
    trend="stable"
    risk="low"
    icon={<Shield className="w-4 h-4" />}
    description="Minor storm conditions"
  />
);

export const SatelliteRiskCard = () => (
  <SpaceWeatherCard
    title="Satellite Risk"
    value="LOW"
    trend="down"
    risk="low"
    icon={<Satellite className="w-4 h-4" />}
    description="Normal operations expected"
  />
);

export default SpaceWeatherCard;