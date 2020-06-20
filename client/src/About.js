import React from 'react'
import './About.css'
import Footer from './common/Footer'
import ContactOptions from './common/Omnibox/CommandResults/ContactOptions'
import Profiles from './Profiles/Profiles'

function About() {
  return (
    <div id="about">
      <h1>About</h1>
      <p>
        Our mission is to bring people closer by making the platforms they use
        an unimportant detail.
      </p>
      <p>
        How many times have you seen something like this on a person&apos;s
        website?
      </p>
      <Profiles
        profiles={[
          'https://www.youtube.com/channel/UCaWhrUvqBbsFbo23_dE2maw',
          'https://instagram.com',
          'https://www.facebook.com/moderatemisbehaviour',
          'https://uk.linkedin.com/in/mrdanielmetcalfe',
          'https://twitter.com/mrdanmetcalfe',
          'https://github.com/moderatemisbehaviour'
        ]}
      />
      <p>
        Some of these platforms you&apos;ll use and some you won&apos;t. Why
        can&apos;t you just follow the person you are interested in on the
        platforms you use with a single click?
      </p>
      <h2>This is just the beginning</h2>
      <p>
        What you&apos;re using right now is just an early iteration of our
        product, you can think of it a bit like a digital business card that
        encapsulates your online presence and gives you a single link to share
        with others. While we&apos;ve not achieved the one-click dream just yet,
        this is an important stepping stone on that path.
      </p>
      <h2>Let us know what you think</h2>
      <p>
        If you think you&apos;d benefit from our mission then we&apos;d love you
        to help us shape the product and build it with us! The easiest way you
        can do this is by using the app, creating profiles, and providing any
        other feedback you have using the contact information below 👇
      </p>
      <ContactOptions />
      <Footer />
    </div>
  )
}

export default About
