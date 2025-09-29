import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router setup
import './index.css'; // Import Tailwind CSS build

const app = createApp(App);

app.use(router);
app.mount('#app');