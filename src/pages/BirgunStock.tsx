import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { PokaTable } from '@/components/stock/PokaTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStockData } from '@/hooks/useStockData';
import { Plus, Download, Warehouse, Package, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BirgunStock() {
  const { birgunStock, allBirgunPokas } = useStockData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPoka, setSelectedPoka] = useState<string>('');
  const { toast } = useToast();

  const latestEntry = birgunStock[birgunStock.length - 1];
  const totalPokas = allBirgunPokas.length;
  const totalMeter = allBirgunPokas.reduce((sum, p) => sum + p.meter, 0);
  const totalKg = allBirgunPokas.reduce((sum, p) => sum + p.kg, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoka) {
      toast({
        title: 'No poka selected',
        description: 'Please select a poka for sale.',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Sale recorded',
      description: 'Birgunj sales entry has been saved successfully.',
    });
    setSelectedPoka('');
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
                Poka-wise inventory received from Biratnagar
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
              Record Sale
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
              <div className="text-2xl font-bold text-accent">{totalMeter.toLocaleString()}</div>
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
                <ShoppingCart className="h-4 w-4" />
                Today's Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{latestEntry?.salesKg ?? 0} kg</div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <strong>Note:</strong> Stock is automatically received from Biratnagar when transfers are made. 
            You can only record sales from available pokas in this godown.
          </p>
        </div>

        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
            <TabsTrigger value="daily">Daily Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory">
            <PokaTable 
              pokaItems={allBirgunPokas} 
              title="Birgunj Poka Inventory"
              emptyMessage="No pokas in inventory"
            />
          </TabsContent>
          
          <TabsContent value="daily">
            <div className="space-y-4">
              {birgunStock.map((entry) => (
                <div key={entry.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{format(new Date(entry.date), 'MMM dd, yyyy')}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-success">+{entry.receivedKg} kg received</span>
                      <span className="text-destructive">-{entry.salesKg} kg sold</span>
                      <span className="font-medium">Balance: {entry.balanceKg} kg</span>
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
          title="Record Birgunj Sale"
          description="Select poka(s) to record sale from Birgunj godown."
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
                <Label>Available Stock</Label>
                <Input
                  value={`${latestEntry?.balanceKg ?? 0} kg / ${latestEntry?.balanceMeter ?? 0} mtr`}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poka">Select Poka for Sale</Label>
              <Select value={selectedPoka} onValueChange={setSelectedPoka}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a poka" />
                </SelectTrigger>
                <SelectContent>
                  {allBirgunPokas.map((poka) => (
                    <SelectItem key={poka.id} value={poka.id}>
                      {poka.pokaNo} - {poka.shadeNo} ({poka.meter} mtr / {poka.kg} kg)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPoka && (
              <div className="bg-muted/50 rounded-lg p-4">
                <Label className="text-xs text-muted-foreground">Selected Poka Details</Label>
                {(() => {
                  const poka = allBirgunPokas.find(p => p.id === selectedPoka);
                  if (!poka) return null;
                  return (
                    <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Poka No:</span>
                        <div className="font-mono font-medium text-primary">{poka.pokaNo}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Shade:</span>
                        <div className="font-medium">{poka.shadeNo}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Meter:</span>
                        <div className="font-medium">{poka.meter}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Kg:</span>
                        <div className="font-medium">{poka.kg}</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedPoka}>
                Record Sale
              </Button>
            </div>
          </form>
        </StockEntryDialog>
      </div>
    </Layout>
  );
}
