<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    goto('/login');
  });
</script>

<div class="redirect">
  <p>Redirecionando...</p>
</div>

<style>
  .redirect {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
  }
</style>
