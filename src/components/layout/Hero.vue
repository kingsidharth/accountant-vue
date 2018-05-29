<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h2 class="title">
          {{ title }}
        </h2>
        <h2 v-if="subtitle" class="subtitle">
          {{ subtitle }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'hero',
  props: {
    title: String,
    subtitle: String
  }
}
</script>
