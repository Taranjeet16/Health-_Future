
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";
import { auth } from "@/lib/auth";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || "/dashboard";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await auth.login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 flex items-center">
        <div className="flex items-center gap-2 w-full justify-center mb-4">
          <HeartPulse className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">HealthFuture</h2>
        </div>
        <CardTitle className="text-xl text-center">Log in to your account</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials below to access your health dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-primary">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
}
