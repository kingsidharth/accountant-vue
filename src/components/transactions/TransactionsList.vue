<template>
  <ul v-if="transactions">
    <li v-for="t in transactions" v-bind:key="t.id">
      {{ t.created_at }}
      || {{ t.description }}
      || {{ t.amount }}
      ||
      <a href="#" @click.stop.prevent="edit_transaction">
        <b-icon icon="playlist-edit"></b-icon> Edit
      </a>
    </li>
  </ul>
  <div class="notification is-light" v-else>
    No transactions for this account. Add one
  </div>
</template>

<script>
export default {
  name: 'transactions-list',

  data: function() {
    return this.$store.state.transactions
  },

  methods: {
    edit_transaction(id) {
      console.log('Intent: Edit transaction ' + id);
    }
  },
}
</script>
