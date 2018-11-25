import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './app/App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,800" rel="stylesheet"></link>
    </head>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
