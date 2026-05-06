import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Team.css';

const APP_STORE_URL = 'https://apps.apple.com/us/app/mustangmaps/id6762173770';

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
    funFact: 'I am all caught up to all of One Piece.',
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

/* ─── Scroll reveal hook ─── */
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  return (
    <header className="team-nav">
      <Link to="/" className="nav-logo">
        <img src="/mustangmapsv1.png" alt="Mustang Maps" height="36" />
      </Link>

      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-cta"
      >
        Get the App
      </a>
    </header>
  );
}

/* ─── Hero ─── */
function TeamHero() {
  return (
    <section className="team-hero">
      <div className="team-hero-glow" />
      <div className="team-hero-glow-2" />

      <div className="team-hero-inner">
        <div className="team-tag">
          <span className="team-tag-dot" />
          Built at Cal Poly SLO · CodeBox
        </div>

        <h1 className="team-hero-title">
          The people who
          <br />
          <em>mapped the map.</em>
        </h1>

        <p className="team-hero-desc">
          Mustang Maps is built by Cal Poly students who got tired of being late to class.
          Every feature exists because someone on this team needed it first.
        </p>
      </div>

      <div className="team-hero-rule" />
    </section>
  );
}

/* ─── Member Card ─── */
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

          <div className="member-initials-fallback">
            {member.initials}
          </div>
        </div>

        <div className="member-info">
          <h3 className="member-name">{member.name}</h3>
          <span className="member-role">{member.role}</span>

          <div className="member-bio">
            <p>
              <strong>Year:</strong> {member.year}
            </p>
            <p>
              <strong>Major:</strong> {member.major}
            </p>
            <p>
              <strong>Fun fact:</strong> {member.funFact}
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ─── Grid ─── */
function TeamGrid() {
  return (
    <section className="team-grid-section">
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

/* ─── CodeBox Band ─── */
function CodeBoxBand() {
  return (
    <Reveal>
      <section className="codebox-band">
        <div className="codebox-band-inner">
          <img
            src="/codebox.png"
            alt="CodeBox"
            className="codebox-band-logo"
            height="44"
          />

          <div className="codebox-band-text">
            <h3 className="codebox-band-title">Built through CodeBox</h3>
            <p className="codebox-band-desc">
              CodeBox is a student-run product organization at Cal Poly SLO. We build real
              software used by real students.
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ─── CTA ─── */
function TeamCTA() {
  return (
    <section className="team-cta">
      <Reveal>
        <h2 className="team-cta-heading">
          Try what
          <br />
          <em>we built.</em>
        </h2>

        <p className="team-cta-desc">
          Free on the App Store. No ads, no subscriptions — just a campus map that works.
        </p>

        <div className="team-cta-actions">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-appstore"
          >
            <AppStoreIcon />
            Download on the App Store
          </a>

          <Link to="/" className="btn-ghost">
            ← Back to home
          </Link>
        </div>
      </Reveal>
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
export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="team-page">
      <Navbar />
      <TeamHero />
      <TeamGrid />
      <CodeBoxBand />
      <TeamCTA />
      <Footer />
    </div>
  );
}