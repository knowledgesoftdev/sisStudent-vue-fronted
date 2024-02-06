import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentAdd from "../views/StudentAdd.vue"
import Studentshow from "../views/StudentView.vue"
import StudentEdit from "../views/StudentEdit.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/showStudent',
    name: 'showStudent',
    component: Studentshow
  },
  {
    path: '/addStudent',
    name: 'addStudent',
    component: StudentAdd
  },
  {
    path: '/editStudent/:id',
    name: 'editStudent',
    component: StudentEdit
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
