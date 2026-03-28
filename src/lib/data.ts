import type { Site, Campaign, SiteMetrics, FunnelStep, HeatmapData, TrafficSource, ChartDataPoint, MetaIntegration, User } from './types';

export const sites: Site[] = [
  // {
  //   id: 'site_001',
  //   name: 'Black Offer',
  //   url: 'https://blackoffer.com.br',
  //   status: 'active',
  //   pixelId: '123456789012345',
  //   metaConnected: true,
  //   visitorsToday: 2847,
  //   salesToday: 47,
  //   revenueToday: 14100,
  //   campaignsActive: 4,
  //   lastUpdated: '2024-01-15T14:30:00Z',
  //   description: 'Oferta principal de emagrecimento'
  // },
  // {
  //   id: 'site_002',
  //   name: 'VSL Emagrecimento',
  //   url: 'https://vslemagrecimento.com',
  //   status: 'active',
  //   pixelId: '234567890123456',
  //   metaConnected: true,
  //   visitorsToday: 1523,
  //   salesToday: 23,
  //   revenueToday: 6900,
  //   campaignsActive: 3,
  //   lastUpdated: '2024-01-15T14:25:00Z',
  //   description: 'VSL de suplemento natural'
  // },
  // {
  //   id: 'site_003',
  //   name: 'Oferta Trader Pro',
  //   url: 'https://traderprooffer.com',
  //   status: 'active',
  //   pixelId: '345678901234567',
  //   metaConnected: true,
  //   visitorsToday: 892,
  //   salesToday: 12,
  //   revenueToday: 9600,
  //   campaignsActive: 2,
  //   lastUpdated: '2024-01-15T14:20:00Z',
  //   description: 'Curso de trading avançado'
  // },
  // {
  //   id: 'site_004',
  //   name: 'Curso Premium X',
  //   url: 'https://cursopremiumx.com.br',
  //   status: 'inactive',
  //   metaConnected: false,
  //   visitorsToday: 0,
  //   salesToday: 0,
  //   revenueToday: 0,
  //   campaignsActive: 0,
  //   lastUpdated: '2024-01-10T10:00:00Z',
  //   description: 'Curso em manutenção'
  // }
];

export const campaigns: Campaign[] = [
  {
    id: 'camp_001',
    siteId: 'site_001',
    name: 'Remarketing - Checkout',
    status: 'active',
    clicks: 4521,
    results: 89,
    visits: 3847,
    sales: 47,
    revenue: 14100,
    spend: 2850,
    cpm: 12.50,
    cpc: 0.63,
    ctr: 3.2,
    roi: 3.95
  },
  {
    id: 'camp_002',
    siteId: 'site_001',
    name: 'Escala - Público Aberto',
    status: 'active',
    clicks: 8934,
    results: 156,
    visits: 7234,
    sales: 32,
    revenue: 9600,
    spend: 4200,
    cpm: 8.90,
    cpc: 0.47,
    ctr: 2.8,
    roi: 1.29
  },
  {
    id: 'camp_003',
    siteId: 'site_001',
    name: 'Lookalike 1%',
    status: 'active',
    clicks: 3245,
    results: 67,
    visits: 2890,
    sales: 18,
    revenue: 5400,
    spend: 1800,
    cpm: 11.20,
    cpc: 0.55,
    ctr: 2.4,
    roi: 2.00
  },
  {
    id: 'camp_004',
    siteId: 'site_001',
    name: 'Conversão - Criativo 03',
    status: 'paused',
    clicks: 1234,
    results: 23,
    visits: 980,
    sales: 5,
    revenue: 1500,
    spend: 890,
    cpm: 14.30,
    cpc: 0.72,
    ctr: 1.9,
    roi: 0.69
  },
  {
    id: 'camp_005',
    siteId: 'site_002',
    name: 'VSL Principal - Escala',
    status: 'active',
    clicks: 5678,
    results: 112,
    visits: 4890,
    sales: 23,
    revenue: 6900,
    spend: 2100,
    cpm: 9.80,
    cpc: 0.37,
    ctr: 3.5,
    roi: 2.29
  },
  {
    id: 'camp_006',
    siteId: 'site_002',
    name: 'Remarketing VSL',
    status: 'active',
    clicks: 2345,
    results: 45,
    visits: 1980,
    sales: 12,
    revenue: 3600,
    spend: 980,
    cpm: 13.40,
    cpc: 0.42,
    ctr: 2.9,
    roi: 2.67
  },
  {
    id: 'camp_007',
    siteId: 'site_003',
    name: 'Trader - Público Frio',
    status: 'active',
    clicks: 2890,
    results: 34,
    visits: 2340,
    sales: 8,
    revenue: 6400,
    spend: 1500,
    cpm: 10.50,
    cpc: 0.52,
    ctr: 2.1,
    roi: 3.27
  },
  {
    id: 'camp_008',
    siteId: 'site_003',
    name: 'Trader - Lookalike',
    status: 'active',
    clicks: 1567,
    results: 28,
    visits: 1290,
    sales: 4,
    revenue: 3200,
    spend: 780,
    cpm: 11.80,
    cpc: 0.50,
    ctr: 2.3,
    roi: 3.10
  }
];

