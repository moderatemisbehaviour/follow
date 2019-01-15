import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Input from '../common/Input'
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
          onKeyDown={this.onKeyDown}
          prompt="Type a person's name."
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
