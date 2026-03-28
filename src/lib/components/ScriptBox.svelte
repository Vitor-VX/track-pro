<script lang="ts">
  import { Copy, FileText, Check } from 'lucide-svelte';
  import { addToast } from '$lib/stores';
  
  interface Props {
    siteId: string;
  }
  
  let { siteId }: Props = $props();
  
  let copied = $state(false);
  
  const script = `<script src="https://cdn.trackpro.io/tracker.js" data-site-id="${siteId}"><\/script>`;
  
  function copyScript() {
    navigator.clipboard.writeText(script);
    copied = true;
    addToast('Script copiado com sucesso!', 'success');
    
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="script-box">
  <div class="script-header">
    <div class="script-title">
      <FileText size={18} />
      <span>Script de Instalação</span>
    </div>
    <p class="script-description">Cole este código antes do fechamento da tag &lt;/body&gt; em seu site</p>
  </div>
  
  <div class="script-code">
    <code>{script}</code>
  </div>
  
  <div class="script-actions">
    <button class="btn btn-primary" onclick={copyScript}>
      {#if copied}
        <Check size={18} />
        Copiado!
      {:else}
        <Copy size={18} />
        Copiar Script
      {/if}
    </button>
    <button class="btn btn-secondary">
      <FileText size={18} />
      Ver Documentação
    </button>
  </div>
</div>

<style>
  .script-box {
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
  }
  
  .script-header {
    margin-bottom: 20px;
  }
  
  .script-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    color: var(--text-strong);
    margin-bottom: 8px;
  }
  
  .script-description {
    font-size: 0.875rem;
    color: var(--muted);
  }
  
  .script-code {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 16px 20px;
    margin-bottom: 20px;
    overflow-x: auto;
  }
  
  .script-code code {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--primary);
    white-space: nowrap;
  }
  
  .script-actions {
    display: flex;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    .script-actions {
      flex-direction: column;
    }
  }
</style>
