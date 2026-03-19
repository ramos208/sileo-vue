<template>
  <div
    ref="toastRef"
    class="sileo-toast-outer"
    :class="[
      `sileo-type-${toast.type || 'default'}`, 
      `sileo-align-${horizontalAlign}`, 
      toast.theme === 'light' ? 'sileo-theme-light' : '',
      toast.theme === 'dark' ? 'sileo-theme-dark' : '',
      { 'sileo-is-dragging': dragging }
    ]"
    :style="toastStyle"
    @mousedown="onDragStart"
    @touchstart="onDragStart"
  >
    <div class="sileo-combined-shape" :class="{ 'is-expanded': isExpanded }">
      <!-- Pill Header -->
      <div class="sileo-header-pill">
        <!-- Left Sweep -->
        <div v-if="horizontalAlign !== 'left'" class="sileo-sweep-left"></div>
        <!-- Right Sweep -->
        <div v-if="horizontalAlign !== 'right'" class="sileo-sweep-right"></div>
        
        <div class="sileo-icon-wrapper">
          <component 
            :is="iconComponent" 
            v-if="typeof toast.icon !== 'string' && toast.icon" 
            class="sileo-custom-icon"
          />
          <span v-else-if="typeof toast.icon === 'string'" class="sileo-emoji">{{ toast.icon }}</span>
          <div v-else class="sileo-default-icon">
            <svg v-if="isLoading" class="sileo-spin" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
            </svg>
            <div v-else-if="toast.type === 'success'" class="sileo-icon-circle bg-success">
              <svg viewBox="0 0 24 24" fill="none" class="sileo-stroke-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div v-else-if="toast.type === 'error'" class="sileo-icon-circle bg-error">
              <svg viewBox="0 0 24 24" fill="none" class="sileo-stroke-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div v-else-if="toast.type === 'warning'" class="sileo-icon-circle bg-warning">
              <svg viewBox="0 0 24 24" fill="none" class="sileo-stroke-icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div v-else class="sileo-icon-circle bg-info">
              <svg viewBox="0 0 24 24" fill="none" class="sileo-stroke-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
          </div>
        </div>
        <span v-if="displayTitle" class="sileo-title-text" :class="`text-${toast.type || 'default'}`">{{ displayTitle }}</span>
        <button v-if="toast.closeOnClick" class="sileo-close-btn" @click.stop="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Main Body Container Animated -->
      <div v-if="hasBody" class="sileo-main-body-animator">
        <div class="sileo-main-wrapper">
          <div class="sileo-main-body">
            <div 
              class="sileo-body-content"
              :class="{ 'is-bottom-action': toast.action?.position === 'bottom' }"
              :style="{ 
                flexDirection: toast.action?.position === 'left' ? 'row-reverse' : (toast.action?.position === 'bottom' ? 'column' : 'row'),
                alignItems: toast.action?.position === 'bottom' ? 'flex-start' : 'center'
              }"
            >
              <p v-if="displayMessage" class="sileo-message">{{ displayMessage }}</p>
              <button 
                v-if="toast.action" 
                class="sileo-action-trigger" 
                :class="{ 'is-full-width': toast.action.position === 'bottom' }"
                :style="{ background: toast.action.color }"
                @click.stop="toast.action.onClick(toast.id)"
              >
                {{ toast.action.label }}
              </button>
            </div>
            <!-- Timer line removed as requested -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { Toast } from '../types';

const props = defineProps<{ toast: Toast; }>();
const emit = defineEmits(['close', 'destroy']);

const toastRef = ref<HTMLElement | null>(null);
const dragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const isExpanded = ref(false);

const displayTitle = computed(() => {
  if (props.toast.title) return props.toast.title;
  if (!props.toast.title && props.toast.message && !props.toast.action) return props.toast.message;
  return null;
});

const displayMessage = computed(() => {
  if (props.toast.title && props.toast.message) return props.toast.message;
  if (!props.toast.title && props.toast.message && props.toast.action) return props.toast.message;
  return null;
});

