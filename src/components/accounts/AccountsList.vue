<template>
  <ul v-if="accounts.length > 0">
    <li v-for="a in accounts" v-bind:key="a.id">
      {{ a.name }} | {{ a.balance }} |
      <a href="#" @click.stop.prevent="get_transactions(a.id)">Show Transactions</a>
    </li>
  </ul>
  <div v-else class="notification is-light">
    No accounts. <a href="#" @click.stop.prevent="get_accounts">Refresh.</a>
  </div>
</template>

<script>


export default {
  name: 'accounts-list',

  data: function() {
    return this.$store.state.accounts
  },

  mounted: function() {
    this.$store.dispatch('account_get', [])
  },

  methods: {
    get_transactions: function(account_id) {
      this.$store.dispatch('account_get_transactions', { account_id })
    },

    get_accounts: function(ids) {
      ids = ids || []
      this.$store.dispatch('account_get', ids)
    }
  },
}

</script>
