import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [userType, setUserType] = useState<"creator" | "brand" | null>(null);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as "creator" | "brand" | null;
    setUserType(type);
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const handleGoogleSignIn = () => {
    const params = userType ? `?type=${userType}` : "";
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/login${params}`;
  };
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background blobs */}
        <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin relative z-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-md bg-card/80 border border-white/10 shadow-2xl" data-testid="card-auth">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge 
                variant="outline" 
                className="relative text-sm overflow-hidden py-1.5 px-4 border-none rounded-full bg-transparent mb-4"
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-[-150%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_320deg,#1e40af_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#ffffff_360deg)] blur-md" />
                </div>
                <div className="absolute inset-[1.5px] rounded-full z-10 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl" />
                <div className="absolute inset-0 rounded-full border border-slate-200/50 dark:border-white/10 z-20 pointer-events-none" />
                <div className="relative z-30 flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-800 dark:bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600 dark:bg-slate-200"></span>
                  </span>
                  Welcome
                </div>
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight"
            >
              <span className="inline-block">
                Join{" "}
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Collabifyy
                </span>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-muted-foreground text-lg"
            >
              {userType === "creator"
                ? "Join as a creator and find amazing brand partnerships"
                : userType === "brand"
                ? "Join as a brand and discover authentic creators"
                : "Sign in to continue"}
            </motion.p>
          </CardHeader>

          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                variant="outline"
                className="w-full h-12 gap-3 transition-transform duration-200 hover:scale-105 btn-shine-brand"
                onClick={handleGoogleSignIn}
                data-testid="button-google-signin"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setLocation("/")}
                data-testid="button-back"
              >
                Back to Home
              </Button>
            </motion.div>
          </CardContent>

          <CardFooter className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
