import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Query } from 'react-apollo'

import CreatePersonButton from '../Person/CreatePersonButton'
import Input from '../common/Input'

import './Search.css'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: null
    }
  }

  render() {
    const { query } = this.state
    const { resultsPerPage } = this.props

    // TODO: Add a debounce to the search.
    return (
      <div className="search">
        <Input
          onChange={event => this.search(event.target.value)}
          prompt="Type a person's name."
          type="search"
        />
        {query && (
          <Query query={GET_PEOPLE} variables={{ query }}>
            {({ data, error, loading }) => (
              <SearchResults
                resultsPerPage={resultsPerPage}
                searchResults={(data && data.people) || []}
              >
                {loading ? <li>Loading...</li> : null}
                {error ? <li>Error :(</li> : null}
                <CreatePersonButton personName={query} />
              </SearchResults>
            )}
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

Search.propTypes = {
  resultsPerPage: PropTypes.number
}

Search.defaultProps = {
  resultsPerPage: 5
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
