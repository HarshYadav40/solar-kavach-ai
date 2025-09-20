import React from 'react';
import { Activity, Satellite, Globe, Brain, Shield, Zap } from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import SolarDisk from './SolarDisk';
import SpaceWeatherCard, { SolarFlareCard, GeomagneticCard, SatelliteRiskCard } from './SpaceWeatherCard';
import AlertsPanel from './AlertsPanel';

const Dashboard = () => {
  return (
    <div className="min-h-screen relative">
      {/* Enhanced Aurora background */}
      <AuroraBackground />
      
      {/* App Container with proper scrolling */}
      <div className="relative z-10">
        {/* App Header - Fixed navigation */}
        <header className="sticky top-0 z-50 glass-card border-b border-glass-border backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-bold">
                  <span className="text-solar">Surya</span>{' '}
                  <span className="text-aurora">Kavach</span>
                </h1>
                <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
                  <span>Live Monitoring Active</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                  <Brain className="w-4 h-4" />
                  <span>AI Analysis: Normal</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Activity className="w-3 h-3" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Application Content */}
        <main className="px-6 py-8 space-y-8">
          {/* Mission Control Section */}
          <section className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-aurora mb-2">Mission Control</h2>
              <p className="text-muted-foreground">AI-Powered Solar Storm Prediction & Protection Dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Solar Activity Monitor */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-solar">Solar Activity</h3>
                  <SolarDisk />
                </div>
                
                {/* Quick Status Cards */}
                <div className="space-y-4">
                  <SolarFlareCard />
                  <GeomagneticCard />
                  <SatelliteRiskCard />
                </div>
              </div>

              {/* Real-time Metrics */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-aurora">Space Weather Metrics</h3>
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
                </div>
              </div>
            </div>
          </section>

          {/* Forecasting & Analysis Section */}
          <section className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Aurora Forecast */}
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

              {/* AI Insights */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-aurora">AI Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-aurora-blue" />
                      <span className="text-sm font-medium">Gemini Analysis</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Current solar activity shows moderate levels with AR3500 displaying increased magnetic complexity. 
                      Low probability of major flare activity in next 24h.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-aurora-green/5 border border-aurora-green/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-aurora-green" />
                      <span className="text-sm font-medium">Protection Status</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All systems nominal. Satellite operations can proceed normally. 
                      Aurora viewing favorable for northern latitudes tonight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alerts & Monitoring Section */}
          <section className="max-w-7xl mx-auto">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-solar">Active Alerts & Monitoring</h3>
              <AlertsPanel />
            </div>
          </section>
        </main>

        {/* App Footer */}
        <footer className="glass-card border-t border-glass-border mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start space-x-6 text-sm text-muted-foreground">
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
              <div className="text-xs text-muted-foreground">
                Last Update: {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;