
import { useHealthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, ChevronDown } from "lucide-react";

export function ProfileSelector() {
  const { profiles, currentProfileId, setCurrentProfileId } = useHealthStore();
  
  const currentProfile = profiles.find(p => p.id === currentProfileId);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <img 
            src={currentProfile?.avatar} 
            alt={currentProfile?.name} 
            className="w-6 h-6 rounded-full"
          />
          {currentProfile?.name}
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {profiles.map(profile => (
          <DropdownMenuItem 
            key={profile.id}
            onClick={() => setCurrentProfileId(profile.id)}
            className="flex items-center gap-2"
          >
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-6 h-6 rounded-full"
            />
            {profile.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
