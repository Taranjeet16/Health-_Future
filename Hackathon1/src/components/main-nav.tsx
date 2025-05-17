
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartPulse, LogOut } from "lucide-react";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
import { ThemeSwitch } from "@/components/theme-switch";
import { useHealthStore, TimeRange } from "@/lib/store";

export function MainNav() {
  const navigate = useNavigate();
  const isAuthenticated = auth.isAuthenticated();
  const { selectedTimeRange, setSelectedTimeRange } = useHealthStore();
  const authState = auth.getAuthState();
  
  const handleLogout = () => {
    auth.logout();
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">HealthFuture</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <TimeRangeSelector
                selectedTimeRange={selectedTimeRange}
                setSelectedTimeRange={setSelectedTimeRange}
              />
              <span className="text-sm hidden md:inline-block">
                {authState.user?.name}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

function TimeRangeSelector({ 
  selectedTimeRange, 
  setSelectedTimeRange 
}: { 
  selectedTimeRange: TimeRange, 
  setSelectedTimeRange: (range: TimeRange) => void 
}) {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button
        variant={selectedTimeRange === "day" ? "default" : "ghost"}
        className="rounded-none"
        onClick={() => setSelectedTimeRange("day")}
      >
        Day
      </Button>
      <Button
        variant={selectedTimeRange === "week" ? "default" : "ghost"}
        className="rounded-none"
        onClick={() => setSelectedTimeRange("week")}
      >
        Week
      </Button>
      <Button
        variant={selectedTimeRange === "month" ? "default" : "ghost"}
        className="rounded-none"
        onClick={() => setSelectedTimeRange("month")}
      >
        Month
      </Button>
    </div>
  );
}
