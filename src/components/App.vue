<template>
  <div id="app">
    <TopNav/>

    <div class="columns">
      <div class="column is-2">
        <Sidebar id="sidebar"/>
      </div>
      <div class="column">
        <transition appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>

    <Modal/>
  </div>
</template>

<script>
import TopNav from './layout/TopNav.vue'
import Hero from './layout/Hero.vue'
import Sidebar from './layout/Sidebar.vue'
import Modal from './layout/Modal.vue'

export default {
  name: 'app',

  data: function() {
    return {}
  }, // data

  mounted: function() {
    this.$store.dispatch('accounts_remote_get')
    this.$store.dispatch('transactions_remote_get')
    this.$snackbar.open(`App started. Initialization events sent.`)
  },

  methods: {},

  components: {
    TopNav,
    Hero,
    Sidebar,
    Modal,
  },

}
</script>
