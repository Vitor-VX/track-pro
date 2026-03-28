<script lang="ts">
  import type { Campaign } from '$lib/types';
  import { formatCurrency, formatNumber } from '$lib/data';
  
  interface Props {
    campaigns: Campaign[];
  }
  
  let { campaigns }: Props = $props();
</script>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Campanha</th>
        <th>Status</th>
        <th>Cliques</th>
        <th>Visitas</th>
        <th>Vendas</th>
        <th>Receita</th>
        <th>Investimento</th>
        <th>CPM</th>
        <th>CPC</th>
        <th>CTR</th>
        <th>ROI</th>
      </tr>
    </thead>
    <tbody>
      {#each campaigns as campaign}
        <tr>
          <td>
            <span class="campaign-name">{campaign.name}</span>
          </td>
          <td>
            {#if campaign.status === 'active'}
              <span class="badge badge-success">Ativo</span>
            {:else if campaign.status === 'paused'}
              <span class="badge badge-warning">Pausado</span>
            {:else}
              <span class="badge badge-muted">Rascunho</span>
            {/if}
          </td>
          <td><span class="metric-value">{formatNumber(campaign.clicks)}</span></td>
          <td><span class="metric-value">{formatNumber(campaign.visits)}</span></td>
          <td><span class="metric-value">{formatNumber(campaign.sales)}</span></td>
          <td><span class="metric-value revenue">{formatCurrency(campaign.revenue)}</span></td>
          <td><span class="metric-value spend">{formatCurrency(campaign.spend)}</span></td>
          <td><span class="metric-value">R$ {campaign.cpm.toFixed(2)}</span></td>
          <td><span class="metric-value">R$ {campaign.cpc.toFixed(2)}</span></td>
          <td><span class="metric-value">{campaign.ctr.toFixed(1)}%</span></td>
          <td>
            <span class="roi-badge" class:positive={campaign.roi >= 1} class:negative={campaign.roi < 1}>
              {campaign.roi.toFixed(2)}x
            </span>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .campaign-name {
    font-weight: 500;
    color: var(--text-strong);
    white-space: nowrap;
  }
  
  td .metric-value {
    font-size: 0.875rem;
  }
  
  .metric-value.revenue {
    color: var(--success);
  }
  
  .metric-value.spend {
    color: var(--muted);
  }
  
  .roi-badge {
    display: inline-flex;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8125rem;
    font-weight: 600;
    font-family: var(--font-mono);
  }
  
  .roi-badge.positive {
    background: var(--success-soft);
    color: var(--success);
  }
  
  .roi-badge.negative {
    background: var(--danger-soft);
    color: var(--danger);
  }
</style>
