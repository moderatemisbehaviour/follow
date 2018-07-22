import React, { Component } from 'react'
import './Search.css'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searching: false,
      searchResults: []
    }
  }

  search (text) {
    this.setState({
      searching: true
    })
    console.log(`Searching for '${text}'.`)

    fetch(`/person/search?q=${text}`).then((response) => {
      return response.json()
    }).then((searchResultsJson) => {
      let searchResults = searchResultsJson.map((searchResult, index) =>
        <SearchResult key={index} personName={searchResult.name}/>
      )
      this.setState({
        searching: false,
        searchResults: searchResults
      })
    })
  }

  render () {
    return (
      <div className="Search">
        <SearchInput onChange={(event) => this.search(event.target.value)}/>
        <ul className="Search-results">{this.state.searchResults}</ul>
      </div>
    )
  }
}

class SearchInput extends Component {
  render () {
    return <input
              onChange={this.props.onChange}
              className="SearchInput"
              type="search"
              placeholder="Type a person's name."
              autoFocus/>
  }
}

class SearchResult extends Component {
  render () {
    return <li className="SearchResult">{this.props.personName}</li>
  }
}

export default Search
