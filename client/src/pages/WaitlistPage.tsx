import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// ✅ BACKEND URL (important for Google OAuth)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "https://collabifyy-gg0g.onrender.com";

export default function WaitlistPage() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<"creator" | "brand">("creator");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyOrHandle: "",
    message: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") as "creator" | "brand";
    if (type) setUserType(type);
  }, []);

  // ✅ Prefill form when user is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
      }));
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/waitlist", {
        userType,
        ...formData,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success 🎉",
        description: "Your profile has been created",
      });
      setLocation("/home");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  // ⏳ Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 🔒 Not authenticated → show CTA (NO auto redirect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium">Please sign in to join the waitlist</p>
        <Button
          onClick={() => {
            window.location.href = `${BACKEND_URL}/api/login`;
          }}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader className="space-y-3">
            <Badge>Early Access</Badge>
            <h1 className="text-3xl font-bold">Join the Waitlist</h1>
            <p className="text-muted-foreground">
              {userType === "creator"
                ? "Be among the first creators"
                : "Get early access for brands"}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Full Name"
                required
              />

              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                required
              />

              <Input
                value={formData.companyOrHandle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyOrHandle: e.target.value,
                  })
                }
                placeholder={
                  userType === "brand" ? "Company Name" : "@yourhandle"
                }
              />

              <Textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about yourself"
              />

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Join Waitlist"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
