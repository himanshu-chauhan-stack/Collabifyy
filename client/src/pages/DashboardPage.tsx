import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<"creator" | "brand" | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
        variant: "destructive",
      });
      setTimeout(() => {
        setLocation("/auth");
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  const handleSelection = (type: "creator" | "brand") => {
    setSelectedType(type);
    setTimeout(() => {
      setLocation(`/waitlist?type=${type}`);
    }, 300);
  };

  if (isLoading || !isAuthenticated) {
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
      
      <div className="w-full max-w-5xl space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4"
        >
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
                Get Started
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
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Path
              </span>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Are you a creator or a brand? Let's get you started!
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card
              className={`hover-elevate transition-all duration-300 cursor-pointer backdrop-blur-md bg-card/80 border border-white/10 shadow-xl ${
                selectedType === "creator" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelection("creator")}
              data-testid="card-choose-creator"
            >
              <CardHeader className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <Users className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground text-center tracking-tight">
                  Join as Creator
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-6">
                  Monetize your influence and connect with premium brands that align with your values and audience.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    Access exclusive brand partnerships
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    AI-powered matching technology
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    Secure payment processing
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full gap-2 transition-transform duration-200 hover:scale-105 btn-shine"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection("creator");
                  }}
                  data-testid="button-select-creator"
                >
                  Get Started as Creator
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card
              className={`hover-elevate transition-all duration-300 cursor-pointer backdrop-blur-md bg-card/80 border border-white/10 shadow-xl ${
                selectedType === "brand" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelection("brand")}
              data-testid="card-choose-brand"
            >
              <CardHeader className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <Building2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground text-center tracking-tight">
                  Join as Brand
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground mb-6">
                  Discover authentic creators who can amplify your message and drive real results for your campaigns.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    Find verified, quality creators
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    Data-driven audience insights
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    Campaign ROI tracking
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full gap-2 transition-transform duration-200 hover:scale-105 btn-shine-brand"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelection("brand");
                  }}
                  data-testid="button-select-brand"
                >
                  Get Started as Brand
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
