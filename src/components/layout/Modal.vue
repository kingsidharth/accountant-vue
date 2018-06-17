<template>
  <b-modal  :active.sync="active"
            :width="640" scroll="keep"
            :component="content"
            :onCancel="close"
            has-modal-card>
    <div class="content">

    </div>
  </b-modal>
</template>
<script>

export default {
  name: 'modal',
  data: function() {
    return this.$store.state.meta.modal
  }, //data

  methods: {
    close: function(){
      this.$store.dispatch('modal_close')
    }
  },
}
</script>
