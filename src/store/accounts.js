/*

  Accounts :: Store Module
  ============================

  Concerns:
  - CRUD Accounts
  - Account Details
  - Account Balances
  - Account Transactions

*/
import { unionWith, find, filter, includes, assign, map, indexOf, uniqBy, forEach } from 'lodash'
import api from '../api'
import Vue from 'vue'

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

    forEach(payload, function(a, index, payload) {
      const known_accounts = map(state.data, 'id')

      if(includes(known_accounts, a.id)) {
        const source_index = indexOf(state.data, find(state.data, { id: a.id }))
        state.data.splice(source_index, 1, a)
      } else {
        state.data.push(a)
      }
    })
  },

  // accounts_details_remote_updated: function(state, payload) {
  //   let account = find(state.data, { id: payload.id })
  //   let index = indexOf(state.data, account)
  //   console.log(state.data);
  //
  //   if (index > 0) {
  //     state.data.splice(index, 1, payload)
  //   } else {
  //     state.data.push(payload)
  //   }
  //
  //   console.log(state.data);
  // }
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

  account_get_details: async (context, id) => {
    const data = context.state.data
    let detailed_known_ids = await map(filter(data, 'detailed'), 'id')
    const is_account_known = includes(detailed_known_ids, id) || false

    if(!is_account_known) {
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
    console.log(account);
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
