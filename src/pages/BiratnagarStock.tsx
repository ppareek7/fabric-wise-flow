import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockTable } from '@/components/stock/StockTable';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStockData } from '@/hooks/useStockData';
import { FinishedGoodsBiratnagar } from '@/types/stock';
import { Plus, Download, Calendar, Factory } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function BiratnagarStock() {
  const { biratnagarStock } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const columns = [
    {
      key: 'date' as keyof FinishedGoodsBiratnagar,
      header: 'Date',
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(new Date(value as string), 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      key: 'openingBalanceKg' as keyof FinishedGoodsBiratnagar,
      header: 'Opening (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (value as number).toLocaleString(),
    },
    {
      key: 'productionKg' as keyof FinishedGoodsBiratnagar,
      header: 'Production (kg)',
      align: 'right' as const,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="text-success font-medium">+{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'productionMeter' as keyof FinishedGoodsBiratnagar,
      header: 'Production (mtr)',
      align: 'right' as const,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="text-muted-foreground">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'salesKg' as keyof FinishedGoodsBiratnagar,
      header: 'Sales (kg)',
      align: 'right' as const,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="text-destructive">-{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'transferKg' as keyof FinishedGoodsBiratnagar,
      header: 'To Birgunj (kg)',
      align: 'right' as const,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="text-accent">→ {(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balanceKg' as keyof FinishedGoodsBiratnagar,
      header: 'Balance (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="font-bold">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balanceMeter' as keyof FinishedGoodsBiratnagar,
      header: 'Balance (mtr)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: FinishedGoodsBiratnagar[keyof FinishedGoodsBiratnagar]) => (
        <span className="font-bold text-primary">{(value as number).toLocaleString()}</span>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Entry saved',
      description: 'Biratnagar stock entry has been recorded. Transfer will reflect in Birgunj.',
    });
    setDialogOpen(false);
  };

  return (
    <Layout title="Biratnagar Production">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Factory className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Section 3: Finished Goods</h2>
              <p className="text-sm text-muted-foreground">
                Production, sales, and transfers to Birgunj godown
              </p>
            </div>
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

        {/* Info Banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> Stock transferred to Birgunj will automatically update the Birgunj Godown inventory. 
            Transfers cannot exceed available balance.
          </p>
        </div>

        <StockTable columns={columns} data={biratnagarStock} />

        <StockEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Biratnagar Entry"
          description="Enter today's production, sales, and transfer data."
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
                  defaultValue={biratnagarStock[biratnagarStock.length - 1]?.balanceKg ?? 0}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productionKg">Production (kg)</Label>
                <Input id="productionKg" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesKg">Sales (kg)</Label>
                <Input id="salesKg" type="number" placeholder="0" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="transferKg">Transfer to Birgunj (kg)</Label>
                <Input id="transferKg" type="number" placeholder="0" />
                <p className="text-xs text-muted-foreground">
                  This will automatically add to Birgunj Godown stock
                </p>
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
