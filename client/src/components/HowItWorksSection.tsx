import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import onboardingImage from "@assets/generated_images/signup.jpg";
import aiMatchingImage from "@assets/generated_images/ai_matchmaking_visualization.png";
import dashboardImage from "@assets/generated_images/campaign_dashboard_mockup.png";

const steps = [
  {
    number: "01",
    title: "Sign Up & Create Profile",
    description: "Get started in minutes. Build your profile with your expertise, audience demographics, and collaboration preferences.",
    image: onboardingImage,
    imageAlt: "Onboarding interface",
    reverse: false,
  },
  {
    number: "02",
    title: "Get Matched by AI",
    description: "Our intelligent algorithm analyzes thousands of data points to find your perfect matches. Quality over quantity, always.",
    image: aiMatchingImage,
    imageAlt: "AI matching visualization",
    reverse: true,
  },
  {
    number: "03",
    title: "Launch & Manage Campaigns",
    description: "Collaborate seamlessly with integrated tools for communication, content approval, and performance tracking.",
    image: dashboardImage,
    imageAlt: "Campaign dashboard",
    reverse: false,
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute left-10 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight">
            <span className="inline-block">
              How It{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Works
              </span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your collaborations
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                step.reverse ? "lg:grid-flow-dense" : ""
              }`}
              data-testid={`section-step-${index}`}
            >
              <div className={`space-y-6 ${step.reverse ? "lg:col-start-2" : ""}`}>
                <Badge variant="secondary" className="text-2xl font-bold px-4 py-2 backdrop-blur-md bg-secondary/80 border border-white/10">
                  {step.number}
                </Badge>
                <h3 className="text-3xl font-display font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>

              <motion.div
                className={step.reverse ? "lg:col-start-1 lg:row-start-1" : ""}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-auto"
                    data-testid={`img-step-${index}`}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
