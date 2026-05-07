import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const APP_STORE_URL = 'https://apps.apple.com/us/app/mustangmaps/id6762173770';

const FEATURES = [
  {
    icon: '/MMbuilding.png',
    title: 'Building-to-Building Routes',
    desc: 'Accurate walking paths between any two buildings on campus. No more zigzagging or guessing.',
  },
  {
    icon: '/MMamenity.png',
    title: 'Key Amenities',
    desc: 'Find bathrooms, water fountains, and printer — shown across the whole campus at once.',
  },
  {
    icon: '/MMclass.png',
    title: 'Classroom Finder',
    desc: "Know which floor and room you're heading to before you walk through the door. Never be late on week one again.",
  },
  {
    icon: '/MMnight.png',
    title: 'Dark Mode Map',
    desc: 'A dark campus map for late-night study runs, evening classes, and anyone who prefers dark mode.',
  },
  {
    icon: '/MMfavorite.png',
    title: 'Save Favorites',
    desc: 'Bookmark your most visited buildings for instant access.',
  },
  {
    icon: '/MMfree.png',
    title: 'Completely Free',
    desc: "No subscriptions, no ads, no catches. Built by Poly students, for Poly students.",
  },
];

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

const TEAM = [
  {
    photo: '/idhika.png',
    initials: 'IN',
    name: 'Idhika Nagalingam',
    role: 'Product Manager',
    year: '1st Year',
    major: 'Electrical Engineering',
    funFact: 'I have lived in 4 countries.',
  },
  {
    photo: '/winnie.png',
    initials: 'WT',
    name: 'Winnie Trinh',
    role: 'Project Lead',
    year: '3rd Year',
    major: 'Computer Science',
    funFact: 'I love squirrels.',
  },
  {
    photo: '/sid.png',
    initials: 'SB',
    name: 'Siddharth Balaji',
    role: 'Project Lead',
    year: '1st Year',
    major: 'Computer Science',
    funFact: 'I have fed a kangaroo.',
  },
  {
    photo: '/stella.png',
    initials: 'SK',
    name: 'Stella Kwon',
    role: 'Designer',
    year: '3rd Year',
    major: 'Graphic Communication',
    funFact: 'Fun fact here.',
  },
  {
    photo: '/jacob.png',
    initials: 'JL',
    name: 'Jacob Lee',
    role: 'Developer',
    year: '2nd Year',
    major: 'Computer Science',
    funFact: 'Fun fact here.',
  },
  {
    photo: '/snehil.png',
    initials: 'SK',
    name: 'Snehil Kakani',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Science',
    funFact: 'I produce music.',
  },
  {
    photo: '/scout.png',
    initials: 'SKP',
    name: 'Scout Knight-Pheng',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Science',
    funFact: 'I can juggle.',
  },
  {
    photo: '/daniel.png',
    initials: 'DE',
    name: 'Daniel Erazo',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Engineering',
    funFact: 'I am caught up to all of One Piece.',
  },
  {
    photo: '/ally.png',
    initials: 'AS',
    name: 'Ally Stauffer',
    role: 'Developer',
    year: '2nd Year',
    major: 'Computer Science',
    funFact: 'I grew up doing ballet.',
  },
  {
    photo: '/nick.png',
    initials: 'NE',
    name: 'Nick Endresen',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Science',
    funFact: 'My team won the FRC Robotics Championship last year.',
  },
  {
    photo: '/aswath.png',
    initials: 'AS',
    name: 'Aswath Subramanian',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Engineering',
    funFact: 'Fun fact here.',
  },
  {
    photo: '/rodney.png',
    initials: 'RF',
    name: 'Rodney Fujiyama',
    role: 'Developer',
    year: '1st Year',
    major: 'Computer Science',
    funFact: 'I have a lot of allergies.',
  },
];

/* ─── Shared Hooks ─── */

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
      { threshold: 0.1 }
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

/* ─── Shared Components ─── */

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ '--delay': `${delay}ms` }}
    >
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

/* ─── Navbar ─── */

function Navbar() {
  const scrolled = useNavScroll();

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <a href="/" className="nav-logo">
        <img src="/mustangmapsv1.png" alt="Mustang Maps" height="36" />
      </a>

      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
        Get the App
      </a>
    </header>
  );
}

/* ─── Hero ─── */

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

            <a href="#features" className="btn-ghost">
              See features →
            </a>
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

/* ─── Features ─── */

function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <div className="feature-card-inner">
        <div className="feature-icon">
          <img src={feature.icon} alt={feature.title} className="feature-icon-img" />
        </div>

        <h3 className="feature-title">{feature.title}</h3>
        <p className="feature-desc">{feature.desc}</p>
      </div>
    </article>
  );
}

