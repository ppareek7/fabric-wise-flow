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
  delay?: number;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  variant = 'default',
  delay = 0,
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border/50 bg-card',
    primary: 'border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10',
    accent: 'border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10',
    warning: 'border-warning/20 bg-gradient-to-br from-warning/5 to-warning/10',
  };

  const iconStyles = {
    default: 'icon-container bg-muted text-muted-foreground',
    primary: 'icon-container icon-container-primary',
    accent: 'icon-container icon-container-accent',
    warning: 'icon-container bg-warning/10 text-warning',
  };

  const glowStyles = {
    default: '',
    primary: 'before:bg-primary',
    accent: 'before:bg-accent',
    warning: 'before:bg-warning',
  };

  return (
    <div 
      className={`stat-card ${variantStyles[variant]} ${glowStyles[variant]} opacity-0 animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between relative z-10">
        <div className={iconStyles[variant]}>
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              trend === 'up'
                ? 'bg-success/10 text-success'
                : trend === 'down'
                ? 'bg-destructive/10 text-destructive'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {trend === 'down' && <TrendingDown className="h-3 w-3" />}
            {trend === 'neutral' && <Minus className="h-3 w-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-5 relative z-10">
        <p className="stat-label">{title}</p>
        <p className="stat-value mt-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-lg font-normal text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
