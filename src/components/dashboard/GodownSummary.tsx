import { Factory, Warehouse, ArrowRight, Scale } from 'lucide-react';

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
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="section-header">
        <Scale className="h-5 w-5 text-primary" />
        Finished Goods Distribution
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Biratnagar */}
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <Factory className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Biratnagar</span>
            <span className="godown-badge godown-badge-biratnagar ml-auto">Production</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Meters</span>
              <span className="font-semibold">{biratnagarMeter.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Kilograms</span>
              <span className="font-semibold">{biratnagarKg.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Transfer Arrow */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-px w-8 bg-border hidden md:block" />
            <div className="flex flex-col items-center">
              <ArrowRight className="h-6 w-6 text-accent rotate-90 md:rotate-0" />
              <span className="text-xs mt-1">Today's Transfers</span>
              <span className="font-semibold text-accent">{todayTransfers.toLocaleString()} kg</span>
            </div>
            <div className="h-px w-8 bg-border hidden md:block" />
          </div>
        </div>

        {/* Birgunj */}
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
          <div className="flex items-center gap-2 mb-3">
            <Warehouse className="h-5 w-5 text-accent" />
            <span className="font-semibold text-foreground">Birgunj</span>
            <span className="godown-badge godown-badge-birgunj ml-auto">Godown</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Meters</span>
              <span className="font-semibold">{birgunMeter.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Kilograms</span>
              <span className="font-semibold">{birgunKg.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
