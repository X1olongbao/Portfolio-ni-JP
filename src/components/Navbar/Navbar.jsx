import "./Navbar.css";
import { useState, useEffect } from 'react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('theme-dark');
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('theme-dark');
    document.documentElement.classList.toggle('theme-dark', nextIsDark);
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <a href="#home">
            <span className="logo-text">JPC</span>
            <span className="logo-dot">.</span>
          </a>
        </div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          </li>
          <li className="nav-item">
            <a href="#experience" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </li>
          <li className="nav-item nav-button">
            <a href="#contact" className="nav-button-link" onClick={() => setMobileMenuOpen(false)}>
              <span>Hire Me</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </li>
          <li className="nav-item">
            <button
              className="theme-button"
              aria-label="Toggle theme"
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;