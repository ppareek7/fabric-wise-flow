import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { GodownSummary } from '@/components/dashboard/GodownSummary';
import { useStockData } from '@/hooks/useStockData';
import {
  Package,
  Layers,
  Factory,
  TrendingUp,
  ShoppingCart,
  ArrowRightLeft,
  Clock,
  Activity,
} from 'lucide-react';

export default function Dashboard() {
  const { dashboardStats } = useStockData();

  return (
    <Layout title="Dashboard">
      <div className="page-container animated-bg">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
          <StatCard
            title="Yarn Stock"
            value={dashboardStats.yarnBalance}
            unit="kg"
            icon={<Package className="h-6 w-6" />}
            trend="up"
            trendValue="+2.5%"
            variant="primary"
            delay={0}
          />
          <StatCard
            title="Unfinished Goods"
            value={dashboardStats.unfinishedBalance}
            unit="kg"
            icon={<Layers className="h-6 w-6" />}
            trend="neutral"
            trendValue="0%"
            delay={50}
          />
          <StatCard
            title="Today's Production"
            value={dashboardStats.todayProduction}
            unit="kg"
            icon={<Factory className="h-6 w-6" />}
            trend="up"
            trendValue="+5.2%"
            variant="accent"
            delay={100}
          />
          <StatCard
            title="Today's Transfers"
            value={dashboardStats.todayTransfers}
            unit="kg"
            icon={<ArrowRightLeft className="h-6 w-6" />}
            delay={150}
          />
          <StatCard
            title="Today's Sales"
            value={dashboardStats.todaySales}
            unit="kg"
            icon={<ShoppingCart className="h-6 w-6" />}
            trend="up"
            trendValue="+8.1%"
            delay={200}
          />
          <StatCard
            title="Total Finished Stock"
            value={dashboardStats.biratnagarKg + dashboardStats.birgunKg}
            unit="kg"
            icon={<TrendingUp className="h-6 w-6" />}
            variant="primary"
            delay={250}
          />
        </div>

        {/* Godown Summary */}
        <GodownSummary
          biratnagarMeter={dashboardStats.biratnagarMeter}
          biratnagarKg={dashboardStats.biratnagarKg}
          birgunMeter={dashboardStats.birgunMeter}
          birgunKg={dashboardStats.birgunKg}
          todayTransfers={dashboardStats.todayTransfers}
        />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="glass-card p-6 opacity-0 animate-fade-in animation-delay-400">
            <div className="relative z-10">
              <h3 className="section-header">
                <div className="icon-container icon-container-primary">
                  <Factory className="h-5 w-5" />
                </div>
                <span>Recent Production</span>
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
                        <Activity className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Production Batch #{1000 + i}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Today, {9 + i}:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg font-mono text-primary">{150 + i * 20} kg</p>
                      <p className="text-xs text-muted-foreground">{(150 + i * 20) * 4.5} mtr</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 opacity-0 animate-fade-in animation-delay-500">
            <div className="relative z-10">
              <h3 className="section-header">
                <div className="icon-container icon-container-accent">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <span>Recent Sales</span>
              </h3>
              <div className="space-y-3">
                {[
                  { location: 'Biratnagar', amount: 85 },
                  { location: 'Birgunj', amount: 45 },
                  { location: 'Biratnagar', amount: 120 },
                ].map((sale, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-200 ${
                        sale.location === 'Biratnagar' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-accent/10 text-accent'
                      }`}>
                        {sale.location === 'Biratnagar' ? <Factory className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Sales Order #{2000 + i}</p>
                        <span
                          className={`godown-badge ${
                            sale.location === 'Biratnagar'
                              ? 'godown-badge-biratnagar'
                              : 'godown-badge-birgunj'
                          }`}
                        >
                          {sale.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg font-mono">{sale.amount} kg</p>
                      <p className="text-xs text-muted-foreground">{sale.amount * 4.5} mtr</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
