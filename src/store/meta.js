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
import { includes } from 'lodash';
import componentMap from './componentMap'


/*

  Internals & Partials

*/
/* Modal Width Map */

const modal_widths = {
  accounts: '360px',
  transactions: '400px',
}

/* Intent Partial */
const intent_partial = {
  create: false,
  edit: false,
  delete: false,
  id: false,
}


/*

  State

*/
const state = {
  name: "Accountant",
  app_icon_class: 'google-circles-group',
  subtitle: "Count the beans...",
  col: 23,

  modal: {
    active: false,
    content: {},
    width: 640,
  },

  sidebar: {
    active: true,
  },

  intent: Object.assign(intent_partial, {
    type: 'accounts',
  }),
}

/*

  Mutations [to State]

*/
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

  modal_set_width(state, payload) {
    state.modal.width = parseInt(payload)
  },

  reset_intent(state) {
    state.intent = Object.assign({}, {...state.intent}, intent_partial)
  },

  set_create_intent(state, payload) {
    state.intent = Object.assign({}, intent_partial, {
      type: payload.type,
      create: true,
    })
  },

  set_edit_intent(state, payload) {
    state.intent = Object.assign({}, state.intent, intent_partial, {
      type: payload.type,
      id: payload.id,
      edit: true,
    })
  },

  set_delete_intent(state, payload) {
    state.intent = Object.assign({}, state.intent, intent_partial, {
      type: payload.type,
      id: payload.id,
      delete: true,
    })
  },
}


/*

  Actions

*/
const actions = {
  modal_open(context, content) {
    context.commit('modal_toggle', content)
  },

  modal_close(context) {
    context.commit('modal_toggle')
    context.commit('reset_intent')
  },

  sidebar_toggle(context) {
    context.commit('sidebar_toggle')
  },

  intent_create(context, resource) {
    const known_types = Object.keys(componentMap)
    const type = resource.type

    if (includes(known_types, type)) {
      context.commit('set_create_intent', resource)
      context.commit('modal_set_width', modal_widths[type])
      context.dispatch('modal_open', componentMap[type])
    }
  },

  intent_edit(context, editable) {
    context.commit('set_edit_intent', editable )
    context.dispatch('modal_open', componentMap[editable.type])
  },

  intent_delete_context(context, ids) {

  },
}


/*

  Getters

*/
const getters = {

  /* */

  /* Modal */
  get_modal: (state) => {
    return state.modal
  },

  get_modal_status: (state) => {
    return state.modal.active
  },

  modal_get_content: (state) => {
    return state.modal.content
  },

  get_intent: (state) => {
    return state.intent
  },


  /* Intent */
  get_intent_id: (state) => {
    return state.intent.id
  },

  is_intent_create: (state) => {
    return state.intent.create
  },

  is_intent_edit: (state) => {
    return state.intent.edit
  },
}


export default {
  state,
  mutations,
  actions,
  getters,
}
