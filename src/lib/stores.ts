import { writable } from 'svelte/store';

export const sidebarOpen = writable(false);
export const toasts = writable<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);

export function addToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const id = Math.random().toString(36).substring(7);
  toasts.update(t => [...t, { id, message, type }]);
  
  setTimeout(() => {
    toasts.update(t => t.filter(toast => toast.id !== id));
  }, 4000);
}

export function removeToast(id: string) {
  toasts.update(t => t.filter(toast => toast.id !== id));
}
