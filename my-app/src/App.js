import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TeamPage from './Team';

const APP_STORE_URL = 'https://apps.apple.com/us/app/mustangmaps/id6762173770';

const FEATURES = [
  {
    icon: '🗺️',
    title: 'Building-to-Building Routes',
    desc: 'Accurate walking paths between any two buildings on campus. No more zigzagging or guessing.',
  },
  {
    icon: '🚿',
    title: 'Key Amenities',
    desc: 'Find bathrooms, water fountains, and printer — shown across the whole campus at once.',
  },
  {
    icon: '🎓',
    title: 'Classroom Finder',
    desc: "Know which floor and room you're heading to before you walk through the door. Never be late on week one again.",
  },
  {
    icon: '🌙',
    title: 'Dark Mode Map',
    desc: 'A dark campus map for late-night study runs, evening classes, and anyone who prefers dark mode.',
  },
  {
    icon: '⭐',
    title: 'Save Favorites',
    desc: 'Bookmark your most visited buildings for instant access.',
  },
  {
    icon: '🆓',
    title: 'Completely Free',
    desc: "No subscriptions, no ads, no catches. Built by Poly students, for Poly students.",
  },
];

// Triple the array so we always have clones on both sides
const LOOPED_FEATURES = [...FEATURES, ...FEATURES, ...FEATURES];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Search your destination',
    desc: 'Type a building name or number. Mustang Maps knows every corner of Cal Poly.',
  },
  {
    n: '02',
    title: 'Get your route',
    desc: "See a clear walking path from wherever you are to wherever you're going.",
  },
  {
    n: '03',
    title: 'Arrive efficiently',
    desc: 'Walk in knowing exactly where you are going.',
  },
];

function getCardsPerView() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}

function useResponsiveCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  useEffect(() => {
    const onResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return cardsPerView;
}

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

function AppStoreIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function Navbar() {
  const scrolled = useNavScroll();

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <img src="/mustangmapsv1.png" alt="Mustang Maps" height="36" />
      </a>
      {/* ── Added Meet the Team link ── */}
      <Link to="/team" className="nav-team-link">Meet the Team</Link>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
        Get the App
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-glow-2" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Cal Poly SLO · iOS App
          </div>

          <h1 className="hero-title">
            Navigate<br />campus<br /><em>your way.</em>
          </h1>

          <p className="hero-desc">
            Navigation for California Polytechnic State University, San Luis Obispo —{' '}
            <strong>designed around how students actually move.</strong> Accurate
            building-to-building routes, key amenities, and specific destination
            details to eliminate the guesswork.
          </p>

          <div className="hero-actions">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-appstore">
              <AppStoreIcon />
              Download on the App Store
            </a>
            <a href="#features" className="btn-ghost">See features →</a>
          </div>

          <div className="hero-stats">
            <div>
              <span className="stat-num">200+</span>
              <span className="stat-label">Buildings mapped</span>
            </div>
            <div>
              <span className="stat-num">Free</span>
              <span className="stat-label">On the app store</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="phones-wrapper">
            <div className="phone phone-back">
              <div className="phone-screen">
                <img src="/phone-back.png" alt="App dark mode screenshot" />
              </div>
            </div>
            <div className="phone phone-front">
              <div className="phone-screen">
                <img src="/phone-front.png" alt="App screenshot" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-divider">
        <img className="codebox-logo" src="/codebox.png" alt="CodeBox" height="36" />
        <span className="hero-divider-text">
          <strong>Built through CodeBox</strong> — a student-run organization at Cal Poly SLO
        </span>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <div className="feature-card-inner">
        <div className="feature-icon">{feature.icon}</div>
        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.desc}</p>
      </div>
    </article>
  );
}

function FeatureCarousel() {
  const cardsPerView = useResponsiveCardsPerView();

  // Start in the middle copy of the tripled array
  const [trackIndex, setTrackIndex] = useState(FEATURES.length);
  const [animated, setAnimated] = useState(true);

  // Which real feature index are we at (for dots)
  const realIndex = ((trackIndex % FEATURES.length) + FEATURES.length) % FEATURES.length;
  const maxDotIndex = FEATURES.length - cardsPerView;
  const dotIndex = Math.min(realIndex, maxDotIndex);

  const goNext = () => {
    setAnimated(true);
    setTrackIndex((i) => i + 1);
  };

  const goPrev = () => {
    setAnimated(true);
    setTrackIndex((i) => i - 1);
  };

  const goToDot = (index) => {
    setAnimated(true);
    // Always jump to the middle copy at that dot position
    setTrackIndex(FEATURES.length + index);
  };

  // After the slide animation finishes, silently snap back into the real section
  useEffect(() => {
    // Upper boundary: entered the third copy
    if (trackIndex >= FEATURES.length * 2) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIndex((i) => i - FEATURES.length);
        setTimeout(() => setAnimated(true), 50);
      }, 350);
      return () => clearTimeout(timer);
    }
    // Lower boundary: entered the first copy
    if (trackIndex < FEATURES.length) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIndex((i) => i + FEATURES.length);
        setTimeout(() => setAnimated(true), 50);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [trackIndex]);

  return (
    <section className="features" id="features">
      <Reveal className="features-header">
        <h2 className="section-heading">
          Everything you need<br />to <em>navigate Cal Poly confidently.</em>
        </h2>

        <div className="feature-carousel-controls" aria-label="Feature carousel controls">
          <button type="button" className="carousel-btn" onClick={goPrev} aria-label="Previous feature">
            ←
          </button>
          <button type="button" className="carousel-btn" onClick={goNext} aria-label="Next feature">
            →
          </button>
        </div>
      </Reveal>

      <Reveal className="feature-carousel-shell">
        <div className="feature-carousel-window">
          <div
            className="feature-carousel-track"
            style={{
              '--features-per-view': cardsPerView,
              transform: `translateX(-${trackIndex * (100 / cardsPerView)}%)`,
              transition: animated ? 'transform 0.35s ease' : 'none',
            }}
          >
            {LOOPED_FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </div>
        </div>

        <div className="feature-carousel-dots" aria-label="Feature carousel pages">
          {Array.from({ length: maxDotIndex + 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`feature-carousel-dot ${dotIndex === index ? 'is-active' : ''}`}
              onClick={() => goToDot(index)}
              aria-label={`Show feature slide ${index + 1}`}
              aria-current={dotIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how">
      <Reveal>
        <h2 className="section-heading">
          Go anywhere<br />in <em>three taps.</em>
        </h2>
      </Reveal>

      <Reveal className="steps">
        {HOW_STEPS.map((step) => (
          <div className="step" key={step.n}>
            <div className="step-num">{step.n}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section">
      <Reveal>
        <h2 className="section-heading cta-heading">
          Stop guessing.<br />Start <em>navigating.</em>
        </h2>
      </Reveal>

      <Reveal className="cta-right">
        <p className="cta-desc">
          Mustang Maps is free and designed by people who walk the same campus you do.
          Download it before your next class.
        </p>
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <AppStoreIcon size={18} />
          Download on App Store
        </a>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">Mustang Maps</span>
      <div className="footer-links">
        <a href="https://calpoly.edu" target="_blank" rel="noopener noreferrer">Cal Poly</a>
        {/* ── Added Meet the Team link ── */}
        <Link to="/team">Meet the Team</Link>
      </div>
      <span className="footer-copy">© 2025 CodeBox · Cal Poly SLO</span>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <FeatureCarousel />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
