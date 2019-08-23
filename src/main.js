import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

import Vant from 'vant'
import 'vant/lib/index.css' // 加载验证插件的语言包
Validator.localize('zh_CN', zhCN)
Vue.use(VeeValidate)
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
