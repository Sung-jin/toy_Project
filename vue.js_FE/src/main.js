// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import Scrollactive from 'vue-scrollactive'
import BootstrapVue from 'bootstrap-vue'
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'
import VueFullpage from 'fullpage-vue'
import VueMaterial from 'vue-material'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBSfJEcuVmQ_6bVnmZVt3dZVmeY_GGdPn4',
    libraries: 'places'
  }
})

Vue.use(Scrollactive)
Vue.use(BootstrapVue)
Vue.use('b-carousel', bCarousel)
Vue.use(VueFullpage)
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
