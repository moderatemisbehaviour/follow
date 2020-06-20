import React from 'react'
import './Attributions.css'
import Footer from './common/Footer'

function Attributions(props) {
  return (
    <div id="attributions">
      <h1>Attributions</h1>
      <p>Many fantastic projects make People Not Platforms possible.</p>
      <h2>Icons</h2>
      <ul>
        <li>
          <a href="https://clearbit.com">Logos provided by Clearbit</a>. Logos
          are not displayed directly but they are fetched and used to calculate
          a background colour for the &apos;letter-in-circle&apos; style
          platform icons.
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
        <li>Cypress</li>
        <li>Jest</li>
      </ul>
      <Footer />
    </div>
  )
}

export default Attributions
