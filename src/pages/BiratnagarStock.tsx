import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { PokaTable } from '@/components/stock/PokaTable';
import { PokaEntryForm } from '@/components/stock/PokaEntryForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStockData } from '@/hooks/useStockData';
import { PokaItem } from '@/types/stock';
import { Plus, Download, Factory, Package, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BiratnagarStock() {
  const { biratnagarStock, allBiratnagarPokas } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingPokas, setPendingPokas] = useState<PokaItem[]>([]);
  const { toast } = useToast();

  const latestEntry = biratnagarStock[biratnagarStock.length - 1];
  const totalPokas = allBiratnagarPokas.length;
  const totalMeter = allBiratnagarPokas.reduce((sum, p) => sum + p.meter, 0);
  const totalKg = allBiratnagarPokas.reduce((sum, p) => sum + p.kg, 0);

  const handleAddPoka = (poka: Omit<PokaItem, 'id'>) => {
    const newPoka: PokaItem = {
      ...poka,
      id: `temp-${Date.now()}`,
    };
    setPendingPokas([...pendingPokas, newPoka]);
  };

  const handleRemovePoka = (id: string) => {
    setPendingPokas(pendingPokas.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingPokas.length === 0) {
      toast({
        title: 'No pokas added',
        description: 'Please add at least one poka entry.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Entry saved',
      description: `${pendingPokas.length} poka(s) added to Biratnagar stock.`,
    });
    setPendingPokas([]);
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
              <h2 className="text-lg font-semibold text-foreground">Section 3: Biratnagar Godown</h2>
              <p className="text-sm text-muted-foreground">
                Poka-wise finished goods inventory with shade tracking
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
              Add Poka
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Total Pokas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPokas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Meter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalMeter.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Kg</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalKg.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Today's Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{latestEntry?.productionKg.toLocaleString() ?? 0} kg</div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> Stock is tracked by Poka No, Shade No, and quantity (meter/kg). 
            Transfers to Birgunj will move specific pokas to the Birgunj godown.
          </p>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
            <TabsTrigger value="daily">Daily Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory">
            <PokaTable 
              pokaItems={allBiratnagarPokas} 
              title="Biratnagar Poka Inventory"
              emptyMessage="No pokas in inventory"
            />
          </TabsContent>
          
          <TabsContent value="daily">
            <div className="space-y-4">
              {biratnagarStock.map((entry) => (
                <div key={entry.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success">+{entry.productionKg} kg produced</span>
                      <span className="text-destructive">-{entry.salesKg} kg sold</span>
                      <span className="text-accent">→{entry.transferKg} kg transferred</span>
                    </div>
                  </div>
                  <PokaTable 
                    pokaItems={entry.pokaItems} 
                    title={`Pokas for ${format(new Date(entry.date), 'MMM dd')}`}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <StockEntryDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Add Production Pokas"
          description="Enter poka details with shade and quantity information."
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
                <Label>Current Balance</Label>
                <Input
                  value={`${latestEntry?.balanceKg ?? 0} kg / ${latestEntry?.balanceMeter ?? 0} mtr`}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <Label className="text-sm font-medium mb-3 block">Add Pokas</Label>
              <PokaEntryForm 
                onAddPoka={handleAddPoka}
                pendingPokas={pendingPokas}
                onRemovePoka={handleRemovePoka}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pendingPokas.length === 0}>
                Save Entry ({pendingPokas.length} Pokas)
              </Button>
            </div>
          </form>
        </StockEntryDialog>
      </div>
    </Layout>
  );
}
