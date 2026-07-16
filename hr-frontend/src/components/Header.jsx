// Navbar.jsx
import '../styles/Header.css';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <header className="custom-header">
      <div className="container">
        <div className="left-side">

          <nav className="nav-links">
            <Link to={''} className="logo-link">
              <img src="./image.png" alt="Colored Cow" className="logo" />
            </Link>
            <a href="https://www.facebook.com/ColoredCowConsulting" target="_blank" rel="noopener noreferrer" className='facebook'>
              <FaFacebook size={35} />
            </a>
            <a href="https://www.linkedin.com/company/6579196/" target="_blank" rel="noopener noreferrer" className='linkdin'>
              <FaLinkedin size={35} />
            </a>
            <a href="https://www.instagram.com/coloredcow/" target="_blank" rel="noopener noreferrer" className='instagram'>
              <FaInstagram size={35} />
            </a>
            <a href="https://github.com/coloredcow" target="_blank" rel="noopener noreferrer" className='github'>
              <FaGithub size={35} />
            </a>
          </nav>
        </div>

        <div className="button-container">
          <button className='hr-login-button' onClick={() => navigate('hr-login')}>HR Login</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
