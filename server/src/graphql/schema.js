const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    people: [Person]!
    person(id: ID!): Person
  }

  type Person {
    id: ID!
    name: String!
    profiles: [Profile]
    photo: String
  }

  type Profile {
    id: ID!
    platform: Platform!
    url: String!
  }

  enum Platform {
    TWITTER
    YOUTUBE
    INSTAGRAM
    FACEBOOK
  }

  type Mutation {
    updateProfile(profileId: ID!, platforn: Platform!, url: String!): UpdateProfileResponse!
    login(email: String!): String
  }

  type UpdateProfileResponse {
    success: Boolean!
    message: String
    profile: Profile
  }
`

module.exports = typeDefs
