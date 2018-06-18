import validate from 'validate.js'

export default {
  computed: {
    is_editing: function() {
      return this.$store.getters.is_intent_edit
    },

    is_new: function() {
      return this.$store.getters.is_intent_create
    },

    intent_id: function() {
      return this.$store.getters.get_intent_id
    },
  },
}
