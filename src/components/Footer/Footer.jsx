import "./Footer.css";

function Footer({ portfolioData }) {
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
          {portfolioData?.socialLinks && Object.entries(portfolioData.socialLinks).map(([platform, url]) => {
            if (url && url !== '#' && url.trim() !== '') {
              const iconClass = `fa-${platform.toLowerCase()}`;
              const label = platform.charAt(0).toUpperCase() + platform.slice(1);
              
              return (
                <a 
                  key={platform}
                  href={url} 
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab ${iconClass}`}></i>
                </a>
              );
            }
            return null;
          })}
        </div>
        <p className="copyright">&copy; {currentYear} {portfolioData?.name || 'John Paul Cruz'}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;