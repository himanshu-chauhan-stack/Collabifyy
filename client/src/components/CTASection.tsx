import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight">
            <span className="inline-block">
              Ready to Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Collaborations?
              </span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the waitlist today and be among the first to experience the future of creator-brand partnerships
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link href="/auth?type=creator">
              <a>
                <Button size="lg" className="gap-2 transition-transform duration-200 hover:scale-105 btn-shine" data-testid="button-cta-creator">
                  Join as Creator
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
            <Link href="/auth?type=brand">
              <a>
                <Button size="lg" variant="outline" className="gap-2 transition-transform duration-200 hover:scale-105 btn-shine-brand" data-testid="button-cta-brand">
                  Join as Brand
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
