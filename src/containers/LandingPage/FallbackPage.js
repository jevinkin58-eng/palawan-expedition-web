import React, { useState } from 'react';
import loadable from '@loadable/component';
import { useHistory } from 'react-router-dom';

import { NamedLink } from '../../components/index.js';
import { createResourceLocatorString } from '../../util/routes.js';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';

import css from './FallbackPage.module.css';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// ─── SVG Icons ───────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const AnchorIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="22" x2="12" y2="8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Wave SVG for hero bottom
const WaveSvg = () => (
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z"
      fill="#ffffff"
    />
  </svg>
);

// ─── Hero Section with Search Bar ──────────────────────────────

const SectionHeroCustom = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const routeConfiguration = useRouteConfiguration();

  const handleSearch = e => {
    e.preventDefault();
    const searchParams = searchValue.trim()
      ? { keywords: searchValue.trim() }
      : {};
    const path = createResourceLocatorString('SearchPage', routeConfiguration, {}, searchParams);
    history.push(path);
  };

  return (
    <section className={css.heroSection}>
      <div className={css.heroDecor} aria-hidden="true">
        <div className={css.heroCircle1} />
        <div className={css.heroCircle2} />
        <div className={css.heroCircle3} />
      </div>

      <div className={css.heroContent}>
        <p className={css.heroSubtitle}>Palawan, Philippines</p>
        <h1 className={css.heroTitle}>
          Your Next Great
          <br />
          Adventure Awaits
        </h1>
        <p className={css.heroDescription}>
          Discover expedition tours, island-hopping trips, and camp stays across the
          most beautiful islands in the Philippines. Book directly with local operators.
        </p>

        {/* Search Bar */}
        <form className={css.heroSearchForm} onSubmit={handleSearch}>
          <div className={css.heroSearchWrapper}>
            <span className={css.heroSearchIcon}>
              <SearchIcon />
            </span>
            <input
              type="text"
              className={css.heroSearchInput}
              placeholder="Search expeditions, diving, island hopping..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <button type="submit" className={css.heroSearchBtn}>
              Search
            </button>
          </div>
        </form>

        {/* Quick Filter Tags */}
        <div className={css.heroQuickTags}>
          <NamedLink name="SearchPage" to={{ search: '?pub_expeditiontype=islandHopping' }} className={css.heroTag}>
            Island Hopping
          </NamedLink>
          <NamedLink name="SearchPage" to={{ search: '?pub_expeditiontype=diving' }} className={css.heroTag}>
            Diving
          </NamedLink>
          <NamedLink name="SearchPage" to={{ search: '?pub_expeditiontype=sailing' }} className={css.heroTag}>
            Sailing
          </NamedLink>
          <NamedLink name="SearchPage" to={{ search: '?pub_expeditiontype=joinerExpedition' }} className={css.heroTag}>
            Joiner Expeditions
          </NamedLink>
        </div>
      </div>

      <div className={css.heroWave}>
        <WaveSvg />
      </div>
    </section>
  );
};

// ─── Trust Bar ────────────────────────────────────────────────

const SectionTrustBar = () => (
  <section className={css.trustBarSection}>
    <div className={css.trustBarInner}>
      <div className={css.trustItem}>
        <ShieldIcon />
        <span>Secure Payments</span>
      </div>
      <div className={css.trustItem}>
        <UsersIcon />
        <span>Local Operators</span>
      </div>
      <div className={css.trustItem}>
        <MapPinIcon />
        <span>Palawan Based</span>
      </div>
      <div className={css.trustItem}>
        <StarIcon />
        <span>Verified Reviews</span>
      </div>
    </div>
  </section>
);

// ─── How It Works ────────────────────────────────────────────

const SectionHowItWorks = () => (
  <section className={css.howItWorksSection}>
    <h2 className={css.sectionTitle}>How It Works</h2>
    <p className={css.sectionSubtitle}>
      Three simple steps to your perfect Palawan expedition
    </p>
    <div className={css.stepsGrid}>
      <div className={css.step}>
        <div className={css.stepIcon}>
          <SearchIcon />
        </div>
        <p className={css.stepNumber}>Step 01</p>
        <h3 className={css.stepTitle}>Browse & Discover</h3>
        <p className={css.stepDesc}>
          Search trips by date, duration, comfort level, or company. Find the
          expedition that fits your style.
        </p>
      </div>
      <div className={css.step}>
        <div className={css.stepIcon}>
          <CalendarIcon />
        </div>
        <p className={css.stepNumber}>Step 02</p>
        <h3 className={css.stepTitle}>Book Your Seats</h3>
        <p className={css.stepDesc}>
          Reserve seats for yourself or your whole group with secure online
          payment. Instant confirmation.
        </p>
      </div>
      <div className={css.step}>
        <div className={css.stepIcon}>
          <AnchorIcon />
        </div>
        <p className={css.stepNumber}>Step 03</p>
        <h3 className={css.stepTitle}>Set Sail</h3>
        <p className={css.stepDesc}>
          Show up at the departure point, meet your crew, and experience the
          best of Palawan firsthand.
        </p>
      </div>
    </div>
  </section>
);

