import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'

import CreatePersonButton from '../people/CreatePersonButton'
import Input from '../common/Input'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearchResults: false
    }
  }

  search (query) {
    this.setState({
      query
    })
  }

  render () {
    const {query} = this.state
    const GET_PEOPLE = gql`
      query People($query: String!) {
        people(query: $query) {
          id
          name
        }
      }
    `

    return (
      <div className="Search">
        <Input
          onChange={(event) => this.search(event.target.value)}
          prompt="Type a person's name."
          type="search"
        />
        {query &&
          <Query query={GET_PEOPLE} variables={{query}}>
            {({ data, loading, error }) => {
              return (
                <SearchResults people={data && data.people}>
                  {loading && <li>Loading...</li>}
                  {error && <li>Error :(</li>}
                  {data && <CreatePersonButton/>}
                </SearchResults>
              )
            }}
          </Query>
        }
      </div>
    )
  }
}

export default Search
