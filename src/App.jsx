import './App.css'
import About from './components/About/about.jsx'
import Contacts from './components/Contacts/contacts.jsx'
import Footer from './components/Footer/footer.jsx'
import Navbar from './components/Navbar/navbar.jsx'

function App() {

  return (
    <div className="App">
      <Navbar />
      
      <main className="main-content">
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-title">
              <span className="hero-greeting">Hello, I'm</span>
              <h1 className="hero-name">John Paul Cruz</h1>
              <h2 className="hero-profession">Freelance Virtual Assistant</h2>
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
        
        {/* Move About directly after Home so it's seen next when scrolling */}
        <About />

        <section className="skills-section" id="experience">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">My Expertise</span>
              <h2 className="section-title">Experience</h2>
              <div className="section-underline"></div>
            </div>
            
            <div className="skills-grid">
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-video"></i>
                </div>
                <h3 className="skill-title">Video Editing</h3>
                <p className="skill-description">
                  2+ years of experience creating engaging video content with professional editing tools.
                </p>
                <ul className="skill-details">
                  <li><i className="fas fa-check-circle"></i> Content creation for social media</li>
                  <li><i className="fas fa-check-circle"></i> Color grading and visual effects</li>
                  <li><i className="fas fa-check-circle"></i> Audio enhancement and synchronization</li>
                </ul>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-database"></i>
                </div>
                <h3 className="skill-title">Data Entry</h3>
                <p className="skill-description">
                  1 year of experience in accurate and efficient data management and organization.
                </p>
                <ul className="skill-details">
                  <li><i className="fas fa-check-circle"></i> Spreadsheet management</li>
                </ul>
              </div>
              
              <div className="skill-card">
                <div className="skill-icon">
                  <i className="fas fa-laptop-code"></i>
                </div>
                <h3 className="skill-title">Web Development</h3>
                <p className="skill-description">
                  Learning modern web technologies to expand my professional skillset.
                </p>
                <ul className="skill-details">
                  <li><i className="fas fa-check-circle"></i> HTML, CSS, and JavaScript</li>
                  <li><i className="fas fa-check-circle"></i> React framework</li>
                  <li><i className="fas fa-check-circle"></i> Responsive design principles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <Contacts />
      </main>
      
      <Footer />
    </div>
  )
}

export default App