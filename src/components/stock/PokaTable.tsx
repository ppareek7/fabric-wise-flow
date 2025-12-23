import { PokaItem } from '@/types/stock';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

interface PokaTableProps {
  pokaItems: PokaItem[];
  title?: string;
  emptyMessage?: string;
}

export function PokaTable({ pokaItems, title = "Poka Inventory", emptyMessage = "No poka items" }: PokaTableProps) {
  const totalMeter = pokaItems.reduce((sum, item) => sum + item.meter, 0);
  const totalKg = pokaItems.reduce((sum, item) => sum + item.kg, 0);

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">{title}</span>
          <Badge variant="secondary" className="ml-2">
            {pokaItems.length} Poka
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{totalMeter.toLocaleString()} mtr</span>
          </span>
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{totalKg.toLocaleString()} kg</span>
          </span>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="stock-table">
          <thead className="sticky top-0 bg-card">
            <tr>
              <th className="text-left">Poka No</th>
              <th className="text-left">Shade No</th>
              <th className="text-right">Meter</th>
              <th className="text-right">Kg</th>
            </tr>
          </thead>
          <tbody>
            {pokaItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pokaItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="font-mono font-medium text-primary">{item.pokaNo}</span>
                  </td>
                  <td>
                    <Badge variant="outline" className="font-mono">
                      {item.shadeNo}
                    </Badge>
                  </td>
                  <td className="text-right font-medium">{item.meter.toLocaleString()}</td>
                  <td className="text-right font-medium">{item.kg.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
