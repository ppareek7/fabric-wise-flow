import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StockEntryDialog } from '@/components/stock/StockEntryDialog';
import { PokaTable } from '@/components/stock/PokaTable';
import { PokaEntryForm } from '@/components/stock/PokaEntryForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useStockData } from '@/hooks/useStockData';
import { PokaItem } from '@/types/stock';
import { Plus, Download, Factory, Package, TrendingUp, ShoppingCart, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BiratnagarStock() {
  const { biratnagarStock, allBiratnagarPokas } = useStockData();
  const [productionDialogOpen, setProductionDialogOpen] = useState(false);
  const [salesDialogOpen, setSalesDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [pendingPokas, setPendingPokas] = useState<PokaItem[]>([]);
  const [selectedPokasForSale, setSelectedPokasForSale] = useState<string[]>([]);
  const [selectedPokasForTransfer, setSelectedPokasForTransfer] = useState<string[]>([]);
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

  const handleProductionSubmit = (e: React.FormEvent) => {
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
      title: 'Production Entry Saved',
      description: `${pendingPokas.length} poka(s) added to Biratnagar stock.`,
    });
    setPendingPokas([]);
    setProductionDialogOpen(false);
  };

  const handleSalesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPokasForSale.length === 0) {
      toast({
        title: 'No pokas selected',
        description: 'Please select at least one poka for sale.',
        variant: 'destructive',
      });
      return;
    }
    
    const selectedPokaDetails = allBiratnagarPokas.filter(p => selectedPokasForSale.includes(p.id));
    const totalSoldMeter = selectedPokaDetails.reduce((sum, p) => sum + p.meter, 0);
    const totalSoldKg = selectedPokaDetails.reduce((sum, p) => sum + p.kg, 0);
    
    toast({
      title: 'Sale Recorded',
      description: `${selectedPokasForSale.length} poka(s) sold - ${totalSoldMeter} mtr / ${totalSoldKg} kg`,
    });
    setSelectedPokasForSale([]);
    setSalesDialogOpen(false);
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPokasForTransfer.length === 0) {
      toast({
        title: 'No pokas selected',
        description: 'Please select at least one poka for transfer.',
        variant: 'destructive',
      });
      return;
    }
    
    const selectedPokaDetails = allBiratnagarPokas.filter(p => selectedPokasForTransfer.includes(p.id));
    const totalTransferMeter = selectedPokaDetails.reduce((sum, p) => sum + p.meter, 0);
    const totalTransferKg = selectedPokaDetails.reduce((sum, p) => sum + p.kg, 0);
    
    toast({
      title: 'Transfer Recorded',
      description: `${selectedPokasForTransfer.length} poka(s) transferred to Birgunj - ${totalTransferMeter} mtr / ${totalTransferKg} kg`,
    });
    setSelectedPokasForTransfer([]);
    setTransferDialogOpen(false);
  };

  const togglePokaForSale = (pokaId: string) => {
    setSelectedPokasForSale(prev => 
      prev.includes(pokaId) 
        ? prev.filter(id => id !== pokaId)
        : [...prev, pokaId]
    );
  };

  const togglePokaForTransfer = (pokaId: string) => {
    setSelectedPokasForTransfer(prev => 
      prev.includes(pokaId) 
        ? prev.filter(id => id !== pokaId)
        : [...prev, pokaId]
    );
  };

  const getSelectedSaleSummary = () => {
    const selected = allBiratnagarPokas.filter(p => selectedPokasForSale.includes(p.id));
    return {
      count: selected.length,
      meter: selected.reduce((sum, p) => sum + p.meter, 0),
      kg: selected.reduce((sum, p) => sum + p.kg, 0),
    };
  };

  const getSelectedTransferSummary = () => {
    const selected = allBiratnagarPokas.filter(p => selectedPokasForTransfer.includes(p.id));
    return {
      count: selected.length,
      meter: selected.reduce((sum, p) => sum + p.meter, 0),
      kg: selected.reduce((sum, p) => sum + p.kg, 0),
    };
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
            <Button variant="outline" size="sm" onClick={() => setSalesDialogOpen(true)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Record Sale
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTransferDialogOpen(true)}>
              <Truck className="h-4 w-4 mr-2" />
              Transfer to Birgunj
            </Button>
            <Button size="sm" onClick={() => setProductionDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Production
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
            Use <strong>Record Sale</strong> to sell pokas directly from Biratnagar, or <strong>Transfer to Birgunj</strong> to move stock to Birgunj godown.
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

        {/* Add Production Dialog */}
        <StockEntryDialog
          open={productionDialogOpen}
          onOpenChange={setProductionDialogOpen}
          title="Add Production Pokas"
          description="Enter poka details with shade and quantity information."
        >
          <form onSubmit={handleProductionSubmit} className="space-y-4">
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
              <Button type="button" variant="outline" onClick={() => setProductionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={pendingPokas.length === 0}>
                Save Entry ({pendingPokas.length} Pokas)
              </Button>
            </div>
          </form>
        </StockEntryDialog>

        {/* Record Sale Dialog */}
        <StockEntryDialog
          open={salesDialogOpen}
          onOpenChange={setSalesDialogOpen}
          title="Record Sale from Biratnagar"
          description="Select poka(s) to sell directly from Biratnagar godown."
        >
          <form onSubmit={handleSalesSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sale-date">Date</Label>
                <Input
                  id="sale-date"
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="space-y-2">
                <Label>Available Stock</Label>
                <Input
                  value={`${totalKg.toLocaleString()} kg / ${totalMeter.toLocaleString()} mtr`}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Pokas for Sale</Label>
              <div className="border border-border rounded-lg max-h-60 overflow-y-auto">
                {allBiratnagarPokas.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground text-center">No pokas available</p>
                ) : (
                  allBiratnagarPokas.map((poka) => (
                    <div 
                      key={poka.id} 
                      className="flex items-center gap-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer"
                      onClick={() => togglePokaForSale(poka.id)}
                    >
                      <Checkbox 
                        checked={selectedPokasForSale.includes(poka.id)}
                        onCheckedChange={() => togglePokaForSale(poka.id)}
                      />
                      <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                        <span className="font-mono font-medium text-primary">{poka.pokaNo}</span>
                        <span>{poka.shadeNo}</span>
                        <span>{poka.meter} mtr</span>
                        <span>{poka.kg} kg</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {selectedPokasForSale.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <Label className="text-xs text-muted-foreground">Sale Summary</Label>
                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pokas:</span>
                    <div className="font-bold text-destructive">{getSelectedSaleSummary().count}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Meter:</span>
                    <div className="font-bold">{getSelectedSaleSummary().meter.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Kg:</span>
                    <div className="font-bold">{getSelectedSaleSummary().kg.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => { setSalesDialogOpen(false); setSelectedPokasForSale([]); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={selectedPokasForSale.length === 0} variant="destructive">
                Record Sale ({selectedPokasForSale.length} Pokas)
              </Button>
            </div>
          </form>
        </StockEntryDialog>

        {/* Transfer to Birgunj Dialog */}
        <StockEntryDialog
          open={transferDialogOpen}
          onOpenChange={setTransferDialogOpen}
          title="Transfer to Birgunj Godown"
          description="Select poka(s) to transfer. These will be added to Birgunj stock automatically."
        >
          <form onSubmit={handleTransferSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transfer-date">Date</Label>
                <Input
                  id="transfer-date"
                  type="date"
                  defaultValue={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div className="space-y-2">
                <Label>Available Stock</Label>
                <Input
                  value={`${totalKg.toLocaleString()} kg / ${totalMeter.toLocaleString()} mtr`}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Select Pokas for Transfer</Label>
              <div className="border border-border rounded-lg max-h-60 overflow-y-auto">
                {allBiratnagarPokas.length === 0 ? (
                  <p className="p-4 text-sm text-muted-foreground text-center">No pokas available</p>
                ) : (
                  allBiratnagarPokas.map((poka) => (
                    <div 
                      key={poka.id} 
                      className="flex items-center gap-3 p-3 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer"
                      onClick={() => togglePokaForTransfer(poka.id)}
                    >
                      <Checkbox 
                        checked={selectedPokasForTransfer.includes(poka.id)}
                        onCheckedChange={() => togglePokaForTransfer(poka.id)}
                      />
                      <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                        <span className="font-mono font-medium text-primary">{poka.pokaNo}</span>
                        <span>{poka.shadeNo}</span>
                        <span>{poka.meter} mtr</span>
                        <span>{poka.kg} kg</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {selectedPokasForTransfer.length > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <Label className="text-xs text-muted-foreground">Transfer Summary</Label>
                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pokas:</span>
                    <div className="font-bold text-accent">{getSelectedTransferSummary().count}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Meter:</span>
                    <div className="font-bold">{getSelectedTransferSummary().meter.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Kg:</span>
                    <div className="font-bold">{getSelectedTransferSummary().kg.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => { setTransferDialogOpen(false); setSelectedPokasForTransfer([]); }}>
                Cancel
              </Button>
              <Button type="submit" disabled={selectedPokasForTransfer.length === 0}>
                Transfer ({selectedPokasForTransfer.length} Pokas)
              </Button>
            </div>
          </form>
        </StockEntryDialog>
      </div>
    </Layout>
  );
}
