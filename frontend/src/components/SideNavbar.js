import React from 'react';
const SideNav = () => {
return (
  <div className='sidenav' >
    {/* <button >Back</button> */}
    <a href='/about'>About</a>
    <a href='/services'>Services</a>
    <a href='/'>Clients</a>
    <a href='/'>Contact</a>
    {/* <a href='/'>{props.name}</a> */}
  </div>
)
};
export default SideNav;