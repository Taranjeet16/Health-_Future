
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "@/lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = auth.isAuthenticated();
  const location = useLocation();

  useEffect(() => {
    // Log authentication status for debugging
    console.log("Auth status:", isAuthenticated);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
