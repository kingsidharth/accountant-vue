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
        <router-view></router-view>
      </div>
    </div>

    <b-modal :active.sync="modal.active" :width="640" scroll="keep" :component="modal.content">
      <div class="card">
        <!-- <div class="card-image">
          <figure class="image is-4by3">
            <img src="http://placekitten.com/1280/960" alt="Image">
          </figure>
        </div> -->
        <div class="card-content">
          <!-- <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                  <img src="http://placekitten.com/96/96" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div> -->

          <div v-if="modal.content" class="content">
          </div>
        </div><!-- .card-content -->
      </div>
    </b-modal>
  </div>
</template>

<script>
import TopNav from './layout/TopNav.vue'
import Hero from './layout/Hero.vue'
import Sidebar from './layout/Sidebar.vue'

import AccountsList from './accounts/AccountsList.vue'
// import AccountsSingle from './accounts/AccountsSingle.vue'
import TransactionsList from './transactions/TransactionsList.vue'

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
    AccountsList,
    TransactionsList,
  },

}
</script>