const hasBody = computed(() => !!displayMessage.value || !!props.toast.action);

onMounted(() => {
  if (hasBody.value) {
    setTimeout(() => {
      isExpanded.value = true;
    }, 500);
  }
});

watch(hasBody, (newVal, oldVal) => {
  if (newVal === true && oldVal === false) {
    isExpanded.value = true;
  }
});

watch(() => props.toast.closing, (val) => {
  if (val === true) {
    if (hasBody.value && isExpanded.value) {
      isExpanded.value = false;
      // Wait for the collapse animation (0.5s) + a little buffer
      setTimeout(() => {
        emit('destroy');
      }, 700); 
    } else {
      emit('destroy');
    }
  }
}, { immediate: true });

const iconComponent = computed(() => props.toast.icon);
const isLoading = computed(() => props.toast.duration === 0 && (props.toast.type === 'default' || !props.toast.type));

const horizontalAlign = computed(() => {
  const pos = props.toast.position || 'top-right';
  if (pos.includes('center')) return 'center';
  if (pos.includes('left')) return 'left';
  return 'right';
});

const isTop = computed(() => (props.toast.position || 'top-right').includes('top'));

const toastStyle = computed(() => {
  const x = currentX.value;
  const opacity = Math.max(0, 1 - Math.abs(x) / 300);
  const scale = dragging.value ? 0.95 : 1;
  const align = horizontalAlign.value === 'center' ? 'center' : (horizontalAlign.value === 'left' ? 'flex-start' : 'flex-end');
  
  return {
    transform: `translateX(${x}px) scale(${scale})`,
    opacity,
    transition: dragging.value ? 'none' : 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: align,
    width: '100%',
    pointerEvents: 'auto' as const,
    marginBottom: '16px',
    '--sileo-y-dir': isTop.value ? '-50px' : '50px'
  } as any;
});

const onDragStart = (e: MouseEvent | TouchEvent) => {
  if (!props.toast.swipeToDismiss) return;
  dragging.value = true;
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX;
  
  if ('touches' in e) {
    window.addEventListener('touchmove', onDragging);
    window.addEventListener('touchend', onDragEnd);
  } else {
    window.addEventListener('mousemove', onDragging);
    window.addEventListener('mouseup', onDragEnd);
  }
};

const onDragging = (e: MouseEvent | TouchEvent) => {
  if (!dragging.value) return;
  const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
  currentX.value = (x - startX.value) * 0.8;
};

const onDragEnd = () => {
  if (!dragging.value) return;
  dragging.value = false;
  if (Math.abs(currentX.value) > 100) emit('close');
  else currentX.value = 0;
  window.removeEventListener('mousemove', onDragging);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragging);
  window.removeEventListener('touchend', onDragEnd);
};

onUnmounted(() => {
  window.removeEventListener('mousemove', onDragging);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragging);
  window.removeEventListener('touchend', onDragEnd);
});
</script>

<style>
.sileo-toast-outer {
  /* Day Theme Variables (Default) */
  --sileo-bg: #ffffff;
  --sileo-text-primary: #000000;
  --sileo-text-secondary: rgba(0, 0, 0, 0.65);
  --sileo-border: rgba(0, 0, 0, 0.08); /* faint border on white */
  --sileo-btn-bg: #1c1c1e;
  --sileo-btn-text: #ffffff;
  --sileo-timer-bg: rgba(0, 0, 0, 0.1);
  --sileo-close-color: rgba(0, 0, 0, 0.3);
  --sileo-close-hover: rgba(0, 0, 0, 0.7);

  position: relative !important;
  width: 400px !important;
  max-width: 90vw !important;
  user-select: none !important;
  z-index: 10000 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  box-sizing: border-box !important;
}

