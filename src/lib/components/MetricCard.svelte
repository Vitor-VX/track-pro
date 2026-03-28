<script lang="ts">
  import { TrendingUp, TrendingDown } from 'lucide-svelte';
  import type { Component } from 'svelte';
  
  interface Props {
    title: string;
    value: string;
    change?: number;
    changeLabel?: string;
    icon: Component;
    iconColor?: string;
  }
  
  let { title, value, change, changeLabel, icon, iconColor = 'var(--primary)' }: Props = $props();
  
  const isPositive = $derived(change !== undefined && change >= 0);
</script>

<div class="metric-card card">
  <div class="metric-header">
    <div class="metric-icon" style="background: {iconColor}15; color: {iconColor}">
      <svelte:component this={icon} size={22} />
    </div>
    {#if change !== undefined}
      <div class="metric-change" class:positive={isPositive} class:negative={!isPositive}>
        {#if isPositive}
          <TrendingUp size={14} />
        {:else}
          <TrendingDown size={14} />
        {/if}
        <span>{isPositive ? '+' : ''}{change}%</span>
      </div>
    {/if}
  </div>
  
  <div class="metric-body">
    <span class="metric-value">{value}</span>
    <span class="metric-title">{title}</span>
  </div>
  
  {#if changeLabel}
    <div class="metric-footer">
      <span class="metric-label">{changeLabel}</span>
    </div>
  {/if}
</div>

<style>
  .metric-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .metric-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .metric-change {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 6px 6px;
    border-radius: 20px;
  }
  
  .metric-change.positive {
    background: var(--success-soft);
    color: var(--success);
  }
  
  .metric-change.negative {
    background: var(--danger-soft);
    color: var(--danger);
  }
  
  .metric-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .metric-value {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-strong);
    line-height: 1.2;
  }
  
  .metric-title {
    font-size: 0.875rem;
    color: var(--muted);
  }
  
  .metric-footer {
    padding-top: 12px;
    border-top: 1px solid var(--border);
  }
  
  .metric-label {
    font-size: 0.75rem;
    color: var(--muted);
  }
</style>
