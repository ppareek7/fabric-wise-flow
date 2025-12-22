import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockTable } from '@/components/stock/StockTable';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStockData } from '@/hooks/useStockData';
import { YarnStock as YarnStockType } from '@/types/stock';
import { Plus, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function YarnStock() {
  const { yarnStock } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const columns = [
    {
      key: 'date' as keyof YarnStockType,
      header: 'Date',
      render: (value: YarnStockType[keyof YarnStockType]) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(new Date(value as string), 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      key: 'openingBalance' as keyof YarnStockType,
      header: 'Opening (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: YarnStockType[keyof YarnStockType]) => (value as number).toLocaleString(),
    },
    {
      key: 'purchase' as keyof YarnStockType,
      header: 'Purchase (kg)',
      align: 'right' as const,
      render: (value: YarnStockType[keyof YarnStockType]) => (value as number).toLocaleString(),
    },
    {
      key: 'total' as keyof YarnStockType,
      header: 'Total (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: YarnStockType[keyof YarnStockType]) => (value as number).toLocaleString(),
    },
    {
      key: 'consumption' as keyof YarnStockType,
      header: 'Consumption (kg)',
      align: 'right' as const,
      render: (value: YarnStockType[keyof YarnStockType]) => (value as number).toLocaleString(),
    },
    {
      key: 'wastage' as keyof YarnStockType,
      header: 'Wastage (kg)',
      align: 'right' as const,
      render: (value: YarnStockType[keyof YarnStockType]) => (
        <span className="text-warning">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balance' as keyof YarnStockType,
      header: 'Balance (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: YarnStockType[keyof YarnStockType]) => (
        <span className="font-bold">{(value as number).toLocaleString()}</span>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Entry saved',
      description: 'Yarn stock entry has been recorded successfully.',
    });
    setDialogOpen(false);
  };

  return (
    <Layout title="Yarn Stock Register">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Section 1: Raw Material</h2>
            <p className="text-sm text-muted-foreground">
              Track yarn inventory, purchases, consumption and wastage
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        <StockTable columns={columns} data={yarnStock} />

        <StockEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Yarn Stock Entry"
          description="Enter today's yarn stock data. Calculated fields will be auto-filled."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opening">Opening Balance (kg)</Label>
                <Input
                  id="opening"
                  type="number"
                  defaultValue={yarnStock[yarnStock.length - 1]?.balance ?? 0}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase">Purchase (kg)</Label>
                <Input id="purchase" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumption">Consumption (kg)</Label>
                <Input id="consumption" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wastage">Wastage (kg)</Label>
                <Input id="wastage" type="number" placeholder="0" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Entry</Button>
            </div>
          </form>
        </StockEntryDialog>
      </div>
    </Layout>
  );
}
