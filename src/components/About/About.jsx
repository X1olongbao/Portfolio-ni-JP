import "./about.css";
import myPhoto from "../../assets/hahaha.png"; 
import Card from "../Card/Card";
import { cardData } from '../data';
import { useState, useEffect } from 'react';

function About() {
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
            <img src={myPhoto} alt="Profile" className="about-image" />
            <div className="image-overlay"></div>
          </div>
          <div className="about-text">
            <h2 className="greeting">Hello, I'm <span className="highlight">John Paul Cruz</span></h2>
            <p className="tagline">Frontend developer and freelance virtual assistant passionate about creating beautiful, responsive websites with React and modern technologies, while providing efficient virtual support to help businesses and individuals succeed..</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        
        <Card 
          skillsTitle={cardData.skillsTitle}
          aboutMeTitle={cardData.aboutMeTitle}
          skills={cardData.skills}
          aboutMe={cardData.aboutMe}
        />
      </div>
    </section>
  );
}

export default About;