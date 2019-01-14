import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
      <div>
        <input
          autoFocus
          className="Search-input"
          onChange={(event) => this.search(event.target.value)}
          onKeyDown={this.onKeyDown}
          placeholder={this.props.prompt}
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

Search.propTypes = {
  prompt: PropTypes.string
}

Search.defaultProps = {
  prompt: "Type a person's name."
}

export default Search
