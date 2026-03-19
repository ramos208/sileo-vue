import { createApp, h, type App } from 'vue';
import ToastContainer from '../components/ToastContainer.vue';
import { toastManager } from '../composables/useToast';
import type { GlobalConfig } from '../types';

export const SileoPlugin = {
  install(app: App, options: GlobalConfig = {}) {
    // Apply global config
    if (Object.keys(options).length > 0) {
      toastManager.toast.config(options);
    }

    // Create container and mount to body
    if (typeof document !== 'undefined') {
      const containerId = 'sileo-toast-container';
      let container = document.getElementById(containerId);
      
      if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
        
        const containerApp = createApp({
          render: () => h(ToastContainer)
        });
        
        containerApp.mount(container);
      }
    }

    // Provide toast function
    app.config.globalProperties.$toast = toastManager.toast;
    app.provide('toast', toastManager.toast);
  }
};
