import React from 'react'
import './About.css'
import Footer from './common/Footer'
import logo from './common/icons/logo.png'
import ContactOptions from './common/Omnibox/CommandResults/ContactOptions'
import Name from './Person/Name'
import Profiles from './Profiles/Profiles'

function About() {
  return (
    <div id="about">
      <Name name="Follow people, not platforms" />
      <p>
        Our mission is to replace <em>these</em>:
      </p>
      <Profiles
        profiles={[
          'https://www.youtube.com/user/siobhanwilsonmusic',
          'https://instagram.com',
          'https://www.facebook.com/siobhanwilsonmusic',
          'https://linkedin.com',
          'https://twitter.com/siobhanisback',
          'https://github.com'
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
        {`Because we think that following the people you care about on the platforms
        you use should be as easy as a single click!`}
      </p>
      <h1>This is just the beginning</h1>
      <p>
        {`What you're using right now is just an early iteration of our product, you can think of it a bit like a digital business card that encapsulates your online presence and gives you a single link to share with others.
        While we've not achieved the one-click dream just yet, this is an important stepping stone on that path.`}
      </p>
      <h1>Let us know what you think</h1>
      <p>
        {`If you think you'd benefit from our mission then we'd love you to help us shape the
        product and build it with us! The easiest way you can do this is by using the
        app, creating profiles, and providing any other feedback you have using
        the contact information below 👇`}
      </p>
      <ContactOptions />
      <Footer />
    </div>
  )
}

export default About
