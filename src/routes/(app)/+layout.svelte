<script lang="ts">
  import "../../app.css";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { currentUser } from "$lib/stores/user";

  let { children, data } = $props();

  $effect(() => {
    currentUser.set(data.user);
  });
</script>

<svelte:head>
  <title>TrackPro - Analytics & Tracking</title>
  <meta
    name="description"
    content="Sistema de tracking e analytics para landing pages e campanhas Meta Ads"
  />
</svelte:head>

{#if data.user}
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      {@render children()}
    </main>
  </div>
{/if}

<Toast />
