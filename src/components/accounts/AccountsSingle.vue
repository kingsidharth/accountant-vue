<template>
  <div class="c-accounts c-accounts--single" v-if="account">
    <Hero
      v-bind:title="account.name"
    />
    <div class="tabs">
      <ul>
        <!-- <li class="is-active"><a>Children</a></li> -->
        <li v-for="t in tabs.data" :class="{ 'is-active': tab_active_check(t.refs) }">
          <a href="#" @click.stop.prevent="tab_switch(t.refs)">
            {{ t.text }}
          </a>
        </li>
      </ul>
    </div><!-- .tabs -->

    <div class="" v-show="tab_active_check('meta')" refs="meta">
      <AccountsMeta
        v-bind:name="account.name"
        v-bind:created_at="account.created_at"
        v-bind:children="account.children"
        v-bind:parent="account.parent"
      />
    </div>

    <div v-show="tab_active_check('transactions')" ref="transactions">
      <TransactionsList
        v-bind:transactions="transactions"
      />
    </div>
  </div><!-- if(account) -->

</template>

<script>
import { mapGetters } from 'vuex'

import Hero from '../layout/Hero.vue'
import AccountsMeta from './AccountsMeta.vue'
import TransactionsList from '../transactions/TransactionsList.vue'

// Mount with minimal data expectations
// Check if details are available
// Else Dispatch Actions to Fetch it
// Update self with the new data

export default {
  name: 'accounts-single',

  data: function() {
    return {
      tabs: {
        active: 'meta',
        data: {
          meta: {
            refs: 'meta',
            text: 'Meta'
          },
          children: {
            refs: 'children',
            text: 'Children',
          },
          transactions: {
            refs: 'transactions',
            text: 'Transactions',
          },
        }
      }
    }
  },

  mounted: function() {
    if (this.account_id) {
      this.$store.dispatch('account_get_details', this.account_id)
    }

  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },
    account: function() {
      return this.$store.getters.account_get_details(this.account_id)
    },
    transactions: function () {
      return this.$store.getters.get_account_transactions(this.account_id)
    }
  },

  watch: {
    '$route' (to, from) {
      console.log(to);
    }
  },

  methods: {
    tab_switch: function (ref) {
      this.tabs.active = ref
    },

    tab_active_check: function(name) {
      return this.tabs.active === name
    }
  },

  components: {
    Hero,
    AccountsMeta,
    TransactionsList
  }
}
</script>
