import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import './index.css'
// TODO: Uncomment this when you figure out how to make it work with Cypress.
// import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: `${window.location.origin}/graphql`
})

// TODO: Use Helmet to avoid DOM nesting error.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker()