// ─── Categories ──────────────────────────────────────────────

const SectionCategories = () => (
  <section className={css.categoriesSection}>
    <div style={{ textAlign: 'center' }}>
      <h2 className={css.sectionTitle}>Explore by Category</h2>
      <p className={css.sectionSubtitle}>
        Everything you need for the ultimate Palawan experience
      </p>
    </div>
    <div className={css.categoriesGrid}>
      <NamedLink name="SearchPage" className={css.categoryCard}>
        <span className={css.categoryIcon} role="img" aria-label="Trips">
          &#x1F6F3;
        </span>
        <h3 className={css.categoryTitle}>Trips</h3>
        <p className={css.categoryDesc}>
          Island-hopping tours, diving expeditions, and multi-day adventures
        </p>
      </NamedLink>

      <NamedLink name="CompaniesPage" className={css.categoryCard}>
        <span className={css.categoryIcon} role="img" aria-label="Companies">
          &#x1F3E2;
        </span>
        <h3 className={css.categoryTitle}>Companies</h3>
        <p className={css.categoryDesc}>
          Trusted local operators with verified reviews
        </p>
      </NamedLink>

      <NamedLink name="CampsPage" className={css.categoryCard}>
        <span className={css.categoryIcon} role="img" aria-label="Camps">
          &#x26FA;
        </span>
        <h3 className={css.categoryTitle}>Camps</h3>
        <p className={css.categoryDesc}>
          Beach camps and eco-lodges across Palawan's islands
        </p>
      </NamedLink>

      <NamedLink name="BoatsPage" className={css.categoryCard}>
        <span className={css.categoryIcon} role="img" aria-label="Boats">
          &#x26F5;
        </span>
        <h3 className={css.categoryTitle}>Boats</h3>
        <p className={css.categoryDesc}>
          Charter vessels and expedition boats for every budget
        </p>
      </NamedLink>

      <NamedLink name="DestinationsPage" className={css.categoryCard}>
        <span className={css.categoryIcon} role="img" aria-label="Destinations">
          &#x1F3DD;
        </span>
        <h3 className={css.categoryTitle}>Destinations</h3>
        <p className={css.categoryDesc}>
          Explore El Nido, Coron, Port Barton, and hidden island gems
        </p>
      </NamedLink>
    </div>
  </section>
);

// ─── Featured Expeditions ────────────────────────────────────

const SectionFeatured = () => (
  <section className={css.featuredSection}>
    <div style={{ textAlign: 'center' }}>
      <h2 className={css.sectionTitle}>Popular Expeditions</h2>
      <p className={css.sectionSubtitle}>
        Hand-picked adventures our travelers love most
      </p>
    </div>
    <div className={css.featuredGrid}>
      <div className={css.featuredCard}>
        <div className={css.featuredImagePlaceholder}>
          <span className={css.featuredEmoji}>🤿</span>
        </div>
        <div className={css.featuredBody}>
          <span className={css.featuredBadge}>Diving</span>
          <h3 className={css.featuredTitle}>Coron Shipwreck Diving</h3>
          <p className={css.featuredDesc}>
            Explore legendary Japanese shipwrecks in crystal-clear waters with expert dive masters.
          </p>
          <div className={css.featuredMeta}>
            <span>3 Days</span>
            <span className={css.featuredDot}>·</span>
            <span>From $350/day</span>
          </div>
        </div>
      </div>

      <div className={css.featuredCard}>
        <div className={css.featuredImagePlaceholder}>
          <span className={css.featuredEmoji}>⛵</span>
        </div>
        <div className={css.featuredBody}>
          <span className={css.featuredBadge}>Sailing</span>
          <h3 className={css.featuredTitle}>El Nido to Coron Expedition</h3>
          <p className={css.featuredDesc}>
            Sail through remote islands, pristine beaches, and hidden lagoons over 5 days.
          </p>
          <div className={css.featuredMeta}>
            <span>5 Days</span>
            <span className={css.featuredDot}>·</span>
            <span>From $350/day</span>
          </div>
        </div>
      </div>

      <div className={css.featuredCard}>
        <div className={css.featuredImagePlaceholder}>
          <span className={css.featuredEmoji}>🏝️</span>
        </div>
        <div className={css.featuredBody}>
          <span className={css.featuredBadge}>Island Hopping</span>
          <h3 className={css.featuredTitle}>Secret Beach & Lagoon Tour</h3>
          <p className={css.featuredDesc}>
            Discover hidden beaches, snorkel vibrant reefs, and kayak through Big & Small Lagoons.
          </p>
          <div className={css.featuredMeta}>
            <span>1 Day</span>
            <span className={css.featuredDot}>·</span>
            <span>From $85/person</span>
          </div>
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: '36px' }}>
      <NamedLink name="SearchPage" className={css.featuredCta}>
        View All Expeditions →
      </NamedLink>
    </div>
  </section>
);

// ─── Testimonials ────────────────────────────────────────────

