import './Card.css';
import { useState } from 'react';

function Card(props) {
  const [activeCard, setActiveCard] = useState(null);
  
  const handleMouseEnter = (cardIndex) => {
    setActiveCard(cardIndex);
  };
  
  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="cards-container">
      <div 
        className={`card skills-card ${activeCard === 0 ? 'active' : ''}`}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-icon">
          <i className="fas fa-code"></i>
        </div>
        <h3 className="card-title">{props.skillsTitle}</h3>
        <ul className="skills-list">
          {props.skills.map((item, idx) => (
            <li key={idx} className="skill-item">
              <span className="skill-label">{item.label}:</span> 
              <span className="skill-content">{item.list}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div 
        className={`card about-card ${activeCard === 1 ? 'active' : ''}`}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-icon">
          <i className="fas fa-user"></i>
        </div>
        <h3 className="card-title">{props.aboutMeTitle}</h3>
        <p className="about-text">{props.aboutMe}</p>
      </div>
    </div>
  );
}

export default Card;