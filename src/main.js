import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

require('spectre.css/dist/spectre.min.css');
require('spectre.css/dist/spectre-exp.min.css');
require('spectre.css/dist/spectre-icons.min.css');

createApp(App).use(router).mount('#app');
