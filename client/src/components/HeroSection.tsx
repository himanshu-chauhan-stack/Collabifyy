import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Building2 } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/CreatorCampaign.jpg";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export function HeroSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 14, mass: 0.8 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 14, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(offsetX * 18);
      y.set(offsetY * 18);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* background blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-8 relative z-10">


          <Badge 
  variant="outline" 
  className="relative text-sm overflow-hidden py-1.5 px-4 border-none  rounded-full bg-transparent"
  data-testid="badge-ai-powered"
>
  {/* 1. THE GLOW (The moving light source) */}
  <div className="absolute inset-0 z-0">
    <div className={`
      absolute inset-[-150%] animate-[spin_5s_linear_infinite]
      /* Light Mode: Deep Royal Blue (#1e40af) instead of bright blue */
      bg-[conic-gradient(from_0deg,transparent_0deg,transparent_320deg,#1e40af_360deg)]
      /* Dark Mode: Bright White/Silver Glow */
      dark:bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,#ffffff_360deg)]
      blur-md
    `} />
  </div>

  {/* 2. THE GLASS LAYER (This sits on top of the glow to soften it) */}
  <div className="absolute inset-[1.5px] rounded-full z-10 
    bg-white/95 dark:bg-slate-950/90 
    backdrop-blur-xl" 
  />
  
  {/* 3. THE KEYLINE (Static border to keep it crisp) */}
  <div className="absolute inset-0 rounded-full border border-slate-200/50 dark:border-white/10 z-20 pointer-events-none" />

  {/* 4. THE CONTENT */}
  <div className="relative z-30 flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-white">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-800 dark:bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600 dark:bg-slate-200"></span>
    </span>
    AI-Powered Platform
  </div>
</Badge>
            
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground tracking-tight">
              <span className="inline-block">
                Where Brands & Creators{" "}
                <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Connect Through AI
                </span>
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Transform your collaborations with intelligent matchmaking, streamlined campaign management, and automated payment processing. All in one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth?type=creator">
                <a className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full gap-2 transition-transform duration-200 hover:scale-105 btn-shine"
                    data-testid="button-join-creator"
                  >
                    <Users className="w-5 h-5" />
                    Join as Creator
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
              <Link href="/auth?type=brand">
                <a className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2 transition-transform duration-200 hover:scale-105 btn-shine-brand"
                    data-testid="button-join-brand"
                  >
                    <Building2 className="w-5 h-5" />
                    Join as Brand
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2" data-testid="text-stats-creators">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                Trusted by 500+ creators
              </div>
              <div className="flex items-center gap-2" data-testid="text-stats-brands">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                100+ brand partnerships
              </div>
            </div>
          </div>

          <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{ x: smoothX, y: smoothY }}
              className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <img
                src={heroImage}
                alt="Brands and creators collaborating"
                className="w-full h-auto"
                data-testid="img-hero"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
