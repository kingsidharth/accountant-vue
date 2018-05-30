/*

  Accounts :: Store Module
  ============================

  Concerns:
  - CRUD Accounts
  - Account Details
  - Account Balances
  - Account Transactions

*/
import Vue from 'vue'
import { find, filter, includes, assign, map } from 'lodash'

import api from '../api'
import { update_resource } from './helpers'

let endpoint = api.base_url('ACCOUNTS')

/*

  State

*/
const state = {
  data: [], // Actual accounts stored here
}


/*

  Mutations

*/
const mutations = {
  accounts_remote_updated: function(state, payload) {
    update_resource(state.data, payload)
  },
}


/*

  Actions

*/
const actions = {
  /*
    App API
  */

  /*
    Remote
  */
  accounts_remote_get: async (context) => {
    return await api.request(endpoint).then(({data}) => {
      context.commit('accounts_remote_updated', data)
    })
  },

  account_get_details: async (context, { id, force }) => {
    force = force || false
    const data = context.state.data
    let detailed_known_ids = await map(filter(data, 'detailed'), 'id')
    const is_account_known = includes(detailed_known_ids, id) || false

    if(!is_account_known || !!force) {
      const account_endpoint = endpoint + id + '/'
      return await api.request(account_endpoint).then(({ data }) => {
        context.commit('accounts_remote_updated', [{ ...data, detailed: true }])
      })
    }
  },

  account_create: async (context, accounts) => {
    return await api.request(endpoint, accounts, 'POST')
              .then(({data, errors}) => {
                context.commit('accounts_remote_updated', data)
                context.dispatch('modal_close')
              })
  },
}


/*

  Getters

*/
const getters = {
  accounts_get_all: (state) => {
    return state.data
  },

  account_get_details: (state) => (id) => {
    const data = state.data
    let account = find(data, { id: id })
    if (!account) {
    } else {
      return account
    }
  },
}


/*

  Store Package

*/
export default {
  state,
  mutations,
  actions,
  getters
}
