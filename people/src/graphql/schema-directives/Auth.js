const { SchemaDirectiveVisitor } = require('apollo-server')
const { AuthenticationError, ForbiddenError } = require('apollo-server')

class Auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { requires } = this.args
    const { resolve } = field
    field.resolve = function(...args) {
      if (requires === 'CREATOR') {
        const [, , { req }] = args
        if (req.session.userId) {
          throw new ForbiddenError()
        }
        throw new AuthenticationError()
      }
      return resolve(args)
    }
  }
}

module.exports = Auth
