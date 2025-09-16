import About from './components/About/about.jsx'
import Contacts from './components/Contacts/contacts.jsx'
import Footer from './components/Footer/footer.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import Card from './components/Card/Card.jsx'
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <Contacts />
      <Footer />
    </div>
  )
}

export default App