/* Night Theme Variables */
@media (prefers-color-scheme: dark) {
  .sileo-toast-outer:not(.sileo-theme-light) {
    --sileo-bg: #1c1c1e;
    --sileo-text-primary: #ffffff;
    --sileo-text-secondary: rgba(255, 255, 255, 0.65);
    --sileo-border: rgba(255, 255, 255, 0.15); /* bright border on dark */
    --sileo-btn-bg: #ffffff;
    --sileo-btn-text: #000000;
    --sileo-timer-bg: rgba(255, 255, 255, 0.15);
    --sileo-close-color: rgba(255, 255, 255, 0.3);
    --sileo-close-hover: rgba(255, 255, 255, 0.7);
  }
}

/* Explicit Night Theme Override */
.sileo-toast-outer.sileo-theme-dark {
  --sileo-bg: #1c1c1e;
  --sileo-text-primary: #ffffff;
  --sileo-text-secondary: rgba(255, 255, 255, 0.65);
  --sileo-border: rgba(255, 255, 255, 0.15);
  --sileo-btn-bg: #ffffff;
  --sileo-btn-text: #000000;
  --sileo-timer-bg: rgba(255, 255, 255, 0.15);
  --sileo-close-color: rgba(255, 255, 255, 0.3);
  --sileo-close-hover: rgba(255, 255, 255, 0.7);
}

.sileo-combined-shape {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  /* Removed heavy blur shadow as requested. Kept only the 1px glass border outline. */
  filter: drop-shadow(0 0 1px var(--sileo-border)) !important;
}

.sileo-header-pill {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  
  background: var(--sileo-bg) !important;
  
  padding: 8px 16px 8px 14px !important;
  height: 40px !important;
  border-radius: 24px !important; /* Fully rounded by default */
  transition: border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  color: var(--sileo-text-primary) !important;
  box-sizing: border-box !important;
  width: fit-content !important;
  position: relative !important;
  z-index: 2 !important;
  margin-bottom: -1px !important;
}

.sileo-align-center .sileo-header-pill { align-self: center !important; }
.sileo-align-left .sileo-header-pill { align-self: flex-start !important; margin-left: 0 !important; }
.sileo-align-right .sileo-header-pill { align-self: flex-end !important; margin-right: 0 !important; }

/* Expanded Pill Radii */
.sileo-combined-shape.is-expanded .sileo-header-pill {
  border-radius: 24px 24px 0 0 !important;
}

.sileo-sweep-left, .sileo-sweep-right {
  position: absolute !important;
  bottom: 0 !important;
  width: 24px !important;
  height: 24px !important;
  z-index: -1 !important;
  
  background: var(--sileo-bg) !important;
  pointer-events: none !important;

  /* Hidden when collapsed */
  opacity: 0 !important;
  transform: scaleY(0) !important;
  transform-origin: top !important;
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}

/* Sweeps visible when expanded */
.sileo-combined-shape.is-expanded .sileo-sweep-left,
.sileo-combined-shape.is-expanded .sileo-sweep-right {
  opacity: 1 !important;
  transform: scaleY(1) !important;
}

.sileo-sweep-left {
  left: -24px !important;
  clip-path: path('M24 0 C24 13.255 13.255 24 0 24 L24 24 Z') !important;
}

.sileo-sweep-right {
  right: -24px !important;
  clip-path: path('M0 0 C0 13.255 10.745 24 24 24 L0 24 Z') !important;
}

.sileo-icon-wrapper { width: 22px !important; height: 22px !important; display: flex !important; align-items: center !important; justify-content: center !important; flex-shrink: 0 !important; }
.sileo-custom-icon { width: 18px !important; height: 18px !important; display: block !important; }
.sileo-emoji { font-size: 16px !important; line-height: 1 !important; }
.sileo-default-icon { width: 22px !important; height: 22px !important; display: flex !important; align-items: center !important; justify-content: center !important; }

