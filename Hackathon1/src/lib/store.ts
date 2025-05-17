
import { create } from "zustand";
import { generateMockData } from "./mock-data";

export type TimeRange = "day" | "week" | "month";
export type Mood = "happy" | "neutral" | "sad" | "excited" | "tired" | "stressed";
export type HealthMetric = "heart_rate" | "sleep" | "steps" | "calories" | "water" | "mood";

export interface HealthData {
  heart_rate: number[];
  sleep: number[];
  steps: number[];
  calories: number[];
  water: number[];
  mood: Mood[];
  timestamps: string[];
}

export interface Goal {
  id: string;
  metric: HealthMetric;
  target: number;
  current: number;
  unit: string;
  title: string;
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  data: HealthData;
  goals: Goal[];
}

export interface Simulation {
  sleep_change: number;
  steps_change: number;
  water_change: number;
  projection_days: number;
}

interface HealthStore {
  profiles: Profile[];
  currentProfileId: string;
  selectedTimeRange: TimeRange;
  simulation: Simulation;
  moodInput: string;
  healthSuggestions: string[];
  showProjections: boolean;
  
  // Actions
  setCurrentProfileId: (id: string) => void;
  setSelectedTimeRange: (range: TimeRange) => void;
  updateSimulation: (key: keyof Simulation, value: number) => void;
  setMoodInput: (input: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, progress: number) => void;
  toggleProjections: () => void;
  
  // Derived data
  getCurrentProfile: () => Profile | undefined;
  getProjectedData: () => HealthData;
  analyzeMood: () => void;
}

// Create mock profiles
const mockProfiles = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    data: generateMockData("day"),
    goals: [
      {
        id: "g1",
        metric: "steps" as HealthMetric,
        target: 10000,
        current: 6500,
        unit: "steps",
        title: "Daily Steps"
      },
      {
        id: "g2",
        metric: "water" as HealthMetric,
        target: 8,
        current: 5,
        unit: "glasses",
        title: "Water Intake"
      },
      {
        id: "g3",
        metric: "sleep" as HealthMetric,
        target: 8,
        current: 6.5,
        unit: "hours",
        title: "Sleep Time"
      }
    ]
  },
  {
    id: "2",
    name: "Sam Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    data: generateMockData("day"),
    goals: [
      {
        id: "g4",
        metric: "steps" as HealthMetric,
        target: 8000,
        current: 7200,
        unit: "steps",
        title: "Daily Steps"
      },
      {
        id: "g5",
        metric: "calories" as HealthMetric,
        target: 2000,
        current: 1800,
        unit: "cal",
        title: "Calorie Limit"
      }
    ]
  }
];

