<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-start">
      <a class="navbar-item" href="#">
        <b-icon icon="menu mdi-light"></b-icon>
      </a>
    </div>

    <div class="navbar-brand">
      <a id="logo" class="navbar-item" href="/" v-bind:title='title'>
        {{name}}
      </a>
    </div>

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
      this.$store.dispatch('modal_open', this.view)
    }
  },

  computed: {
    view: function() { return this.$route.name }
  },
}

</script>
