<template>
  <div class="stats">
    <h2 class="is-title mono is-marginless has-text-primary	">
      {{ number }}
    </h2>
    <span class="heading">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'stats',
  props: ['number', 'title']
}
</script>
