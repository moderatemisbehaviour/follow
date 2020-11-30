const { SchemaDirectiveVisitor } = require('apollo-server')
const { AuthenticationError, ForbiddenError } = require('apollo-server')

class Auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { requires } = this.args
    const { resolve } = field

    field.resolve = async function(...args) {
      if (requires === 'CREATOR') {
        await checkUserIsCreator(args)
      }
      return resolve.apply(this, args)
    }
  }
}

async function checkUserIsCreator(args) {
  const [, { id }, { dataSources, req }] = args

  if (!req.session.userId) throw new AuthenticationError()
  const person = await dataSources.peopleDataSource.getPerson(id)
  if (req.session.userId !== person.creator) throw new ForbiddenError()
}

module.exports = Auth
