import type { Toast, ToastOptions, GlobalConfig } from '../types';
export declare function useToast(): {
    toasts: import("vue").Reactive<Toast[]>;
    config: (newConfig: GlobalConfig) => {
        position?: import("../types").ToastPosition | undefined;
        duration?: number | undefined;
        maxToasts?: number | undefined;
        swipeToDismiss?: boolean | undefined;
        closeOnClick?: boolean | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        singleton?: boolean | undefined;
    } & GlobalConfig;
    addToast: (options: ToastOptions | string) => string;
    removeToast: (id: string) => void;
    destroyToast: (id: string) => void;
    clearToasts: () => void;
    updateToast: (id: string, options: Partial<ToastOptions>) => void;
    toast: ((options: ToastOptions | string) => string) & {
        success: (msg: string | ToastOptions) => string;
        error: (msg: string | ToastOptions) => string;
        warning: (msg: string | ToastOptions) => string;
        info: (msg: string | ToastOptions) => string;
        promise: <T>(promise: Promise<T>, options: {
            loading: string | ToastOptions;
            success: string | ((data: T) => string | ToastOptions);
            error: string | ((err: any) => string | ToastOptions);
        }) => Promise<T>;
        clear: () => 0;
        config: (newConfig: GlobalConfig) => {
            position?: import("../types").ToastPosition | undefined;
            duration?: number | undefined;
            maxToasts?: number | undefined;
            swipeToDismiss?: boolean | undefined;
            closeOnClick?: boolean | undefined;
            theme?: "light" | "dark" | "system" | undefined;
            singleton?: boolean | undefined;
        } & GlobalConfig;
    };
};
export declare const toastManager: {
    toasts: import("vue").Reactive<Toast[]>;
    config: (newConfig: GlobalConfig) => {
        position?: import("../types").ToastPosition | undefined;
        duration?: number | undefined;
        maxToasts?: number | undefined;
        swipeToDismiss?: boolean | undefined;
        closeOnClick?: boolean | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        singleton?: boolean | undefined;
    } & GlobalConfig;
    addToast: (options: ToastOptions | string) => string;
    removeToast: (id: string) => void;
    destroyToast: (id: string) => void;
    clearToasts: () => void;
    updateToast: (id: string, options: Partial<ToastOptions>) => void;
    toast: ((options: ToastOptions | string) => string) & {
        success: (msg: string | ToastOptions) => string;
        error: (msg: string | ToastOptions) => string;
        warning: (msg: string | ToastOptions) => string;
        info: (msg: string | ToastOptions) => string;
        promise: <T>(promise: Promise<T>, options: {
            loading: string | ToastOptions;
            success: string | ((data: T) => string | ToastOptions);
            error: string | ((err: any) => string | ToastOptions);
        }) => Promise<T>;
        clear: () => 0;
        config: (newConfig: GlobalConfig) => {
            position?: import("../types").ToastPosition | undefined;
            duration?: number | undefined;
            maxToasts?: number | undefined;
            swipeToDismiss?: boolean | undefined;
            closeOnClick?: boolean | undefined;
            theme?: "light" | "dark" | "system" | undefined;
            singleton?: boolean | undefined;
        } & GlobalConfig;
    };
};
export declare const toast: ((options: ToastOptions | string) => string) & {
    success: (msg: string | ToastOptions) => string;
    error: (msg: string | ToastOptions) => string;
    warning: (msg: string | ToastOptions) => string;
    info: (msg: string | ToastOptions) => string;
    promise: <T>(promise: Promise<T>, options: {
        loading: string | ToastOptions;
        success: string | ((data: T) => string | ToastOptions);
        error: string | ((err: any) => string | ToastOptions);
    }) => Promise<T>;
    clear: () => 0;
    config: (newConfig: GlobalConfig) => {
        position?: import("../types").ToastPosition | undefined;
        duration?: number | undefined;
        maxToasts?: number | undefined;
        swipeToDismiss?: boolean | undefined;
        closeOnClick?: boolean | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        singleton?: boolean | undefined;
    } & GlobalConfig;
};
