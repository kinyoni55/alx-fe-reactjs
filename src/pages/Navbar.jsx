import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <img src="src\assets\logo.jpeg" alt="" />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li className='bg-blue-500'>Services</li>
      </ul>
      <button>Login</button>
    </div>
  )
}

export default Navbar