export function getSiteMetrics(siteId: string): SiteMetrics {
  const metricsMap: Record<string, SiteMetrics> = {
    'site_001': {
      visitors: 2847,
      sessions: 3124,
      sales: 47,
      revenue: 14100,
      conversionRate: 1.65,
      averageTicket: 300,
      averageTimeOnPage: '2:34',
      averageScroll: 68,
      bounceRate: 42,
      ctaClicks: 892,
      checkoutStarts: 234,
      checkoutAbandonment: 187
    },
    'site_002': {
      visitors: 1523,
      sessions: 1687,
      sales: 23,
      revenue: 6900,
      conversionRate: 1.51,
      averageTicket: 300,
      averageTimeOnPage: '3:12',
      averageScroll: 72,
      bounceRate: 38,
      ctaClicks: 456,
      checkoutStarts: 112,
      checkoutAbandonment: 89
    },
    'site_003': {
      visitors: 892,
      sessions: 1023,
      sales: 12,
      revenue: 9600,
      conversionRate: 1.35,
      averageTicket: 800,
      averageTimeOnPage: '4:45',
      averageScroll: 81,
      bounceRate: 31,
      ctaClicks: 234,
      checkoutStarts: 67,
      checkoutAbandonment: 55
    }
  };
  return metricsMap[siteId] || metricsMap['site_001'];
}

export function getFunnelData(siteId: string): FunnelStep[] {
  return [
    { name: 'Visitas', value: 2847, percentage: 100, dropRate: 0 },
    { name: 'Scroll 25%', value: 2278, percentage: 80, dropRate: 20 },
    { name: 'Scroll 50%', value: 1538, percentage: 54, dropRate: 32 },
    { name: 'Scroll 75%', value: 854, percentage: 30, dropRate: 44 },
    { name: 'Clique CTA', value: 598, percentage: 21, dropRate: 30 },
    { name: 'Checkout', value: 234, percentage: 8.2, dropRate: 61 },
    { name: 'Compra', value: 47, percentage: 1.65, dropRate: 80 }
  ];
}

export function getHeatmapData(siteId: string): HeatmapData[] {
  return [
    { depth: 25, percentage: 80 },
    { depth: 50, percentage: 54 },
    { depth: 75, percentage: 30 },
    { depth: 100, percentage: 12 }
  ];
}

export function getTrafficSources(siteId: string): TrafficSource[] {
  return [
    { source: 'Facebook / Meta', visits: 1847, sales: 38, revenue: 11400, percentage: 64.9 },
    { source: 'Orgânico', visits: 423, sales: 4, revenue: 1200, percentage: 14.9 },
    { source: 'Direto', visits: 312, sales: 3, revenue: 900, percentage: 11.0 },
    { source: 'Referral', visits: 189, sales: 1, revenue: 300, percentage: 6.6 },
    { source: 'Outros', visits: 76, sales: 1, revenue: 300, percentage: 2.7 }
  ];
}

export function getChartData(siteId: string, days: number = 7): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const baseDate = new Date('2024-01-15');

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      visits: Math.floor(2000 + Math.random() * 1500),
      sales: Math.floor(30 + Math.random() * 40),
      revenue: Math.floor(9000 + Math.random() * 8000),
      spend: Math.floor(1500 + Math.random() * 1500)
    });
  }

  return data;
}

export function getMetaIntegration(siteId: string): MetaIntegration | null {
  const site = sites.find(s => s.id === siteId);
  if (!site?.metaConnected) return null;

  return {
    pixelId: site.pixelId || '',
    adAccountId: 'act_' + Math.random().toString(36).substring(7),
    status: 'connected',
    lastSync: '2024-01-15T14:30:00Z',
    campaignsSynced: campaigns.filter(c => c.siteId === siteId).length
  };
}

export function getCampaignsBySite(siteId: string): Campaign[] {
  return campaigns.filter(c => c.siteId === siteId);
}

export function getTotalMetrics() {
  const activeSites = sites.filter(s => s.status === 'active');
  return {
    totalSites: activeSites.length,
    totalVisitors: activeSites.reduce((sum, s) => sum + s.visitorsToday, 0),
    totalSales: activeSites.reduce((sum, s) => sum + s.salesToday, 0),
    totalRevenue: activeSites.reduce((sum, s) => sum + s.revenueToday, 0),
    totalCampaigns: activeSites.reduce((sum, s) => sum + s.campaignsActive, 0),
    averageConversion: 1.52
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercentage(value: number): string {
  return value.toFixed(2) + '%';
}
