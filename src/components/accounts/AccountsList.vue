<template>
  <div>
    <button class="button" @click="add_account">Add Account</button>
    <ul v-if="accounts.length > 0">
      <li v-for="a in accounts" :key="'account-' + a.id" class="card" @click="see_account_details(a.id)">
        <div class="card-content columns is-gapless is-clickable">
          <div class="column is-3">
            {{ a.name }}
          </div>
          <div class="column is-3">
            {{ a.balance }}
          </div>
          <div class="column" v-if="a.detailed">
            <router-link to="/transactions">Transactions</router-link>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="notification is-light">
      No accounts. <a href="#" @click.stop.prevent="get_accounts">Refresh.</a>
    </div>
  </div>
</template>

<script>
import AccountsCreate from './AccountsCreate.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'accounts-list',

  computed: {
    ...mapGetters({
      accounts: 'accounts_get_all'
    })
  },

  methods: {
    see_account_details: function(id) {
      this.$router.push(this.go_to.accounts(id))
    },

    add_account: function(e) {
      this.$store.dispatch('modal_toggle', AccountsCreate)
    },

  },
}

</script>
