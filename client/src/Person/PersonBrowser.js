import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Home from '../common/Home'
import Person from './Person'
import Search from '../Search/Search'

class PersonBrowser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  render() {
    const { id } = this.props

    if (id) {
      const GET_PERSON = gql`
        query getPerson($id: ID!) {
          person(id: $id) {
            name
            image
            profiles
          }
        }
      `

      return (
        <Query query={GET_PERSON} variables={{ id }}>
          {({ data, loading, error }) => {
            if (error) return <p>ERROR</p>
            if (loading) {
              return <Person title="Loading..." />
            }

            const {
              person: { name, image, profiles }
            } = data
            return (
              <React.Fragment>
                <Person
                  name={name}
                  image={image || undefined}
                  profiles={profiles}
                />
                <Search />
              </React.Fragment>
            )
          }}
        </Query>
      )
    } else {
      return (
        <React.Fragment>
          <Home />
          <Search />
        </React.Fragment>
      )
    }
  }
}

PersonBrowser.propTypes = {
  id: PropTypes.string
}

PersonBrowser.defaultProps = {
  id: undefined
}

export default PersonBrowser
