// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import VueSession from 'vue-session'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/engine.scss'
import './style.scss'

Vue.use(VueMaterial)
Vue.use(VueSession)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
