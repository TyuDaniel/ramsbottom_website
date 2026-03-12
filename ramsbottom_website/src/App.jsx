import { useState, useEffect } from 'react'
import './App.css'

/* ============================================
   DATA
   ============================================ */

const teamMembers = [
  { name: 'Jack', nickname: 'II Commandiatore', image: '/media/Jack.jpeg' },
  { name: 'Ann', nickname: 'Her Grace', image: '/media/Anne.jpeg' },
  { name: 'Billy', nickname: 'Mixmaster General', image: '/media/Billy.jpeg' },
  { name: 'Noel', nickname: 'Slick Hips', image: '/media/Noel.jpeg' },
  { name: 'Damien', nickname: 'Swiss Army Knife', image: '/media/Damien.jpeg' },
  { name: 'Phillip', nickname: 'The Don', image: '/media/Philip.jpeg' },
  { name: 'Aaron', nickname: 'The Future', image: '/media/Aaron.jpeg' },
  { name: 'Rich', nickname: 'The most integral cog in the whole operation', image: '/media/Rich.jpeg' },
]

const socialPosts = [
  { image: '/media/social1.png', caption: 'Great night at Ramsbottom\'s' },
  { image: '/media/social2.png', caption: 'The craic was mighty' },
  { image: '/media/social3.png', caption: 'Live music sessions' },
  { image: '/media/social4.png', caption: 'Good times with great people' },
]

const openingHours = [
  { day: 'Monday', hours: '10:30 am – 11:30 pm' },
  { day: 'Tuesday', hours: '10:30 am – 11:30 pm' },
  { day: 'Wednesday', hours: '10:30 am – 11:30 pm' },
  { day: 'Thursday', hours: '10:30 am – 11:30 pm' },
  { day: 'Friday', hours: '10:30 am – 12:30 am' },
  { day: 'Saturday', hours: '10:30 am – 12:30 am' },
  { day: 'Sunday', hours: '12:00 pm – 11:00 pm' },
]

const enquiryTypes = ['General Enquiries', 'Events', 'Parties', 'Live Music']

/* ============================================
   SVG ICONS
   ============================================ */

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

/* ============================================
   GLOBAL SCROLL REVEAL — fires as user scrolls toward elements
   ============================================ */

