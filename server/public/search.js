'use strict'

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      searching: false
    };
  }

  search (text) {
    console.log(`Searching for '${text}'.`)
    let httpRequest = new XMLHttpRequest()
    httpRequest.onreadystatechange = function (response) {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log('SUCCESS!')
        } else {
          console.error(`Response returned with status code ${httpRequest.status}.`)
        }
      } else {
        console.error('Not ready yet.')
      }
    }
    httpRequest.open('GET', `/person/search?q=${text}`)
    httpRequest.send()
  }

  render () {
    return (
      <SearchInput onChange={(event) => this.search(event.target.value)}/>
    )
  }
}

class SearchInput extends React.Component {
  render () {
    return <input
              onChange={this.props.onChange}
              id="search"
              type="search"
              placeholder="Type a person's name."
              autoFocus/>
  }
}

const searchContainer = document.querySelector('#search-container');
ReactDOM.render(<Search/>, searchContainer);
