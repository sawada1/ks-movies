import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import tv from '../views/tv.vue'
import actors from '../views/actors.vue'
import actorDetails from '../views/actorDetails.vue'
import movie from '../views/movie.vue'
import show from '../views/show.vue'
import favourite from '../views/favourite.vue'
import trending from '../views/trending.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tv',
    name: 'tv',
    component: tv
  },
  {
    path: '/favourite',
    name: 'favourite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    component:favourite
  },

  {
    path: '/actors',
    name: 'actors',
    component: actors,
  },
  {
    path: '/actorDetails/:id',
    name: 'actorDetails',
    component: actorDetails,
    props: true,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: movie,
    props: true
  },
  {
    path: '/show/:id',
    name: 'show',
    component: show,
    props: true
  },
  {
    path: '/trending',
    name: 'trending',
    component: trending,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
