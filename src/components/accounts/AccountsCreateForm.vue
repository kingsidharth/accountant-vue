<template>
  <section>
    <b-input type="hidden" :value="id" name="id">
    </b-input>

    <b-field label="Name" label-for="name"
      :type="has_error('name') ? has_error('name').class : ''"
      :message="has_error('name') ? has_error('name').message : null">
      <b-input type="text" :value="name" name="name" placeholder="Account Name" required="true" min="5"></b-input>
    </b-field>

    <b-field label="Parent Account">
      <b-select placeholder="Select an Account" name="parent_id" :value="parent_id">
        <option value="null">None</option>
        <option
            v-for="account in accounts"
            :value="account.id"
            :key="account.id"
            :selected="account.selected">
            {{ account.name }}
        </option>
      </b-select>
    </b-field>

  </section>
</template>

<script>
import fieldMixin from '../mixins/fields'

export default {
  name: 'accounts-create-form',
  mixins: [fieldMixin],
  props: {
    id: {
      require: false,
      type: Number
    },

    name: {
      require: false,
      type: String,
      validator: function(value) {
        return value.length >= 5
      },
    },

    parent_id: {
      required: false,
      type: Number,
    },

    accounts: {
      required: true,
      type: Array,
      validator: function(value) {
        return value.length >= 2
      }
    },

    is_credit_normal: {
      required: false,
      type: Boolean,
    },

    errors: {
      require: false,
      type: Object
    }
  },
}

</script>
