import "./about.css";
import myPhoto from "../../assets/hahaha.png"; 
import Card from "../Card/Card";
import { cardData } from '../data';
import { useState, useEffect } from 'react';

function About({ portfolioData }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="about-section" id="about">
      <div className={`about-content ${isVisible ? 'fade-in' : ''}`}>
        <div className="about-header">
          <span className="section-badge">About Me</span>
          <h1 className="section-title">Building Digital Experiences</h1>
          <div className="section-underline"></div>
        </div>

        <div className="about-text-image-container">
          <div className="profile-image-container">
            <img src={portfolioData.profileImage || myPhoto} alt="Profile" className="about-image" />
            <div className="image-overlay"></div>
          </div>
          <div className="about-text">
            <h2 className="greeting">{portfolioData.greeting} <span className="highlight">{portfolioData.name}</span></h2>
            <p className="tagline">{portfolioData.tagline}</p>
            <div className="social-links">
              {portfolioData.socialLinks && Object.entries(portfolioData.socialLinks).map(([platform, url]) => {
                // Only show if URL exists and is not just "#"
                if (url && url !== '#' && url.trim() !== '') {
                  const iconClass = `fa-${platform.toLowerCase()}`;
                  const label = platform.charAt(0).toUpperCase() + platform.slice(1);
                  
                  return (
                    <a 
                      key={platform} 
                      href={url} 
                      className="social-link" 
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
          </div>
        </div>
        
        <Card 
          skillsTitle={cardData.skillsTitle}
          aboutMeTitle={cardData.aboutMeTitle}
          skills={portfolioData.skills}
          aboutMe={portfolioData.aboutMe}
        />
      </div>
    </section>
  );
}

export default About;