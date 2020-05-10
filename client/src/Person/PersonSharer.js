import Emoji from 'a11y-react-emoji'
import PropTypes from 'prop-types'
import React from 'react'
import './PersonSharer.css'

// TODO: Remove duplication between here and PersonBrowser.
PersonSharer.propTypes = {
  id: PropTypes.string.isRequired
}

function PersonSharer(props) {
  const { id } = props
  // const { error, data } = useQuery(GET_PERSON, {
  //   variables: { id }
  // })

  // if (error) return <p>ERROR</p>

  // const person = (data && data.person) || {}

  return (
    <React.Fragment>
      <p id="sharing-link">{`${document.location.origin}/person/${id}/view`}</p>
      <p>
        <Emoji symbol="☝️" />
        Copy this link and share it with whomever you like.
      </p>
      <p>
        They'll see a stripped down version of the profile that looks like this{' '}
        <Emoji symbol="👇" />
      </p>
      <iframe src={`${document.location.origin}/person/${id}/view`}></iframe>
    </React.Fragment>
  )
}

export default PersonSharer
