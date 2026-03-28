<script lang="ts">
  import { page } from '$app/stores';
  import { sidebarOpen } from '$lib/stores';
  import { Home, Globe, Activity, Settings, LogOut, X, BarChart3 } from 'lucide-svelte';
  
  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    // { href: '/sites', label: 'Sites', icon: Globe },
    { href: '/settings', label: 'Configurações', icon: Settings }
  ];
  
  function closeSidebar() {
    sidebarOpen.set(false);
  }
</script>

<aside class="sidebar" class:open={$sidebarOpen}>
  <div class="sidebar-header">
    <div class="logo">
      <div class="logo-icon">
        <BarChart3 size={24} />
      </div>
      <span class="logo-text">TrackyFlow</span>
    </div>
    <button class="close-btn" onclick={closeSidebar}>
      <X size={20} />
    </button>
  </div>
  
  <nav class="sidebar-nav">
    {#each navItems as item}
      <a 
        href={item.href} 
        class="nav-item" 
        class:active={$page.url.pathname.startsWith(item.href)}
        onclick={closeSidebar}
      >
        <svelte:component this={item.icon} size={20} />
        <span>{item.label}</span>
      </a>
    {/each}
  </nav>
  
  <div class="sidebar-footer">
    <a href="/login" class="nav-item logout">
      <LogOut size={20} />
      <span>Sair</span>
    </a>
  </div>
</aside>

{#if $sidebarOpen}
  <div class="sidebar-overlay" onclick={closeSidebar}></div>
{/if}

<style>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--sidebar-width);
    background: var(--card);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    z-index: 100;
    transition: transform 0.3s ease;
  }
  
  .sidebar-header {
    padding: 24px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .logo-text {
    font-family: var(--font-title);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-strong);
  }
  
  .close-btn {
    display: none;
    width: 36px;
    height: 36px;
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-xs);
    color: var(--muted);
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .close-btn:hover {
    color: var(--text);
    border-color: var(--border-hover);
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: var(--radius-sm);
    color: var(--muted);
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all 0.2s ease;
    text-decoration: none;
  }
  
  .nav-item:hover {
    background: var(--card-2);
    color: var(--text);
  }
  
  .nav-item.active {
    background: var(--primary-soft);
    color: var(--primary);
  }
  
  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid var(--border);
  }
  
  .logout:hover {
    background: var(--danger-soft);
    color: var(--danger);
  }
  
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
  }
  
  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
    
    .close-btn {
      display: flex;
    }
    
    .sidebar-overlay {
      display: block;
    }
  }
</style>
