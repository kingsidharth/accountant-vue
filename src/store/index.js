import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  name: "Accountant",
  subtitle: "Count the beans...",
  modal: {
    active: true,
  },
  col: 23,
  current_status: {},
  transactions: [],
  accounts: []
}

const mutations = {
  modal_toggle(state) {
    state.modal.active = !state.modal.active
  }
}

const actions = {
  modal_toggle(context) {
    context.commit('modal_toggle')
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions
})
