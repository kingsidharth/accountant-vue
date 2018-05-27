<template>
  <div class="c-accounts__meta">
    <ul>
      <li>
        Name: {{ name }}
      </li>
      <li>
        Created on: {{ created_at }}
      </li>
      <li v-if="children">
        Children: {{ children.length }}
      </li>
      <li v-if="parent">
        Parent: {{ parent.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'accounts-meta',
  props: ['name', 'created_at', 'children', 'parent']
}
</script>
