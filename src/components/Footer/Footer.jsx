import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-text">JPC</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p className="copyright">&copy; {currentYear} John Paul Cruz. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;