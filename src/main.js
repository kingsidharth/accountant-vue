import Vue from 'vue'
import Vuex from 'vuex'

import Buefy from 'buefy'
import VueFormGenerator from 'vue-form-generator'
import VueRouter from 'vue-router'
import VueD3 from 'vue-d3'

import store from './store'
import AppFrame from './components/App.vue'
import routes from './components/views/routes'

Vue.use(Buefy)
Vue.use(VueFormGenerator)
Vue.use(VueRouter)
Vue.use(VueD3)


const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  data: function() {
    return {
      name: "Accountant App"
    }
  },
  template: '<AppFrame/>',
  components: {
    AppFrame
  },
  router
});
