import React from 'react'
import { Link } from 'react-router-dom'
import './Announcement.css'

const Announcement = () => (
  <p className="announcement">
    <Link to="/about">Learn more</Link> about our mission
  </p>
)

export default Announcement
