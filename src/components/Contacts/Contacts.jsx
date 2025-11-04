import "./contacts.css";
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("rRzgiW6dfQ1EVUKr6");

// Configure EmailJS to use your service
const SERVICE_ID = 'service_30sl549';
const TEMPLATE_ID = 'template_1fdtnak';
const PUBLIC_KEY = 'PqRWC7QjlXrrkQx54';

function Contacts() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    });
    
    try {
      // Send email using EmailJS with proper error handling
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      );
      
      // Success
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Message sent successfully!' }
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      // Error
      console.error('Error sending email:', error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'An error occurred. Please try again later.' }
      });
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="section-badge">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="section-underline"></div>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-items">
                <div className="contact-item">
                  <i className="fas fa-envelope contact-icon"></i>
                  <div>
                    <h3>Email</h3>
                    <p>johnpaulcruz@abc.ph</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone-alt contact-icon"></i>
                  <div>
                    <h3>Phone</h3>
                    <p>+63 XXX XXX XXXX</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt contact-icon"></i>
                  <div>
                    <h3>Location</h3>
                    <p>Philippines</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links-large">
                <a href="#" className="social-link-large" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link-large" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link-large" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form ref={form} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  disabled={status.submitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  disabled={status.submitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="5"
                  disabled={status.submitting}
                ></textarea>
              </div>
              {status.info.msg && (
                <div className={`form-status ${status.info.error ? 'error' : 'success'}`}>
                  {status.info.msg}
                </div>
              )}
              <button type="submit" className="submit-button" disabled={status.submitting}>
                {status.submitting ? 'Sending...' : 'Send Message'}
                <i className="fas fa-paper-plane"></i>
              </button>
              {status.submitted && (
                <p className="form-success-message">
                  Thank you for your message! It has been sent successfully.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
