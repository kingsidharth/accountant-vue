<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a id="logo" class="navbar-item" href="/" v-bind:title='title'>
        <b-icon icon="google-circles-group mdi-light"> </b-icon>
        {{name}}
      </a>
    </div><!-- .navbar-brand -->

    <div class="navbar-menu">
      <router-link class="navbar-item" to="/accounts">Accounts</router-link>
      <router-link class="navbar-item" to="/transactions">Transactions</router-link>
    </div><!-- .navbar-menu -->

    <!-- <div class="navbar-brand">

    </div> -->

    <div class="navbar-end">
      <a class="navbar-item" href="#" @click.prevent="handle_click">
        <b-icon icon="plus mdi-light"></b-icon>
      </a>
    </div>
  </nav>
</template>

<script>

export default {
  props: ['name', 'title'],

  methods: {
    handle_click: function() {
      let type = this.type;
      this.$store.dispatch('intent_create', { type })
    }
  },

  computed: {
    type: function() {

      const route_name = this.$route.name

      if (route_name === 'accounts') { // Accounts List
        return 'accounts'
      } else if (route_name === 'account') { // Single Account
        return 'transactions'
      } else {
        return route_name
      }
    }
  },
}

</script>
