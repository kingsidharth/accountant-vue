export default {
  methods:  {
    has_error: function(field_name) {
      // field_name (String) => error (Object) || false
      let error = false

      if(this.errors) {
        if(!!this.errors[field_name]) {
          error = {
            class: 'is-danger',
            message: this.errors[field_name]
          }
        }
      }

      return error
    }
  }
}
