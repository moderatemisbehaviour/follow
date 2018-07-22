import React, { Component } from 'react'
import './SearchResult.css'

class SearchResult extends Component {
  render () {
    return <li className="SearchResult">{this.props.personName}</li>
  }
}

export default SearchResult
