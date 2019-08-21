import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './app/App'
import './index.css'
// TODO: Uncomment this when you figure out how to make it work with Cypress.
// import registerServiceWorker from './registerServiceWorker'

const port = process.env.PORT || 4000

const client = new ApolloClient({
  uri: `http://localhost:${port}/graphql`
})

// TODO: Use Helmet to avoid DOM nesting error.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker()
