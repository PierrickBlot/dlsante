import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Personne from '../views/Personne.vue';
import Garage from '../views/Garage.vue'
import Vehicule from '../views/Vehicule.vue'

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Personne',
    name: 'Personne',
    component: Personne
  },
  {
    path: '/Garage',
    name: 'Garage',
    component: Garage
  },
  {
    path: '/Vehicule',
    name: 'Vehicule',
    component: Vehicule
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
