import React from 'react'
import { Link } from 'react-router-dom'
import './About.css'
import Footer from './common/Footer'
import logo from './common/icons/logo.png'
import Name from './Person/Name'
import Profiles from './Profiles/Profiles'

function About() {
  return (
    <React.Fragment>
      <Name name="Follow people, not platforms" />
      <p>
        Our mission is to replace <em>this</em>:
      </p>
      <Profiles
        profiles={[
          'https://twitter.com/siobhanisback',
          'https://www.youtube.com/user/siobhanwilsonmusic',
          'https://www.facebook.com/siobhanwilsonmusic',
          'https://instagram.com',
          'https://foo.com',
          'https://bar.com'
        ]}
      />
      <p>
        With <em>this</em>:
      </p>
      <img
        alt="People Not Platforms logo"
        src={logo}
        width={100}
        height={100}
      ></img>
      <p>
        Because we think that following people you care about on the platforms
        you like should be as easy as a single click!
      </p>
      <p>
        What you're using right now is just an early iteration of our product.
        We've not achieved the one-click dream just yet, but if you think you'd
        benefit from our mission then we'd love you to help us shape this
        product and build it with us!
      </p>
      <p>
        The easiest way you can do this is by voting on our{' '}
        <Link to="/roadmap">roadmap</Link>. You can also support us by using the
        app, creating profiles, and providing any other feedback you have using
        the contact information in the footer at the bottom of this page 👇
      </p>
      <Footer />
    </React.Fragment>
  )
}

export default About
