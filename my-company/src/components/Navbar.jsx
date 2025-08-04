
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navbarStyle = {
        backgroundColor: 'rgba(140, 152, 151, 0.89)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem'
        
    };

    const linkStyle = {
        color: 'rgb(0, 0, 0)',
        textDecoration: 'none',
        padding: '0.5rem 1rem'
    };
    return (
        <nav style={navbarStyle}>
            <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
                <li><Link to="/"  style={linkStyle}>Home</Link></li>
                <li><Link to="/about" style={linkStyle}>About</Link></li>
                <li><Link to="/services" style={linkStyle}>Services</Link></li>
                <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

