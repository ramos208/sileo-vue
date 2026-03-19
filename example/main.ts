import { createApp } from 'vue';
import App from './App.vue';
import { SileoPlugin } from '../src';

const app = createApp(App);
app.use(SileoPlugin);
app.mount('#app');
