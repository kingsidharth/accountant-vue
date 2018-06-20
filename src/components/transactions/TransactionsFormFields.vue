<template>
  <section>
    <input type="hidden" :value="id" name="id"></input>
    <input type="hidden" :value="get_selected_account_id('credit')" name="credit_account"/>
    <input type="hidden" :value="get_selected_account_id('debit')" name="debit_account"/>
    <input type="hidden" :value="credit_amount_id" name="credit_amount_id"/>
    <input type="hidden" :value="debit_amount_id" name="debit_amount_id"/>
    <input type="hidden" :value="get_robot_date( !!display_at ? display_at : get_editable_date)" name="display_at" />
    <div class="columns is-multiline is-mobile" style="width: 500px;">

      <div class="column is-6">
        <b-field label="Select a date">
          <b-datepicker
              :value="get_editable_date"
              :v-model="display_date"
              :focused-date="get_editable_date"
              :max-date="new Date()"
              placeholder="Click to select..."
              icon="calendar-today"
              @input="(date) => get_robot_date(date)">
          </b-datepicker>
        </b-field>
      </div><!-- .column -->

      <div class="column is-6">
        <b-field label="Amount" label-for="amount"
          :class="has_error('amount') ? ' has-danger-text ' : ''"
          :type="has_error('amount') ? has_error('amount').class : ''"
          :message="has_error('amount') ? has_error('amount').message : ''"
        >
          <b-input type="number" step="0.01" icon="currency-inr" :value="amount" name="amount" placeholder="0.00" required="true"></b-input>
        </b-field>
      </div><!-- column -->

      <div class="column is-12">
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
        <b-field label="Debit Account" label-for="debit_account">
          <b-autocomplete
            :value="!!this.debit_account ? this.debit_account.name : ''"
            :v-model="selected.debit_account"
            :open-on-focus="true"
            :data="debit_accounts_list"
            field="name"
            @select="option => selected.debit_account = option">
          </b-autocomplete>
        </b-field>
      </div><!-- column -->

      <div class="column is-6">
        <b-field label="Credit Account">
          <b-autocomplete
            :value="!!this.credit_account ? this.credit_account.name : ''"
            :v-model="selected.credit_account"
            :open-on-focus="true"
            :data="credit_accounts_list"
            field="name"
            @select="option => selected.credit_account = option">
          </b-autocomplete>
        </b-field>
      </div><!-- column -->

    </div><!-- .columns -->
  </section>
</template>

<script>
import moment from 'moment'
import momentRandom from 'moment-random'
import { filter, get, random } from 'lodash'

import fieldMixin from '../mixins/fields'

const remove_account = function(accounts, account) {
  /* accounts:Array, id:Integer => accounts:Array */
  return filter(accounts, function(a) { return a.id != parseInt(account.id) })
}

export default {
  name: 'transactions-create-fields',
  mixins: [fieldMixin],
  props: [
    'id',
    'description',
    'amount',
    'credit_account',
    'debit_account',
    'credit_amount_id',
    'debit_amount_id',
    'accounts',
    'display_at',
  ], // props

  data: function () {
    return {
      selected: {
        credit_account: null,
        debit_account: null,
      },

      display_date: new Date(),
    }
  }, //data

  mounted: function() {
    // console.log(this);
  }, //mounted

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

    get_editable_date: function() {
      const date = this.display_at
      return !!date ? moment(date).toDate() : new Date()
    },
  }, //computed

  methods: {
    get_selected_account_id: function(account_type) {
      const type = account_type + '_account'
      const prop_account = !!get(this, type) ? get(get(this, type), 'id') : null
      const selected_account = !!get(this.selected, type) ? get(get(this.selected, type), 'id') : null
      return !!selected_account ? selected_account : prop_account
    },

    get_robot_date: function(data) {
      const date = moment(data)
      const today = moment()

      let robot_date = date.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)

      if(date.isBefore(today.subtract(1, 'days'))) {
        robot_date =  date.add(random(1, 60), 'seconds').format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
      }

      return robot_date
    },
  }, //methods
}
</script>
