import React, { Component } from 'react'
import Avatar from './Avatar'
import Search from './Search'
import SearchResults from './SearchResults'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  renderSearchResults (searchResults) {
    console.log(`${searchResults.length} new search results received.`)
    this.setState({
      searchResults: searchResults
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Follow people, not platforms</h1>
        </header>
        <Avatar/>
        <Search onNewSearchResults={(searchResults) => this.renderSearchResults(searchResults)}/>
        {
          this.state.searchResults.length > 0 && <SearchResults searchResults={this.state.searchResults}/>
        }
      </div>
    )
  }
}

export default App
