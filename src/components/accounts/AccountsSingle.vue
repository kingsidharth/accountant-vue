<template>
  <div class="c-accounts c-accounts--single" v-if="account">
    <Hero
      v-bind:title="account.name"
    />
    <p v-if="account.children">
      {{ account.children }}
    </p>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

import Hero from '../layout/Hero.vue'

// Mount with minimal data expectations
// Check if details are available
// Else Dispatch Actions to Fetch it
// Update self with the new data

export default {
  name: 'accounts-single',

  mounted: function() {
    if (this.account_id) {
      this.$store.dispatch('account_get_details', this.account_id)
    }
  },

  computed: {
    account_id: function() { return parseInt(this.$route.params.id) },
    account: function() {
      return this.$store.getters.account_get_details(this.account_id)
    }
  },

  watch: {
    '$route' (to, from) {
      console.log(to);
    }
  },

  components: {
    Hero
  }
}
</script>
