import React from 'react'
import Footer from './common/Footer'
import ResponsiveContainer from './layout/ResponsiveContainer'

function Privacy(props) {
  return (
    <ResponsiveContainer>
      <h1>Privacy Policy</h1>
      <p>
        <em>This privacy policy was last updated on 25/06/2020.</em>
      </p>
      <p>
        Data collection is essential to good product development. Basic
        information about our users allows us to get a general picture of how
        they are using our product and what they will want out of it in future.
        It is crucial to informing our decisions about what feautures to build
        next!
      </p>
      <h2>When you are not logged in</h2>
      <p>
        When you are not logged in we see you as an anonymous visitor and use
        cookies to assign you an <em>anonymous ID</em>. Using cookies we are
        able to track how anonymous visitors interact with the site. Cookies
        persist in the browser until they are cleaned up so if an anonymous
        visitor closes their browser and comes back later we know its the same
        individual (or at least another individual using the same browser).
      </p>
      <p>Here are some examples of data we collect about anonymous visitors.</p>
      <ul>
        <li>
          <b>Page visits</b>, e.g. Anonymous visitor 7edm3k5 visited{' '}
          <code>/about</code>.
        </li>
        <li>
          <b>Device type</b>, e.g. Mobile or desktop.
        </li>
        <li>
          <b>Rough location</b>, e.g. London.
        </li>
        <li>
          <b>Session duration</b>, e.g. Anonymous visitor 7edm3k5 spent 6
          minutes and 17 seconds on the site.
        </li>
      </ul>
      <h2>When you are logged in</h2>
      <p>
        We allow you to login with third-party services like Google. When you
        login with a third-party they will inform you of the information being
        shared with us.
      </p>
      <p>
        Here are some examples of the additional data we collect about logged-in
        visitors
      </p>
      <ul>
        <li>
          <b>Name</b>. We use this to do things like greet you when you login
          and to make it quicker for you to create a profile for yourself.
        </li>
        <li>
          <b>Email address</b>. We use this to do things like update you about
          updates to our privacy policy, new features, and to make it quicker
          for you to create a profile for yourself.
        </li>
        <li>
          <b>Profile image</b>. We use this to make it quicker for you to create
          a profile for yourself.
        </li>
      </ul>
      <p>
        If this privacy policy changes and we have your email we&apos;ll let you
        know, otherwise you&apos;ll have to check the date at the top of this
        page to see if its changed since you last checked.
      </p>
      <Footer />
    </ResponsiveContainer>
  )
}

export default Privacy
