/*

  Meta :: Store Module
  ============================

  Concerns: (Application State)
  - Loading
  - Navigation
  - View
    - Account(s)
    - Transaction(s)
  - Modal
  - Local Store Backup of Current State
*/

const state = {
  name: "Accountant",
  subtitle: "Count the beans...",
  col: 23,

  modal: {
    active: false,
    content: {}
  },

  sidebar: {
    active: true,
  },

}


const mutations = {
  modal_toggle(state, payload) {
    if (state.modal.active) {
      state.modal.content = {}
    }

    if (!!payload) {
      state.modal.content = payload
    }

    state.modal.active = !state.modal.active
  },

  modal_close(state) {
    state.modal.active = false
  },

  sidebar_toggle(state) {
    state.sidebar.active = !state.sidebar.active
  },
}

const actions = {
  modal_open(context, content) {
    context.commit('modal_toggle', content)
  },

  modal_close(context) {
    context.commit('modal_toggle')
  },

  sidebar_toggle(context) {
    context.commit('sidebar_toggle')
  },
}


export default {
  state,
  mutations,
  actions
}
