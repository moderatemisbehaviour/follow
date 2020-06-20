import React from 'react'
import Footer from './common/Footer'
import ContactOptions from './common/Omnibox/CommandResults/ContactOptions'
import './Contact.css'

function Contact(props) {
  return (
    <div id="contact">
      <h1>Contact</h1>
      <ContactOptions />
      <Footer />
    </div>
  )
}

export default Contact
