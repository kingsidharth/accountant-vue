import AccountsList from '../accounts/AccountsList.vue'
import AccountsSingle from '../accounts/AccountsSingle.vue'
import TransactionsList from '../transactions/TransactionsList.vue'

export default [
  {
    name: 'accounts',
    path: '/accounts',
    component: AccountsList
  },
  {
    name: 'account',
    path: '/account/:id',
    component: AccountsSingle
  },
  {
    name: 'transactions',
    path: '/transactions',
    component: TransactionsList
  }
]
