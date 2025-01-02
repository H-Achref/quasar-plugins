import { createRouter, createWebHistory } from 'vue-router';
import DraggableTableView from '../views/draggableTableView.vue';
import AudioWavesurferView from '../views/audioWavesurferView.vue';
import HelloWorldView from '../views/HelloWorldView.vue';
import apis from '../views/apisView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorldView,
  },
  {
    path: '/draggable-table',
    name: 'Draggable table',
    component: DraggableTableView,
  },
  {
    path: '/audio-wavesurfer',
    name: 'Audio wavesurfer',
    component: AudioWavesurferView,
  },
  {
    path: '/apis',
    name: 'API\'s',
    component: apis,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Use import.meta.env.BASE_URL instead of process.env.BASE_URL
  routes,
});

export default router;
