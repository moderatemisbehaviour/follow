const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    people(
      query: String!
      resultsPerPage: Int
      startingPopularity: Int
    ): [Person]!
    peopleCount(query: String!): Int!
    person(id: ID!): Person
    user: User
  }

  type Mutation {
    createPerson(person: PersonInput!): Person
    editPerson(id: ID!, person: PersonInput!): Person
    upsertUser(user: UserInput!): User
  }

  type Person {
    id: ID!
    name: String!
    profiles: [String]
    image: String
  }

  input PersonInput {
    name: String!
    profiles: [String]
    image: String
  }

  type User {
    email: String!
    image: String
    name: String!
  }

  input UserInput {
    email: String!
    image: String
    name: String!
  }
`

module.exports = typeDefs
