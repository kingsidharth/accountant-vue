
export default {
  id: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    }
  },

  description: {
    presence: true,
    length: {
      minimum: 3,
      message: "must be at least 3 characters"
    }
  },

  amounts: {
    numericality: {
      presence: true,
      greaterThan: 0,
      strict: true,
    }
  },

  credit_account: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      strict: true,
    }
  },

  debit_account: {
    presence: true,
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      strict: true,
    }
  },
}
