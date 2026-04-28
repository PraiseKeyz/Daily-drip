import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Adaeze Okafor",
    role: "Marketing Manager",
    location: "Lagos",
    initials: "AO",
    content: "I used to spend my transport money on other things by week two. With DailyDrip, I always have what I need. It is like having a strict but loving financial advisor.",
    rating: 5,
  },
  {
    name: "Emeka Nwachukwu",
    role: "Software Developer",
    location: "Abuja",
    initials: "EN",
    content: "The daily drip concept is genius. I finally understand where my money goes and I have never been more in control of my spending habits.",
    rating: 5,
  },
  {
    name: "Funke Adeyemi",
    role: "Entrepreneur",
    location: "Port Harcourt",
    initials: "FA",
    content: "Running a small business means tight budgets. DailyDrip helps me separate personal and business expenses perfectly. Highly recommend!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by thousands of{" "}
            <span className="text-primary">smart savers</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Join a community of people who have transformed their financial habits with DailyDrip.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-chart-4 text-chart-4" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
