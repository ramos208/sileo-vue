<template>
  <div class="example-page">
    <h1>Sileo-Vue Example</h1>
    <div class="button-grid">
      <button @click="toast.success('Operation completed successfully!')">Success</button>
      <button @click="toast.error('Something went wrong. Please try again.')">Error</button>
      <button @click="toast.warning({ title: 'System', message: 'Storage is almost full.' })">Warning</button>
      <button @click="toast.info('New update available for download.')">Info</button>
      <button @click="toast({ message: 'Default notification with no title.' })">Default</button>
      <button @click="toast({ title: 'Custom', message: 'This one is at the bottom!', position: 'bottom-center' })">Bottom Center</button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '../src';
const { toast } = useToast();
</script>

<style>
body {
  background: #0f0f0f;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.example-page {
  text-align: center;
}
.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
}
button {
  background: #1e1e1e;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
button:hover {
  background: #2a2a2a;
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
