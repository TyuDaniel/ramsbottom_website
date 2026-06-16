import { useState, useEffect } from 'react'
import galleryImages from 'virtual:gallery-images'
import './App.css'

/* ============================================
   DATA
   ============================================ */

const laoisAttractions = [
  { name: 'Glamping Under the Stars', icon: '⛺', url: 'https://www.glampingunderthestars.ie/', description: 'Sleep out under the open sky somewhere quiet in Laois. Good for a night or two away without going too far.' },
  { name: 'Ballykilcavan Brewery', icon: '🍺', url: 'https://www.ballykilcavan.com/', description: 'A working farm that also brews its own beer. Worth a visit to see how it all comes together and try a few while you\'re there.' },
  { name: 'Ballintubbert House & Gardens', icon: '🌿', url: 'https://www.ballintubbert.com/', description: 'A fine old house with well-kept walled gardens. Nice spot for a walk on a good day, and not too many people know about it.' },
  { name: 'Paddleworks', icon: '🛶', url: 'https://paddleworks.ie/?utm_source=laoistourism.ie&utm_medium=partnership&utm_campaign=laois_tourism', description: 'Kayaking and paddleboarding on the rivers and lakes around the midlands. Good fun whether you know what you\'re doing or not.' },
  { name: 'Laois Forest School', icon: '🌲', url: 'https://www.laoisforestschool.com/', description: 'Outdoor learning for kids and adults in the woods. Fires, crafts, foraging, that sort of thing. Great for families.' },
  { name: 'Glenbarrow Saunas', icon: '🧖', url: 'https://barrowsauna.com/', description: 'Wood-fired outdoor saunas up in the Slieve Blooms. Exactly what you need after a long walk, or just a long week.' },
  { name: 'The Falls at Glenbarrow', icon: '💧', url: 'https://www.facebook.com/p/The-Falls-at-Glenbarrow-100071009475545/', description: 'An easy enough walk through the Slieve Bloom Mountains to a proper waterfall. Well worth the trip on a clear day.' },
  { name: 'Rock of Dunamaise', icon: '🏰', url: 'https://heritageireland.ie/unguided-sites/rock-of-dunamase/', description: 'The ruins of an old castle on a hill just outside Portlaoise. Good views all around and a bit of history to go with it.' },
  { name: 'Sheeran Tours', icon: '🗺️', url: 'https://sheerantours.com/', description: 'Guided tours of the county with someone who actually knows the place. Far better than reading about it on a sign.' },
  { name: 'Solas Eco Garden', icon: '🌻', url: 'https://solaseco.ie', description: 'A community garden in Portarlington growing food and flowers together. A calm spot, and the people there are great.' },
]

const teamMembers = [
  { name: 'Jack', nickname: 'II Commandiatore', image: '/media/Jack.jpeg' },
  { name: 'Ann', nickname: 'Her Grace', image: '/media/Anne.jpeg' },
  { name: 'Billy', nickname: 'Mixmaster General', image: '/media/Billy.jpeg' },
  { name: 'Noel', nickname: 'Slick Hips', image: '/media/Noel.jpeg' },
  { name: 'Damien', nickname: 'Swiss Army Knife', image: '/media/Damien.jpeg' },
  { name: 'Phillip', nickname: 'The Don', image: '/media/Philip.jpeg' },
  { name: 'Aaron', nickname: 'The Future', image: '/media/Aaron.jpeg' },
]



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

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
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
          <button className="nav-link-btn" onClick={() => nav('history')}>History</button>
          <button className="nav-link-btn" onClick={() => nav('team')}>The Team</button>
          <button className="nav-link-btn" onClick={() => nav('gallery')}>Gallery</button>
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

  const [lightbox, setLightbox] = useState(null)

  const [form, setForm] = useState({ name: '', email: '', enquiryType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitted) return
    setSending(true)
    setSendError(false)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '3b9fb2fe-1b41-40cf-83bf-9068779a6b36',
          subject: `Ramsbottom's Website — ${form.enquiryType || 'General Enquiry'}`,
          from_name: form.name,
          replyto: form.email,
          name: form.name,
          email: form.email,
          enquiry_type: form.enquiryType,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
        setForm({ name: '', email: '', enquiryType: '', message: '' })
      } else {
        setSendError(true)
      }
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
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
            <img src="/media/black and white.jpeg" alt="Ramsbottom's Pub" />
          </div>
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section className="history-section" id="history">
        <div className="history-grid">
          <div className="history-image reveal reveal-delay-1">
            <img src="/media/Anne_Jack.jpeg" alt="Ramsbottom's history" />
          </div>
          <div className="history-text">
            <h2 className="section-title reveal">Our <span className="gold">History</span></h2>
            <div className="section-divider reveal reveal-delay-1" style={{ margin: '1rem 0' }}></div>
            <p className="reveal reveal-delay-2">
              Ramsbottom's has long been part of Portlaoise life, the kind of place where familiar faces,
              visiting friends, and passing stories all find their way to the counter.
            </p>
            <p className="reveal reveal-delay-3">
              Through the years, the pub has kept hold of what matters most: a good welcome, a steady pint,
              and a room that feels easy to settle into.
            </p>
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

      {/* ── GALLERY ── */}
      <section className="gallery-section" id="gallery">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title reveal">Our <span className="gold">Gallery</span></h2>
            <div className="section-divider reveal reveal-delay-1"></div>
            <p className="section-subtitle reveal reveal-delay-2">Moments from Ramsbottom's — where every night tells a story</p>
          </div>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((src, i) => (
            <div key={i} className={`gallery-item${[0, 7].includes(i) ? ' featured' : ''} reveal reveal-delay-${(i % 5) + 1}`} onClick={() => setLightbox(i)}>
              <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
              <div className="gallery-item-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {lightbox !== null && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length) }}>‹</button>
            <img src={galleryImages[lightbox]} alt="" onClick={(e) => e.stopPropagation()} />
            <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length) }}>›</button>
          </div>
        )}
      </section>

      {/* ── THINGS TO DO ── */}
      <section className="laois-section" id="laois">
        <div className="section-inner">
          <div className="section-header">
            <h2 className="section-title reveal">Things to Do in <span className="gold">Laois</span></h2>
            <div className="section-divider reveal reveal-delay-1"></div>
            <p className="section-subtitle reveal reveal-delay-2">Some of our favourite things to do nearby while you're in the area</p>
          </div>
          <div className="laois-grid">
            {laoisAttractions.map((item, i) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className={`laois-card reveal reveal-delay-${(i % 5) + 1}`}>
                <div className="laois-card-icon">{item.icon}</div>
                <div className="laois-card-body">
                  <h3 className="laois-card-name">{item.name}</h3>
                  <p className="laois-card-desc">{item.description}</p>
                </div>
                <span className="laois-card-link">
                  Visit site
                  <ExternalLinkIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT + MAP ── */}
      <section className="contact-section" id="contact">

        <div className="contact-inner">
          <div className="contact-heading reveal">
            <h2 className="contact-title">Let's <span className="contact-title-gold">Talk.</span></h2>
            <p className="contact-subtitle">Drop us a message we'd love to hear from you.</p>
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
                  {sendError && <p className="form-error">Something went wrong. Please try again.</p>}
                  <button type="submit" className="shimmer-btn" disabled={sending || submitted}>
                    <span>{submitted ? 'Already Submitted!' : sending ? 'Sending…' : 'Send Message'}</span>
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
