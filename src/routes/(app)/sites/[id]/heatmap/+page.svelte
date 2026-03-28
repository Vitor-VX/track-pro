<script lang="ts">
  import { page } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import HeatmapScroll from '$lib/components/HeatmapScroll.svelte';
  import InsightCard from '$lib/components/InsightCard.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { sites, getHeatmapData, formatNumber } from '$lib/data';
  import { ArrowLeft, Filter, Calendar, Activity } from 'lucide-svelte';
  
  const siteId = $derived($page.params.id);
  const site = $derived(sites.find(s => s.id === siteId));
  const heatmapData = $derived(getHeatmapData(siteId));
  
  const insights = $derived([
    `Você perde ${100 - heatmapData[1]?.percentage || 0}% dos usuários antes de 50% da página.`,
    `Apenas ${heatmapData[heatmapData.length - 1]?.percentage || 0}% chegam ao final da oferta.`,
    'Considere mover o CTA principal para uma área mais alta da página.',
    'Elementos importantes devem estar visíveis antes dos 50% de scroll.'
  ]);
</script>

{#if site}
  <Header 
    title="Heatmap - {site.name}" 
    breadcrumb={[
      { label: 'Sites', href: '/sites' },
      { label: site.name, href: '/sites/' + siteId },
      { label: 'Heatmap' }
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
      <p>Visualize até onde os usuários rolam na sua página. Áreas mais quentes indicam maior engajamento.</p>
    </section>
    
    <div class="heatmap-grid">
      <section class="heatmap-visualization card">
        <h3>Profundidade de Scroll</h3>
        <div class="heatmap-content">
          <HeatmapScroll data={heatmapData} />
        </div>
      </section>
      
      <section class="heatmap-stats">
        <div class="stat-card card">
          <span class="stat-label">Scroll até 25%</span>
          <span class="stat-value">{heatmapData[0]?.percentage || 0}%</span>
          <span class="stat-users">{formatNumber(Math.round((heatmapData[0]?.percentage || 0) * 28.47))} usuários</span>
        </div>
        <div class="stat-card card">
          <span class="stat-label">Scroll até 50%</span>
          <span class="stat-value">{heatmapData[1]?.percentage || 0}%</span>
          <span class="stat-users">{formatNumber(Math.round((heatmapData[1]?.percentage || 0) * 28.47))} usuários</span>
        </div>
        <div class="stat-card card">
          <span class="stat-label">Scroll até 75%</span>
          <span class="stat-value">{heatmapData[2]?.percentage || 0}%</span>
          <span class="stat-users">{formatNumber(Math.round((heatmapData[2]?.percentage || 0) * 28.47))} usuários</span>
        </div>
        <div class="stat-card card">
          <span class="stat-label">Scroll até 100%</span>
          <span class="stat-value">{heatmapData[3]?.percentage || 0}%</span>
          <span class="stat-users">{formatNumber(Math.round((heatmapData[3]?.percentage || 0) * 28.47))} usuários</span>
        </div>
      </section>
    </div>
    
    <section class="insights-section">
      <InsightCard insights={insights} />
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
        onAction={() => window.location.href = '/sites'}
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
