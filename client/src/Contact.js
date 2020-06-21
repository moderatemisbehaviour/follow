import React from 'react'
import Footer from './common/Footer'
import ContactOptions from './common/Omnibox/CommandResults/ContactOptions'
import './Contact.css'

function Contact(props) {
  return (
    <div id="contact">
      <h1>Contact</h1>
      <p>
        Whatever the query, we&apos;d love to hear from you! Click one of the
        buttons below to email us at the appropriate address.
      </p>
      <ContactOptions />
      <Footer />
    </div>
  )
}

export default Contact
