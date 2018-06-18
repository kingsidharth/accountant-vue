<template>
  <div class="card is-rounded transactions--create">
    <form ref="form" @submit.stop.prevent="handle_submit">
      <div class="card-header">
        <span class="card-header-title">Add/Edit Transaction</span>
      </div>

      <div class="card-content">
        <TransactionsFormFields
          v-bind:id="model.id"
          v-bind:description="model.description"
          v-bind:amount="model.amount"
          v-bind:debit_account="model.debit_account"
          v-bind:credit_account="model.credit_account"
          v-bind:accounts="get_select_accounts()"
        />
      </div>

      <footer class="card-footer">
        <div class="card-footer-item">
          <input type="submit" class="button is-primary" value="Save"/>
        </div>
      </footer>
    </form>
  </div>
</template>

<script>
import { map } from 'lodash'
import validate from 'validate.js'

import transactions_model from './model'
import TransactionsFormFields from './TransactionsFormFields.vue'
import formMixin from '../mixins/forms'

export default {
  name: 'transactions-create',
  mixins: [formMixin],
  data: function() {
    return {
      model: {
        description: null,
        amount: null,
        credit_account: null,
        debit_account: null,
      },
    }
  },

  mounted: function() {

  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },

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

  methods: {
    handle_submit: function(e) {
      const raw_data = validate.collectFormValues(this.$refs.form)
      const data = validate.cleanAttributes(raw_data, {
        id: true,
        description: true,
        amount: true,
        credit_account: true,
        debit_account: true,
      })

      const errors = validate(data, transactions_model)
      this.errors = errors

      if (!errors) {
        const transaction = this.get_transaction_object(data)
        if(this.is_new) {
          this.$store.dispatch('transaction_create', transaction)
        }

        if(this.is_editing) {
          // this.$store.dispatch('transaction_edit', data)
        }
      }
    },

    get_select_accounts: function() {
      return this.accounts
    },

    get_transaction_object: function(form_object) {
      return {
        id: parseInt(form_object.id) || null,
        description: form_object.description,
        amounts: [
          {
            account_id: parseInt(form_object.credit_account),
            is_credit: true,
            amount: form_object.amount,
          },
          {
            account_id: parseInt(form_object.debit_account),
            is_credit: false,
            amount: form_object.amount
          }
        ],
      }
    }

  }, // methods

  components: {
    TransactionsFormFields,
  },
}
</script>
