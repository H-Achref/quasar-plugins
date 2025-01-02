import { createApp } from 'vue';
import { Quasar } from 'quasar';
import router from './router/router';

// Import Quasar CSS
import 'quasar/src/css/index.sass';

// Import icon libraries (optional)
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';

// Import your root component
import App from './App.vue';

// Import q-draggable-table and its styles
import qDraggableTable from 'quasar-ui-q-draggable-table';
import 'quasar-ui-q-draggable-table/dist/index.css';

// Create the Vue app instance
const myApp = createApp(App);

myApp.use(router);
myApp.use(Quasar, {
  plugins: {},  
});

myApp.use(qDraggableTable);


// Mount the app
myApp.mount('#app');
