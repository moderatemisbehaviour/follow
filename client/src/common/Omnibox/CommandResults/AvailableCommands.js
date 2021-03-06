import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Result from '../Result'

AvailableCommands.propTypes = {
  query: PropTypes.string.isRequired,
  refs: PropTypes.arrayOf(PropTypes.object)
}

const commands = ['/contact']

function AvailableCommands(props) {
  const matchingCommands = commands.filter(command =>
    command.includes(props.query)
  )
  const commandsToRender = matchingCommands.length ? matchingCommands : commands

  return (
    <ol>
      {commandsToRender.map((command, index) => (
        <Result key={command}>
          <Link to={`?${command}`} ref={props.refs[index]}>
            {command}
          </Link>
        </Result>
      ))}
    </ol>
  )
}

export default AvailableCommands