function FeatureCarousel() {
  const cardsPerView = useResponsiveCardsPerView();
  const [trackIndex, setTrackIndex] = useState(FEATURES.length);
  const [animated, setAnimated] = useState(true);

  const dragStart = useRef(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);
  const trackRef = useRef(null);
  const windowRef = useRef(null);

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
    setTrackIndex(FEATURES.length + index);
  };

  useEffect(() => {
    if (trackIndex >= FEATURES.length * 2) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIndex((i) => i - FEATURES.length);
        setTimeout(() => setAnimated(true), 50);
      }, 350);

      return () => clearTimeout(timer);
    }

    if (trackIndex < FEATURES.length) {
      const timer = setTimeout(() => {
        setAnimated(false);
        setTrackIndex((i) => i + FEATURES.length);
        setTimeout(() => setAnimated(true), 50);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [trackIndex]);

  const getCardWidth = () => {
    if (!windowRef.current) return 0;
    return windowRef.current.offsetWidth / cardsPerView;
  };

  const onDragStart = (clientX) => {
    isDragging.current = true;
    dragStart.current = clientX;
    dragDelta.current = 0;

    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const onDragMove = (clientX) => {
    if (!isDragging.current) return;

    dragDelta.current = clientX - dragStart.current;
    const baseTranslate = -(trackIndex * (100 / cardsPerView));

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(${baseTranslate}% + ${dragDelta.current}px))`;
    }
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const threshold = getCardWidth() * 0.2;

    if (trackRef.current) {
      trackRef.current.style.transform = '';
    }

    if (dragDelta.current < -threshold) {
      goNext();
    } else if (dragDelta.current > threshold) {
      goPrev();
    } else {
      setAnimated(true);
      setTrackIndex((i) => i);
    }

    dragDelta.current = 0;
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    onDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (isDragging.current) onDragMove(e.clientX);
  };

  const onMouseUp = () => onDragEnd();

  const onMouseLeave = () => {
    if (isDragging.current) onDragEnd();
  };

  const onTouchStart = (e) => {
    onDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    onDragMove(e.touches[0].clientX);
  };

  const onTouchEnd = () => onDragEnd();

  return (
    <section className="features" id="features">
      <Reveal className="features-header">
        <h2 className="section-heading">
          Everything you need<br />to <em>navigate Cal Poly confidently.</em>
        </h2>

        <div className="feature-carousel-controls" aria-label="Feature carousel controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={goPrev}
            aria-label="Previous feature"
          >
            ←
          </button>

          <button
            type="button"
            className="carousel-btn"
            onClick={goNext}
            aria-label="Next feature"
          >
            →
          </button>
        </div>
      </Reveal>

      <Reveal className="feature-carousel-shell">
        <div
          className="feature-carousel-window"
          ref={windowRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ cursor: 'grab', userSelect: 'none' }}
        >
          <div
            ref={trackRef}
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

/* ─── How It Works ─── */

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

/* ─── CTA ─── */

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

/* ─── Meet the Team ─── */

function MemberCard({ member, index }) {
  return (
    <Reveal className="member-card-reveal" delay={index * 50}>
      <article className="member-card">
        <div className="member-avatar-wrap">
          <img
            src={member.photo}
            alt={member.name}
            className="member-photo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />

          <div className="member-initials-fallback">{member.initials}</div>
        </div>

        <div className="member-info">
          <h3 className="member-name">{member.name}</h3>
          <span className="member-role">{member.role}</span>

          <div className="member-bio">
            <p><strong>Year:</strong> {member.year}</p>
            <p><strong>Major:</strong> {member.major}</p>
            <p><strong>Fun fact:</strong> {member.funFact}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function TeamSection() {
  return (
    <section className="team-grid-section" id="team">
      <Reveal>
        <p className="team-grid-label">The Team</p>

        <h2 className="team-grid-heading">
          Students building for
          <br />
          <em>students.</em>
        </h2>
      </Reveal>

      <div className="team-grid">
        {TEAM.map((member, i) => (
          <MemberCard key={i} member={member} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-logo">Mustang Maps</span>

      <div className="footer-links">
        <a href="https://calpoly.edu" target="_blank" rel="noopener noreferrer">
          Cal Poly
        </a>
      </div>

      <span className="footer-copy">© 2025 CodeBox · Cal Poly SLO</span>
    </footer>
  );
}

/* ─── Page ─── */

function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <FeatureCarousel />
      <HowItWorks />
      <CTASection />
      <TeamSection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;