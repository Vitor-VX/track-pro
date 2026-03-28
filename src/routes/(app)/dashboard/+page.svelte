<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import MetricCard from "$lib/components/MetricCard.svelte";
  import LineChart from "$lib/components/LineChart.svelte";
  import SiteTable from "$lib/components/SiteTable.svelte";

  import {
    Globe,
    Users,
    ShoppingCart,
    BadgeDollarSign,
    Megaphone,
    TrendingUp,
    Plus,
  } from "lucide-svelte";

  import { formatCurrency, formatNumber, formatPercentage } from "$lib/data";
  import type { ChartDataPoint } from "$lib/types.js";
    import { formatDate } from "$lib/utils/formatDate.js";

  let { data } = $props();

  const overview = data.overview;

  function formatChartData(rawData: any[]): ChartDataPoint[] {
    if (!rawData) return [];
    const data = rawData.map((item) => ({
      date: formatDate(item.date),
      visits: Number(item.visits) || 0,
      sales: Number(item.sales) || 0,
    }));
    return data;
  }

  const metrics = overview.summary;
  const chartData = formatChartData(overview.performance);
  const sites = overview.sites;
</script>

<Header title="Dashboard" />

{#if overview}
  <div class="page-content">
    <div class="page-header">
      <div>
        <p class="page-subtitle">
          Visão geral de todos os seus sites e campanhas
        </p>
      </div>

      <a href="/sites" class="btn btn-primary">
        <Plus size={18} />
        Novo Site
      </a>
    </div>

    <!-- MÉTRICAS -->
    <section class="metrics-section">
      <div class="grid grid-6">
        <MetricCard
          title="Sites Ativos"
          value={metrics.activeSites.toString()}
          icon={Globe}
          iconColor="#6366f1"
        />

        <MetricCard
          title="Visitantes Hoje"
          value={formatNumber(metrics.visitorsToday)}
          icon={Users}
          iconColor="#8b5cf6"
        />

        <MetricCard
          title="Vendas Hoje"
          value={formatNumber(metrics.salesToday)}
          icon={ShoppingCart}
          iconColor="#b45309"
        />

        <MetricCard
          title="Faturamento Hoje"
          value={formatCurrency(metrics.revenueToday)}
          icon={BadgeDollarSign}
          iconColor="#f59e0b"
        />

        <MetricCard
          title="Campanhas Ativas"
          value={"0"}
          icon={Megaphone}
          iconColor="#ec4899"
        />

        <MetricCard
          title="Conversão Média"
          value={formatPercentage(metrics.averageConversionRate)}
          icon={TrendingUp}
          iconColor="#06b6d4"
        />
      </div>
    </section>

    <section class="chart-section">
      <div class="card">
        <div class="card-header">
          <h3>Performance dos Últimos 7 Dias</h3>
        </div>

        <div class="card-body">
          <LineChart data={chartData} height={300} />
        </div>
      </div>
    </section>

    <section class="sites-section">
      <div class="section-header">
        <h3>Seus Sites</h3>
        <a href="/sites" class="btn btn-ghost btn-sm">Ver todos</a>
      </div>

      <SiteTable {sites} />
    </section>
  </div>
{:else}
  <div class="page-content">
    <p>Erro ao carregar dashboard</p>
  </div>
{/if}

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .page-subtitle {
    color: var(--muted);
    font-size: 0.9375rem;
  }

  .metrics-section {
    margin-bottom: 32px;
  }

  .chart-section {
    margin-bottom: 32px;
  }

  .card-header {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 24px;
  }

  .card-header h3 {
    font-size: 1.125rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .section-header h3 {
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
</style>
