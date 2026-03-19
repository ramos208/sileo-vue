# Sileo-Vue 🍞

A premium, production-ready Vue 3 toast notification library inspired by Sileo. Featuring glassmorphism, smooth animations, and a modern iOS-like aesthetic.

## Features

- 🍦 **Vue 3 Support**: Built with the Composition API.
- ✨ **Premium Design**: Modern glassmorphism (blur + transparency) and detached pill headers.
- 🎬 **Smooth Animations**: Tailored entrance and exit transitions.
- 🖐️ **Swipe to Dismiss**: Natural gestures for both mouse and touch.
- 📦 **NPM Ready**: Bundled with Vite library mode, includes TypeScript types.
- 🌓 **Dark Mode**: Optimized for dark UI by default.
- 🛠️ **Configurable**: Global and per-toast options.

## Installation

```bash
npm install vue-sileo-toast
# or
yarn add vue-sileo-toast
```

## Setup

### 1. Register the Plugin

```typescript
import { createApp } from 'vue';
import { SileoPlugin } from 'vue-sileo-toast';
import 'vue-sileo-toast/style.css'; // Don't forget the styles!

const app = createApp(App);

app.use(SileoPlugin, {
  position: 'top-right',
  duration: 4000,
  singleton: true // Only allow one toast to be active at a time
});

app.mount('#app');
```

## Usage

### Using the Composable

```vue
<script setup>
import { useToast } from 'vue-sileo-toast';

const { toast } = useToast();

const showToast = () => {
  toast.success('Settings saved successfully!');
};
</script>

<template>
  <button @click="showToast">Show Toast</button>
</template>
```

### API Options

```typescript
toast({
  title: 'Notification',
  message: 'This is a message',
  type: 'info', // 'success' | 'error' | 'warning' | 'info' | 'default'
  duration: 5000,
  position: 'top-center',
  showProgress: true,
  swipeToDismiss: true
});

// Shorthands
toast.success('Success message');
toast.error('Error message');
toast.warning('Warning message');
toast.info('Info message');

// Action with Custom Styling & Position
toast({
  title: 'System',
  message: 'Disk space is running low.',
  action: {
    label: 'Clean Up',
    color: '#ff453a', // Custom hex background
    position: 'left', // Move button to the left of message
    onClick: (id) => console.log('Cleaning...', id)
  }
});

// Full-width Bottom Action (Perfect for Share/Confirm)
toast({
  title: 'File Uploaded',
  message: 'Your file is ready to share.',
  action: {
    label: 'Share Now',
    position: 'bottom',
    color: '#1e3a8a',
    onClick: (id) => console.log('Sharing...', id)
  }
});
```

## Advanced Customization

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | `undefined` | Optional title shown in the detached pill header. |
| `message` | `string` | `required` | The main content of the toast. |
| `type` | `string` | `'default'` | Toast variation: `success`, `error`, `warning`, `info`. |
| `duration` | `number` | `4000` | Auto-dismiss delay in ms. Set to `0` to persist. |
| `position` | `string` | `'top-right'` | Corner placement. |
| `showProgress` | `boolean` | `true` | Show/hide the animated progress bar. |
| `swipeToDismiss`| `boolean` | `true` | Enable swipe gestures to clear toasts. |
| `singleton` | `boolean` | `false` | When true, new toasts automatically close existing ones first. |
| `action.color` | `string` | `var(--sileo-btn-bg)` | Custom background for the action button. |
| `action.position` | `'left' \| 'right' \| 'bottom'` | `'right'` | Side to display the action button. |

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build
```

## License

MIT
