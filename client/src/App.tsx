import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import WaitlistPage from "@/pages/WaitlistPage";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
<<<<<<< HEAD
import { AuthProvider } from "@/hooks/useAuth";

function Router() {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/waitlist" component={WaitlistPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route component={NotFound} />
        </Switch>
    );
=======
import WaitlistPage from "@/pages/WaitlistPage";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage"

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/waitlist" component={WaitlistPage} />
      <Route path="/home" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
>>>>>>> 5f3de75ab183b82d4bf537ba80012103526b0b2d
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Router />
                <Toaster />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
