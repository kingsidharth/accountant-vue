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

  view: {},

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
}

const actions = {
  modal_toggle(context, content) {
    context.commit('modal_toggle', content)
  },

  modal_close(context) {
    context.commit('modal_close')
  },
}


export default {
  state,
  mutations,
  actions
}
