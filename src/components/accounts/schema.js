export default [
  {
    type: "text",
    label: "Name",
    model: "name",
    readonly: false,
    required: true,
    placeholder: "Account name",
    validator: VueFormGenerator.validators.string
  },
  {
    type: "select",
    label: "Parent",
    model: "parent_id",
    required: true,
    validator: VueFormGenerator.validators.number,
    values:
  }
]
