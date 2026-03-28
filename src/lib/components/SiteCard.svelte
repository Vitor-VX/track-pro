<script lang="ts">
  import type { Site } from '$lib/types';
  import { formatCurrency, formatNumber } from '$lib/data';
  import { addToast } from '$lib/stores';
  import { ExternalLink, PlugZap, Copy, Settings, Trash2, Eye, Users, ShoppingCart, BadgeDollarSign, Megaphone } from 'lucide-svelte';
  
  interface Props {
    site: Site;
    onDelete: (id: string) => void;
  }
  
  let { site, onDelete }: Props = $props();
  
  function copyScript() {
    const script = `<script src="https://trackyflow.sbs/api/v1/script/tracker.js" data-site-id="${site.id}"><\/script>`;
    navigator.clipboard.writeText(script);
    addToast('Script copiado com sucesso!', 'success');
  }
</script>

<div class="site-card card">
  <div class="card-header">
    <div class="site-info">
      <h4 class="site-name">{site.name}</h4>
      <a href={site.url} target="_blank" rel="noopener" class="site-url">
        {site.url.replace('https://', '')}
        <ExternalLink size={12} />
      </a>
    </div>
    <div class="site-badges">
      {#if site.status === 'active'}
        <span class="badge badge-success">Ativo</span>
      {:else}
        <span class="badge badge-muted">Inativo</span>
      {/if}
      {#if site.metaConnected}
        <span class="badge badge-primary">
          <PlugZap size={12} />
          Meta
        </span>
      {/if}
    </div>
  </div>
  
  <div class="card-metrics">
    <div class="metric-item">
      <Users size={16} class="metric-icon" />
      <div class="metric-data">
        <span class="metric-value">{formatNumber(site.visitorsToday)}</span>
        <span class="metric-label">visitantes</span>
      </div>
    </div>
    <div class="metric-item">
      <ShoppingCart size={16} class="metric-icon" />
      <div class="metric-data">
        <span class="metric-value">{formatNumber(site.salesToday)}</span>
        <span class="metric-label">vendas</span>
      </div>
    </div>
    <div class="metric-item">
      <BadgeDollarSign size={16} class="metric-icon" />
      <div class="metric-data">
        <span class="metric-value">{formatCurrency(site.revenueToday)}</span>
        <span class="metric-label">faturamento</span>
      </div>
    </div>
    <div class="metric-item">
      <Megaphone size={16} class="metric-icon" />
      <div class="metric-data">
        <span class="metric-value">{site.campaignsActive}</span>
        <span class="metric-label">campanhas</span>
      </div>
    </div>
  </div>
  
  <div class="card-footer">
    <div class="footer-info">
      <span class="last-update">Atualizado {new Date(site.lastUpdated).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
    </div>
    <div class="footer-actions">
      <a href="/sites/{site.id}" class="btn btn-primary btn-sm">
        <Eye size={16} />
        Acessar
      </a>
      <button class="btn btn-secondary btn-sm btn-icon" onclick={copyScript} title="Copiar Script">
        <Copy size={16} />
      </button>
      <a href="/sites/{site.id}#meta" class="btn btn-secondary btn-sm btn-icon" title="Configurar Meta">
        <Settings size={16} />
      </a>
      <button class="btn btn-ghost btn-sm btn-icon" onclick={() => onDelete(site.id)} title="Excluir">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
</div>

<style>
  .site-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  
  .site-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .site-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-strong);
  }
  
  .site-url {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8125rem;
    color: var(--muted);
  }
  
  .site-url:hover {
    color: var(--primary);
  }
  
  .site-badges {
    display: flex;
    gap: 8px;
  }
  
  .card-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .metric-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--card-2);
    border-radius: var(--radius-sm);
  }
  
  :global(.metric-item .metric-icon) {
    color: var(--muted);
  }
  
  .metric-data {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .metric-value {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-strong);
  }
  
  .metric-label {
    font-size: 0.6875rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }
  
  .last-update {
    font-size: 0.75rem;
    color: var(--muted);
  }
  
  .footer-actions {
    display: flex;
    gap: 8px;
  }
</style>
