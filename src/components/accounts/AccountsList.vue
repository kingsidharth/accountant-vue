<template>
  <ul v-if="accounts">
    <li v-for="a in accounts" v-bind:key="a.id">
      {{ a.name }} | {{ a.balance }} |
      <a href="#" @click="get_account_transactions(a.id)">Show Transactions</a>
    </li>
  </ul>
</template>

<script>


export default {
  name: 'accounts-list',

  data: function() {
    return this.$store.state.accounts
  },

  mounted: function() {
    this.$store.dispatch('account_get', [])
  }
}

</script>
