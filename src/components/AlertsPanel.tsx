import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useSpaceWeatherAlerts } from '@/hooks/useSpaceWeatherAlerts';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  source: string;
}

const AlertsPanel = ({ className }: { className?: string }) => {
  const { alerts, loading, error, refetch } = useSpaceWeatherAlerts();

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-solar-red" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-solar-orange" />;
      case 'info': return <Info className="w-4 h-4 text-aurora-blue" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-aurora-green" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertBadgeVariant = (type: Alert['type']) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      case 'success': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-aurora">Live Space Weather Alerts</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={refetch}
            disabled={loading}
            className="p-1 rounded-md hover:bg-card/50 transition-colors"
            title="Refresh alerts"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 text-muted-foreground hover:text-aurora" />
            )}
          </button>
          <Bell className="w-4 h-4 text-muted-foreground" />
          <Badge variant="outline" className="text-xs">
            {alerts.length} Active
          </Badge>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className="p-3 rounded-lg border border-border/50 hover:bg-card/50 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {alert.title}
                  </h4>
                  <Badge 
                    variant={getAlertBadgeVariant(alert.type)}
                    className="text-xs ml-2 shrink-0"
                  >
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                  {alert.message}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{alert.timestamp}</span>
                  <span className="font-mono bg-muted/30 px-1 py-0.5 rounded">
                    {alert.source}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No active alerts</p>
        </div>
      )}
    </Card>
  );
};

export default AlertsPanel;