<script lang="ts">
  import { toasts, removeToast } from "$lib/stores";
  import { CircleCheckBig, CircleAlert, Info, X } from "lucide-svelte";
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div class="toast toast-{toast.type}">
      <div class="toast-icon">
        {#if toast.type === "success"}
          <CircleCheckBig size={20} />
        {:else if toast.type === "error"}
          <CircleAlert size={20} />
        {:else}
          <Info size={20} />
        {/if}
      </div>
      <span class="toast-message">{toast.message}</span>
      <button class="toast-close" onclick={() => removeToast(toast.id)}>
        <X size={16} />
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 9999;
    max-width: 400px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow);
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .toast-icon {
    flex-shrink: 0;
  }

  .toast-success .toast-icon {
    color: var(--success);
  }

  .toast-error .toast-icon {
    color: var(--danger);
  }

  .toast-info .toast-icon {
    color: var(--primary);
  }

  .toast-message {
    flex: 1;
    font-size: 0.875rem;
    color: var(--text);
  }

  .toast-close {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: var(--radius-xs);
    color: var(--muted);
    transition: all 0.2s ease;
  }

  .toast-close:hover {
    background: var(--card-2);
    color: var(--text);
  }

  @media (max-width: 640px) {
    .toast-container {
      left: 16px;
      right: 16px;
      bottom: 16px;
      max-width: none;
    }
  }
</style>
