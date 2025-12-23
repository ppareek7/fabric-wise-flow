import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { PokaItem } from '@/types/stock';

interface PokaEntryFormProps {
  onAddPoka: (poka: Omit<PokaItem, 'id'>) => void;
  pendingPokas: PokaItem[];
  onRemovePoka: (id: string) => void;
}

export function PokaEntryForm({ onAddPoka, pendingPokas, onRemovePoka }: PokaEntryFormProps) {
  const [pokaNo, setPokaNo] = useState('');
  const [shadeNo, setShadeNo] = useState('');
  const [meter, setMeter] = useState('');
  const [kg, setKg] = useState('');

  const handleAdd = () => {
    if (!pokaNo || !shadeNo || !meter || !kg) return;
    
    onAddPoka({
      pokaNo,
      shadeNo,
      meter: parseFloat(meter),
      kg: parseFloat(kg),
    });
    
    // Reset form but keep shade for convenience
    setPokaNo('');
    setMeter('');
    setKg('');
  };

  const totalMeter = pendingPokas.reduce((sum, p) => sum + p.meter, 0);
  const totalKg = pendingPokas.reduce((sum, p) => sum + p.kg, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="pokaNo" className="text-xs">Poka No</Label>
          <Input
            id="pokaNo"
            value={pokaNo}
            onChange={(e) => setPokaNo(e.target.value)}
            placeholder="P-001"
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="shadeNo" className="text-xs">Shade No</Label>
          <Input
            id="shadeNo"
            value={shadeNo}
            onChange={(e) => setShadeNo(e.target.value)}
            placeholder="SH-01"
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="meter" className="text-xs">Meter</Label>
          <Input
            id="meter"
            type="number"
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
            placeholder="0"
            className="h-9"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="kg" className="text-xs">Kg</Label>
          <div className="flex gap-2">
            <Input
              id="kg"
              type="number"
              value={kg}
              onChange={(e) => setKg(e.target.value)}
              placeholder="0"
              className="h-9"
            />
            <Button type="button" size="sm" onClick={handleAdd} className="h-9 px-3">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {pendingPokas.length > 0 && (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground flex justify-between">
            <span>Added Pokas ({pendingPokas.length})</span>
            <span>Total: {totalMeter.toLocaleString()} mtr | {totalKg.toLocaleString()} kg</span>
          </div>
          <div className="max-h-[150px] overflow-y-auto">
            {pendingPokas.map((poka) => (
              <div key={poka.id} className="flex items-center justify-between px-3 py-2 border-t border-border text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-mono font-medium text-primary">{poka.pokaNo}</span>
                  <span className="text-muted-foreground">{poka.shadeNo}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{poka.meter} mtr</span>
                  <span>{poka.kg} kg</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    onClick={() => onRemovePoka(poka.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
