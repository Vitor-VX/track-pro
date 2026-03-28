<script lang="ts">
  import { sidebarOpen } from "$lib/stores";
    import { currentUser } from "$lib/stores/user";
  import { Menu, LogOut, ChevronRight, User } from "lucide-svelte";

  interface Props {
    title: string;
    breadcrumb?: { label: string; href?: string }[];
  }

  let { title, breadcrumb = [] }: Props = $props();

  function toggleSidebar() {
    sidebarOpen.update((v) => !v);
  }
</script>

<header class="header">
  <div class="header-left">
    <button class="menu-btn" onclick={toggleSidebar}>
      <Menu size={20} />
    </button>

    <div class="header-title-area">
      {#if breadcrumb.length > 0}
        <nav class="breadcrumb">
          {#each breadcrumb as item, i}
            {#if item.href}
              <a href={item.href}>{item.label}</a>
            {:else}
              <span>{item.label}</span>
            {/if}
            {#if i < breadcrumb.length - 1}
              <ChevronRight size={14} />
            {/if}
          {/each}
        </nav>
      {/if}
      <h1 class="header-title">{title}</h1>
    </div>
  </div>

  <div class="header-right">
    <div class="user-info">
      <div class="user-avatar">
        <User size={18} />
      </div>
      <div class="user-details">
        <span class="user-name">{$currentUser?.name ?? "Desconhecido"}</span>
        <span class="user-email">{$currentUser?.email ?? "desconhecido"}</span>
      </div>
    </div>

    <a href="/login" class="logout-btn" title="Sair">
      <LogOut size={18} />
    </a>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: var(--sidebar-width);
    right: 0;
    height: var(--header-height);
    background: var(--card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    z-index: 50;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .menu-btn {
    display: none;
    width: 40px;
    height: 40px;
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    color: var(--muted);
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .menu-btn:hover {
    color: var(--text);
    border-color: var(--border-hover);
  }

  .header-title-area {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8125rem;
    color: var(--muted);
  }

  .breadcrumb a {
    color: var(--muted);
    transition: color 0.2s ease;
  }

  .breadcrumb a:hover {
    color: var(--primary);
  }

  .header-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    background: var(--primary-soft);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-strong);
  }

  .user-email {
    font-size: 0.75rem;
    color: var(--muted);
  }

  .logout-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    color: var(--muted);
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background: var(--danger-soft);
    border-color: var(--danger);
    color: var(--danger);
  }

  @media (max-width: 1024px) {
    .header {
      left: 0;
      padding: 0 16px;
    }

    .menu-btn {
      display: flex;
    }

    .user-details {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .user-info {
      padding: 8px;
    }
  }
</style>
