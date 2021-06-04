import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import {Nav} from 'react-bootstrap'
const Bread = () => {
  return (
    // <div style={{ display: 'flex', border: '2px solid purple' }}>
    //   <Link className='link-item' to='/dashboard'>
    //     Home
    //   </Link>
    //   <Link className='link-item' to='/dashboard/statistics'>
    //     Statistics
    //   </Link>
    //   <Link className='link-item' to='/dashboard/tips'>
    //     Tips
    //   </Link>
    //   <Link className='link-item' to='/dashboard/team'>
    //     Team
    //   </Link>
    // </div>
    // <ul class='nav flex-column'>
    //   <li class='nav-item'>
    //     <a class='nav-link active' href='#'>
    //       Active
    //     </a>
    //   </li>
    //   <li class='nav-item'>
    //     <a class='nav-link' href='#'>
    //       Link
    //     </a>
    //   </li>
    //   <li class='nav-item'>
    //     <a class='nav-link' href='#'>
    //       Link
    //     </a>
    //   </li>
    //   <li class='nav-item'>
    //     <a class='nav-link disabled' href='#'>
    //       Disabled
    //     </a>
    //   </li>
    // </ul>

    <Nav
      activeKey='/home'
      onSelect={(selectedKey) => <Link to={selectedKey} />}
    >
      <Nav.Item>
        <Nav.Link href='/dashboard'>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link>
          <Link to='/dashboard/tips'>Tips</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='link-2'>Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='disabled' disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Bread
