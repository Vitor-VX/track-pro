export type Site = {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive';
  pixelId?: string;
  metaConnected: boolean;
  totalVisitors: number;
  sales: number;
  revenue: number;
  campaignsActive: number;
  lastUpdated: string;
  description?: string;
};

export type Campaign = {
  id: string;
  siteId: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  clicks: number;
  results: number;
  visits: number;
  sales: number;
  revenue: number;
  spend: number;
  cpm: number;
  cpc: number;
  ctr: number;
  roi: number;
};

export type SiteMetrics = {
  visitors: number;
  sessions: number;
  sales: number;
  revenue: number;
  conversionRate: number;
  averageTicket: number;
  averageTimeOnPage: string;
  averageScroll: number;
  bounceRate: number;
  ctaClicks: number;
  checkoutStarts: number;
  checkoutAbandonment: number;
};

export type FunnelStep = {
  name: string;
  value: number;
  percentage: number;
  dropRate?: number;
};

export type HeatmapData = {
  depth: number;
  percentage: number;
};

export type TrafficSource = {
  source: string;
  visits: number;
  sales: number;
  revenue: number;
  percentage: number;
};

export type ChartDataPoint = {
  date: string;
  visits: number;
  sales: number;
  revenue?: number;
  spend?: number;
};

export type MetaIntegration = {
  pixelId: string;
  adAccountId: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  campaignsSynced: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
