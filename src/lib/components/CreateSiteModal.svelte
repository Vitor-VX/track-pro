<script lang="ts">
  import { X, Loader2 } from 'lucide-svelte';
  
  interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (data: { name: string; url: string; description: string }) => void;
  }
  
  let { open, onClose, onCreate }: Props = $props();
  
  let name = $state('');
  let url = $state('');
  let description = $state('');
  let loading = $state(false);
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!name || !url) return;
    
    loading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onCreate({ name, url, description });
    
    name = '';
    url = '';
    description = '';
    loading = false;
  }
</script>

{#if open}
  <div class="modal-overlay" onclick={onClose}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h3 class="modal-title">Criar Novo Site</h3>
        <button class="close-btn" onclick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <form onsubmit={handleSubmit}>
        <div class="modal-body">
          <div class="input-group">
            <label class="input-label" for="site-name">Nome do Site *</label>
            <input
              type="text"
              id="site-name"
              class="input"
              placeholder="Ex: Oferta Black Friday"
              bind:value={name}
              required
            />
          </div>
          
          <div class="input-group">
            <label class="input-label" for="site-url">URL *</label>
            <input
              type="url"
              id="site-url"
              class="input"
              placeholder="https://seusite.com"
              bind:value={url}
              required
            />
          </div>
          
          <div class="input-group">
            <label class="input-label" for="site-description">Descrição (opcional)</label>
            <input
              type="text"
              id="site-description"
              class="input"
              placeholder="Uma breve descrição do site"
              bind:value={description}
            />
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick={onClose}>
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" disabled={loading || !name || !url}>
            {#if loading}
              <Loader2 size={18} class="spinner" />
              Criando...
            {:else}
              Criar Site
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
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
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  :global(.spinner) {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
