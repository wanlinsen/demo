import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element'
import './plugins/echarts'
import './assets/css/global.css'
import './assets/icons'
Vue.config.productionTip = false
Vue.prototype.$url = 'http://api.yntnsw.com:83'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
