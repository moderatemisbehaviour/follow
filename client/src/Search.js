import React, { Component } from 'react'
import './Search.css'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searching: false
    }
  }

  search (text) {
    console.log(`Searching for '${text}'.`)
    this.setState({
      searching: true
    })

    fetch(`/person/search?q=${text}`).then((response) => {
      return response.json()
    }).then((searchResultsJson) => {
      this.props.onNewSearchResults(searchResultsJson)
      this.setState({
        searching: false
      })
    })
  }

  render () {
    return <input
              onChange={(event) => this.search(event.target.value)}
              className="Search-input"
              type="search"
              placeholder="Type a person's name."
              autoFocus/>
  }
}

export default Search
