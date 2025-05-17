
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useHealthStore } from "@/lib/store";
import { toast } from "@/hooks/use-toast";

export function ExportReport() {
  const [isExporting, setIsExporting] = useState(false);
  const { getCurrentProfile, selectedTimeRange } = useHealthStore();
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const currentProfile = getCurrentProfile();
      if (!currentProfile) {
        toast({
          title: "Export Failed",
          description: "Could not find profile data to export",
          variant: "destructive",
        });
        return;
      }
      
      // Prepare data for export
      const data = {
        profile: currentProfile.name,
        timeRange: selectedTimeRange,
        date: new Date().toLocaleDateString(),
        metrics: {
          heart_rate: currentProfile.data.heart_rate,
          sleep: currentProfile.data.sleep,
          steps: currentProfile.data.steps,
          water: currentProfile.data.water,
        },
        goals: currentProfile.goals,
      };
      
      // Create CSV content
      const csvContent = generateCSV(data);
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `health-report-${currentProfile.name.toLowerCase().replace(/\s/g, '-')}-${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
      link.click();
      
      toast({
        title: "Report Exported Successfully",
        description: "Your health data has been downloaded as a CSV file",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data",
        variant: "destructive",
      });
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button 
      onClick={handleExport} 
      disabled={isExporting} 
      className="flex items-center gap-2"
      variant="outline"
    >
      {isExporting ? (
        <span className="animate-pulse">Exporting...</span>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </>
      )}
    </Button>
  );
}

// Helper function to generate CSV
function generateCSV(data: any) {
  // Header
  let csvContent = "HealthFuture Report\n";
  csvContent += `Profile: ${data.profile}\n`;
  csvContent += `Date Range: ${data.timeRange}\n`;
  csvContent += `Generated: ${data.date}\n\n`;
  
  // Metrics
  csvContent += "Day,Heart Rate (bpm),Sleep (hours),Steps,Water (glasses)\n";
  
  const metrics = data.metrics;
  const timestamps = data.metrics.timestamps || [];
  
  // For each day in the data
  for (let i = 0; i < metrics.heart_rate.length; i++) {
    const day = timestamps[i] || `Day ${i+1}`;
    csvContent += `${day},${metrics.heart_rate[i]},${metrics.sleep[i]},${metrics.steps[i]},${metrics.water[i]}\n`;
  }
  
  // Goals
  csvContent += "\nGoals:\n";
  csvContent += "Title,Target,Current Progress,Unit\n";
  
  data.goals.forEach((goal: any) => {
    csvContent += `${goal.title},${goal.target},${goal.current},${goal.unit}\n`;
  });
  
  return csvContent;
}
