<script lang="ts">
  import type { Component } from 'svelte';
  
  interface Props {
    icon: Component;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  }
  
  let { icon, title, description, actionLabel, onAction }: Props = $props();
</script>

<div class="empty-state">
  <div class="empty-state-icon">
    <svelte:component this={icon} size={32} />
  </div>
  <h4 class="empty-state-title">{title}</h4>
  <p class="empty-state-text">{description}</p>
  {#if actionLabel && onAction}
    <button class="btn btn-primary" onclick={onAction}>
      {actionLabel}
    </button>
  {/if}
</div>
