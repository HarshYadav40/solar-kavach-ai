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
const GEMINI_API_KEY = 'AIzaSyAYmEj1tHJMiRm7lMsQbJ83Tf3IfkkY0Fg';

export const useSpaceWeatherAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaceWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use Gemini API to get current space weather analysis
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Provide current space weather analysis for today (${new Date().toISOString().split('T')[0]}). Return data in this exact JSON format:
{
  "alerts": [
    {
      "id": "unique_id",
      "type": "critical|warning|info|success",
      "title": "Alert Title",
      "message": "Detailed message about the space weather event",
      "timestamp": "2024-01-15 14:30 UTC",
      "source": "Data source (GOES, SWPC, ACE, etc.)"
    }
  ]
}

Include alerts for:
1. Recent solar flares (if any in past 72 hours)
2. Coronal mass ejections (CMEs)
3. Geomagnetic storm activity
4. Aurora visibility forecasts
5. Current space weather conditions

Use realistic data based on current solar cycle 25 phase. If conditions are quiet, include a success alert. Limit to 5 most important alerts.`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error('No content received from Gemini API');
      }

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      if (parsedData.alerts && Array.isArray(parsedData.alerts)) {
        setAlerts(parsedData.alerts);
      } else {
        throw new Error('Invalid alert data structure');
      }

    } catch (err) {
      console.error('Error fetching space weather data:', err);
      setError('Failed to fetch live space weather data');
      
      // Fallback to realistic sample data
      setAlerts([
        {
          id: 'sample-1',
          type: 'info',
          title: 'Solar Cycle 25 Monitoring',
          message: 'Solar Cycle 25 is in its active phase. Moderate solar activity expected with occasional M-class flares possible.',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
          }),
          source: 'SWPC'
        },
        {
          id: 'sample-2',
          type: 'success',
          title: 'Geomagnetic Conditions Stable',
          message: 'Current geomagnetic conditions are quiet to unsettled. Low probability of significant storms in next 24 hours.',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
          }),
          source: 'ACE'
        },
        {
          id: 'sample-3',
          type: 'info',
          title: 'Aurora Activity Forecast',
          message: 'Minor aurora activity possible at high latitudes. Visibility may extend to northern Canada and Scandinavia.',
          timestamp: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            timeZoneName: 'short'
          }),
          source: 'NOAA'
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
    
    // Refresh every 30 minutes for AI-generated data
    const interval = setInterval(fetchSpaceWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { alerts, loading, error, refetch: fetchSpaceWeatherData };
};