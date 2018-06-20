<template>
  <b-modal  :active.sync="active"
            :width="width"
            :component="content"
            :onCancel="close"
            scroll="keep"
            has-modal-card>
    <div class="content">

    </div>
  </b-modal>
</template>
<script>

export default {
  name: 'modal',
  data: function() {
    return this.$store.getters.get_modal
  }, //data

  methods: {
    close: function(){
      this.$store.dispatch('modal_close')
    }
  },
}
</script>
