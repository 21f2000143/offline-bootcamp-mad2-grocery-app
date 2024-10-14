import { createApp } from 'vue'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App.vue'
import router from './router'
import store from './store';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';






const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.directive('tooltip', Tooltip);
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('Menubar', Menubar)
app.component('Checkbox', Checkbox)
app.component('Card', Card)
app.mount('#app')
