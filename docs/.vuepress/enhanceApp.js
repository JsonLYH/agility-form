import agilityForm from '../../packages/index.js'
import './mock/mock.js'
import Axios from 'axios'
export default ({
  Vue
}) => {
  Vue.use(agilityForm, {
    border:true
  })
  Vue.prototype.$axios = Axios;
}