// Create store
export const useHealthStore = create<HealthStore>((set, get) => ({
  profiles: mockProfiles,
  currentProfileId: "1",
  selectedTimeRange: "day",
  simulation: {
    sleep_change: 0,
    steps_change: 0,
    water_change: 0,
    projection_days: 7,
  },
  moodInput: "",
  healthSuggestions: [
    "Try to get 7-9 hours of sleep tonight for better recovery.",
    "Consider taking a short walk to reach your step goal.",
    "Stay hydrated! You're a bit behind on your water goal."
  ],
  showProjections: false,

  setCurrentProfileId: (id) => set({ currentProfileId: id }),
  setSelectedTimeRange: (range) => set({ selectedTimeRange: range }),
  
  updateSimulation: (key, value) => 
    set((state) => ({
      simulation: { 
        ...state.simulation,
        [key]: value 
      }
    })),
  
  setMoodInput: (input) => set({ moodInput: input }),

  addGoal: (goal) => set((state) => {
    const currentProfile = state.profiles.find(p => p.id === state.currentProfileId);
    if (!currentProfile) return state;
    
    const newGoal = { ...goal, id: `g${Date.now()}` };
    const updatedProfiles = state.profiles.map(profile => {
      if (profile.id === state.currentProfileId) {
        return {
          ...profile,
          goals: [...profile.goals, newGoal]
        };
      }
      return profile;
    });
    
    return { profiles: updatedProfiles };
  }),
  
  updateGoal: (id, progress) => set((state) => {
    const updatedProfiles = state.profiles.map(profile => {
      if (profile.id === state.currentProfileId) {
        const updatedGoals = profile.goals.map(goal => {
          if (goal.id === id) {
            return { ...goal, current: progress };
          }
          return goal;
        });
        return { ...profile, goals: updatedGoals };
      }
      return profile;
    });
    
    return { profiles: updatedProfiles };
  }),
  
  toggleProjections: () => set((state) => ({ 
    showProjections: !state.showProjections 
  })),
  
  getCurrentProfile: () => {
    return get().profiles.find(p => p.id === get().currentProfileId);
  },
  
  getProjectedData: () => {
    const { simulation } = get();
    const currentProfile = get().getCurrentProfile();
    
    if (!currentProfile) return generateMockData("day");
    
    // Create a projected data copy
    const baseData = currentProfile.data;
    const projectedData: HealthData = JSON.parse(JSON.stringify(baseData));
    
    // Apply simulation effects
    const lastDataPoint = baseData.heart_rate.length - 1;
    
    // Simulate improved heart rate with increased sleep/steps
    if (simulation.sleep_change > 0) {
      const improvement = Math.min(simulation.sleep_change * 2, 10);
      projectedData.heart_rate[lastDataPoint] = Math.max(60, baseData.heart_rate[lastDataPoint] - improvement);
    }
    
    // Simulate improved sleep
    projectedData.sleep[lastDataPoint] = Math.min(9, baseData.sleep[lastDataPoint] + simulation.sleep_change);
    
    // Simulate increased steps
    projectedData.steps[lastDataPoint] = baseData.steps[lastDataPoint] + simulation.steps_change;
    
    // Simulate increased water intake
    projectedData.water[lastDataPoint] = baseData.water[lastDataPoint] + simulation.water_change;
    
    // Simulate improved mood with better metrics
    const totalImprovement = simulation.sleep_change + (simulation.steps_change / 1000) + simulation.water_change;
    if (totalImprovement > 2) {
      projectedData.mood[lastDataPoint] = "happy";
    } else if (totalImprovement > 1) {
      projectedData.mood[lastDataPoint] = "excited";
    }
    
    return projectedData;
  },
  
  analyzeMood: () => {
    const { moodInput } = get();
    
    // Simple sentiment analysis
    const positiveWords = ["happy", "great", "good", "excellent", "amazing", "well"];
    const negativeWords = ["sad", "bad", "tired", "exhausted", "stressed", "anxious"];
    
    const lowercaseInput = moodInput.toLowerCase();
    
    let newSuggestions: string[] = [];
    
    // Check for negative emotions
    if (negativeWords.some(word => lowercaseInput.includes(word))) {
      newSuggestions = [
        "You seem to be feeling down. Consider taking a short walk outside.",
        "Deep breathing exercises might help reduce your stress levels.",
        "Try to get an extra hour of sleep tonight to help recovery.",
        "Consider a 10-minute meditation to clear your mind."
      ];
    } 
    // Check for positive emotions
    else if (positiveWords.some(word => lowercaseInput.includes(word))) {
      newSuggestions = [
        "Great to hear you're feeling well! Keep it up with your healthy habits.",
        "Your positive mood may benefit from some physical activity today.",
        "Consider setting a new health goal while you're motivated!",
        "Share your positive energy by connecting with friends or family."
      ];
    }
    // Default suggestions
    else {
      newSuggestions = [
        "Try to get 7-9 hours of sleep tonight for better recovery.",
        "Consider taking a short walk to reach your step goal.",
        "Stay hydrated! Aim for 8 glasses of water today.",
        "Take a few minutes for mindfulness practice today."
      ];
    }
    
    set({ healthSuggestions: newSuggestions });
  }
}));
