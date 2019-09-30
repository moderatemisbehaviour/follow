const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    people(query: String!): [Person]!
    person(id: ID!): Person
  }

  type Person {
    id: ID!
    name: String!
    profiles: [String]
    photo: String
  }

  input PersonInput {
    name: String!
    profiles: [String]
    photo: String
  }

  type Mutation {
    createPerson(person: PersonInput!): Person
  }
`

module.exports = typeDefs
