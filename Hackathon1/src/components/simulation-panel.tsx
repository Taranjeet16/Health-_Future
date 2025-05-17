
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useHealthStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function SimulationPanel() {
  const { simulation, updateSimulation, toggleProjections, showProjections } = useHealthStore();

  const handleSliderChange = (key: keyof typeof simulation, value: number[]) => {
    updateSimulation(key, value[0]);
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>What If Simulation</span>
          <div className="flex items-center space-x-2">
            <Switch
              id="show-projection"
              checked={showProjections}
              onCheckedChange={toggleProjections}
            />
            <Label htmlFor="show-projection">Show Projections</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <Label>Sleep Change (hours)</Label>
              <span className="text-primary">
                {simulation.sleep_change > 0 ? "+" : ""}
                {simulation.sleep_change} hours
              </span>
            </div>
            <Slider
              value={[simulation.sleep_change]}
              min={-2}
              max={2}
              step={0.5}
              onValueChange={(value) => handleSliderChange("sleep_change", value)}
            />
            <p className="text-xs text-muted-foreground">
              {simulation.sleep_change > 0
                ? "Improved sleep can lower heart rate and stress levels."
                : simulation.sleep_change < 0
                ? "Reduced sleep can increase stress and decrease performance."
                : "No change in sleep habits."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <Label>Steps Change</Label>
              <span className="text-primary">
                {simulation.steps_change > 0 ? "+" : ""}
                {simulation.steps_change} steps
              </span>
            </div>
            <Slider
              value={[simulation.steps_change]}
              min={-2000}
              max={5000}
              step={500}
              onValueChange={(value) => handleSliderChange("steps_change", value)}
            />
            <p className="text-xs text-muted-foreground">
              {simulation.steps_change > 0
                ? "Increased activity improves cardiovascular health and mood."
                : simulation.steps_change < 0
                ? "Decreased activity may impact your overall health."
                : "No change in activity level."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <Label>Water Intake Change (glasses)</Label>
              <span className="text-primary">
                {simulation.water_change > 0 ? "+" : ""}
                {simulation.water_change} glasses
              </span>
            </div>
            <Slider
              value={[simulation.water_change]}
              min={-3}
              max={3}
              step={1}
              onValueChange={(value) => handleSliderChange("water_change", value)}
            />
            <p className="text-xs text-muted-foreground">
              {simulation.water_change > 0
                ? "Better hydration improves energy levels and mental clarity."
                : simulation.water_change < 0
                ? "Reduced hydration can lead to fatigue and decreased performance."
                : "No change in hydration habits."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <Label>Projection Days</Label>
              <span className="text-primary">
                {simulation.projection_days} days
              </span>
            </div>
            <Slider
              value={[simulation.projection_days]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => handleSliderChange("projection_days", value)}
            />
            <p className="text-xs text-muted-foreground">
              Simulating the impact of your changes over {simulation.projection_days} days.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
