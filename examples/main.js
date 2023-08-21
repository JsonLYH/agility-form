import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import agilityForm from '../packages/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(agilityForm);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
