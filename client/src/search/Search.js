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

  search (inputValue) {
    this.setState({
      showSearchResults: !!inputValue.length
    })
  }

  render () {
    const { showSearchResults } = this.state
    const GET_PEOPLE = gql`
      query getPeople {
        people {
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
        {showSearchResults &&
          <Query query={GET_PEOPLE}>
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
