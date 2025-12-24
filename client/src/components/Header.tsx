import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";

// ... (keep all your existing imports)

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background styling
      setScrolled(currentScrollY > 20);
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }
      
      // Always show header at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email?.[0].toUpperCase() || "U";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* TYPEWRITER LOGO SECTION */}
          <Link href="/" className="text-2xl font-display font-bold text-foreground" data-testid="link-logo">
  {/* This div reserves the exact space needed so nothing shifts */}
  <div className="relative inline-grid">
    {/* 1. Invisible copy to hold the width */}
    <span className="invisible pointer-events-none">Collabifyy</span>
    
    {/* 2. The animated layer sitting on top */}
    <span className="absolute left-0 top-0 overflow-hidden whitespace-nowrap animate-typewriter-simple">
      Collabifyy
    </span>
  </div>
</Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#for-you" className="text-foreground hover:text-primary transition-colors">For You</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isLoading ? (
              <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={user.profileImageUrl || undefined} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a href="/api/logout" className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/login`;
                }}
              >
                Sign In with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
