import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './Search.css'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor (props) {
    super(props)
    this.firstSearchResultRef = React.createRef()
    this.state = {
      showSearchResults: false
    }
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown ({ key }) {
    if (key === 'ArrowDown') {
      this.firstSearchResultRef.current.parentElement.focus()
    }
  }

  search (query) {
    this.setState({
      showSearchResults: !!query.length
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
      <div>
        <input
          autoFocus
          className="Search-input"
          onChange={(event) => this.search(event.target.value)}
          onKeyDown={this.onKeyDown}
          placeholder="Type a person's name."
          type="search"
        />
        {showSearchResults &&
          <Query query={GET_PEOPLE}>
            {({ data, loading, error }) => {
              if (loading) return <p>LOADING</p>
              if (error) return <p>ERROR</p>

              return <SearchResults data={data} firstSearchResultRef={this.firstSearchResultRef} />
            }}
          </Query>
        }
      </div>
    )
  }
}

export default Search
