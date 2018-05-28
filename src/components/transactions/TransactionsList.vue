<template>
  <div class="transactions transactions--list">
    <table v-if="transactions.length > 0" class="table" ref="transactions_table">
      <!-- content added via d3 -->
    </table>
    <div class="notification is-light" v-else>
      No transactions to display.
    </div>
  </div>
</template>

<script>
import { map, forEach, find } from 'lodash'
import moment from 'moment'

moment.locale('in')

export default {
  name: 'transactions-list',
  props: ['transactions', 'account_id'],
  data: function() {
    return {
      headers: [
        {
          id: 'id',
          label: 'ID'
        },
        {
          id: 'created_at',
          label: 'Date'
        },
        {
          id: 'description',
          label: 'Description'
        },
        {
          id: 'credit',
          label: 'Credits'
        },
        {
          id: 'debit',
          label: 'Debits'
        },
        {
          id: 'cumm',
          label: 'Cummu.'
        },
        {
          id: 'actions',
          label: 'Actions'
        },
      ]
    }
  },

  mounted: function(){
    this.get_transactions_table()
  },

  methods: {
    edit_transaction(id) {
      console.log('Intent: Edit transaction ' + id);
    },

    get_transactions_table: function() {
      const credits_debits_data = this.credits_debits_data
      const account_id = this.account_id
      const transactions = this.transactions
      const d3 = this.$d3
      const parse_datetime = this.parse_datetime
      const headers = this.headers
      const header_keys = map(headers, 'id')

      const table = d3.select(this.$refs.transactions_table)
      const table_head = table.append('thead')
        .append('tr')
        .selectAll('tr')
        .data(headers)
          .enter().append('th').text((d)=>{ return d.label })

      const table_body = table.append('tbody')
      const table_rows = table_body.selectAll('tr')
                          .data(transactions)
                            .enter().append('tr')
                            .each(function(t, i, transactions) {

                              d3.select(this).selectAll('td')
                                .data(header_keys).enter()
                                .append('td')
                                .text(function(k, i){

                                  const amounts = credits_debits_data(t.amounts, account_id)

                                  if ((k === 'credit') || (k === 'debit')) {
                                    return amounts[k].amount
                                  } else if(k === 'created_at') {
                                    return parse_datetime(t[k])
                                  } else {
                                    return t[k]
                                  }

                                })

                            })
    },

    credits_debits_data: function(amounts, account_id) {
      /*
        amounts:Array of Amount objects, account_id:Integer => { credit: 0, debit: 0 }
      */
      let credit = find(amounts, { account_id: account_id, is_credit: true }) || { amount: parseInt(0) }
      let debit = find(amounts, { account_id: account_id, is_credit: false }) || { amount: parseInt(0) }

      return {
        credit,
        debit
      }
    },

    parse_datetime: function(datetime) {
      return moment(datetime).format('MMM DD, Y')
    },

  },

}
</script>
