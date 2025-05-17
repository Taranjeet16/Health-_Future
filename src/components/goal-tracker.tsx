
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useHealthStore, HealthMetric } from "@/lib/store";
import { getMetricIcon } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function GoalTracker() {
  const [open, setOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    metric: "steps" as HealthMetric,
    title: "",
    target: 0,
    current: 0,
    unit: ""
  });

  const { getCurrentProfile, addGoal, updateGoal } = useHealthStore();
  const currentProfile = getCurrentProfile();
  const goals = currentProfile?.goals || [];

  // Calculate total progress for the pie chart
  const totalProgress = goals.reduce((acc, goal) => {
    return acc + (goal.current / goal.target);
  }, 0);
  
  const averageProgress = goals.length > 0 ? (totalProgress / goals.length) * 100 : 0;
  
  // Data for the pie chart
  const chartData = [
    { name: "Progress", value: averageProgress },
    { name: "Remaining", value: 100 - averageProgress }
  ];
  
  const COLORS = ["#10b981", "#1f2937"];

  // Handle form submission
  const handleSubmit = () => {
    if (newGoal.title && newGoal.target > 0) {
      addGoal({
        metric: newGoal.metric,
        title: newGoal.title,
        target: newGoal.target,
        current: 0,
        unit: newGoal.unit
      });
      setOpen(false);
      // Reset form
      setNewGoal({
        metric: "steps" as HealthMetric,
        title: "",
        target: 0,
        current: 0,
        unit: ""
      });
    }
  };

  // Update metric units when metric changes
  const handleMetricChange = (value: string) => {
    const metricUnits: Record<string, string> = {
      steps: "steps",
      heart_rate: "bpm",
      sleep: "hours",
      water: "glasses",
      calories: "cal",
      mood: "score"
    };

    setNewGoal({
      ...newGoal,
      metric: value as HealthMetric,
      unit: metricUnits[value] || ""
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Goal Tracker</CardTitle>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" /> Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals List */}
          <div className="lg:col-span-2 space-y-4">
            {goals.length === 0 ? (
              <p className="text-center text-muted-foreground py-6">
                No goals yet. Add a goal to track your progress.
              </p>
            ) : (
              goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{getMetricIcon(goal.metric)}</span>
                      <span className="font-medium">{goal.title}</span>
                    </div>
                    <span className="text-sm">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(goal.current / goal.target) * 100} 
                      className="h-2 flex-1" 
                    />
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        const newProgress = Math.min(goal.current + 1, goal.target);
                        updateGoal(goal.id, newProgress);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Progress Chart */}
          <div className="h-60">
            {goals.length > 0 ? (
              <div className="h-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-2">
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{Math.round(averageProgress)}%</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Add goals to see your progress chart
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Add Goal Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="metric">Health Metric</Label>
              <Select 
                value={newGoal.metric} 
                onValueChange={handleMetricChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a health metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="steps">Steps</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="water">Water Intake</SelectItem>
                  <SelectItem value="calories">Calories</SelectItem>
                  <SelectItem value="heart_rate">Heart Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Goal Name</Label>
              <Input 
                id="title"
                placeholder="e.g., Daily Steps"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Input 
                  id="target"
                  type="number"
                  placeholder="e.g., 10000"
                  value={newGoal.target || ""}
                  onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input 
                  id="unit"
                  placeholder="e.g., steps"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Add Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
