import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Lock, Droplets, TrendingUp } from "lucide-react"
import { PhoneMockup } from "./phone-mockup"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/40 via-background to-background" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <Badge variant="secondary" className="w-fit gap-2 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now in Beta
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Budget smarter.{" "}
              <span className="text-primary">Spend wiser.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Stop overspending early in the month. DailyDrip locks your budget and releases a controlled daily amount, helping you build lasting financial discipline.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button size="lg" asChild className="gap-2">
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-border mt-4">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold">10K+</span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold">85%</span>
                <span className="text-sm text-muted-foreground">Save More</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold">4.9</span>
                <span className="text-sm text-muted-foreground">App Rating</span>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
            
            {/* Floating cards */}
            <div className="absolute top-8 -left-4 md:left-0 animate-drip">
              <div className="bg-card rounded-xl p-4 shadow-lg border border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Daily Drip Released</p>
                  <p className="text-lg font-bold text-primary">+₦1,000</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-20 -right-4 md:right-0 animate-drip" style={{ animationDelay: '0.3s' }}>
              <div className="bg-card rounded-xl p-4 shadow-lg border border-border flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Lock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Remaining Locked</p>
                  <p className="text-lg font-bold">₦29,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
