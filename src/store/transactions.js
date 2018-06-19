/*

  Transactions :: Store Module
  ============================

  Concerns: (Sync changes back & forth with remote server)
  - CRUD Transactions
  - Transaction Details
  - Amount & Balance Checks

*/
import { find, filter, forEach, map, flatten } from 'lodash'

import api from '../api'
import { update_resource } from './helpers'

let endpoint = api.base_url('TRANSACTIONS')

const state = {
  data: []
}


const mutations = {
  transactions_remote_update: function(state, payload) {
    update_resource(state.data, payload)
  }
}

const actions = {
  transactions_remote_get: async function(context) {
    return await api.request(endpoint).then(({data}) => {
      return map(data, function(d) {
        d.detailed = false
        return  d
      })
    })
    .then((data) => {
      context.commit('transactions_remote_update', data)
    });
  },

  transaction_create: async function(context, transaction) {
    return await api.request(endpoint, transaction, 'POST')
                    .then(({ data, errors }) => {
                      context.commit('transactions_remote_update', data)
                      context.dispatch('modal_close')
                      context.dispatch('update_related_accounts', data)
                    });
  },

  transaction_edit: async function(context, transaction) {
    const id = transaction.id
    const transaction_endpoint = endpoint + id + '/'

    return await api.request(transaction_endpoint, transaction, 'PUT')
                .then(({ data }) => {
                  context.commit('transactions_remote_update', data)
                  context.dispatch('modal_close')
                  context.dispatch('update_related_accounts', data)
                });
  },

  update_related_accounts: async function(context, transactions) {
    const related_accounts = map(flatten(map(transactions, 'amounts')), 'account_id')
    forEach(related_accounts, function(id) {
      context.dispatch('account_get_details', { id: id, force: true })
    });
  },
}

const getters = {
  get_account_transactions: (state) => (account_id) => {
    const data = state.data
    return filter(data, function(d) {
      if ( filter(d.amounts, { account_id: account_id }).length > 0) {
        return d
      } else {
        return false
      }
    })
  },

  get_transaction_detail: (state) => (transaction_id) => {
    const data = state.data
    return find(data, ['id', parseInt(transaction_id)])
  },
}


export default {
  state,
  mutations,
  actions,
  getters
}
