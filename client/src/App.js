import React, { Component } from 'react'
import Search from './Search'
import logo from './logo.png'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Search/>
        </header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Follow people, not platforms</h1>
      </div>
    );
  }
}

export default App
