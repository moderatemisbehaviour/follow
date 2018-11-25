import React, { Component } from 'react'

import SearchResult from './SearchResult'
import './SearchResults.css'

class SearchResults extends Component {
  render () {
    const {data: {people}} = this.props;
    let searchResults = people.map((searchResult, index) =>
      <SearchResult key={index} id={searchResult.id} personName={searchResult.name} />
    )

    return (
      <ul className="SearchResults">{searchResults}</ul>
    )
  }
}

export default SearchResults
