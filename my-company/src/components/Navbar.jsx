import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/about" style={{ marginRight: '1rem', display:'flex', justifyContent:'space-around' }}>About</Link>
      <Link to="/services" style={{ marginRight: '1rem' }}>Services</Link>
      <Link to="/blog" style={{ marginRight: '1rem' }}>Blog</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );

}

export default Navbar;