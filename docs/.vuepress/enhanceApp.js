import agilityForm from '../../packages/index.js'
import './mock/mock.js'
import Axios from 'axios'
export default ({
  Vue
}) => {
  if (typeof window !== 'undefined') {
    import('vue-google-adsense')
      .then(module => {
        const Ads = module.default
        Vue.use(require('vue-script2'))
        Vue.use(Ads.Adsense)
        Vue.use(Ads.InArticleAdsense)
        Vue.use(Ads.InFeedAdsense)
      })
      .catch(e => {
        console.log(e)
      })
  }
  Vue.use(agilityForm, {
    border:true
  })
  Vue.prototype.$axios = Axios;
}