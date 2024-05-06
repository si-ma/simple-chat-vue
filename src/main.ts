import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import App from './App.vue'

import PrimeVue from 'primevue/config';

// PrimeVue コンポーネントのスタイル
import 'primevue/resources/themes/saga-blue/theme.css'; // テーマ
import 'primevue/resources/primevue.min.css'; // コアスタイル
import 'primeicons/primeicons.css'; // アイコン

const app = createApp(App)

// app.use(createPinia())

app.use(PrimeVue)

app.mount('#app')
