import gql from 'graphql-tag'

const GET_PEOPLE = gql`
  query People(
    $query: String!
    $resultsPerPage: Int
    $startingPopularity: Int
  ) {
    people(
      query: $query
      resultsPerPage: $resultsPerPage
      startingPopularity: $startingPopularity
    ) {
      id
      name
      image
      profiles
    }
  }
`

const GET_PEOPLE_COUNT = gql`
  query PeopleCount($query: String!) {
    peopleCount(query: $query)
  }
`

export { GET_PEOPLE, GET_PEOPLE_COUNT }
