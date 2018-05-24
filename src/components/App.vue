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
    
    <b-modal :active.sync="modal.active" :width="640" scroll="keep">
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="http://placekitten.com/1280/960" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                  <img src="http://placekitten.com/96/96" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
            <a>#css</a> <a>#responsive</a>
            <br>
            <small>11:09 PM - 1 Jan 2016</small>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import TopNav from './TopNav.vue'
import Hero from './Hero.vue'

import AccountsList from './accounts/AccountsList.vue'
import TransactionsList from './transactions/TransactionsList.vue'

export default {
  name: 'app-frame',

  data: function() {
    return this.$store.state.meta
  }, // data

  mounted: function() {
    this.get_accounts()
  },

  methods: {
    get_api_response(endpoint) {
      // string => fetch object (then-able)
      return fetch(endpoint, { mode: 'cors' }).then((response) => {
        if(!response.ok) {
          console.error(response)
        } else {
          return response.json()
        }
      })
    },

    get_accounts() {
      // null => promise
      const endpoint = 'http://local.appserver.com:5000/v1/accounts/'

      return this.get_api_response(endpoint).then((json) => {
        this.accounts = _.union(this.accounts, json.accounts)
        return json.accounts
      })
    },

    get_account_transactions(account_id) {
      const endpoint =  'http://local.appserver.com:5000/v1/accounts/' +
                        account_id +
                        '/transactions'

      return this.get_api_response(endpoint).then((json) => {
        this.transactions = json
      })
    },
  },

  components: {
    TopNav,
    Hero,
    AccountsList,
    TransactionsList,
  },

}
</script>
