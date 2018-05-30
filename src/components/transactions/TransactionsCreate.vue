<template>
  <div class="card transactions--create">
    <form ref="form" @submit.stop.prevent="handle_submit">
      <div class="card-header">
        <span class="card-header-title">Add/Edit Transaction</span>
      </div>
      <div class="card-content">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions">
        </vue-form-generator>
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
import VueFormGenerator from 'vue-form-generator'
import { map } from 'lodash'

export default {
  name: 'transactions-create',
  data: function() {
    const accounts = this.$store.state.accounts.data
    let select_accounts = map(accounts, function(a) { return { id: a.id, name: a.name } })

    return {
      model: {
        description: "",
        amount: 0,
        credit: {
          account_id: null,
          is_credit: true,
        },
        debit: {
          account_id: null,
          is_credit: false,
        },
      },

      schema: {
        fields: [
          {
            type: "input",
            inputType: "number",
            model: "amount",
            label: "Amount",
            required: true,
            styleClasses: ['field'],
            step: 0.01
          },
          {
            type: "input",
            inputType: "text",
            model: "description",
            label: "Description",
            required: true,
            min: 5,
            styleClasses: ['field'],
          },
          {
            type: "select",
            label: "Credit Account",
            model: "credit.account_id",
            required: true,
            hint: '',
            validator: VueFormGenerator.validators.number,
            values: select_accounts,
            styleClasses: ['select field'],
          },
          {
            type: "select",
            label: "Debit Account",
            model: "debit.account_id",
            required: true,
            hint: '',
            validator: VueFormGenerator.validators.number,
            values: select_accounts,
            styleClasses: ['select field'],
          },
        ]
      },// schema

      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validationErrorClass: "is-danger",
        validationSuccessClass: "is-success"
      }
    }
  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },
  },

  methods: {
    handle_submit: function(e) {
      const transaction = this.make_transaction(this.model)
      this.$store.dispatch('transaction_create', transaction)
    },

    is_account_aware: function() {
      // => account_id:Integer || false
      return this.account_id ? this.account_id : false
    },

    make_transaction_amounts: function(model) {
      const credit_obj = model.credit
      const debit_obj = model.debit
      let credit_amount = Object.assign({}, credit_obj,  { amount: model.amount })
      let debit_amount = Object.assign({}, debit_obj,  { amount: model.amount })

      return [credit_amount, debit_amount]
    },

    make_transaction: function(model) {
      let transaction = { description: model.description }
      transaction.amounts = this.make_transaction_amounts(model)
      return transaction
    }
  },
}
</script>
