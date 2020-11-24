import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueRouter from 'vue-router'
import i18n from './i18n'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import routes from "@/routes";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  routes
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
