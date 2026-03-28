<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import SiteCard from '$lib/components/SiteCard.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import CreateSiteModal from '$lib/components/CreateSiteModal.svelte';
  import ConfirmDeleteModal from '$lib/components/ConfirmDeleteModal.svelte';
  import { sites as initialSites } from '$lib/data';
  import { addToast } from '$lib/stores';
  import { Plus, Globe } from 'lucide-svelte';
  import type { Site } from '$lib/types';
  
  let sitesData = $state<Site[]>([...initialSites]);
  let showCreateModal = $state(false);
  let showDeleteModal = $state(false);
  let siteToDelete = $state<string | null>(null);
  
  function handleCreate(data: { name: string; url: string; description: string }) {
    const newSite: Site = {
      id: 'site_' + Math.random().toString(36).substring(7),
      name: data.name,
      url: data.url,
      description: data.description,
      status: 'active',
      metaConnected: false,
      visitorsToday: 0,
      salesToday: 0,
      revenueToday: 0,
      campaignsActive: 0,
      lastUpdated: new Date().toISOString()
    };
    
    sitesData = [newSite, ...sitesData];
    showCreateModal = false;
    addToast('Site criado com sucesso!', 'success');
  }
  
  function handleDeleteClick(id: string) {
    siteToDelete = id;
    showDeleteModal = true;
  }
  
  function handleDeleteConfirm() {
    if (siteToDelete) {
      sitesData = sitesData.filter(s => s.id !== siteToDelete);
      addToast('Site excluído com sucesso!', 'success');
    }
    showDeleteModal = false;
    siteToDelete = null;
  }
</script>

<Header title="Sites" />

<div class="page-content">
  <div class="page-header">
    <div>
      <p class="page-subtitle">Gerencie todos os seus sites e ofertas</p>
    </div>
    <button class="btn btn-primary" onclick={() => showCreateModal = true}>
      <Plus size={18} />
      Novo Site
    </button>
  </div>
  
  {#if sitesData.length > 0}
    <div class="sites-grid">
      {#each sitesData as site (site.id)}
        <SiteCard {site} onDelete={handleDeleteClick} />
      {/each}
    </div>
  {:else}
    <div class="card">
      <EmptyState
        icon={Globe}
        title="Nenhum site cadastrado"
        description="Comece criando seu primeiro site para rastrear visitas e conversões."
        actionLabel="Criar primeiro site"
        onAction={() => showCreateModal = true}
      />
    </div>
  {/if}
</div>

<CreateSiteModal
  open={showCreateModal}
  onClose={() => showCreateModal = false}
  onCreate={handleCreate}
/>

<ConfirmDeleteModal
  open={showDeleteModal}
  title="Excluir Site"
  message="Tem certeza que deseja excluir este site? Todos os dados de tracking e campanhas associadas serão perdidos. Esta ação não pode ser desfeita."
  onClose={() => { showDeleteModal = false; siteToDelete = null; }}
  onConfirm={handleDeleteConfirm}
/>

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  
  .page-subtitle {
    color: var(--muted);
    font-size: 0.9375rem;
  }
  
  .sites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 24px;
  }
  
  @media (max-width: 640px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .sites-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
