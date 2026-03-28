<script lang="ts">
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import MetricCard from "$lib/components/MetricCard.svelte";
  import LineChart from "$lib/components/LineChart.svelte";
  import FunnelChart from "$lib/components/FunnelChart.svelte";
  import InsightCard from "$lib/components/InsightCard.svelte";
  import CampaignTable from "$lib/components/CampaignTable.svelte";
  import ScriptBox from "$lib/components/ScriptBox.svelte";
  import EmptyState from "$lib/components/EmptyState.svelte";
  import {
    getCampaignsBySite,
    getMetaIntegration,
    getTrafficSources,
    formatCurrency,
    formatNumber,
    formatPercentage,
  } from "$lib/data";
  import { addToast } from "$lib/stores";
  import {
    Users,
    MonitorPlay,
    ShoppingCart,
    BadgeDollarSign,
    TrendingUp,
    Wallet,
    Clock,
    MousePointerClick,
    LogOut as LogOutIcon,
    ShoppingBag,
    RefreshCw,
    Filter,
    Copy,
    Activity,
    Download,
    PlugZap,
    Megaphone,
    DollarSign,
    Target,
    Eye,
    BarChart3,
    ExternalLink,
  } from "lucide-svelte";
  import { formatDate } from "$lib/utils/formatDate.js";
  import type { ChartDataPoint } from "$lib/types.js";

  const siteId = $derived($page.params.id);
  let { data } = $props();

  function formatChartData(rawData: any[]): ChartDataPoint[] {
    if (!rawData) return [];
    const data = rawData.map((item) => ({
      date: formatDate(item.date),
      visits: Number(item.visits) || 0,
      sales: Number(item.sales) || 0,
    }));
    return data;
  }

  export function formatFunnelData(data: any[]): any[] {
    if (!data || data.length === 0) return [];

    const stageNames: Record<string, string> = {
      page_view: "Visitas",
      scroll_25: "Scroll 25%",
      scroll_50: "Scroll 50%",
      scroll_75: "Scroll 75%",
      scroll_100: "Scroll 100%",
      cta_click: "Clique CTA",
      checkout_start: "Checkout",
      purchase: "Compra",
    };

    return data.map((item, index) => {
      const prev = data[index - 1];

      const dropRate =
        index === 0 || !prev?.count
          ? 0
          : Number((((prev.count - item.count) / prev.count) * 100).toFixed(1));

      return {
        name: stageNames[item.stage] || item.stage,
        value: item.count,
        percentage: item.percent,
        dropRate,
      };
    });
  }

  const metrics = {
    ...data.metrics,
    sales: data.metrics.conversions,
  };
  const behavior = data.behavior;
  const chartData = formatChartData(data.chart);
  const site = data.site;
  const funnel = data.funnel;
  const source = data.source;

  // console.log(source);

  // console.log(metrics);
  console.log(chartData);
  // console.log(site);
  // console.log(behavior);
  // console.log(funnel);

  // const metrics = $derived(getSiteMetrics(siteId));
  const funnelData = $derived(formatFunnelData(funnel));
  const campaigns = $derived(getCampaignsBySite("siteId"));
  const metaIntegration = $derived(getMetaIntegration("siteId"));
  const trafficSources = $derived(getTrafficSources("siteId"));

  const activeCampaigns = $derived(
    campaigns.filter((c) => c.status === "active"),
  );
  const totalSpend = $derived(campaigns.reduce((sum, c) => sum + c.spend, 0));
  const totalRevenue = $derived(
    campaigns.reduce((sum, c) => sum + c.revenue, 0),
  );
  const totalSales = $derived(campaigns.reduce((sum, c) => sum + c.sales, 0));
  const overallROI = $derived(totalSpend > 0 ? totalRevenue / totalSpend : 0);

  const funnelInsights = $derived([
    "A maior queda acontece entre Scroll 50% e Scroll 75%.",
    `Apenas ${funnelData[funnelData.length - 1]?.percentage?.toFixed(1) || 0}% dos visitantes convertem em compra.`,
    "Considere mover o CTA principal para uma área mais alta da página.",
  ]);

  function copyScript() {
    const script = `<script src="https://trackyflow.sbs/api/v1/script/tracker.js" data-site-id="${siteId}"><\/script>`;
    navigator.clipboard.writeText(script);
    addToast("Script copiado!", "success");
  }
