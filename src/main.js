import app from './app.js';
import router from './shared/router'
import 'bootstrap/dist/css/bootstrap.css'
import '../src/plugins';

app.use(router);
app.mount('#app');

