<script lang="ts">
  import type { Site } from '$lib/types';
  import { formatCurrency, formatNumber } from '$lib/data';
  import { ExternalLink, PlugZap, Eye } from 'lucide-svelte';
  
  interface Props {
    sites: Site[];
  }
  
  let { sites }: Props = $props();
  console.log(sites);
  
</script>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Site</th>
        <th>Visitantes</th>
        <th>Vendas</th>
        <th>Faturamento</th>
        <th>Conversão</th>
        <th>Campanhas</th>
        <th>Integração</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each sites as site}
        <tr>
          <td>
            <div class="site-info">
              <span class="site-name">{site.name}</span>
              <a href={site.domain} target="_blank" rel="noopener" class="site-url">
                {site.domain.replace('https://', '')}
                <ExternalLink size={12} />
              </a>
            </div>
          </td>
          <td>
            <span class="metric-value">{formatNumber(site.totalVisitors)}</span>
          </td>
          <td>
            <span class="metric-value">{formatNumber(site.sales)}</span>
          </td>
          <td>
            <span class="metric-value">{formatCurrency(site.revenue)}</span>
          </td>
          <td>
            <span class="metric-value">
              {site.totalVisitors > 0 ? ((site.sales / site.totalVisitors) * 100).toFixed(2) : 0.00}%
            </span>
          </td>
          <td>
            <span class="badge badge-primary">{site.campaignsActive} ativas</span>
          </td>
          <td>
            {#if site.metaConnected}
              <span class="badge badge-success">
                <PlugZap size={12} />
                Conectado
              </span>
            {:else}
              <span class="badge badge-muted">
                Desconectado
              </span>
            {/if}
          </td>
          <td>
            <a href="/sites/{site.id}" class="btn btn-secondary btn-sm">
              <Eye size={16} />
              Ver
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .site-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .site-name {
    font-weight: 600;
    color: var(--text-strong);
  }
  
  .site-url {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: var(--muted);
  }
  
  .site-url:hover {
    color: var(--primary);
  }
  
  td .metric-value {
    font-size: 0.9375rem;
  }
</style>
