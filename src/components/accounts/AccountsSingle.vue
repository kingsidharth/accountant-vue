<template>
  <div class="c-accounts c-accounts--single">
    <Hero
      v-bind:title="account.name"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Hero from '../layout/Hero.vue'

export default {
  name: 'accounts-single',
  computed: {
    account: function() {
      const account_id = this.$route.params.id
      return this.$store.getters.account_get_details(account_id)
    }
  },
  components: {
    Hero
  }
}
</script>
