import agilityForm from '../../packages/index.js'
import './mock/mock.js'
import Axios from 'axios'
export default ({
  Vue
}) => {
  Vue.use(agilityForm, {
    border:true,
    formSize:'mini'
  })
  Vue.prototype.$axios = Axios;
}