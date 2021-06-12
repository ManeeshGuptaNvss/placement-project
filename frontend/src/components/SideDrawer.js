import React from "react";
import { NavLink, Link } from "react-router-dom";
class SideDrawer extends React.Component {
  state = {
    showDropDownAcademics: false,
    showDropdownStatistics: false
  };
  handleDropDownAcademics = () => {
    this.setState(cs => ({
      showDropDownAcademics: !cs.showDropDownAcademics,
      showDropdownStatistics: false
    }));
  };
  handleDropdownStatistics = () => {
    this.setState(cs => ({
      showDropdownStatistics: !cs.showDropdownStatistics,
      showDropDownAcademics: false
    }));
  };
  render() {
    let drawerClass = "side-drawer";
    if (this.props.show) drawerClass = "side-drawer open";
    return (
      <div className={drawerClass}>
        <div className='side'>
          <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
            <span onClick={this.props.click} className='sidebar-logo-text'>
              SVUCE Placement Cell
            </span>
          </Link>
          <span className='cross-btn' onClick={this.props.click}>
            <i className='fas fa-times fa-2x' />
          </span>
        </div>
        <ul>
          {/* <li onClick={this.props.click}>
            <NavLink to='/about-us' exact className='activeclass'>
              About Us
            </NavLink>
          </li> */}
          <li onClick={this.props.click}>
            <NavLink to='/login' exact className='activeclass'>
              Login/Register
            </NavLink>
          </li>
          <li className='activeclass' onClick={this.handleDropDownAcademics}>
            Placements <i className='fa fa-caret-down' />
          </li>
          {this.state.showDropDownAcademics ? (
            <ul className='drp-down'>
              <li
                onClick={() => this.props.click(this.handleDropDownAcademics)}
                className='activeclass'
              >
                <NavLink to='/statistics' exact className='activeclass'>
                  Statistics
                </NavLink>
              </li>
              <li
                onClick={() => this.props.click(this.handleDropDownAcademics)}
                className='activeclass'
              >
                <NavLink to='/students-placed' exact className='activeclass'>
                  Students Placed
                </NavLink>
              </li>
              <li
                onClick={() => this.props.click(this.handleDropDownAcademics)}
                className='activeclass'
              >
                <NavLink to='/our-recruiters' exact className='activeclass'>
                  Our Recruiters
                </NavLink>
              </li>
            </ul>
          ) : null}
          {/* <li onClick={this.props.click}>
            <NavLink to='/our-recruiters' exact className='activeclass'>
              Our Recruitors
            </NavLink>
          </li> */}
          {/* <li className='activeclass' onClick={this.handleDropdownStatistics}>
            Statistics <i className='fa fa-caret-down' />
          </li>
          {this.state.showDropdownStatistics ? (
            <ul className='drp-down'>
              <li
                onClick={() => this.props.click(this.handleDropdownStatistics)}
                className='activeclass'
              >
                <NavLink
                  to='/placement-stats-2020'
                  exact
                  className='activeclass'
                >
                  Placement Stats 2020
                </NavLink>
              </li>
              <li
                onClick={() => this.props.click(this.handleDropdownStatistics)}
                className='activeclass'
              >
                <NavLink
                  to='/placement-stats-2019'
                  exact
                  className='activeclass'
                >
                  Placement Stats 2019
                </NavLink>
              </li>
            </ul>
          ) : null} */}

          {/* <li onClick={this.props.click}>
            <NavLink to='/contact-us' exact className='activeclass'>
              The Team
            </NavLink>
          </li>
          <li onClick={this.props.click}>
            <NavLink to='/why-iiitl' exact className='activeclass'>
              Why Us
            </NavLink>
          </li> */}
          {/* <li onClick={this.props.click}>
            <NavLink to='/posts' exact className='activeclass'>
              Posts
            </NavLink>
          </li> */}
          <li onClick={this.props.click}>
            <NavLink to='/appliation' exact className='activeclass'>
              Application
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default SideDrawer;
