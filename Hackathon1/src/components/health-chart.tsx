
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHealthStore } from "@/lib/store";
import { cn } from "@/lib/utils";

interface HealthChartProps {
  metric: string;
  title: string;
  color: string;
  unit: string;
  className?: string;
}

export function HealthChart({
  metric,
  title,
  color,
  unit,
  className
}: HealthChartProps) {
  const [animate, setAnimate] = useState(false);
  const { selectedTimeRange, getCurrentProfile, getProjectedData, showProjections } = useHealthStore();
  
  const currentProfile = getCurrentProfile();
  const healthData = currentProfile?.data;
  const projectedData = getProjectedData();
  
  // Format data for chart
  const chartData = healthData && healthData.timestamps.map((time, index) => {
    const metricKey = metric as keyof typeof healthData;
    
    if (typeof healthData[metricKey] === 'object' && healthData[metricKey] !== null) {
      const baseValue = (healthData[metricKey] as any)[index];
      const projectedValue = showProjections ? (projectedData[metricKey] as any)[index] : null;
      
      return {
        timestamp: time,
        [metric]: baseValue,
        [`${metric}_projected`]: projectedValue
      };
    }
    
    return { timestamp: time };
  });
  
  useEffect(() => {
    // Trigger animation on mount
    setAnimate(true);
  }, []);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          {/* Show average if not projected */}
          {!showProjections && healthData && (
            <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-1 rounded">
              Avg: {
                (
                  (healthData[metric as keyof typeof healthData] as number[])
                  .reduce((sum, val) => sum + val, 0) / 
                  (healthData[metric as keyof typeof healthData] as number[]).length
                ).toFixed(1)
              } {unit}
            </span>
          )}
          {showProjections && (
            <span className="text-sm font-normal bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
              Projections Active
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} ${unit}`, title]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              
              {/* Base data line */}
              <Line
                type="monotone"
                dataKey={metric}
                name={title}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 2 }}
                isAnimationActive={animate}
              />
              
              {/* Projected data line if enabled */}
              {showProjections && (
                <Line
                  type="monotone"
                  dataKey={`${metric}_projected`}
                  name="Projected"
                  stroke="#8884d8"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  isAnimationActive={animate}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
