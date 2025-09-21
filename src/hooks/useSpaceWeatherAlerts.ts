import { useState, useEffect } from 'react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  source: string;
}

interface FlareData {
  flrID: string;
  beginTime: string;
  peakTime: string;
  endTime: string;
  classType: string;
  sourceLocation: string;
  activeRegionNum: string;
}

interface CMEData {
  activityID: string;
  startTime: string;
  sourceLocation: string;
  note: string;
  instruments: Array<{
    displayName: string;
  }>;
}

const NASA_API_KEY = 'FAc7gdd35HAB6P3orpEy3hkpVrzU3tBxVrvsnOfl';

export const useSpaceWeatherAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaceWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      const threeDaysAgo = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));
      
      const startDate = threeDaysAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];

      // Fetch solar flares
      const flareResponse = await fetch(
        `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`
      );
      
      // Fetch CMEs
      const cmeResponse = await fetch(
        `https://api.nasa.gov/DONKI/CME?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`
      );

      // Fetch geomagnetic storms
      const gstResponse = await fetch(
        `https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`
      );

      const [flareData, cmeData, gstData] = await Promise.all([
        flareResponse.json(),
        cmeResponse.json(),
        gstResponse.json()
      ]);

      const newAlerts: Alert[] = [];

      // Process solar flares
      if (Array.isArray(flareData)) {
        flareData.slice(0, 3).forEach((flare: FlareData, index: number) => {
          const severity = getFlareAlertType(flare.classType);
          newAlerts.push({
            id: `flr-${index}`,
            type: severity,
            title: `Solar Flare ${flare.classType} Detected`,
            message: `${flare.classType} class solar flare from ${flare.sourceLocation || 'unknown location'}. ${getFlareDescription(flare.classType)}`,
            timestamp: new Date(flare.peakTime || flare.beginTime).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
              timeZoneName: 'short'
            }),
            source: 'GOES'
          });
        });
      }

      // Process CMEs
      if (Array.isArray(cmeData)) {
        cmeData.slice(0, 2).forEach((cme: CMEData, index: number) => {
          newAlerts.push({
            id: `cme-${index}`,
            type: 'warning',
            title: 'Coronal Mass Ejection Detected',
            message: `CME observed from ${cme.sourceLocation || 'solar disk'}. Potential geomagnetic effects possible.`,
            timestamp: new Date(cme.startTime).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
              timeZoneName: 'short'
            }),
            source: cme.instruments?.[0]?.displayName || 'SOHO/LASCO'
          });
        });
      }

      // Process geomagnetic storms
      if (Array.isArray(gstData)) {
        gstData.slice(0, 2).forEach((gst: any, index: number) => {
          newAlerts.push({
            id: `gst-${index}`,
            type: gst.allKpIndex?.[0]?.kpIndex > 5 ? 'critical' : 'warning',
            title: 'Geomagnetic Storm Activity',
            message: `Geomagnetic storm conditions detected. Aurora activity may be enhanced at high latitudes.`,
            timestamp: new Date(gst.gstID.split('-')[0]).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC',
              timeZoneName: 'short'
            }),
            source: 'SWPC'
          });
        });
      }

      // Add a success message if conditions are quiet
      if (newAlerts.length === 0) {
        newAlerts.push({
          id: 'quiet',
          type: 'success',
          title: 'Quiet Space Weather Conditions',
          message: 'No significant solar activity detected in the past 72 hours. Conditions remain favorable.',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
          }),
          source: 'NASA DONKI'
        });
      }

      setAlerts(newAlerts);
    } catch (err) {
      console.error('Error fetching space weather data:', err);
      setError('Failed to fetch space weather data');
      
      // Fallback to sample data
      setAlerts([
        {
          id: 'fallback',
          type: 'info',
          title: 'Space Weather Monitoring Active',
          message: 'Unable to fetch live data. Monitoring systems remain operational.',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
          }),
          source: 'System'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getFlareAlertType = (classType: string): Alert['type'] => {
    if (!classType) return 'info';
    
    const firstChar = classType.charAt(0).toUpperCase();
    switch (firstChar) {
      case 'X': return 'critical';
      case 'M': return 'warning';
      case 'C': return 'info';
      default: return 'info';
    }
  };

  const getFlareDescription = (classType: string): string => {
    if (!classType) return 'Minor solar activity detected.';
    
    const firstChar = classType.charAt(0).toUpperCase();
    switch (firstChar) {
      case 'X':
        return 'Strong flare - significant radio blackouts and radiation storm possible.';
      case 'M':
        return 'Moderate flare - minor radio blackouts and solar radiation events possible.';
      case 'C':
        return 'Minor flare - minimal impact expected.';
      default:
        return 'Solar activity monitored.';
    }
  };

  useEffect(() => {
    fetchSpaceWeatherData();
    
    // Refresh every 15 minutes
    const interval = setInterval(fetchSpaceWeatherData, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { alerts, loading, error, refetch: fetchSpaceWeatherData };
};