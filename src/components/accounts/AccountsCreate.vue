<template>

  <div class="card accounts--create">
    <form ref="form" @submit.stop.prevent="handle_submit">
      <div class="card-header">
        <span class="card-header-title">{{ is_editing ? 'Edit' : 'New' }} Account</span>
      </div>

      <div class="card-content">

        <AccountsCreateForm
          v-bind:id="model.id"
          v-bind:name="model.name"
          v-bind:parent_id="model.parent_id"
          v-bind:accounts="get_select_accounts()"
          v-bind:errors="errors"
        />
      </div>

      <footer class="card-footer">
        <div class="card-footer-item">
          <input type="submit" class="button is-primary" :value="(is_editing ? 'Update' : 'Create') + ' Account'"/>
        </div>
      </footer>
    </form>
  </div><!-- .card.account_from -->
</template>

<script>
// import VueFormGenerator from 'vue-form-generator'
import { includes, find, indexOf, assign, isString } from 'lodash'
import validate from 'validate.js'

import accounts_model from './model'
import AccountsCreateForm from './AccountsCreateForm.vue'
import formMixin from '../mixins/forms'

export default {
  name: 'accounts-create',
  mixins: [formMixin],
  data: function() {
    return {
      model: {
        id: null,
        name: null,
        parent_id: null,
      },
      select_accounts: null,
      errors: null
    }
  },

  computed: {
    accounts: function() {
      const accounts = this.$store.getters.accounts_get_all

      return accounts.map(function(a) {
        return {
          id: a.id,
          name: a.name,
          selected: false
        }
      })
    },
  },

  mounted: function() {
    if(this.is_editing) {
      this.model = this.get_editable_account()
    }
  },

  methods: {
    get_editable_account: function() {
      return this.$store.getters.account_get_details(this.intent_id)
    },

    suggestions: function() {
      let parent_id = false
      const type = this.$route.name

      if(this.is_new && type === 'account') {
        const id = this.$route.params.id || false
        parent_id = !!id ? parseInt(id) : id
      }

      return {
        parent_id,
      }
    },

    get_select_accounts: function() {
      let select_accounts = this.accounts
      const suggestion = this.suggestions().parent_id

      if(this.is_new && !!suggestion) {
        const i = indexOf(select_accounts, find(select_accounts, { id: suggestion }))
        select_accounts[i] = assign({}, select_accounts[i], { selected: "selected" })
        this.model.parent_id = suggestion
      }

      if(this.is_editing) {
        const parent_id = this.model.parent_id
        const i = indexOf(select_accounts, find(select_accounts, { id:  parent_id }))
        select_accounts[i] = assign({}, select_accounts[i], { selected: "selected" })
      }

      return select_accounts
    },

    /* Handle Form Submission */
    handle_submit: function(e) {
      /* Side Effects */
      const raw_data = validate.collectFormValues(this.$refs.form)
      const data = validate.cleanAttributes(raw_data, {
        id: true,
        name: true,
        parent_id: true
      })

      const errors = validate(data, accounts_model)
      this.errors = errors

      if (!errors) {
        if(this.is_new) {
          this.$store.dispatch('account_create', data)
        }

        if(this.is_editing) {
          this.$store.dispatch('account_edit', data)
        }
      }
    },

  },

  components: {
    AccountsCreateForm,
  },
}
</script>
