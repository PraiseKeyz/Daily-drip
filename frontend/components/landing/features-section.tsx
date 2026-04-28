import { Lock, Droplets, Bell, BarChart3, Wallet, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Lock,
    title: "Envelope Budgeting",
    description: "Create virtual envelopes for each spending category. Allocate money and keep it organized.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Droplets,
    title: "Daily Drip Release",
    description: "Your budgeted amount is released in daily portions. No more spending it all at once.",
    color: "bg-chart-2/10 text-chart-2",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get daily alerts when your allowance is ready. Fun animations make saving enjoyable.",
    color: "bg-chart-5/10 text-chart-5",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visual progress bars show how much is released vs locked. Stay motivated and on track.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Wallet,
    title: "Virtual Wallet",
    description: "Track your available balance in one place. Perfect for building discipline before linking banks.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: Shield,
    title: "Self-Control Mode",
    description: "Money becomes illiquid by design. Break the cycle of impulse spending for good.",
    color: "bg-destructive/10 text-destructive",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to{" "}
            <span className="text-primary">control spending</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            DailyDrip combines envelope budgeting with time-locked disbursement to help you build lasting financial habits.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