function useGlobalReveal() {
  useEffect(() => {
    let observer
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            } else {
              // Remove so it re-animates when scrolling back
              entry.target.classList.remove('visible')
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )
      document.querySelectorAll('.reveal, .reveal-scale').forEach(el => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer?.disconnect()
    }
  }, [])
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/* ============================================
   NAVBAR
   ============================================ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = (id) => { setMenuOpen(false); scrollTo(id) }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo — left */}
        <a href="#hero" className="navbar-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}>
          <img src="/media/transparent circular logo.png" alt="Ramsbottom's" className="navbar-logo" />
        </a>

        {/* Nav links — centred */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <button className="nav-link-btn" onClick={() => nav('about')}>About</button>
          <button className="nav-link-btn" onClick={() => nav('team')}>The Team</button>
          <button className="nav-link-btn" onClick={() => nav('laois')}>Things to Do</button>
          <button className="nav-link-btn" onClick={() => nav('contact')}>Contact</button>
        </div>

        {/* Right side: socials + hamburger */}
        <div className="navbar-right">
          <a href="https://www.facebook.com/ramsbottoms.portlaoise.9/" target="_blank" rel="noopener noreferrer" className="navbar-social" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/ramsbottomsportlaoise/" target="_blank" rel="noopener noreferrer" className="navbar-social" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ============================================
   APP
   ============================================ */

function App() {
  useGlobalReveal()

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = days[new Date().getDay()]

  const [form, setForm] = useState({ name: '', email: '', enquiryType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', enquiryType: '', message: '' })
  }

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/media/Text Logo With green background.png">
          <source src="/media/landing_video.mov" type="video/quicktime" />
          <source src="/media/landing_video.mov" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src="/media/transparent text logo.png" alt="Ramsbottom's" className="hero-text-logo" />
          <p className="hero-tagline">A warm welcome awaits in the heart of Laois</p>
        </div>
        <div className="hero-scroll" onClick={() => scrollTo('about')}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT (cream) ── */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title reveal">Welcome to <span className="gold">Ramsbottom's</span></h2>
            <div className="section-divider reveal reveal-delay-1" style={{ margin: '1rem 0' }}></div>
            <p className="reveal reveal-delay-2">
              Step through our doors and you'll find more than just a pub — you'll find a home away from home.
              Ramsbottom's has been at the heart of the community, bringing people together over great drinks,
              warm conversation, and unforgettable nights. (placeholder)
            </p>
            <p className="reveal reveal-delay-3">
              Whether you're popping in for a quiet pint, catching the game with friends, or celebrating with
              family, there's always a seat and a smile waiting for you at Ramsbottom's. (placeholder)
            </p>
          </div>
          <div className="about-image reveal reveal-delay-2">
            <img src="/media/Anne_Jack.jpeg" alt="Ramsbottom's Pub" />
          </div>
        </div>
      </section>

      {/* ── TEAM (green) ── */}
      <section className="team-section" id="team">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title reveal">The <span className="gold">Team</span></h2>
            <div className="section-divider reveal reveal-delay-1"></div>
            <p className="section-subtitle reveal reveal-delay-2">The legends who keep the pints flowing and the craic mighty</p>
          </div>
        </div>
        <div className="team-row-top">
          {teamMembers.slice(0, 3).map((m, i) => (
            <div key={m.name} className={`team-card reveal reveal-delay-${i + 1}`}>
              <div className="team-card-image-wrapper">
                <img src={m.image} alt={m.name} className="team-card-image" loading="lazy" />
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{m.name}</h3>
                <span className="team-card-nickname">"{m.nickname}"</span>
              </div>
            </div>
          ))}
        </div>
        <div className="team-row-bottom">
          {teamMembers.slice(3).map((m, i) => (
            <div key={m.name} className={`team-card reveal reveal-delay-${i + 1}`}>
              <div className="team-card-image-wrapper">
                <img src={m.image} alt={m.name} className="team-card-image" loading="lazy" />
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{m.name}</h3>
                <span className="team-card-nickname">"{m.nickname}"</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THINGS TO DO ── */}
      <section className="laois-section" id="laois">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title reveal">Things to Do in <span className="gold">Laois</span></h2>
            <div className="section-divider reveal reveal-delay-1"></div>
          </div>
          <div className="laois-placeholder">
            <div className="placeholder-icon reveal">🏰</div>
            <p className="reveal reveal-delay-1">We're putting together the best spots, walks, and hidden gems in Laois. Check back soon!</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT + MAP ── */}
      <section className="contact-section" id="contact">

        <div className="contact-inner">
          <div className="contact-heading reveal">
            <h2 className="contact-title">Let's <span className="contact-title-gold">Talk.</span></h2>
            <p className="contact-subtitle">Drop us a message — we'd love to hear from you.</p>
          </div>

          <div className="contact-body">
            {/* Left: enquiry cards + form */}
            <div className="contact-left">
              {/* Enquiry type dropdown */}
              <div className="form-field enquiry-dropdown-wrap">
                <label className="enquiry-dropdown-label" htmlFor="enquiryType">Type of Enquiry</label>
                <select
                  id="enquiryType"
                  name="enquiryType"
                  className="field-input enquiry-select"
                  value={form.enquiryType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select an option…</option>
                  <option value="General Enquiries">General Enquiries</option>
                  <option value="Events">Events</option>
                  <option value="Parties">Parties</option>
                  <option value="Live Music">Live Music</option>
                </select>
              </div>

              {/* Form */}
              {submitted ? (
                <div className="contact-success reveal">
                  <span className="success-icon">✓</span>
                  <div>
                    <strong>Message sent!</strong>
                    <p>We'll get back to you soon.</p>
                  </div>
                </div>
              ) : (
                <form className="contact-form-grid" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <input className="field-input" type="text" name="name"
                        placeholder="Your name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-field">
                      <input className="field-input" type="email" name="email"
                        placeholder="Email address" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-field full">
                    <textarea className="field-input field-textarea" name="message"
                      placeholder="What's on your mind?" value={form.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="shimmer-btn">
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: map panel */}
            <div className="contact-map-panel">
              <iframe
                src="https://maps.google.com/maps?q=Ramsbottom%27s+Pub+101+Main+St+Portlaoise+Laois+Ireland&output=embed&z=17"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ramsbottom's Pub Location"
              ></iframe>
              <div className="contact-map-info">
                <div className="contact-map-address">
                  <span className="contact-map-pin">📍</span>
                  <div>
                    <strong>Find Us</strong>
                    <p>101 Main St, Portlaoise, Co. Laois</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/dir//101+Main+St,+Maryborough,+Portlaoise,+Co.+Laois"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <img src="/media/transparent circular logo.png" alt="Ramsbottom's" className="footer-logo" />
            <span>© {new Date().getFullYear()} Ramsbottom's Pub</span>
          </div>
          <div className="footer-links">
            <a href="https://www.facebook.com/ramsbottoms.portlaoise.9/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/ramsbottomsportlaoise/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
