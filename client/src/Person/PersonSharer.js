import Emoji from 'a11y-react-emoji'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import copyIcon from '../common/icons/copy.svg'
import './PersonSharer.css'

// TODO: Remove duplication between here and PersonBrowser.
PersonSharer.propTypes = {
  id: PropTypes.string.isRequired
}

function PersonSharer(props) {
  const { id } = props
  const sharingLink = `${document.location.origin}/person/${id}/view`
  const [linkCopied, setLinkCopied] = useState()
  const sharingLinkRef = useRef()

  function copySharingLink(event) {
    sharingLinkRef.current.select()
    document.execCommand('copy')
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <React.Fragment>
      <div id="sharing-link">
        <span
          id="sharing-link-text"
          className={linkCopied ? 'copied' : undefined}
        >
          <input
            id="url"
            readOnly
            ref={sharingLinkRef}
            type="text"
            value={sharingLink}
          />
          <input id="copied-message" readOnly type="text" value="Copied!" />
        </span>
        <button id="copy-button" onClick={copySharingLink}>
          <img src={copyIcon} />
        </button>
      </div>
      <p>
        <Emoji symbol="☝️" />
        Copy this link and share it with whomever you like.
      </p>
      <p>
        They'll see a stripped down version of the profile that looks like this{' '}
        <Emoji symbol="👇" />
      </p>
      <iframe
        src={`${document.location.origin}/person/${id}/view`}
        title="share preview"
      ></iframe>
    </React.Fragment>
  )
}

export default PersonSharer
