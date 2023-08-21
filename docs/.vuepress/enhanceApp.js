import agilityForm from '../../packages/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
export default ({
  Vue
}) => {
  Vue.use(ElementUI)
  Vue.use(agilityForm)
}