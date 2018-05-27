import AccountsList from '../accounts/AccountsList.vue'
import TransactionsList from '../transactions/TransactionsList.vue'

export default [
  { path: '/accounts', component: AccountsList },
  { path: '/account/:id', component: AccountsList },
  { path: '/transactions', component: TransactionsList }
]
