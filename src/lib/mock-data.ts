
import { HealthData, TimeRange, Mood } from "./store";

export function generateMockData(timeRange: TimeRange): HealthData {
  const pointCount = timeRange === "day" ? 24 : timeRange === "week" ? 7 : 30;
  const now = new Date();
  
  const heart_rate: number[] = [];
  const sleep: number[] = [];
  const steps: number[] = [];
  const calories: number[] = [];
  const water: number[] = [];
  const mood: Mood[] = [];
  const timestamps: string[] = [];
  
  // Generate timestamps based on time range
  for (let i = 0; i < pointCount; i++) {
    const date = new Date(now);
    
    if (timeRange === "day") {
      date.setHours(now.getHours() - (pointCount - i - 1));
      timestamps.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else if (timeRange === "week") {
      date.setDate(now.getDate() - (pointCount - i - 1));
      timestamps.push(date.toLocaleDateString([], { weekday: 'short' }));
    } else {
      date.setDate(now.getDate() - (pointCount - i - 1));
      timestamps.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
    }
    
    // Generate random data
    heart_rate.push(Math.floor(Math.random() * 30) + 60); // 60-90 bpm
    sleep.push(Math.random() * 4 + 5); // 5-9 hours
    steps.push(Math.floor(Math.random() * 5000) + 3000); // 3000-8000 steps
    calories.push(Math.floor(Math.random() * 1000) + 1500); // 1500-2500 calories
    water.push(Math.floor(Math.random() * 5) + 3); // 3-8 glasses
    
    // Random mood
    const moods: Mood[] = ["happy", "neutral", "sad", "excited", "tired", "stressed"];
    mood.push(moods[Math.floor(Math.random() * moods.length)]);
  }
  
  return { heart_rate, sleep, steps, calories, water, mood, timestamps };
}

export function getMoodEmoji(mood: Mood): string {
  const emojiMap: Record<Mood, string> = {
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    excited: "😃",
    tired: "😴",
    stressed: "😰"
  };
  
  return emojiMap[mood] || "❓";
}

export function getMetricIcon(metric: string): string {
  const iconMap: Record<string, string> = {
    heart_rate: "❤️",
    sleep: "💤",
    steps: "👣",
    calories: "🔥",
    water: "💧",
    mood: "😊"
  };
  
  return iconMap[metric] || "📊";
}
