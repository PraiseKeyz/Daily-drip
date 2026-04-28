import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const benefits = [
  "Free 30-day trial",
  "No credit card required",
  "Cancel anytime",
]

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground mb-6 text-balance">
              Ready to take control of your finances?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 text-pretty">
              Join thousands of Nigerians who are building better spending habits with DailyDrip.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-primary-foreground/80">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
