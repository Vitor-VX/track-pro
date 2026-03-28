<script lang="ts">
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import HeatmapScroll from "$lib/components/HeatmapScroll.svelte";
  import InsightCard from "$lib/components/InsightCard.svelte";
  import EmptyState from "$lib/components/EmptyState.svelte";
  import { formatNumber } from "$lib/data";
  import { ArrowLeft, Filter, Calendar, Activity } from "lucide-svelte";

  const siteId = $derived($page.params.id);
  let { data } = $props();

  function getScrollStages(funnel: any[]) {
    if (!funnel || funnel.length === 0) return [];

    const scrollStages = ["scroll_25", "scroll_50", "scroll_75", "scroll_100"];

    return scrollStages.map((stage) => {
      const found = funnel.find((f) => f.stage === stage);
      const depth = Number(stage.replace("scroll_", ""));

      return {
        depth,
        count: found?.count || 0,
        percentage: found?.percent || 0,
      };
    });
  }
  
  const heatmapData = $derived(getScrollStages(data.funnel));
  const totalVisitors = $derived(
    data.funnel?.find((f: any) => f.stage === "page_view")?.count || 0,
  );

  const insights = $derived([
    `${heatmapData[0]?.percentage || 0}% dos visitantes rolam até 25% da página.`,
    `Você perde ${100 - (heatmapData[1]?.percentage || 0)}% dos usuários antes de chegar à metade da página.`,
    `Apenas ${heatmapData[2]?.percentage || 0}% chegam até 75% do conteúdo.`,
    "Considere mover o CTA principal para uma área mais alta da página.",
  ]);
</script>

{#if data.funnel && data.site}
  <Header
    title="Heatmap - {data.site.domain}"
    breadcrumb={[
      { label: "Sites", href: "/sites" },
      { label: data.site.domain, href: "/sites/" + siteId },
      { label: "Heatmap" },
    ]}
  />

  <div class="page-content">
    <div class="page-header">
      <a href="/sites/{siteId}" class="btn btn-secondary">
        <ArrowLeft size={18} />
        Voltar ao Dashboard
      </a>
      <div class="header-actions">
        <button class="btn btn-secondary btn-sm">
          <Calendar size={16} />
          Período
        </button>
        <button class="btn btn-secondary btn-sm">
          <Filter size={16} />
          Filtrar
        </button>
      </div>
    </div>

    <section class="heatmap-intro card">
      <h3>Scroll Tracking</h3>
      <p>
        Visualize até onde os usuários rolam na sua página. Áreas mais quentes
        indicam maior engajamento.
      </p>
    </section>

    <div class="heatmap-grid">
      <section class="heatmap-visualization card">
        <h3>Profundidade de Scroll</h3>
        <div class="heatmap-content">
          <HeatmapScroll data={heatmapData} />
        </div>
      </section>

      <section class="heatmap-stats">
        {#each [{ label: "Scroll até 25%", index: 0 }, { label: "Scroll até 50%", index: 1 }, { label: "Scroll até 75%", index: 2 }, { label: "Scroll até 100%", index: 3 }] as item}
          <div class="stat-card card">
            <span class="stat-label">{item.label}</span>
            <span class="stat-value"
              >{heatmapData[item.index]?.percentage || 0}%</span
            >
            <span class="stat-users">
              {formatNumber(heatmapData[item.index]?.count || 0)} de {formatNumber(
                totalVisitors,
              )} usuários
            </span>
          </div>
        {/each}
      </section>
    </div>

    <section class="insights-section">
      <InsightCard {insights} />
    </section>
  </div>
{:else}
  <Header title="Site não encontrado" />
  <div class="page-content">
    <div class="card">
      <EmptyState
        icon={Activity}
        title="Site não encontrado"
        description="O site que você está procurando não existe ou foi removido."
        actionLabel="Voltar para Sites"
        onAction={() => (window.location.href = "/sites")}
      />
    </div>
  </div>
{/if}

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }

  .heatmap-intro {
    margin-bottom: 24px;
  }

  .heatmap-intro h3 {
    font-size: 1.125rem;
    margin-bottom: 8px;
  }

  .heatmap-intro p {
    color: var(--muted);
    font-size: 0.9375rem;
  }

  .heatmap-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 24px;
    margin-bottom: 24px;
  }

  .heatmap-visualization h3 {
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .heatmap-content {
    padding: 20px 0;
  }

  .heatmap-stats {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .stat-label {
    font-size: 0.8125rem;
    color: var(--muted);
    font-weight: 500;
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-strong);
  }

  .stat-users {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .insights-section {
    margin-bottom: 32px;
  }

  @media (max-width: 1024px) {
    .heatmap-grid {
      grid-template-columns: 1fr;
    }

    .heatmap-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .heatmap-stats {
      grid-template-columns: 1fr;
    }
  }
</style>
