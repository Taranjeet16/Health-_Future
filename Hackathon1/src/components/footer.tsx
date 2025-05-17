
import { Link } from "react-router-dom";
import { HeartPulse, Github, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">HealthFuture</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Predictive health analytics for a better tomorrow. Take control of your health journey with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-primary" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:contact@healthfuture.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-medium">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-medium">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Health Metrics</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Goal Tracking</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Mood Analysis</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Predictive Health</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HealthFuture. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Designed for a healthier future
          </p>
        </div>
      </div>
    </footer>
  );
}
