
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { HeartPulse, ArrowDown, ChartLine, Activity, Users } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { Footer } from "@/components/footer";
import { auth } from "@/lib/auth";

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const authState = auth.getAuthState();
    setIsAuthenticated(authState.isAuthenticated);
    
    if (authState.isAuthenticated) {
      // Redirect to dashboard if already logged in
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl">HealthFuture</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
          )}
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        {/* Hero Section with Login Form */}
        <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12">
          <div className="w-full md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Your Health, Predicted
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-muted-foreground">
              See your future health based on your daily habits. Our predictive analytics
              help you make better lifestyle choices today for a healthier tomorrow.
            </p>
            <Button 
              size="lg" 
              className="text-lg hidden md:inline-flex"
              onClick={() => {
                const featuresSection = document.getElementById("features");
                featuresSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="w-full md:w-1/2 max-w-md">
            <LoginForm />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Predictive Health Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Activity className="w-10 h-10" />}
                title="Health Metrics"
                description="Track heart rate, sleep, steps, and more with beautiful visualizations that help you understand your health trends."
              />
              <FeatureCard
                icon={<ChartLine className="w-10 h-10" />}
                title="What-If Scenarios"
                description="See the future impact of lifestyle changes using our predictive AI that simulates how small changes affect your health."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10" />}
                title="Emotional Analysis"
                description="Our emotional AI analyzes your mood from text input to provide personalized health recommendations."
              />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card transition-all hover:shadow-md">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
