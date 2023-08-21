import Vue from 'vue'
import VueRouter from 'vue-router'
import examples from '@/views/examples.vue'
import agilityForm from '../../packages/index.js'

Vue.use(VueRouter)
Vue.use(agilityForm)
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
