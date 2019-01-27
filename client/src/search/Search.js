import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'

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
              if (loading) return <p>LOADING</p>
              if (error) return <p>ERROR</p>

              return <SearchResults data={data}/>
            }}
          </Query>
        }
      </div>
    )
  }
}

export default Search
