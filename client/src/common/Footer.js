import React from 'react'
import { useLocation } from 'react-router-dom'
import HomeLink from './HomeLink'

function Footer() {
  const location = useLocation()
  return location.pathname === '/' ? null : <HomeLink />
}

export default Footer
