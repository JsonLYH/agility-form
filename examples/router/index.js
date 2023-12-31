import Vue from 'vue'
import VueRouter from 'vue-router'
import examples from '@/views/examples.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'examples',
    component: examples
  }
]

const router = new VueRouter({
  routes
})

export default router
