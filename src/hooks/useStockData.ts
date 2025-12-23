import { useState, useMemo } from 'react';
import {
  YarnStock,
  UnfinishedGoods,
  FinishedGoodsBiratnagar,
  BirgunGodownStock,
  DashboardStats,
  PokaItem,
} from '@/types/stock';
import { format, subDays } from 'date-fns';

// Generate mock poka items
const generatePokaItems = (count: number, prefix: string): PokaItem[] => {
  const shades = ['SH-01', 'SH-02', 'SH-03', 'SH-04', 'SH-05', 'SH-06', 'SH-07', 'SH-08'];
  const items: PokaItem[] = [];
  
  for (let i = 1; i <= count; i++) {
    const meter = Math.floor(Math.random() * 300) + 100;
    const kg = Math.round(meter / 4.5);
    items.push({
      id: `${prefix}-poka-${i}`,
      pokaNo: `P-${prefix.toUpperCase()}-${String(i).padStart(3, '0')}`,
      shadeNo: shades[Math.floor(Math.random() * shades.length)],
      meter,
      kg,
    });
  }
  
  return items;
};

// Mock data generators
const generateMockYarnStock = (): YarnStock[] => {
  const data: YarnStock[] = [];
  let balance = 5000;

  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const opening = balance;
    const purchase = Math.floor(Math.random() * 500) + 200;
    const total = opening + purchase;
    const consumption = Math.floor(Math.random() * 400) + 300;
    const wastage = Math.floor(Math.random() * 20) + 5;
    balance = total - consumption - wastage;

    data.push({
      id: `yarn-${i}`,
      date,
      openingBalance: opening,
      purchase,
      total,
      consumption,
      wastage,
      balance,
    });
  }

  return data.reverse();
};

const generateMockUnfinishedGoods = (): UnfinishedGoods[] => {
  const data: UnfinishedGoods[] = [];
  let balance = 3000;

  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const opening = balance;
    const receive = Math.floor(Math.random() * 300) + 200;
    const total = opening + receive;
    const finishedGoodsKg = Math.floor(Math.random() * 250) + 150;
    const finishedGoodsMeter = finishedGoodsKg * 4.5;
    balance = total - finishedGoodsKg;

    data.push({
      id: `unfinished-${i}`,
      date,
      openingBalance: opening,
      receive,
      total,
      finishedGoodsMeter: Math.round(finishedGoodsMeter),
      finishedGoodsKg,
      balance,
    });
  }

  return data.reverse();
};

const generateMockBiratnagarStock = (): FinishedGoodsBiratnagar[] => {
  const data: FinishedGoodsBiratnagar[] = [];
  let pokaCounter = 1;

  for (let i = 6; i >= 0; i--) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    const pokaCount = Math.floor(Math.random() * 8) + 5;
    const pokaItems = generatePokaItems(pokaCount, `BT-${6-i}`);
    
    const totalMeter = pokaItems.reduce((sum, p) => sum + p.meter, 0);
    const totalKg = pokaItems.reduce((sum, p) => sum + p.kg, 0);
    
    const salesKg = Math.floor(Math.random() * 100) + 50;
    const salesMeter = Math.round(salesKg * 4.5);
    const transferKg = Math.floor(Math.random() * 80) + 30;
    const transferMeter = Math.round(transferKg * 4.5);

    data.push({
      id: `biratnagar-${i}`,
      date,
      openingBalanceMeter: 0,
      openingBalanceKg: 0,
      productionMeter: totalMeter,
      productionKg: totalKg,
      salesMeter,
      salesKg,
      transferMeter,
      transferKg,
      balanceMeter: totalMeter - salesMeter - transferMeter,
      balanceKg: totalKg - salesKg - transferKg,
      pokaItems,
    });
    
    pokaCounter += pokaCount;
  }

  return data.reverse();
};

const generateMockBirgunStock = (biratnagarData: FinishedGoodsBiratnagar[]): BirgunGodownStock[] => {
  const data: BirgunGodownStock[] = [];
  let balanceMeter = 8000;
  let balanceKg = 1800;

  biratnagarData.forEach((btItem, i) => {
    const openingMeter = balanceMeter;
    const openingKg = balanceKg;
    const receivedMeter = btItem.transferMeter;
    const receivedKg = btItem.transferKg;
    const totalMeter = openingMeter + receivedMeter;
    const totalKg = openingKg + receivedKg;
    const salesKg = Math.floor(Math.random() * 60) + 20;
    const salesMeter = Math.round(salesKg * 4.5);
    
    // Generate poka items for Birgunj
    const pokaCount = Math.floor(Math.random() * 6) + 3;
    const pokaItems = generatePokaItems(pokaCount, `BG-${i}`);

    balanceMeter = totalMeter - salesMeter;
    balanceKg = totalKg - salesKg;

    data.push({
      id: `birgun-${i}`,
      date: btItem.date,
      openingBalanceMeter: Math.round(openingMeter),
      openingBalanceKg: Math.round(openingKg),
      receivedMeter: Math.round(receivedMeter),
      receivedKg: Math.round(receivedKg),
      totalAvailableMeter: Math.round(totalMeter),
      totalAvailableKg: Math.round(totalKg),
      salesMeter,
      salesKg,
      balanceMeter: Math.round(balanceMeter),
      balanceKg: Math.round(balanceKg),
      pokaItems,
    });
  });

  return data;
};

export function useStockData() {
  const [yarnStock] = useState<YarnStock[]>(generateMockYarnStock);
  const [unfinishedGoods] = useState<UnfinishedGoods[]>(generateMockUnfinishedGoods);
  const [biratnagarStock] = useState<FinishedGoodsBiratnagar[]>(generateMockBiratnagarStock);

  const birgunStock = useMemo(
    () => generateMockBirgunStock(biratnagarStock),
    [biratnagarStock]
  );

  // Get all poka items across both godowns
  const allBiratnagarPokas = useMemo(() => {
    return biratnagarStock.flatMap(s => s.pokaItems);
  }, [biratnagarStock]);

  const allBirgunPokas = useMemo(() => {
    return birgunStock.flatMap(s => s.pokaItems);
  }, [birgunStock]);

  const dashboardStats = useMemo<DashboardStats>(() => {
    const latestYarn = yarnStock[yarnStock.length - 1];
    const latestUnfinished = unfinishedGoods[unfinishedGoods.length - 1];
    const latestBiratnagar = biratnagarStock[biratnagarStock.length - 1];
    const latestBirgun = birgunStock[birgunStock.length - 1];

    return {
      yarnBalance: latestYarn?.balance ?? 0,
      unfinishedBalance: latestUnfinished?.balance ?? 0,
      biratnagarMeter: latestBiratnagar?.balanceMeter ?? 0,
      biratnagarKg: latestBiratnagar?.balanceKg ?? 0,
      birgunMeter: latestBirgun?.balanceMeter ?? 0,
      birgunKg: latestBirgun?.balanceKg ?? 0,
      todayProduction: latestBiratnagar?.productionKg ?? 0,
      todayTransfers: latestBiratnagar?.transferKg ?? 0,
      todaySales:
        (latestBiratnagar?.salesKg ?? 0) + (latestBirgun?.salesKg ?? 0),
    };
  }, [yarnStock, unfinishedGoods, biratnagarStock, birgunStock]);

  return {
    yarnStock,
    unfinishedGoods,
    biratnagarStock,
    birgunStock,
    allBiratnagarPokas,
    allBirgunPokas,
    dashboardStats,
  };
}
