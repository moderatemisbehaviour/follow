import React, { Component } from 'react'
import SearchResult from './SearchResult'
import './SearchResults.css'

class SearchResults extends Component {
  render () {
    let searchResults = this.props.searchResults.map((searchResult, index) =>
      <SearchResult key={index} personName={searchResult.name}/>
    )

    return (
      <ul className="SearchResults">{searchResults}</ul>
    )
  }
}

export default SearchResults
