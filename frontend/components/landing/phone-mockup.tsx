import { Droplet, TrendingUp, Wallet, Car, Utensils } from "lucide-react"

export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[640px] bg-foreground rounded-[3rem] p-2 shadow-2xl">
        {/* Screen */}
        <div className="h-full w-full bg-background rounded-[2.5rem] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl" />
          
          {/* Screen Content */}
          <div className="h-full pt-10 pb-6 px-5 flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-6">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-current rounded-sm relative">
                  <div className="absolute inset-0.5 bg-primary rounded-sm" style={{ width: '70%' }} />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Good morning,</p>
                <p className="text-lg font-semibold">Chidi</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Droplet className="h-5 w-5 text-primary" />
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-primary rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary-foreground/70" />
                <span className="text-sm text-primary-foreground/70">Available Balance</span>
              </div>
              <p className="text-3xl font-bold text-primary-foreground mb-3">₦5,500</p>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <TrendingUp className="h-4 w-4" />
                <span>₦29,500 locked</span>
              </div>
            </div>

            {/* Envelopes */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold">Your Envelopes</p>
                <span className="text-xs text-muted-foreground">See all</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Envelope 1 */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-chart-1/10 flex items-center justify-center">
                      <Car className="h-4 w-4 text-chart-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Transport</p>
                      <p className="text-xs text-muted-foreground">₦1,000/day</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">₦3,500</p>
                      <p className="text-xs text-muted-foreground">of ₦30,000</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full animate-fill" style={{ width: '12%' }} />
                  </div>
                </div>

                {/* Envelope 2 */}
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-chart-5/10 flex items-center justify-center">
                      <Utensils className="h-4 w-4 text-chart-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Food</p>
                      <p className="text-xs text-muted-foreground">₦2,000/day</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">₦2,000</p>
                      <p className="text-xs text-muted-foreground">of ₦60,000</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-5 rounded-full animate-fill" style={{ width: '3%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Nav Indicator */}
            <div className="flex justify-center mt-4">
              <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
