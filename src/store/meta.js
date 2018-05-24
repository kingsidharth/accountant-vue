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
  },

  view: {},

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


export default {
  state,
  mutations,
  actions
}
