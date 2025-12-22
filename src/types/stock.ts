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
