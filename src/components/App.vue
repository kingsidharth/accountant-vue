<template>
  <div id="app">
    <TopNav
      v-bind:name='name'
      v-bind:title='subtitle'
    />

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

    <b-modal :active.sync="modal.active" :width="640" scroll="keep">
      <div v-if="modal.content" class="content">
        <router-view name="modal"></router-view>
      </div>
    </b-modal>
  </div>
</template>

<script>
import TopNav from './layout/TopNav.vue'
import Hero from './layout/Hero.vue'
import Sidebar from './layout/Sidebar.vue'

export default {
  name: 'app',

  data: function() {
    return this.$store.state.meta
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
  },

}
</script>