const SectionTestimonials = () => (
  <section className={css.testimonialsSection}>
    <h2 className={css.sectionTitle}>What Travelers Say</h2>
    <p className={css.sectionSubtitle}>Real reviews from real adventurers</p>
    <div className={css.testimonialsGrid}>
      <div className={css.testimonialCard}>
        <div className={css.testimonialStars}>
          <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
        </div>
        <p className={css.testimonialText}>
          "The El Nido to Coron expedition was the highlight of our Philippines trip.
          The crew was amazing and the islands were breathtaking!"
        </p>
        <div className={css.testimonialAuthor}>
          <div className={css.testimonialAvatar}>M</div>
          <div>
            <p className={css.testimonialName}>Maria S.</p>
            <p className={css.testimonialTrip}>5-Day Sailing Expedition</p>
          </div>
        </div>
      </div>

      <div className={css.testimonialCard}>
        <div className={css.testimonialStars}>
          <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
        </div>
        <p className={css.testimonialText}>
          "Best diving experience I've ever had. The Coron shipwrecks are incredible
          and the guides knew every detail."
        </p>
        <div className={css.testimonialAuthor}>
          <div className={css.testimonialAvatar}>J</div>
          <div>
            <p className={css.testimonialName}>James T.</p>
            <p className={css.testimonialTrip}>Coron Shipwreck Diving</p>
          </div>
        </div>
      </div>

      <div className={css.testimonialCard}>
        <div className={css.testimonialStars}>
          <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
        </div>
        <p className={css.testimonialText}>
          "Booking was so easy and the local operator was professional from start
          to finish. Will definitely book again!"
        </p>
        <div className={css.testimonialAuthor}>
          <div className={css.testimonialAvatar}>S</div>
          <div>
            <p className={css.testimonialName}>Sophie L.</p>
            <p className={css.testimonialTrip}>Island Hopping Tour</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── About / Stats ───────────────────────────────────────────

const SectionAbout = () => (
  <section className={css.aboutSection}>
    <div className={css.aboutInner}>
      <h2 className={css.aboutTitle}>Why PalawanExpedition?</h2>
      <p className={css.aboutText}>
        We connect travelers with verified local expedition operators across
        Palawan. Every trip, camp, and boat on our platform is run by people who
        know these islands best. Fair pricing, secure booking, and real reviews
        from real travelers.
      </p>
      <div className={css.statsRow}>
        <div className={css.stat}>
          <p className={css.statNumber}>7+</p>
          <p className={css.statLabel}>Expeditions</p>
        </div>
        <div className={css.stat}>
          <p className={css.statNumber}>5+</p>
          <p className={css.statLabel}>Operators</p>
        </div>
        <div className={css.stat}>
          <p className={css.statNumber}>4.8</p>
          <p className={css.statLabel}>Avg Rating</p>
        </div>
        <div className={css.stat}>
          <p className={css.statNumber}>100%</p>
          <p className={css.statLabel}>Secure Pay</p>
        </div>
      </div>
    </div>
  </section>
);

// ─── CTA Banner ──────────────────────────────────────────────

const SectionCtaBanner = () => (
  <section className={css.ctaSection}>
    <h2 className={css.ctaTitle}>Ready to Explore Palawan?</h2>
    <p className={css.ctaDesc}>
      Browse available expeditions and book your next adventure today.
    </p>
    <NamedLink name="SearchPage" className={css.ctaButton}>
      View All Expeditions
    </NamedLink>
  </section>
);

// ─── Fallback page assembly ─────────────────────────────────

const customSectionComponents = {
  customHero: { component: SectionHeroCustom },
  customTrustBar: { component: SectionTrustBar },
  customHowItWorks: { component: SectionHowItWorks },
  customCategories: { component: SectionCategories },
  customFeatured: { component: SectionFeatured },
  customTestimonials: { component: SectionTestimonials },
  customAbout: { component: SectionAbout },
  customCtaBanner: { component: SectionCtaBanner },
};

export const fallbackSections = () => ({
  sections: [
    { sectionType: 'customHero', sectionId: 'hero' },
    { sectionType: 'customTrustBar', sectionId: 'trust-bar' },
    { sectionType: 'customHowItWorks', sectionId: 'how-it-works' },
    { sectionType: 'customCategories', sectionId: 'categories' },
    { sectionType: 'customFeatured', sectionId: 'featured' },
    { sectionType: 'customTestimonials', sectionId: 'testimonials' },
    { sectionType: 'customAbout', sectionId: 'about' },
    { sectionType: 'customCtaBanner', sectionId: 'cta' },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'PalawanExpedition — Discover & Book Palawan Adventures',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'Book expedition tours, island-hopping trips, and camp stays in Palawan, Philippines. Trusted local operators, secure payment, real reviews.',
    },
  },
});

const FallbackPage = props => {
  const { error, ...rest } = props;
  return (
    <PageBuilder
      pageAssetsData={fallbackSections()}
      options={{
        sectionComponents: customSectionComponents,
      }}
      {...rest}
    />
  );
};

export default FallbackPage;
