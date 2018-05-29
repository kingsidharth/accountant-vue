<template>
  <ul v-if="accounts ? accounts.length > 0 : false">
    <li v-for="a in accounts">
      <router-link :to="{ name: 'account', params: { id: a.id }}">{{ a.name }}</router-link>
      <br />
      <accounts-tree v-if="!!a.children.length"
        v-bind:accounts="a.children">
      </accounts-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'account-child-tree',
  props: ['accounts', 'childComponent'],
  methods: {
    handle_click: function(id) {
      this.$router.push(this.go_to.accounts(id))
    }
  },
}
</script>
