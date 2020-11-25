import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import routes from '@/routes'
import store from '@/store'
import i18n from './i18n'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMaterial)

new Vue({
  router: routes,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
