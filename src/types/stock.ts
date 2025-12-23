export interface YarnStock {
  id: string;
  date: string;
  openingBalance: number;
  purchase: number;
  total: number;
  consumption: number;
  wastage: number;
  balance: number;
}

export interface UnfinishedGoods {
  id: string;
  date: string;
  openingBalance: number;
  receive: number;
  total: number;
  finishedGoodsMeter: number;
  finishedGoodsKg: number;
  balance: number;
}

// Poka (Roll/Bundle) based stock item
export interface PokaItem {
  id: string;
  pokaNo: string;
  shadeNo: string;
  meter: number;
  kg: number;
}

export interface FinishedGoodsBiratnagar {
  id: string;
  date: string;
  openingBalanceMeter: number;
  openingBalanceKg: number;
  productionMeter: number;
  productionKg: number;
  salesMeter: number;
  salesKg: number;
  transferMeter: number;
  transferKg: number;
  balanceMeter: number;
  balanceKg: number;
  // Poka-wise inventory
  pokaItems: PokaItem[];
}

export interface BirgunGodownStock {
  id: string;
  date: string;
  openingBalanceMeter: number;
  openingBalanceKg: number;
  receivedMeter: number;
  receivedKg: number;
  totalAvailableMeter: number;
  totalAvailableKg: number;
  salesMeter: number;
  salesKg: number;
  balanceMeter: number;
  balanceKg: number;
  // Poka-wise inventory
  pokaItems: PokaItem[];
}

export interface DashboardStats {
  yarnBalance: number;
  unfinishedBalance: number;
  biratnagarMeter: number;
  biratnagarKg: number;
  birgunMeter: number;
  birgunKg: number;
  todayProduction: number;
  todayTransfers: number;
  todaySales: number;
}

export type UserRole = 'admin' | 'accountant' | 'store_manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
