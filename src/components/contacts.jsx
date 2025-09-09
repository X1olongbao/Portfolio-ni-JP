import '../styles/contacts.css'

function Contacts() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2>Contact Me</h2>
        <div className="contact-items">
          <div className="contact-item">
            <h3>Email</h3>
            <p>johnpaulcruz@abc.ph</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+63 XXX XXX XXXX</p>
          </div>
          <div className="contact-item">
            <h3>Location</h3>
            <p>Philippines</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
