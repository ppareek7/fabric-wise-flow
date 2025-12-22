import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockTable } from '@/components/stock/StockTable';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStockData } from '@/hooks/useStockData';
import { BirgunGodownStock } from '@/types/stock';
import { Plus, Download, Calendar, Warehouse } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function BirgunStock() {
  const { birgunStock } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const columns = [
    {
      key: 'date' as keyof BirgunGodownStock,
      header: 'Date',
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(new Date(value as string), 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      key: 'openingBalanceKg' as keyof BirgunGodownStock,
      header: 'Opening (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (value as number).toLocaleString(),
    },
    {
      key: 'receivedKg' as keyof BirgunGodownStock,
      header: 'From Biratnagar (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <span className="text-success font-medium">+{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'totalAvailableKg' as keyof BirgunGodownStock,
      header: 'Total Available (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (value as number).toLocaleString(),
    },
    {
      key: 'salesKg' as keyof BirgunGodownStock,
      header: 'Sales (kg)',
      align: 'right' as const,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <span className="text-destructive">-{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'salesMeter' as keyof BirgunGodownStock,
      header: 'Sales (mtr)',
      align: 'right' as const,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <span className="text-muted-foreground">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balanceKg' as keyof BirgunGodownStock,
      header: 'Balance (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <span className="font-bold">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balanceMeter' as keyof BirgunGodownStock,
      header: 'Balance (mtr)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: BirgunGodownStock[keyof BirgunGodownStock]) => (
        <span className="font-bold text-accent">{(value as number).toLocaleString()}</span>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Sales recorded',
      description: 'Birgunj sales entry has been saved successfully.',
    });
    setDialogOpen(false);
  };

  return (
    <Layout title="Birgunj Godown">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Warehouse className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Section 4: Birgunj Godown</h2>
              <p className="text-sm text-muted-foreground">
                Stock received from Biratnagar and local sales
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
              Record Sales
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> "From Biratnagar" column is automatically populated when transfers are made from 
            Biratnagar Production. Only sales can be recorded manually here.
          </p>
        </div>

        <StockTable columns={columns} data={birgunStock} />

        <StockEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Record Birgunj Sales"
          description="Enter sales data for Birgunj godown. Stock received is auto-linked from Biratnagar."
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
                <Label htmlFor="available">Available Stock (kg)</Label>
                <Input
                  id="available"
                  type="number"
                  defaultValue={birgunStock[birgunStock.length - 1]?.balanceKg ?? 0}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesKg">Sales (kg)</Label>
                <Input id="salesKg" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesMeter">Sales (mtr) - Auto calculated</Label>
                <Input id="salesMeter" type="number" disabled className="bg-muted" placeholder="Auto" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Record Sales</Button>
            </div>
          </form>
        </StockEntryDialog>
      </div>
    </Layout>
  );
}
