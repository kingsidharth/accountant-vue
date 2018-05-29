<template>
  <div class="transactions transactions--list">
    <table v-if="transactions" class="table is-striped is-hoverable" ref="transactions_table">
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
import numeral from 'numeral'

moment.locale('in')

export default {
  name: 'transactions-list',
  // props: ['transactions', 'account_id'],
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

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },
    transactions: function() {
      return this.$store.getters.get_account_transactions(this.account_id)
    },
  },

  watch: {
    '$route' (to, from) {
      this.get_transactions_table()
    },
  },

  methods: {
    edit_transaction(id) {
      console.log('Intent: Edit transaction ' + id);
    },

    get_transactions_table: function() {
      const credits_debits_data = this.credits_debits_data
      const get_cell_css_class = this.get_cell_css_class
      const handle_cell_click = this.handle_cell_click
      const account_id = this.account_id
      const transactions = this.transactions
      const d3 = this.$d3
      const parse_datetime = this.parse_datetime
      const headers = this.headers
      const header_keys = map(headers, 'id')

      const table = this.table = d3.select(this.$refs.transactions_table).html("")
      const table_head = this.table_head = table.append('thead')
        .append('tr')
        .selectAll('tr')
        .data(headers)
          .enter().append('th').text((d)=>{ return d.label })

      const table_body = this.table_body = table.append('tbody')
      const table_rows = table_body.selectAll('tr')
                          .data(transactions)
                            .enter().append('tr')
                            .attr('data-id', (t) => { return 'transaction_' + t.id })
                            .each(function(t, i, transactions) {

                              d3.select(this).selectAll('td')
                                .data(header_keys).enter()
                                .append('td')
                                .on('click', (k) => { return handle_cell_click(t.id, k) })
                                .attr('class', (k) => { return get_cell_css_class(k) })
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
      let credit = find(amounts, { account_id: account_id, is_credit: true }) || { amount: 0.00 }
      let debit = find(amounts, { account_id: account_id, is_credit: false }) || { amount: 0.00 }

      credit.amount = numeral(credit.amount).format('0,0.00')
      debit.amount = numeral(debit.amount).format('0,0.00')

      return {
        credit,
        debit
      }
    },

    parse_datetime: function(datetime) {
      return moment(datetime).format('MMM DD, Y')
    },

    get_cell_css_class: function(key){
      if (key === 'created_at') {
        return 'data data--date'
      } else if (key === 'credit' || key === 'debit' || key === 'cumm') {
        return 'data data--financial mono has-text-right'
      }
    },

    handle_cell_click: function(key, prop) {
      console.log( find(this.transactions, { id: key }) )
    },

  },

}
</script>