.sileo-icon-circle { width: 22px !important; height: 22px !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; background: rgba(128, 128, 128, 0.1) !important; }
.bg-success { background: rgba(50, 215, 75, 0.15) !important; color: #32d74b !important; }
.bg-error { background: rgba(255, 69, 58, 0.15) !important; color: #ff453a !important; }
.bg-warning { background: rgba(255, 214, 10, 0.15) !important; color: #ffd60a !important; }
.bg-info { background: rgba(10, 132, 255, 0.15) !important; color: #0a84ff !important; }
.sileo-stroke-icon { width: 13px !important; height: 13px !important; stroke: currentColor !important; stroke-width: 3 !important; }

.sileo-title-text { font-size: 14.5px !important; font-weight: 600 !important; line-height: 1 !important; white-space: nowrap !important; letter-spacing: 0.2px !important; }
.text-success { color: #32d74b !important; }
.text-error { color: #ff453a !important; }
.text-warning { color: #ffd60a !important; }
.text-info { color: #0a84ff !important; }
.text-default { color: var(--sileo-text-primary) !important; }

.sileo-close-btn { background: none !important; border: none !important; padding: 2px !important; cursor: pointer !important; color: var(--sileo-close-color) !important; display: flex !important; align-items: center !important; margin-left: 2px !important; transition: color 0.2s !important; }
.sileo-close-btn svg { width: 14px !important; height: 14px !important; stroke: currentColor !important; stroke-width: 2.5 !important; }
.sileo-close-btn:hover { color: var(--sileo-close-hover) !important; }

.sileo-main-body-animator {
  display: grid !important;
  grid-template-rows: 0fr !important;
  opacity: 0 !important;
  transition: grid-template-rows 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease !important;
}

.sileo-combined-shape.is-expanded .sileo-main-body-animator {
  grid-template-rows: 1fr !important;
  opacity: 1 !important;
}

.sileo-main-wrapper {
  overflow: hidden !important;
}

.sileo-main-body {
  background: var(--sileo-bg) !important;
  padding: 18px 24px !important;
  border-radius: 24px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  position: relative !important;
  z-index: 1 !important;
}

.sileo-align-left .sileo-main-body { border-top-left-radius: 0 !important; }
.sileo-align-right .sileo-main-body { border-top-right-radius: 0 !important; }

.sileo-body-content { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 16px !important; }
.sileo-body-content.is-bottom-action { gap: 12px !important; }
.sileo-message { margin: 0 !important; font-size: 15.5px !important; line-height: 1.5 !important; color: var(--sileo-text-secondary) !important; font-weight: 400 !important; letter-spacing: 0.1px !important; }
.sileo-action-trigger { background: var(--sileo-btn-bg); color: var(--sileo-btn-text) !important; border: none !important; border-radius: 14px !important; padding: 10px 18px !important; font-size: 13.5px !important; font-weight: 600 !important; cursor: pointer !important; white-space: nowrap !important; flex-shrink: 0 !important; transition: transform 0.2s, background 0.2s !important;}
.sileo-action-trigger.is-full-width { width: 100% !important; margin-top: 4px !important; padding: 12px !important; border-radius: 18px !important; text-align: center !important; }
.sileo-action-trigger:hover { transform: scale(1.02) !important; }

@keyframes sileo-spin { 100% { transform: rotate(360deg); } }
.sileo-spin { animation: sileo-spin 1.5s linear infinite !important; width: 20px !important; height: 20px !important; }
.sileo-spin circle { stroke: currentColor !important; stroke-linecap: round !important; animation: sileo-dash-pulse 1.5s ease-in-out infinite !important; }
@keyframes sileo-dash-pulse { 0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; } 50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; } 100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; } }

.sileo-list-enter-active {
  transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
.sileo-list-leave-active {
  transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 1, 1) !important;
}
.sileo-list-enter-from { opacity: 0 !important; transform: translateY(var(--sileo-y-dir, -50px)) scale(0.85) !important; }
.sileo-list-leave-to { opacity: 0 !important; transform: scale(0.85) !important; }
</style>
