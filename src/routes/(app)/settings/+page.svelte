<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import { addToast } from "$lib/stores";
  import { currentUser } from "$lib/stores/user";
  import { RefreshCw, Save, User, PlugZap } from "lucide-svelte";

  const name = $derived($currentUser?.name);
  const email = $derived($currentUser?.email);
  let defaultPixel = $state("");
  let metaToken = $state("");
  let saving = $state(false);

  async function handleSave() {
    saving = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    saving = false;
    addToast("Configurações salvas com sucesso!", "success");
  }
</script>

{#if $currentUser}
  <Header title="Configurações" />

  <div class="page-content">
    <div class="settings-container">
      <section class="settings-section card">
        <div class="section-header">
          <div class="section-icon">
            <User size={20} />
          </div>
          <div>
            <h3>Perfil</h3>
            <p>Informações da sua conta</p>
          </div>
        </div>

        <div class="settings-form">
          <div class="input-group">
            <label class="input-label" for="name">Nome</label>
            <input type="text" id="name" class="input" value={name} />
          </div>

          <div class="input-group">
            <label class="input-label" for="email">Email</label>
            <input type="email" id="email" class="input" value={email} />
          </div>
        </div>
      </section>

      <!-- API Key Section -->
      <!-- <section class="settings-section card">
      <div class="section-header">
        <div class="section-icon">
          <Key size={20} />
        </div>
        <div>
          <h3>API Key</h3>
          <p>Chave de acesso para integração</p>
        </div>
      </div>
      
      <div class="api-key-box">
        <div class="api-key-display">
          <code>{showApiKey ? apiKey : '••••••••••••••••••••••••'}</code>
        </div>
        <div class="api-key-actions">
          <button class="btn btn-secondary btn-icon" onclick={toggleApiKey} title={showApiKey ? 'Ocultar' : 'Mostrar'}>
            {#if showApiKey}
              <EyeOff size={18} />
            {:else}
              <Eye size={18} />
            {/if}
          </button>
          <button class="btn btn-secondary btn-icon" onclick={copyApiKey} title="Copiar">
            <Copy size={18} />
          </button>
          <button class="btn btn-secondary btn-icon" onclick={generateNewApiKey} title="Gerar nova">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      <div class="warning-box">
        <AlertTriangle size={18} />
        <p>Mantenha sua API Key em segurança. Não compartilhe com terceiros.</p>
      </div>
    </section> -->

      <!-- Meta Integration Section -->
      <section class="settings-section card">
        <div class="section-header">
          <div class="section-icon">
            <PlugZap size={20} />
          </div>
          <div>
            <h3>Integração Meta</h3>
            <p>Configurações do Facebook Ads</p>
          </div>
        </div>

        <div class="settings-form">
          <div class="input-group">
            <label class="input-label" for="pixel"
              >Pixel ID Padrão (opcional)</label
            >
            <input
              type="text"
              id="pixel"
              class="input"
              placeholder="Ex: 123456789012345"
              bind:value={defaultPixel}
            />
            <span class="input-hint"
              >Será usado como padrão para novos sites</span
            >
          </div>

          <div class="input-group">
            <label class="input-label" for="meta-token"
              >Token de Acesso Meta (opcional)</label
            >
            <input
              type="password"
              id="meta-token"
              class="input"
              placeholder="Cole seu token de acesso"
              bind:value={metaToken}
            />
            <span class="input-hint"
              >Necessário para sincronização de campanhas</span
            >
          </div>
        </div>
      </section>

      <!-- Save Button -->
      <div class="settings-footer">
        <button class="btn btn-primary" onclick={handleSave} disabled={saving}>
          {#if saving}
            <RefreshCw size={18} class="spinner" />
            Salvando...
          {:else}
            <Save size={18} />
            Salvar Configurações
          {/if}
        </button>
      </div>
    </div>
  </div>
{:else}
  <Loader text="Carregando dados da aba..." />
{/if}

<style>
  .settings-container {
    max-width: 720px;
  }

  .settings-section {
    margin-bottom: 24px;
  }

  .section-header {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }

  .section-icon {
    width: 44px;
    height: 44px;
    background: var(--primary-soft);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    flex-shrink: 0;
  }

  .section-header h3 {
    font-size: 1.125rem;
    margin-bottom: 4px;
  }

  .section-header p {
    font-size: 0.875rem;
    color: var(--muted);
  }

  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .input-hint {
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 6px;
  }

  .api-key-box {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  .api-key-display {
    flex: 1;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    overflow: hidden;
  }

  .api-key-display code {
    font-family: var(--font-mono);
    font-size: 0.9375rem;
    color: var(--text);
    word-break: break-all;
  }

  .api-key-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .warning-box {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: var(--warning-soft);
    border: 1px solid rgba(245, 158, 11, 0.2);
    border-radius: var(--radius-sm);
    color: var(--warning);
  }

  .warning-box p {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .settings-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  :global(.spinner) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 640px) {
    .api-key-box {
      flex-direction: column;
    }

    .api-key-actions {
      justify-content: flex-start;
    }
  }
</style>
