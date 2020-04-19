import Emoji from 'a11y-react-emoji'
import PropTypes from 'prop-types'
import React from 'react'
import Result from '../Result'

ContactOptions.propTypes = {
  refs: PropTypes.arrayOf(PropTypes.object)
}

function ContactOptions(props) {
  return (
    <React.Fragment>
      <Result key="submit-a-feature-request">
        <a
          href="mailto:features@peoplenotplatforms.com"
          ref={props.refs[0]}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Emoji symbol="💡" label="light bulb" />
          Submit a feature request
        </a>
      </Result>
      <Result key="report-a-bug">
        <a
          href="mailto:bugs@peoplenotplatforms.com"
          ref={props.refs[1]}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Emoji symbol="🐛" label="bug" />
          Report a bug
        </a>
      </Result>
      <Result key="make-a-general-enquiry">
        <a
          href="mailto:support@peoplenotplatforms.com"
          ref={props.refs[2]}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Emoji symbol="🗣" label="speaking silhouette head" />
          Make a general enquiry
        </a>
      </Result>
    </React.Fragment>
  )
}

export default ContactOptions
