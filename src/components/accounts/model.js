

export default {
  id: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  },

  name: {
    presence: true,
    length: {
      minimum: 5,
      message: "must be at least 5 characters"
    }
  },

  parent_id: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  }
}
