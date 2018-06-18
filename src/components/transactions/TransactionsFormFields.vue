<template>
  <section>
    <b-input type="hidden" :value="id" name="id"></b-input>

    <div class="columns">
      <div class="column is-6">
        <b-field label="Amount" label-for="amount"
          :type="has_error('amount') ? has_error('amount').class : ''"
          :message="has_error('amount') ? has_error('amount').message : ''"
        >
          <b-input type="number" step="0.01" icon="currency-inr" :value="amount" name="amount" placeholder="0.00" required="true"></b-input>
        </b-field>
      </div><!-- column -->

      <div class="column is-6">
        <b-field label="Description" label-for="description"
          :type="has_error('description') ? has_error('description').class : ''"
          :message="has_error('description') ? has_error('description').message : ''"
        >
          <b-input type="text" :value="description" name="description" placeholder="Description" required="true" min-length="5"></b-input>
        </b-field>
      </div><!-- column -->
    </div><!-- .columns -->

    <div class="columns">
      <div class="column is-6">
        <b-field label="Debit Account">
          <b-select require="true"
            placeholder="Select an Account"
            name="debit_account"
            :value="debit_account"
            @input="handle_debit_change">

            <option value="null">None</option>
            <option
                v-for="account in debit_accounts_list"
                :value="account.id"
                :key="account.id"
                :selected="account.selected">
                {{ account.name }}
            </option>

          </b-select>
        </b-field>
      </div><!-- column -->

      <div class="column is-6">
        <b-field label="Credit Account">
          <b-select require="true"
            placeholder="Select an Account"
            name="credit_account"
            :value="credit_account"
            @input="handle_credit_change">

            <option value="null">None</option>
            <option
                v-for="account in credit_accounts_list"
                :value="account.id"
                :key="account.id"
                :selected="account.selected">
                {{ account.name }}
            </option>

          </b-select>
        </b-field>
      </div><!-- column -->

    </div><!-- .columns -->
  </section>
</template>

<script>
import { filter } from 'lodash'

import fieldMixin from '../mixins/fields'

const remove_account = function(accounts, id) {
  /* accounts:Array, id:Integer => accounts:Array */
  return filter(accounts, function(a) { return a.id != parseInt(id) })
}

export default {
  name: 'transactions-create-fields',
  mixins: [fieldMixin],
  props: {
    id: {},
    description: {},
    amount: {},
    credit_account: {},
    debit_account: {},
    accounts: {
      require: true,
      type: Array
    },
  }, // props

  data: function () {
    return {
      selected: {
        credit_account: this.credit_account,
        debit_account: this.debit_account
      },
    }
  }, //data

  computed: {
    credit_accounts_list: function() {
      const accounts = this.accounts
      const debit_account = this.selected.debit_account

      if (!!debit_account) {
        return remove_account(accounts, debit_account)
      } else {
        return accounts
      }
    },

    debit_accounts_list: function() {
      const accounts = this.accounts
      const credit_account = this.selected.credit_account

      if (!!credit_account) {
        return remove_account(accounts, credit_account)
      } else {
        return accounts
      }
    },
  }, //computed

  methods: {
    handle_debit_change: function(e){
      this.selected.debit_account = e
    },

    handle_credit_change: function(e) {
      this.selected.credit_account = e
    },

  }, //methods
}
</script>
