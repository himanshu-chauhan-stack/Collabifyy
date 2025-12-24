import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, Building2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const creatorBenefits = [
  "Access to premium brand partnerships",
  "AI-powered brand matching",
  "Automated contract management",
  "Guaranteed payment protection",
  "Performance analytics dashboard",
];

const brandBenefits = [
  "Discover authentic creators",
  "AI-driven audience insights",
  "Campaign ROI tracking",
  "Streamlined collaboration tools",
  "Secure payment processing",
];

export function ForYouSection() {
  return (
    <section id="for-you" className="py-24 bg-accent/20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      
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
              Built{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                For You
              </span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a creator or a brand, we've got you covered
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="flex flex-col backdrop-blur-md bg-card/80 border border-white/10 shadow-xl hover-elevate transition-all duration-300" data-testid="card-for-creators">
              <CardHeader className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Users className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">
                  For Creators
                </h3>
                <p className="text-muted-foreground">
                  Grow your brand and monetize your influence
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {creatorBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth?type=creator" className="w-full">
                  <a className="w-full">
                    <Button className="w-full transition-transform duration-200 hover:scale-105 btn-shine" data-testid="button-join-creator-section">
                      Join as Creator
                    </Button>
                  </a>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="flex flex-col backdrop-blur-md bg-card/80 border border-white/10 shadow-xl hover-elevate transition-all duration-300" data-testid="card-for-brands">
              <CardHeader className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                >
                  <Building2 className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">
                  For Brands
                </h3>
                <p className="text-muted-foreground">
                  Find the perfect creators for your campaigns
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {brandBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth?type=brand" className="w-full">
                  <a className="w-full">
                    <Button className="w-full transition-transform duration-200 hover:scale-105 btn-shine-brand" variant="outline" data-testid="button-join-brand-section">
                      Join as Brand
                    </Button>
                  </a>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
