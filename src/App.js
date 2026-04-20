import { useState, useRef } from 'react';
import './App.css';
import Portfolio from './components/Portfolio';

const CARDS = [
  { icon: '⚡', title: 'Fast', desc: 'Optimized for performance from day one.' },
  { icon: '🎨', title: 'Beautiful', desc: 'Crafted with attention to every detail.' },
  { icon: '🔒', title: 'Reliable', desc: 'Built to scale and stand the test of time.' },
];

function App() {
  const [activeCard, setActiveCard] = useState(0);
  const touchStartX = useRef(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setActiveCard(prev => Math.min(prev + 1, CARDS.length - 1));
      else setActiveCard(prev => Math.max(prev - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">YourBrand</div>
        <ul className="navbar-links">
          <li><button onClick={() => scrollTo('home')}>Home</button></li>
          <li><button onClick={() => scrollTo('portfolio')}>Portfolio</button></li>
          <li><button onClick={() => scrollTo('about')}>About</button></li>
          <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
        </ul>
      </nav>

      {/* Home / Hero */}
      <section id="home" className="section parallax parallax-home">
        <div className="section-content">
          <h1>CS Photos</h1>
          <p>A modern, clean template to get you started.</p>
          <button className="cta-btn" onClick={() => scrollTo('about')}>
            Learn More
          </button>
        </div>
      </section>

      {/* Portfolio */}
      <Portfolio />

      {/* About */}
      <section id="about" className="section solid-section">
        <div className="section-content">
          <h2>About Us</h2>
          <p>
            We are a passionate team dedicated to building beautiful, performant web
            experiences. Our mission is to deliver value through clean design and
            thoughtful engineering.
          </p>
          <div
            className="cards"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {CARDS.map((card, i) => (
              <div key={i} className={`card${i === activeCard ? ' card-active' : ''}`}>
                <span className="card-icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="card-dots">
            {CARDS.map((_, i) => (
              <button
                key={i}
                className={`dot${i === activeCard ? ' dot-active' : ''}`}
                onClick={() => setActiveCard(i)}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Parallax divider */}
      <div className="parallax parallax-divider" />

      {/* Contact */}
      <section id="contact" className="section solid-section">
        <div className="section-content">
          <h2>Contact Us</h2>
          <p>Have a question or want to work together? Reach out below.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <textarea placeholder="Your Message" rows={5} required />
            <button type="submit" className="cta-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
