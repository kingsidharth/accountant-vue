<template>
  <div>
    <ul v-if="accounts.length > 0">
      <li v-for="a in accounts" :key="'account-' + a.id" class="card is-hoverable" @click="see_account_details(a.id)">
        <div class="card-content columns is-gapless is-clickable">
          <div class="column is-2">
            <span class="has-text-link">{{ a.name }}</span>
          </div>
          <div class="column is-2 has-text-right mono has-text-grey">
            {{ format.financial(a.balance) }}
          </div>
          <div class="column has-text-right">
              <a href="#" class="button is-small is-link is-inverted" @click.stop.prevent="edit_account(a.id)">
                <b-icon pack="mdi" icon="pencil-box-outline" size="is-small"></b-icon>
                Edit
              </a>
              <a href="#" class="button is-small is-link is-inverted">
                <b-icon pack="mdi" icon="plus-box-outline" size="is-small"></b-icon>
                Sub-Account
              </a>
              <router-link class="button is-small is-link" to="/transactions">
                <b-icon pack="mdi" icon="playlist-plus" size="is-small"></b-icon>
                Transactions
              </router-link>
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

    add_account: function() {
      this.$store.dispatch('intent_create', { type: 'accounts' })
    },

    edit_account: async function(id) {
      await this.$store.dispatch('intent_edit', {
        type: 'accounts',
        id: id
      })
    },

  },
}

</script>
