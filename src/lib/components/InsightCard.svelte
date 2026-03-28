<script lang="ts">
  import { Lightbulb } from 'lucide-svelte';
  
  interface Props {
    insights: string[];
  }
  
  let { insights }: Props = $props();
</script>

<div class="insight-card">
  <div class="insight-header">
    <div class="insight-icon">
      <Lightbulb size={18} />
    </div>
    <span class="insight-title">Insights Automáticos</span>
  </div>
  <ul class="insight-list">
    {#each insights as insight}
      <li class="insight-item">{insight}</li>
    {/each}
  </ul>
</div>

<style>
  .insight-card {
    background: var(--card-2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--warning);
    border-radius: var(--radius-sm);
    padding: 20px;
  }
  
  .insight-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  
  .insight-icon {
    width: 32px;
    height: 32px;
    background: var(--warning-soft);
    border-radius: var(--radius-xs);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--warning);
  }
  
  .insight-title {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text-strong);
  }
  
  .insight-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .insight-item {
    font-size: 0.875rem;
    color: var(--text);
    padding-left: 20px;
    position: relative;
    line-height: 1.5;
  }
  
  .insight-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 8px;
    width: 6px;
    height: 6px;
    background: var(--warning);
    border-radius: 50%;
  }
</style>
