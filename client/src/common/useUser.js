import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function useUser() {
  const { data } = useQuery(GET_USER)
  const userExists = data && data.user
  return userExists ? data.user : null
}

const GET_USER = gql`
  query GetUser {
    user {
      id
      email
      image
      name
    }
  }
`

export default useUser