</script>

{#if site}
  <Header
    title={site.domain}
    breadcrumb={[{ label: "Sites", href: "/sites" }, { label: site.name }]}
  />

  <div class="page-content">
    <section class="site-header-section">
      <div class="site-info-box">
        <div class="site-details">
          <a href={site.domain} target="_blank" rel="noopener" class="site-url">
            {site.domain}
            <ExternalLink size={14} />
          </a>
          <div class="site-badges">
            {#if site.trackerEnabled}
              <span class="badge badge-success">Tracker Ativo</span>
            {:else}
              <span class="badge badge-muted">Tracker Inativo</span>
            {/if}
            {#if site.metaConnected}
              <span class="badge badge-primary">
                <PlugZap size={12} />
                Meta Conectado
              </span>
            {/if}
            {#if site.pixelId}
              <span class="badge badge-muted">Pixel: {site.pixelId}</span>
            {/if}
          </div>
        </div>
        <div class="site-actions">
          <button class="btn btn-secondary btn-sm" onclick={copyScript}>
            <Copy size={16} />
            Copiar Script
          </button>
          <button class="btn btn-secondary btn-sm">
            <RefreshCw size={16} />
            Atualizar
          </button>
          <button class="btn btn-secondary btn-sm">
            <Filter size={16} />
            Filtrar
          </button>
          <a href="/sites/{siteId}/heatmap" class="btn btn-secondary btn-sm">
            <Activity size={16} />
            Heatmap
          </a>
        </div>
      </div>
    </section>

    {#if metaIntegration}
      <section class="meta-section card">
        <div class="meta-header">
          <div class="meta-title">
            <Megaphone size={20} />
            <span>Integração Meta Ads</span>
          </div>
          <span class="badge badge-success">Conectado</span>
        </div>
        <div class="meta-details">
          <div class="meta-item">
            <span class="meta-label">Pixel ID</span>
            <span class="meta-value">{metaIntegration.pixelId}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Conta de Anúncios</span>
            <span class="meta-value">{metaIntegration.adAccountId}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Campanhas Sincronizadas</span>
            <span class="meta-value">{metaIntegration.campaignsSynced}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Última Sincronização</span>
            <span class="meta-value"
              >{new Date(metaIntegration.lastSync).toLocaleString(
                "pt-BR",
              )}</span
            >
          </div>
        </div>
      </section>
    {:else}
      <section class="meta-section card">
        <EmptyState
          icon={PlugZap}
          title="Meta não conectado"
          description="Conecte sua conta Meta Ads para visualizar métricas de campanhas em tempo real."
          actionLabel="Conectar Meta"
          onAction={() => addToast("Função em desenvolvimento", "info")}
        />
      </section>
    {/if}

    <!-- Main Metrics -->
    <section class="metrics-section">
      <h3 class="section-title">Métricas Principais</h3>
      <div class="grid grid-6">
        <MetricCard
          title="Visitantes"
          value={formatNumber(metrics.visitors)}
          change={8.5}
          icon={Users}
          iconColor="var(--primary)"
        />
        <MetricCard
          title="Sessões"
          value={formatNumber(metrics.sessions)}
          change={12.3}
          icon={MonitorPlay}
          iconColor="#8b5cf6"
        />
        <MetricCard
          title="Vendas"
          value={formatNumber(metrics.sales)}
          change={15.2}
          icon={ShoppingCart}
          iconColor="var(--success)"
        />
        <MetricCard
          title="Faturamento"
          value={formatCurrency(metrics.revenue)}
          change={22.4}
          icon={BadgeDollarSign}
          iconColor="#f59e0b"
        />
        <MetricCard
          title="Conversão"
          value={formatPercentage(metrics.conversionRate)}
          change={3.1}
          icon={TrendingUp}
          iconColor="#06b6d4"
        />
        <MetricCard
          title="Ticket Médio"
          value={formatCurrency(metrics.averageTicket)}
          change={5.8}
          icon={Wallet}
          iconColor="#ec4899"
        />
      </div>
    </section>

    <!-- Behavior Metrics -->
    <section class="metrics-section">
      <h3 class="section-title">Métricas de Comportamento</h3>
      <div class="grid grid-6">
        <MetricCard
          title="Tempo Médio"
          value={behavior.averageTimeSeconds}
          change={4.2}
          icon={Clock}
          iconColor="var(--primary)"
        />
        <MetricCard
          title="Scroll Médio"
          value={behavior.scrollRate + "%"}
          change={2.1}
          icon={Activity}
          iconColor="#8b5cf6"
        />
        <MetricCard
          title="Taxa de Rejeição"
          value={behavior.rejectionRate + "%"}
          change={-5.3}
          icon={LogOutIcon}
          iconColor="var(--danger)"
        />
        <MetricCard
          title="Cliques CTA"
          value={formatNumber(behavior.ctaClicks)}
          change={18.5}
          icon={MousePointerClick}
          iconColor="var(--success)"
        />
        <MetricCard
          title="Início Checkout"
          value={formatNumber(behavior.checkoutStart)}
          change={12.8}
          icon={ShoppingBag}
          iconColor="#f59e0b"
        />
        <MetricCard
          title="Abandono Checkout"
          value={formatNumber(behavior.checkoutAbandonment) + "%"}
          change={-8.2}
          icon={ShoppingCart}
          iconColor="#ef4444"
        />
      </div>
    </section>

    <section class="funnel-section">
      <div class="card-funnel">
        <h3 class="section-title">Funil de Conversão</h3>
        <div class="funnel-content">
          <FunnelChart data={funnelData} />
        </div>
        <div class="mt-6">
          <InsightCard insights={funnelInsights} />
        </div>
      </div>
    </section>

    <section class="campaigns-section">
      <div class="section-header">
        <h3 class="section-title">Campanhas Facebook Ads</h3>
        <div class="section-actions">
          <button class="btn btn-secondary btn-sm">
            <Filter size={16} />
            Filtrar
          </button>
          <button class="btn btn-secondary btn-sm">
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      <!-- Campaign Summary Cards -->
      <div class="grid grid-4 mb-6">
        <div class="summary-card card-2">
          <div
            class="summary-icon"
            style="background: var(--primary-soft); color: var(--primary)"
          >
            <Megaphone size={20} />
          </div>
          <div class="summary-data">
            <span class="summary-value">{activeCampaigns.length}</span>
            <span class="summary-label">Campanhas Ativas</span>
          </div>
        </div>
        <div class="summary-card card-2">
          <div
            class="summary-icon"
            style="background: var(--danger-soft); color: var(--danger)"
          >
            <DollarSign size={20} />
          </div>
          <div class="summary-data">
            <span class="summary-value">{formatCurrency(totalSpend)}</span>
            <span class="summary-label">Investimento</span>
          </div>
        </div>
        <div class="summary-card card-2">
          <div
            class="summary-icon"
            style="background: var(--success-soft); color: var(--success)"
          >
            <BadgeDollarSign size={20} />
          </div>
          <div class="summary-data">
            <span class="summary-value">{formatCurrency(totalRevenue)}</span>
            <span class="summary-label">Receita</span>
          </div>
        </div>
        <div class="summary-card card-2">
          <div
            class="summary-icon"
            style="background: var(--warning-soft); color: var(--warning)"
          >
            <Target size={20} />
          </div>
          <div class="summary-data">
            <span class="summary-value">{overallROI.toFixed(2)}x</span>
            <span class="summary-label">ROI Geral</span>
          </div>
        </div>
      </div>

      {#if campaigns.length > 0}
        <CampaignTable {campaigns} />
      {:else}
        <div class="card">
          <EmptyState
            icon={Megaphone}
            title="Nenhuma campanha sincronizada"
            description="Conecte sua conta Meta Ads para visualizar suas campanhas aqui."
          />
        </div>
      {/if}
    </section>

    <section class="chart-section">
      <div class="card">
        <h3 class="section-title">Performance dos Últimos 7 Dias</h3>
        <LineChart data={chartData} height={300} />
      </div>
    </section>

    <!-- Traffic Sources -->
    <section class="traffic-section">
      <div class="card">
        <h3 class="section-title">Origem do Tráfego</h3>
        <div class="traffic-list">
          {#each source as s}
            <div class="traffic-item">
              <div class="traffic-info">
                <span class="traffic-name">{s.source}</span>
                <span class="traffic-percentage"
                  >{s.visitsPercent.toFixed(1)}%</span
                >
              </div>
              <div class="traffic-bar">
                <div
                  class="traffic-fill"
                  style="width: {s.visitsPercent}%"
                ></div>
              </div>
              <div class="traffic-stats">
                <span>{formatNumber(s.visits)} visitas</span>
                <span>{formatNumber(s.sales)} vendas</span>
                <span>{formatCurrency(s.revenue)}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section class="script-section">
      <ScriptBox {siteId} />
    </section>
  </div>
{:else}
  <Header title="Site não encontrado" />
  <div class="page-content">
    <div class="card">
      <EmptyState
        icon={Eye}
        title="Site não encontrado"
        description="O site que você está procurando não existe ou foi removido."
        actionLabel="Voltar para Sites"
        onAction={() => (window.location.href = "/sites")}
      />
    </div>
  </div>
{/if}

<style>
  .site-header-section {
    margin-bottom: 24px;
  }

  .site-info-box {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  .site-url {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9375rem;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .site-url:hover {
    color: var(--primary);
  }

  .site-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .site-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .meta-section {
    margin-bottom: 24px;
  }

  .meta-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .meta-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    color: var(--text-strong);
  }

  .meta-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-label {
    font-size: 0.75rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .meta-value {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: var(--text-strong);
  }

  .section-title {
    font-size: 1.125rem;
    margin-bottom: 20px;
  }

  .metrics-section {
    margin-bottom: 32px;
  }

  .funnel-section {
    margin-bottom: 32px;
  }

  .card-funnel {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow-sm);
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
    overflow: hidden;
    min-width: 0;
  }

  .funnel-content {
    overflow: hidden;
    width: 100%;
    min-width: 0;
    padding: 20px 0;
  }

  .funnel-chart-wrapper {
    overflow: hidden;
    width: 100%;
    min-width: 0;
  }

  .campaigns-section {
    margin-bottom: 32px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .section-actions {
    display: flex;
    gap: 8px;
  }

  .summary-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .summary-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .summary-data {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .summary-value {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-strong);
  }

  .summary-label {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .chart-section {
    margin-bottom: 32px;
  }

  .traffic-section {
    margin-bottom: 32px;
  }

  .traffic-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .traffic-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .traffic-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .traffic-name {
    font-weight: 500;
    color: var(--text);
  }

  .traffic-percentage {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--muted);
  }

  .traffic-bar {
    height: 8px;
    background: var(--card-2);
    border-radius: 4px;
    overflow: hidden;
  }

  .traffic-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--primary) 0%,
      var(--primary-2) 100%
    );
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .traffic-stats {
    display: flex;
    gap: 16px;
    font-size: 0.75rem;
    color: var(--muted);
  }

  .script-section {
    margin-bottom: 32px;
  }

  @media (max-width: 768px) {
    .site-info-box {
      flex-direction: column;
      align-items: flex-start;
    }

    .site-actions {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
