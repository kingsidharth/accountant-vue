<template>
  <div class="c-accounts c-accounts--single" v-if="account">
    <div class="card is-shadowless">
      <div class="card-content content">
        <nav class="breadcrumb has-arrow-separator is-small is-marginless" aria-label="breadcrumbs">
          <ul class="is-marginless">
            <li><router-link to="/accounts">Accounts</router-link></li>
            <li v-for="p in get_parent_breadcrumbs()" >
              <a href="#" @click="breadcrumb_click(p.id)">{{ p.name }}</a>
            </li>
            <li class="is-active"><a href="#" aria-current="page">{{ account.name }}</a></li>
          </ul>
        </nav>

        <h1 class="is-title is-1" style="margin: 0.5em 0em; line-height: 1em;">
          {{ account.name }}
        </h1>

        <div class="columns stats-counter">
          <Stats class="column is-2"
            v-bind:number="format.financial(account.balance)"
            title="Balance"
            numberClass="has-text-grey"
          />
          <Stats class="column is-2"
            v-bind:number="account.children ? account.children.length : 0"
            title="Children"
            numberClass="has-text-grey"
          />
        </div>

      </div>
    </div><!-- .card -->

    <section class="section">
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

      <div class="content" v-show="tab_active_check('children')" refs="children">
        <accounts-tree
          childComponent="AccountsChildTree"
          v-bind:accounts="account.children"
        />
      </div>

      <div v-show="tab_active_check('transactions')" ref="transactions">
        <TransactionsList
          v-bind:transactions="transactions"
          v-bind:account_id="account.id"
        />
      </div>
    </section>

  </div><!-- if(account) -->

</template>

<script>
import { mapGetters } from 'vuex'
import { pick, union } from 'lodash'

import AccountsMeta from './AccountsMeta.vue'
import Stats from '../common/Stats.vue'
import TransactionsList from '../transactions/TransactionsList.vue'
import AccountsChildTree from './AccountsChildTree.vue'

// Mount with minimal data expectations
// Check if details are available
// Else Dispatch Actions to Fetch it
// Update self with the new data

export default {
  name: 'accounts-single',

  data: function() {
    return {
      tabs: {
        active: 'transactions',
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
    this.$store.dispatch('account_get_details', { id: this.account_id })
  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },
    account: function() {
      return this.$store.getters.account_get_details(this.account_id)
    },

    transactions: function() {
      return this.$store.getters.get_account_transactions(this.account_id)
    },
  },

  watch: {
    '$route' (to, from) {
      this.$store.dispatch('account_get_details', { id: this.account_id })
    },
  },

  methods: {
    tab_switch: function (ref) {
      this.tabs.active = ref
    },

    tab_active_check: function(name) {
      return this.tabs.active === name
    },

    flatten_parent_tree: function(parent) {
      /*
        params
        - parent:Object
          - id: Integer
          - name: String
          - parent: Object or null
        =>
        array of parent objects, immidiate parent first.
      */
      let parents = []

      const parent_obj = pick(parent, ['id', 'name'])
      parents.push(parent_obj)

      if (parent.parent != null) {
        parents = union(parents, this.flatten_parent_tree(parent.parent))
      }

      return parents
    },

    get_parent_breadcrumbs: function() {
      const parent = this.account.parent
      if (!!parent) {
        return this.flatten_parent_tree(parent).reverse()
      } else {
        return []
      }
    },

    breadcrumb_click: function(id) {
      this.$router.push({ name: 'account', params: { id: id }})
    },
  },

  components: {
    AccountsMeta,
    Stats,
    TransactionsList,
  }
}
</script>
