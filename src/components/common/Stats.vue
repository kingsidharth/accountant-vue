<template>
  <div class="stats">
    <h3 v-bind:class="[(numberClass ? numberClass : 'has-text-info'), 'is-title mono is-marginless' ]">
      {{ number }}
    </h3>
    <span class="heading">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: ['number', 'title', 'numberClass']
}
</script>
