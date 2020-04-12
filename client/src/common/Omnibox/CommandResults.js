import PropTypes from 'prop-types'
import React from 'react'

CommandResults.propTypes = {
  query: PropTypes.string.isRequired
}

const commands = ['/about', '/contact']

function CommandResults(query) {
  if (query === '/about') {
    return [
      <span key="about-result-1">About result 1</span>,
      <span key="about-result-2">About result 2</span>,
      <span key="about-result-3">About result 3</span>
    ]
  } else if (query === '/contact') {
    return [
      <span key="submit-a-feature-request">💡Submit a feature request</span>,
      <span key="report-a-bug">🐛Report a bug</span>,
      <span key="make-a-general-enquiry">🗣Make a general enquiry</span>
    ]
  }
  return [
    commands
      .filter(command => command.includes(query))
      .map(command => <span key={command}>{command}</span>)
  ]
}

export default CommandResults
