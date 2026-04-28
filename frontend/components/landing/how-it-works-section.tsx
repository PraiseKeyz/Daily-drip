import { FolderPlus, Lock, Droplets, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: FolderPlus,
    title: "Create Envelopes",
    description: "Set up budget categories like Transport, Food, or Entertainment. Assign a monthly amount to each.",
  },
  {
    number: "02",
    icon: Lock,
    title: "Lock Your Budget",
    description: "Your money is locked and divided into daily portions automatically. No manual calculations needed.",
  },
  {
    number: "03",
    icon: Droplets,
    title: "Receive Daily Drips",
    description: "Every day at midnight, your daily portion is released to your available balance with a fun notification.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Build Better Habits",
    description: "Track your progress, stay disciplined, and watch your financial habits transform over time.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How DailyDrip works
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Four simple steps to transform your relationship with money and build lasting financial discipline.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-border hidden md:block" />
          
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8">
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-primary">{step.number}</span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
