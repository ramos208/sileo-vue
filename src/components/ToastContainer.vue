<template>
  <div class="sileo-root-wrapper">
    <div 
      v-for="pos in positions" 
      :key="pos"
      class="sileo-position-container" 
      :class="[`sileo-pos-${pos}`]"
      :style="getContainerStyle(pos)"
    >
      <TransitionGroup name="sileo-list" tag="div" class="sileo-stack">
        <ToastItem
          v-for="toast in getToastsByPosition(pos)"
          :key="toast.id"
          :toast="toast"
          @close="removeToast(toast.id)"
          @destroy="destroyToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast';
import ToastItem from './Toast.vue';
import type { ToastPosition, Toast } from '../types';
import type { CSSProperties } from 'vue';

const { toasts, removeToast, destroyToast } = useToast();

const positions: ToastPosition[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right'
];

const getToastsByPosition = (pos: ToastPosition) => {
  return toasts.filter((t: Toast) => t.position === pos);
};

const getContainerStyle = (pos: ToastPosition): CSSProperties => {
  const isTop = pos.startsWith('top');
  const isLeft = pos.endsWith('left');
  const isCenter = pos.endsWith('center');
  
  return {
    position: 'absolute',
    top: isTop ? '0' : 'auto',
    bottom: !isTop ? '0' : 'auto',
    left: isLeft ? '0' : (isCenter ? '50%' : 'auto'),
    right: !isLeft && !isCenter ? '0' : 'auto',
    transform: isCenter ? 'translateX(-50%)' : 'none',
    padding: '24px',
    display: 'flex',
    pointerEvents: 'none',
    boxSizing: 'border-box',
    alignItems: isLeft ? 'flex-start' : (isCenter ? 'center' : 'flex-end'),
    flexDirection: isTop ? 'column' : 'column-reverse'
  };
};
</script>

<style>
.sileo-root-wrapper {
  pointer-events: none !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  z-index: 999999 !important;
  overflow: hidden !important;
}

.sileo-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

/* Move animation for stacking */
.sileo-list-move {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
}
</style>
