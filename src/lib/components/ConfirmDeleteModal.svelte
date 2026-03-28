<script lang="ts">
  import { X, AlertTriangle, Loader2 } from 'lucide-svelte';
  
  interface Props {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  let { open, title, message, onClose, onConfirm }: Props = $props();
  
  let loading = $state(false);
  
  async function handleConfirm() {
    loading = true;
    await new Promise(resolve => setTimeout(resolve, 800));
    onConfirm();
    loading = false;
  }
</script>

{#if open}
  <div class="modal-overlay" onclick={onClose}>
    <div class="modal modal-sm" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h3 class="modal-title">{title}</h3>
        <button class="close-btn" onclick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <div class="modal-body">
        <div class="warning-icon">
          <AlertTriangle size={32} />
        </div>
        <p class="warning-message">{message}</p>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick={onClose}>
          Cancelar
        </button>
        <button class="btn btn-danger" onclick={handleConfirm} disabled={loading}>
          {#if loading}
            <Loader2 size={18} class="spinner" />
            Excluindo...
          {:else}
            Excluir
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-sm {
    max-width: 400px;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-2);
    border-radius: var(--radius-xs);
    color: var(--muted);
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    color: var(--text);
    background: var(--bg-soft);
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .modal-body {
    text-align: center;
    padding: 32px 24px;
  }
  
  .warning-icon {
    width: 64px;
    height: 64px;
    background: var(--danger-soft);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--danger);
    margin: 0 auto 20px;
  }
  
  .warning-message {
    color: var(--muted);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
  
  :global(.spinner) {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
