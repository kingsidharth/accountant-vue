<template>

  <div class="card">
    <form ref="form" @submit="handle_submit">
    <div class="card-header">
      <h1 class="card-header-title">Add/Edit Account</h1>
    </div>
    <div class="card-content">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions" >
        </vue-form-generator>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click="handle_submit">Add</a>
    </footer>
    </form>
  </div><!-- .card.account_from -->
</template>

<script>
import VueFormGenerator from 'vue-form-generator'

export default {
  data: function() {
    let accounts = this.$store.state.accounts.accounts
    let select_accounts = []
    for (var i = 0; i < accounts.length; i++) {
      const a = accounts[i]
      select_accounts.push({
        "id": a.id,
        "name": a.name
      })
    }

    return {
      model: {
        name: "",
        parent_id: null
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            readonly: false,
            required: true,
            placeholder: "Account name",
            styleClasses: ['field'],
            hint: '',
            validator: VueFormGenerator.validators.string
          },
          {
            type: "select",
            label: "Parent",
            model: "parent_id",
            required: true,
            hint: '',
            validator: VueFormGenerator.validators.number,
            values: select_accounts
          },
        ],
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true,
        validationErrorClass: "is-danger",
        validationSuccessClass: "is-success"
      }
    }
  },
  methods: {
    handle_submit: function() {
      const name = this.$data.model.name
      const parent_id = this.$data.model.parent_id || null

      if (!name) {
        console.error('name is require to create an Account');
      }

      const account = {
        name,
        parent_id
      }

      this.$store.dispatch('account_create', account)
    }
  }
}
</script>
