import "./about.css";
import myPhoto from "../../assets/hahaha.png"; 
import Card from "../Card/Card";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-content">

        <div className="about-text-image-container">
          <img src={myPhoto} alt="Profile" className="about-image" />
          <div className="about-text">
            <h1>Hi! I'm John Paul Cruz</h1>
            <p>Frontend developer in the making — learning React, Tailwind.</p>
          </div>
        </div>
        <Card />
      </div>
    </section>
  );
}

export default About;