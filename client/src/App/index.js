import React, { Component } from 'react'
import Avatar from '../avatar/Avatar'
import Search from '../search/Search'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Follow people, not platforms</h1>
        </header>
        <Avatar/>
        <Search/>
      </div>
    )
  }
}

export default App
