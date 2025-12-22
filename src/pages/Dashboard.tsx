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
} from 'lucide-react';

export default function Dashboard() {
  const { dashboardStats } = useStockData();

  return (
    <Layout title="Dashboard">
      <div className="page-container">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <StatCard
            title="Yarn Stock"
            value={dashboardStats.yarnBalance}
            unit="kg"
            icon={<Package className="h-5 w-5" />}
            trend="up"
            trendValue="+2.5%"
            variant="primary"
          />
          <StatCard
            title="Unfinished Goods"
            value={dashboardStats.unfinishedBalance}
            unit="kg"
            icon={<Layers className="h-5 w-5" />}
            trend="neutral"
            trendValue="0%"
          />
          <StatCard
            title="Today's Production"
            value={dashboardStats.todayProduction}
            unit="kg"
            icon={<Factory className="h-5 w-5" />}
            trend="up"
            trendValue="+5.2%"
            variant="accent"
          />
          <StatCard
            title="Today's Transfers"
            value={dashboardStats.todayTransfers}
            unit="kg"
            icon={<ArrowRightLeft className="h-5 w-5" />}
          />
          <StatCard
            title="Today's Sales"
            value={dashboardStats.todaySales}
            unit="kg"
            icon={<ShoppingCart className="h-5 w-5" />}
            trend="up"
            trendValue="+8.1%"
          />
          <StatCard
            title="Total Finished Stock"
            value={dashboardStats.biratnagarKg + dashboardStats.birgunKg}
            unit="kg"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="primary"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="section-header">
              <Factory className="h-5 w-5 text-primary" />
              Recent Production
            </h3>
            <div className="space-y-3 mt-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">Production Batch #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">Today, {9 + i}:00 AM</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{150 + i * 20} kg</p>
                    <p className="text-xs text-muted-foreground">{(150 + i * 20) * 4.5} mtr</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="section-header">
              <ShoppingCart className="h-5 w-5 text-accent" />
              Recent Sales
            </h3>
            <div className="space-y-3 mt-4">
              {[
                { location: 'Biratnagar', amount: 85 },
                { location: 'Birgunj', amount: 45 },
                { location: 'Biratnagar', amount: 120 },
              ].map((sale, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium text-sm">Sales Order #{2000 + i}</p>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={`godown-badge ${
                          sale.location === 'Biratnagar'
                            ? 'godown-badge-biratnagar'
                            : 'godown-badge-birgunj'
                        }`}
                      >
                        {sale.location}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{sale.amount} kg</p>
                    <p className="text-xs text-muted-foreground">{sale.amount * 4.5} mtr</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
