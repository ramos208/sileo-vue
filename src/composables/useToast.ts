import { reactive, ref, markRaw } from 'vue';
import type { Toast, ToastOptions, ToastType, GlobalConfig } from '../types';

const toasts = reactive<Toast[]>([]);
const config = reactive<GlobalConfig>({
  position: 'top-right',
  duration: 6000,
  maxToasts: 5,
});

const generateId = () => Math.random().toString(36).substring(2, 9);

export function useToast() {
  const addToast = (options: ToastOptions | string) => {
    const defaultOptions: Omit<Toast, 'id' | 'message' | 'createdAt'> = {
      type: 'default',
      duration: config.duration || 6000,
      position: config.position || 'top-right',
      showProgress: true,
      closeOnClick: true,
      swipeToDismiss: true,
      theme: config.theme,
    };

    const toastOptions = typeof options === 'string' ? { message: options } : options;
    
    if (config.singleton || (toastOptions as any).singleton) {
      clearToasts();
    }

    if (toasts.length >= (config.maxToasts || 5)) {
      toasts.shift();
    }

    const id = generateId();
    const newToast: Toast = {
      message: '',
      ...defaultOptions,
      ...toastOptions,
      id,
      createdAt: Date.now(),
      closing: false,
    };

    // If icon is a component, mark it as raw to avoid reactive overhead
    if (newToast.icon && typeof newToast.icon !== 'string') {
      newToast.icon = markRaw(newToast.icon);
    }

    toasts.push(newToast);

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    const toast = toasts.find((t) => t.id === id);
    if (toast) {
      toast.closing = true;
    }
  };

  const destroyToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
    }
  };

  const clearToasts = () => {
    toasts.forEach(t => t.closing = true);
  };

  const updateToast = (id: string, options: Partial<ToastOptions>) => {
    const index = toasts.findIndex((t: Toast) => t.id === id);
    if (index !== -1) {
      const updated = { ...toasts[index], ...options };
      if (typeof options.icon !== 'undefined' && options.icon && typeof options.icon !== 'string') {
        updated.icon = markRaw(options.icon);
      }
      toasts[index] = updated;
    }
  };

  const configure = (newConfig: GlobalConfig) => Object.assign(config, newConfig);

  const toast = Object.assign(addToast, {
    success: (msg: string | ToastOptions) => addToast(typeof msg === 'string' ? { message: msg, type: 'success' } : { ...msg, type: 'success' }),
    error: (msg: string | ToastOptions) => addToast(typeof msg === 'string' ? { message: msg, type: 'error' } : { ...msg, type: 'error' }),
    warning: (msg: string | ToastOptions) => addToast(typeof msg === 'string' ? { message: msg, type: 'warning' } : { ...msg, type: 'warning' }),
    info: (msg: string | ToastOptions) => addToast(typeof msg === 'string' ? { message: msg, type: 'info' } : { ...msg, type: 'info' }),
    promise: async <T>(
      promise: Promise<T>,
      options: {
        loading: string | ToastOptions;
        success: string | ((data: T) => string | ToastOptions);
        error: string | ((err: any) => string | ToastOptions);
      }
    ) => {
      const id = addToast(typeof options.loading === 'string' ? { message: options.loading, type: 'default', duration: 0 } : { ...options.loading, type: 'default', duration: 0 });
      
      try {
        const result = await promise;
        const successOpts = typeof options.success === 'function' ? options.success(result) : options.success;
        const finalOpts = typeof successOpts === 'string' ? { message: successOpts, type: 'success' as ToastType } : { ...successOpts, type: 'success' as ToastType };
        updateToast(id, { ...finalOpts, duration: (finalOpts as any).duration || 4000 });
        setTimeout(() => removeToast(id), (finalOpts as any).duration || 4000);
        return result;
      } catch (err) {
        const errorOpts = typeof options.error === 'function' ? options.error(err) : options.error;
        const finalOpts = typeof errorOpts === 'string' ? { message: errorOpts, type: 'error' as ToastType } : { ...errorOpts, type: 'error' as ToastType };
        updateToast(id, { ...finalOpts, duration: (finalOpts as any).duration || 4000 });
        setTimeout(() => removeToast(id), (finalOpts as any).duration || 4000);
        throw err;
      }
    },
    clear: () => (toasts.length = 0),
    config: (newConfig: GlobalConfig) => Object.assign(config, newConfig),
  });

  return {
    toasts,
    config: configure,
    addToast,
    removeToast,
    destroyToast,
    clearToasts,
    updateToast,
    toast,
  };
}

// Export a singleton for easier use in non-component files or plugin
export const toastManager = useToast();
export const toast = toastManager.toast;
