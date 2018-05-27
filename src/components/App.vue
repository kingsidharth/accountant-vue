<template>
  <div id="app">
    <TopNav
      v-bind:name='name'
      v-bind:title='subtitle'
    />
    <Hero/>
    <h2>Count the beans</h2>
    <hr>
    <AccountsList/>
    <hr>
    <TransactionsList/>

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
import TopNav from './TopNav.vue'
import Hero from './Hero.vue'

import AccountsList from './accounts/AccountsList.vue'
import TransactionsList from './transactions/TransactionsList.vue'

export default {
  name: 'app',

  data: function() {
    return this.$store.state.meta
  }, // data

  methods: {},

  components: {
    TopNav,
    Hero,
    AccountsList,
    TransactionsList,
  },

}
</script>
