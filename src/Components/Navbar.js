import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css'; // Import the corresponding CSS file

const Navbar = ({ onHomeClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Handlers
  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  // Close dropdown/mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar-cartoon" ref={navRef}>
      <a href="#" className="navbar-logo-cartoon">
        <img
          src="https://peach-nearby-kiwi-945.mypinata.cloud/ipfs/bafkreiguhll5qwfac6x36v362nv2mhgl7so45dd262zpulwq7c4tfwbedq"
          alt="Octonads Logo"
          className="logo-icon-cartoon"
        />
        <span className="navbar-title-cartoon">OCTONADS</span>
      </a>

      <div className={`hamburger-cartoon ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links-cartoon ${isMobileMenuOpen ? 'open' : ''}`}>
        <li className="nav-item-cartoon">
          <a href="#" onClick={onHomeClick}>HOME</a>
        </li>
        <li className="nav-item-cartoon"><a href="#" onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                document.querySelector('#info-section').scrollIntoView({ behavior: 'smooth' });
            }}>ABOUT US</a></li>
        <li className="nav-item-cartoon dropdown-cartoon">
          <button onClick={() => handleDropdownToggle('utility')} className={openDropdown === 'utility' ? 'active' : ''}>
            UTILITY
          </button>
          <div className={`dropdown-menu-cartoon ${openDropdown === 'utility' ? 'show' : ''}`}>
            <div className="dropdown-item-cartoon not-clickable">
              Staking <span className="soon-tag-cartoon">Soon</span>
            </div>
            <div className="dropdown-item-cartoon not-clickable">
              ???? <span className="soon-tag-cartoon">Soon</span>
            </div>
          </div>
        </li>
        <li className="nav-item-cartoon dropdown-cartoon">
          <button onClick={() => handleDropdownToggle('tools')} className={openDropdown === 'tools' ? 'active' : ''}>
            TOOLS
          </button>
          <div className={`dropdown-menu-cartoon ${openDropdown === 'tools' ? 'show' : ''}`}>
            <a href="#" className="dropdown-item-cartoon clickable">SnapShot Tool</a>
            <a href="#" className="dropdown-item-cartoon clickable">Wallet Checker</a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;