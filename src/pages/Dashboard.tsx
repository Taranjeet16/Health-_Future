
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, Calendar, User, Settings } from "lucide-react";
import { useHealthStore } from "@/lib/store";
import { HealthChart } from "@/components/health-chart";
import { GoalTracker } from "@/components/goal-tracker";
import { SimulationPanel } from "@/components/simulation-panel";
import { MoodAnalyzer } from "@/components/mood-analyzer";
import { ProfileSelector } from "@/components/profile-selector";
import { ExportReport } from "@/components/export-report";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

export default function Dashboard() {
  const { getCurrentProfile } = useHealthStore();
  const currentProfile = getCurrentProfile();
  
  // Check auth on component mount
  useEffect(() => {
    console.log("Dashboard mounted, profile:", currentProfile?.name);
  }, [currentProfile]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <MainNav />

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 flex-1">
        {/* Header with Export Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Health Dashboard</h1>
          <ExportReport />
        </div>

        {/* Health Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <QuickStat
            title="Heart Rate"
            value={`${Math.round(currentProfile?.data.heart_rate[currentProfile?.data.heart_rate.length - 1] || 0)} bpm`}
            icon={<HeartPulse className="w-5 h-5" />}
          />
          <QuickStat
            title="Sleep Last Night"
            value={`${currentProfile?.data.sleep[currentProfile?.data.sleep.length - 1]?.toFixed(1) || 0} hours`}
            icon={<Calendar className="w-5 h-5" />}
          />
          <QuickStat
            title="Steps Today"
            value={`${currentProfile?.data.steps[currentProfile?.data.steps.length - 1]?.toLocaleString() || 0}`}
            icon={<User className="w-5 h-5" />}
          />
          <QuickStat
            title="Water Intake"
            value={`${currentProfile?.data.water[currentProfile?.data.water.length - 1] || 0} glasses`}
            icon={<Settings className="w-5 h-5" />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <HealthChart
            metric="heart_rate"
            title="Heart Rate"
            color="#ef4444"
            unit="bpm"
          />
          <HealthChart
            metric="sleep"
            title="Sleep Duration"
            color="#8b5cf6"
            unit="hours"
          />
          <HealthChart
            metric="steps"
            title="Daily Steps"
            color="#10b981"
            unit="steps"
          />
          <HealthChart
            metric="water"
            title="Water Intake"
            color="#0ea5e9"
            unit="glasses"
          />
        </div>

        {/* Simulation and Goals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <SimulationPanel />
          <GoalTracker />
          <MoodAnalyzer />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function QuickStat({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
