import { Factory, Warehouse, ArrowRight, Scale, TrendingUp } from 'lucide-react';

interface GodownSummaryProps {
  biratnagarMeter: number;
  biratnagarKg: number;
  birgunMeter: number;
  birgunKg: number;
  todayTransfers: number;
}

export function GodownSummary({
  biratnagarMeter,
  biratnagarKg,
  birgunMeter,
  birgunKg,
  todayTransfers,
}: GodownSummaryProps) {
  return (
    <div className="glass-card p-8 opacity-0 animate-fade-in animation-delay-300">
      <div className="relative z-10">
        <h3 className="section-header">
          <div className="icon-container icon-container-primary">
            <Scale className="h-5 w-5" />
          </div>
          <span>Finished Goods Distribution</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Biratnagar */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Factory className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-bold text-lg text-foreground">Biratnagar</span>
                  <span className="godown-badge godown-badge-biratnagar ml-3">Production</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                  <span className="text-sm text-muted-foreground">Meters</span>
                  <span className="font-bold text-xl font-mono">{biratnagarMeter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                  <span className="text-sm text-muted-foreground">Kilograms</span>
                  <span className="font-bold text-xl font-mono">{biratnagarKg.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Arrow */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative flex flex-col items-center">
              <div className="hidden md:flex items-center gap-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-primary" />
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg glow-primary animate-float">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/50" />
              </div>
              <div className="md:hidden flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                <ArrowRight className="h-6 w-6 rotate-90" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Today's Transfers</p>
                <p className="font-bold text-2xl font-mono gradient-text">{todayTransfers.toLocaleString()} kg</p>
              </div>
            </div>
          </div>

          {/* Birgunj */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 border border-accent/20">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <Warehouse className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-bold text-lg text-foreground">Birgunj</span>
                  <span className="godown-badge godown-badge-birgunj ml-3">Godown</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                  <span className="text-sm text-muted-foreground">Meters</span>
                  <span className="font-bold text-xl font-mono">{birgunMeter.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-background/50">
                  <span className="text-sm text-muted-foreground">Kilograms</span>
                  <span className="font-bold text-xl font-mono">{birgunKg.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
