import React from 'react'
import { useLocation } from 'react-router-dom'
import './Footer.css'
import HomeLink from './HomeLink'

function Footer() {
  const location = useLocation()
  return (
    <div id="footer">{location.pathname === '/' ? null : <HomeLink />}</div>
  )
}

export default Footer
