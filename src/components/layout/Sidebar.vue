<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/accounts">Accounts</router-link></li>
      <li><router-link to="/transactions">Transactions</router-link></li>
    </ul>

  </aside>
</template>

<script>

export default {
  name: 'sidebar',
  data: function() {
    return this.$store.state.meta.sidebar
  },
  methods: {
    toggle_sidebar: function() {
      this.$store.dispatch('toggle_sidebar')
    }
  }
}

</script>
