export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: (id: string) => void;
  color?: string;
  position?: 'left' | 'right' | 'bottom';
}

export interface Toast {
  id: string;
  title?: string;
  titleColor?: string;
  message: string;
  messageColor?: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  icon?: string | object;
  action?: ToastAction;
  showProgress?: boolean;
  closeOnClick?: boolean;
  swipeToDismiss?: boolean;
  theme?: 'light' | 'dark' | 'system';
  createdAt?: number;
  closing?: boolean;
  singleton?: boolean;
}

export interface ToastOptions extends Partial<Omit<Toast, 'id'>> {}

export interface GlobalConfig {
  position?: ToastPosition;
  duration?: number;
  maxToasts?: number;
  swipeToDismiss?: boolean;
  closeOnClick?: boolean;
  theme?: 'light' | 'dark' | 'system';
  singleton?: boolean;
}
