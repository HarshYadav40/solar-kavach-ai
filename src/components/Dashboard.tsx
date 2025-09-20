import React from 'react';
import { Activity, Satellite, Globe, Brain, Shield, Zap } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import SolarDisk from './SolarDisk';
import SpaceWeatherCard, { SolarFlareCard, GeomagneticCard, SatelliteRiskCard } from './SpaceWeatherCard';
import AlertsPanel from './AlertsPanel';

const Dashboard = () => {
  return (
    <div className="min-h-screen relative">
      {/* Aurora background */}
      <AuroraBackground />
      
      {/* Main content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-solar">Surya</span>{' '}
              <span className="text-aurora">Kavach</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              AI-Powered Solar Storm Prediction & Protection Dashboard
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
                <span>Live Monitoring Active</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4" />
                <span>AI Analysis: Normal</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left column - Solar monitoring */}
            <div className="lg:col-span-4 space-y-6">
              <SolarDisk />
              
              {/* Quick metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <SolarFlareCard />
                <GeomagneticCard />
                <SatelliteRiskCard />
              </div>
            </div>

            {/* Center column - Main metrics and forecasts */}
            <div className="lg:col-span-5 space-y-6">
              {/* Key metrics grid */}
              <div className="grid grid-cols-2 gap-4">
                <SpaceWeatherCard
                  title="Solar Wind Speed"
                  value="425"
                  unit="km/s"
                  trend="stable"
                  risk="low"
                  icon={<Activity className="w-4 h-4" />}
                  description="Normal solar wind conditions"
                />
                
                <SpaceWeatherCard
                  title="Plasma Density"
                  value="6.8"
                  unit="p/cm³"
                  trend="down"
                  risk="low"
                  icon={<Globe className="w-4 h-4" />}
                  description="Below average density"
                />
                
                <SpaceWeatherCard
                  title="Magnetic Field"
                  value="5.2"
                  unit="nT"
                  trend="up"
                  risk="medium"
                  icon={<Shield className="w-4 h-4" />}
                  description="Moderate field strength"
                />
                
                <SpaceWeatherCard
                  title="X-Ray Flux"
                  value="C2.1"
                  trend="stable"
                  risk="low"
                  icon={<Zap className="w-4 h-4" />}
                  description="Background levels normal"
                />
              </div>

              {/* Aurora forecast placeholder */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-aurora">Aurora Visibility Forecast</h3>
                <div className="aspect-video bg-gradient-to-br from-aurora-green/20 via-aurora-blue/20 to-aurora-purple/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-12 h-12 mx-auto mb-3 text-aurora-blue opacity-60" />
                    <p className="text-sm text-muted-foreground">Interactive Earth map loading...</p>
                    <p className="text-xs text-muted-foreground mt-1">Aurora visibility zones will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Alerts and AI insights */}
            <div className="lg:col-span-3 space-y-6">
              <AlertsPanel />
              
              {/* AI Insights placeholder */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-aurora">AI Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-aurora-blue" />
                      <span className="text-sm font-medium">Gemini Analysis</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Current solar activity shows moderate levels with AR3500 displaying increased magnetic complexity. 
                      Low probability of major flare activity in next 24h.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-aurora-green/5 border border-aurora-green/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-aurora-green" />
                      <span className="text-sm font-medium">Protection Status</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All systems nominal. Satellite operations can proceed normally. 
                      Aurora viewing favorable for northern latitudes tonight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer status bar */}
        <footer className="max-w-7xl mx-auto mt-12 glass-card p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Satellite className="w-4 h-4" />
                <span>NASA API: Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Gemini AI: Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Data Update: 2 min ago</span>
              </div>
            </div>
            <div className="text-xs">
              Last Update: {new Date().toLocaleString()}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;