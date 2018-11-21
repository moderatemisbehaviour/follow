import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag';

import './Search.css'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSearchResults: false,
    }
  }

  search (query) {
    this.setState({
      showSearchResults: !!query.length,
    });
  }

  render () {
    const {showSearchResults} = this.state;
    const GET_PEOPLE = gql`
      query getPeople {
        people {
          name
        }
      }
    `;

    return (
      <div>
        <input
          onChange={(event) => this.search(event.target.value)}
          className="Search-input"
          type="search"
          placeholder="Type a person's name."
          autoFocus/>
        {showSearchResults && 
          <Query query={GET_PEOPLE}>
            {({ data, loading, error }) => {
              if (loading) return <p>LOADING</p>;
              if (error) return <p>ERROR</p>;

              return <SearchResults data={data}/>
            }}
          </Query>
        }
      </div>
    )
  }
}

export default Search
