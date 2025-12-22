import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'accent' | 'warning';
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  variant = 'default',
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/20 bg-primary/5',
    accent: 'border-accent/20 bg-accent/5',
    warning: 'border-warning/20 bg-warning/5',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className={`stat-card ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconStyles[variant]}`}>
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend === 'up'
                ? 'text-success'
                : trend === 'down'
                ? 'text-destructive'
                : 'text-muted-foreground'
            }`}
          >
            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {trend === 'neutral' && <Minus className="h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="stat-label">{title}</p>
        <p className="stat-value mt-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-base font-normal text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
