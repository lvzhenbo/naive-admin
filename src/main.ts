import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { pinia } from './store';
import '@/styles/tailwind.css';

const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
document.head.appendChild(meta);

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
