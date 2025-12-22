import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockTable } from '@/components/stock/StockTable';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStockData } from '@/hooks/useStockData';
import { UnfinishedGoods as UnfinishedGoodsType } from '@/types/stock';
import { Plus, Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export default function UnfinishedGoods() {
  const { unfinishedGoods } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const columns = [
    {
      key: 'date' as keyof UnfinishedGoodsType,
      header: 'Date',
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {format(new Date(value as string), 'MMM dd, yyyy')}
        </div>
      ),
    },
    {
      key: 'openingBalance' as keyof UnfinishedGoodsType,
      header: 'Opening (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (value as number).toLocaleString(),
    },
    {
      key: 'receive' as keyof UnfinishedGoodsType,
      header: 'Receive (kg)',
      align: 'right' as const,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (value as number).toLocaleString(),
    },
    {
      key: 'total' as keyof UnfinishedGoodsType,
      header: 'Total (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (value as number).toLocaleString(),
    },
    {
      key: 'finishedGoodsMeter' as keyof UnfinishedGoodsType,
      header: 'Finished (mtr)',
      align: 'right' as const,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (
        <span className="text-accent">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'finishedGoodsKg' as keyof UnfinishedGoodsType,
      header: 'Finished (kg)',
      align: 'right' as const,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (
        <span className="text-accent">{(value as number).toLocaleString()}</span>
      ),
    },
    {
      key: 'balance' as keyof UnfinishedGoodsType,
      header: 'Balance (kg)',
      align: 'right' as const,
      isCalculated: true,
      render: (value: UnfinishedGoodsType[keyof UnfinishedGoodsType]) => (
        <span className="font-bold">{(value as number).toLocaleString()}</span>
      ),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Entry saved',
      description: 'Unfinished goods entry has been recorded successfully.',
    });
    setDialogOpen(false);
  };

  return (
    <Layout title="Unfinished Goods (Grey Fabric)">
      <div className="page-container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Section 2: Grey Fabric</h2>
            <p className="text-sm text-muted-foreground">
              Track grey fabric inventory and finished goods production
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

        <StockTable columns={columns} data={unfinishedGoods} />

        <StockEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Unfinished Goods Entry"
          description="Enter today's grey fabric data. Calculated fields will be auto-filled."
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
                  defaultValue={unfinishedGoods[unfinishedGoods.length - 1]?.balance ?? 0}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receive">Receive (kg)</Label>
                <Input id="receive" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finishedKg">Finished Goods (kg)</Label>
                <Input id="finishedKg" type="number" placeholder="0" />
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
