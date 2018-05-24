import Vue from 'vue'
import Vuex from 'vuex'

import Buefy from 'buefy'

import store from './store'
import AppFrame from './components/App.vue'


Vue.use(Buefy)

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
  }
});
