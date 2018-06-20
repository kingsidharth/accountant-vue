import Vue from 'vue'
import Vuex from 'vuex'

import Buefy from 'buefy'
import VueRouter from 'vue-router'
import VueD3 from 'vue-d3'

import store from './store'
import common_helpers from './components/helpers';
import AppFrame from './components/App.vue'
import routes from './routes'
import AccountsChildTree from './components/accounts/AccountsChildTree.vue'

Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(VueD3)

const router = new VueRouter({
  routes
})

Vue.mixin({
  created: function() {
    this.format = common_helpers.methods.format
    this.go_to = common_helpers.methods.go_to
  }
})

Vue.component('accounts-tree', AccountsChildTree)

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
