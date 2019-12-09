import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'

import Input from '../common/Input'
import './Search.css'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearchResults: false
    }
  }

  render() {
    const { query } = this.state

    // TODO: Add a debounce to the search.
    return (
      <div className="Search">
        <Input
          onChange={event => this.search(event.target.value)}
          prompt="Type a person's name."
          type="search"
        />
        {query && (
          <Query query={GET_PEOPLE} variables={{ query }}>
            {results => <SearchResults query={query} results={results} />}
          </Query>
        )}
      </div>
    )
  }

  search(query) {
    this.setState({
      query
    })
  }
}

const GET_PEOPLE = gql`
  query People($query: String!) {
    people(query: $query) {
      id
      name
      image
    }
  }
`

export default Search
