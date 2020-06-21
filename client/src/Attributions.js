import Emoji from 'a11y-react-emoji'
import React from 'react'
import './Attributions.css'
import Footer from './common/Footer'

function Attributions(props) {
  return (
    <div id="attributions">
      <h1>Attributions</h1>
      <p>
        We&apos;re very lucky to live in an age with so much high-quality, free
        software available to help us build the next generation of apps. Like so
        many other projects, People Not Platforms is just a thin layer of icing
        on top of a huge open-source cake. A great deal is owed to the hard work
        and dedication of people who donate their work for the greater good.
      </p>
      <p>
        We <Emoji symbol="❤️" label="love" /> open-source.
      </p>
      <h2>Icons</h2>
      <ul>
        <li>
          <a href="https://clearbit.com">Logos provided by Clearbit</a>.{' '}
          <em>
            Logos are not displayed directly but they are fetched and used to
            calculate a background colour for the &apos;letter-in-circle&apos;
            style platform icons.
          </em>
        </li>
        <li>
          <a href="https://www.iconfinder.com/icons/1632517/circle_instagram_photos_round_icon_social_media_social_network_icon">
            Instagram icon
          </a>{' '}
          by{' '}
          <a href="https://www.iconfinder.com/icons/1632517/circle_instagram_photos_round_icon_social_media_social_network_icon">
            Abhishek Pipalva
          </a>{' '}
          is licensed under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/legalcode">
            CC BY-SA 3.0
          </a>
        </li>
        <li>
          {' '}
          <a href="https://www.iconfinder.com/icons/1632517/circle_instagram_photos_round_icon_social_media_social_network_icon">
            GitHub icon
          </a>{' '}
          provided by{' '}
          <a href="https://iconmonstr.com/github-1-svg/">
            Icon Monstr (created by Alexander Kahlkopf)
          </a>
          . The license can be found{' '}
          <a href="https://iconmonstr.com/license/">here</a>.
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icon/linkedin_145807">
            LinkedIn icon
          </a>{' '}
          made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a>{' '}
          from <a href="www.flaticon.com">www.flaticon.com</a>.
        </li>
        <li>
          <a href="https://material.io/resources/icons/?search=copy&icon=file_copy&style=baseline">
            File copy icon
          </a>{' '}
          made by <a href="https://material.io/">Material Icons</a> is licensed
          under{' '}
          <a href="https://www.apache.org/licenses/LICENSE-2.0.html">
            Apache-2.0
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icon/email_456900?term=circle%20mail&page=1&position=1">
            Mail icon
          </a>{' '}
          made by{' '}
          <a
            href="https://www.flaticon.com/authors/roundicons"
            title="Roundicons"
          >
            Roundicons
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
          .
        </li>
      </ul>
      <h2>Software</h2>
      <ul>
        <li>Apollo</li>
        <li>Cypress</li>
        <li>Enzyme</li>
        <li>ESLint</li>
        <li>Jest</li>
        <li>MongoDB</li>
        <li>Node.js</li>
        <li>React</li>
        <li>VS Code</li>
        <li>Yarn</li>
        <li>...and more!</li>
      </ul>
      <Footer />
    </div>
  )
}

export default Attributions
