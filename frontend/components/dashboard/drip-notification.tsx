"use client"

import { useState } from "react"
import { X, Droplets, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DripNotification() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary/5 border border-primary/20 p-4 md:p-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2" />
      
      <div className="relative flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">Your daily drip is here!</h3>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            ₦3,000 has been released to your available balance from 3 envelopes.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-chart-1/10 px-2.5 py-1 text-xs font-medium text-chart-1">
              Transport: +₦1,000
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-chart-5/10 px-2.5 py-1 text-xs font-medium text-chart-5">
              Food: +₦2,000
            </span>
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}
