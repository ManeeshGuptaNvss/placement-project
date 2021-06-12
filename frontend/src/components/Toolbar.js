import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/authActions.js'
import ToggleButton from "./ToggleButton";
const Toolbar = (props) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    console.log('logout Clicked')
    dispatch(logout())
  }
  return (
    <header className='toolbar'>
      <nav className='toolbar_navigation'>
        <div>
          <ToggleButton click={props.sideDrawerToggler} />
        </div>
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <div className='logo'>SVUCE Placement Cell</div>
        </Link>
        <div className='spacer' />
        <div className='nav-elements'>
          <ul>
            {/* <li>
            <NavLink to="/about-us" exact className="activeclass">
              About Us
            </NavLink>
          </li> */}
            <li className='dropdownmenu'>
              <button className='dropbtn'>
                <span>Placements </span>
                <i className='fa fa-caret-down' />
              </button>
              <div className='dropdown-content'>
                <NavLink to='/statistics' exact className='activeclass'>
                  Statistics
                </NavLink>
                <NavLink to='/students-placed' exact className='activeclass'>
                  Students Placed
                </NavLink>
                <NavLink to='/our-recruiters' exact className='activeclass'>
                  Our Recruiters
                </NavLink>
              </div>
              {/* <div className='dropdown-content'></div> */}
            </li>
            {userInfo ? (
              <li className='dropdownmenu'>
                <button className='dropbtn'>
                  <span>Name</span>
                  <i className='fa fa-caret-down' />
                </button>
                <div className='dropdown-content'>
                  <NavLink to='/application' exact className='activeclass'>
                    Application
                  </NavLink>
                  <NavLink to='/profile' exact className='activeclass'>
                    Profile
                  </NavLink>
                </div>
                <div className='dropdown-content'>
                  <NavLink onClick={logoutHandler} className='activeclass'>
                    Logout
                  </NavLink>
                </div>
              </li>
            ) : (
              <li>
                <NavLink to='/login' exact className='activeclass'>
                  Login/Register
                </NavLink>
              </li>
            )}

            {/* <li className='dropdownmenu'>
            <button className='dropbtn'>
              <span>Statistics </span>
              <i className='fa fa-caret-down' />
            </button>
            <div className='dropdown-content'>
              <NavLink to='/placement-stats-2020' exact className='activeclass'>
                Placement Stats 2020
              </NavLink>
              <NavLink to='/placement-stats-2019' exact className='activeclass'>
                Placement Stats 2019
              </NavLink>
            </div>
          </li> */}
            {/* <li>
            <NavLink to="/contact-us" exact className="activeclass">
              The Team
            </NavLink>
          </li> */}
            {/* <li>
            <NavLink to="/why-iiitl" exact className="activeclass">
              Why Us
            </NavLink>
          </li> */}
            {/* <li>
            <NavLink to='/posts' exact className='activeclass'>
              Posts
            </NavLink>
          </li> */}
            <li>
              <NavLink to='/application' exact className='activeclass'>
                Application
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )}

export default Toolbar;
