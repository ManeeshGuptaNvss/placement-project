import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
const SideNav = (props) => {
  const [drop1, setDrop1] = useState(false)
  const [drop2, setDrop2] = useState(false)
  const handleDropDown1 = () => {
    setDrop1((state) => !state)
    setDrop2(false)
  }
  let drawerClass = props.show ? 'side-drawer open' : 'side-drawer'

  return (
    <div className={drawerClass}>
      <div className='side'>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <span onClick={props.click} className='sidebar-logo-text'>
            SVUCE Placement Cell
          </span>
        </Link>
        <span className='cross-btn' onClick={props.click}>
          <i className='fas fa-times fa-2x' />
        </span>
      </div>

      <ul>
        <li onClick={props.click}>
          <NavLink to='/login' exact className='activeclass'>
            Login/Register
          </NavLink>
        </li>
        <li className='activeclass' onClick={handleDropDown1}>
          Placements <i className='fa fa-caret-down' />
        </li>
        {drop1 ? (
          <ul className='drp-down'>
            <li
              onClick={() => props.click(handleDropDown1)}
              className='activeclass'
            >
              <NavLink to='/statistics' exact className='activeclass'>
                Statistics
              </NavLink>
            </li>
            <li
              onClick={() => props.click(handleDropDown1)}
              className='activeclass'
            >
              <NavLink to='/students-placed' exact className='activeclass'>
                Students Placed
              </NavLink>
            </li>
            <li
              onClick={() => props.click(handleDropDown1)}
              className='activeclass'
            >
              <NavLink to='/our-recruiters' exact className='activeclass'>
                Our Recruiters
              </NavLink>
            </li>
          </ul>
        ) : null}
        <li onClick={props.click}>
          <NavLink to='/appliation' exact className='activeclass'>
            Application
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SideNav
