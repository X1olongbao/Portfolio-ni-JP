import { useState, useEffect } from 'react'
import './App.css'
import About from './components/About/About.jsx'
import Contacts from './components/Contacts/Contacts.jsx'
import Footer from './components/Footer/Footer.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Admin from './components/Admin/Admin.jsx'
import { usePortfolioData } from './hooks/usePortfolioData'

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { portfolioData, loading } = usePortfolioData();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#admin') {
    return (
      <div className="App">
        <Admin />
      </div>
    );
  }

  if (loading || !portfolioData) {
    return <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
        <p style={{ marginTop: '1rem', color: 'var(--light-text)' }}>Loading...</p>
      </div>
    </div>;
  }

  return (
    <div className="App">
      <Navbar />
      
      <main className="main-content">
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-title">
              <span className="hero-greeting">{portfolioData.greeting}</span>
              <h1 className="hero-name">{portfolioData.name}</h1>
              <h2 className="hero-profession">{portfolioData.profession}</h2>
            </div>
            <div className="hero-cta">
              <a href="#contact" className="primary-button">
                Contact Me <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#about" className="secondary-button">
                About me
              </a>
            </div>
          </div>
          
        </section>
        
        <About portfolioData={portfolioData} />

        <section className="skills-section" id="experience">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">My Expertise</span>
              <h2 className="section-title">Experience</h2>
              <div className="section-underline"></div>
            </div>
            
            <div className="skills-grid">
              {portfolioData.experiences.map((exp, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-icon">
                    <i className={`fas ${exp.icon}`}></i>
                  </div>
                  <h3 className="skill-title">{exp.title}</h3>
                  <p className="skill-description">
                    {exp.description}
                  </p>
                  <ul className="skill-details">
                    {exp.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>
                        <i className="fas fa-check-circle"></i> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contacts portfolioData={portfolioData} />
      </main>
      
      <Footer portfolioData={portfolioData} />
    </div>
  )
}

export default App