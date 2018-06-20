import numeral from 'numeral'
import moment from 'moment'

moment.locale('in')

export default {
  methods: {
    format: {
      financial: function(number) {
        return numeral(number).format('0,0.00')
      },

      datetime: function(datetime) {
        return moment(datetime).format('MMM DD, Y')
      },
    },

    go_to: {
      accounts: function(id) {
        return { name: 'account', params: { id: id } }
      }
    },
  },
}
