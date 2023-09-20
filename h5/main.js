import Vue from 'vue'
import App from './App.vue'
import agilityForm from '../packages/index.js'
import router from './router'

Vue.config.productionTip = false;
Vue.use(agilityForm);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
