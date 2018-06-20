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
          v-bind:amount="get_amount_value(model.amount)"
          v-bind:debit_account="model.debit_account"
          v-bind:credit_account="model.credit_account"
          v-bind:accounts="get_select_accounts()"
          v-bind:credit_amount_id="model.credit_amount_id"
          v-bind:debit_amount_id="model.debit_amount_id"
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
import { map, assign, pick, find, keys } from 'lodash'
import validate from 'validate.js'
import numeral from 'numeral'

import transactions_model from './model'
import TransactionsFormFields from './TransactionsFormFields.vue'
import formMixin from '../mixins/forms'

export default {
  name: 'transactions-create',
  mixins: [formMixin],
  data: function() {
    return {
      model: {
        id: null,
        description: null,
        amount: null,
        credit_account: null,
        debit_account: null,
        credit_amount_id: null,
        debit_amount_id: null,
      },
    }
  },

  mounted: function() {
    if(this.is_editing) {
      this.model = this.get_editable_transaction()
    }
  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },

    accounts: function() {
      return this.$store.getters.accounts_get_all_summary
    },
  }, // computed

  methods: {

    get_amount_value: function(amount) {
      // process amount string to get value
      return numeral(amount).value()
    },

    get_editable_transaction: function() {
      const data = this.$store.getters.get_transaction_detail(this.intent_id)
      const credit = find(data.amounts, { is_credit: true })
      const debit = find(data.amounts,  { is_debit: true })

      return assign({}, pick(data, ['id', 'description']), {
        amount: credit.amount,
        credit_account: credit.account,
        debit_account: debit.account,
        credit_amount_id: credit.id,
        debit_amount_id: debit.id,
      })
    }, // methods

    handle_submit: function(e) {
      const raw_data = validate.collectFormValues(this.$refs.form)
      const data = validate.cleanAttributes(raw_data, {
        id: true,
        description: true,
        amount: true,
        credit_account: true,
        debit_account: true,
        credit_amount_id: true,
        debit_amount_id: true,
      })

      const errors = validate(data, transactions_model)
      this.errors = errors

      if (!errors) {
        const transaction = this.get_transaction_object(data)

        if(this.is_new) {
          this.$store.dispatch('transaction_create', transaction)
        }

        if(this.is_editing) {
          this.$store.dispatch('transaction_edit', transaction)
        }
      }
    },

    get_select_accounts: function() {
      return this.accounts
    },

    get_transaction_object: function(form_object) {
      const transaction_id = parseInt(form_object.id) || null
      const credit_id = parseInt(form_object.credit_amount_id) || null
      const debit_id = parseInt(form_object.debit_amount_id) || null
      const credit_account_id = parseInt(form_object.credit_account) || null
      const debit_account_id = parseInt(form_object.debit_account) || null
      const amount = form_object.amount || null

      return {
        id: transaction_id,
        description: form_object.description,
        amounts: [
          {
            id: credit_id,
            account_id: credit_account_id,
            is_credit: true,
            amount: amount,
          },
          {
            id: debit_id,
            account_id: debit_account_id,
            is_credit: false,
            amount: amount,
          }
        ],
      }
    }

  }, // methods

  components: {
    TransactionsFormFields,
  }, // components
}
</script>
