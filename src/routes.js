import AccountsList from './components/accounts/AccountsList.vue'
import AccountsSingle from './components/accounts/AccountsSingle.vue'
import AccountsCreate from './components/accounts/AccountsCreate.vue'

import TransactionsList from './components/transactions/TransactionsList.vue'


export default [
  {
    name: 'accounts',
    path: '/accounts',
    components: {
      default: AccountsList,
      modal: AccountsCreate
    }
  },
  {
    name: 'account',
    path: '/account/:id',
    components: {
      default: AccountsSingle,
      modal: AccountsCreate
    }
  },
  {
    name: 'transactions',
    path: '/transactions',
    components: {
      default: TransactionsList,
      modal: AccountsCreate
    }
  }
]