const { useState, useEffect } = React
const { NavLink } = ReactRouterDOM
import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {

  return (
    <header>
      <UserMsg />
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |<NavLink to="/about">About</NavLink>
      </nav>
      <h1>Bugs are Forever</h1>
    </header>
  )
}
