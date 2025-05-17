
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useHealthStore } from "@/lib/store";
import { toast } from "@/hooks/use-toast";
import { getMoodEmoji } from "@/lib/mock-data";
import { type Mood } from "@/lib/store";

export function MoodAnalyzer() {
  const { moodInput, setMoodInput, analyzeMood, healthSuggestions } = useHealthStore();
  
  const handleAnalyze = () => {
    if (!moodInput.trim()) {
      toast({
        title: "Please enter how you're feeling",
        description: "We need some text to analyze your mood.",
        variant: "destructive",
      });
      return;
    }
    
    analyzeMood();
    toast({
      title: "Mood analyzed",
      description: "We've updated your health suggestions based on your mood.",
    });
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Emotional Health Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MoodSelector />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">How are you feeling today?</label>
            <Textarea 
              placeholder="Tell us how you're feeling today..."
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button onClick={handleAnalyze} className="w-full">
              Analyze My Mood
            </Button>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Your Health Suggestions</h4>
            <ul className="space-y-2">
              {healthSuggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 bg-primary/5 rounded-md text-sm"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MoodSelector() {
  const moods: Mood[] = ["happy", "excited", "neutral", "tired", "sad", "stressed"];
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const { setMoodInput } = useHealthStore();
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setMoodInput(`I'm feeling ${mood} today`);
  };
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select your mood:</label>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood}
            type="button"
            variant={selectedMood === mood ? "default" : "outline"}
            className="gap-1.5"
            onClick={() => handleMoodSelect(mood)}
          >
            {getMoodEmoji(mood)} {mood}
          </Button>
        ))}
      </div>
    </div>
  );
}
