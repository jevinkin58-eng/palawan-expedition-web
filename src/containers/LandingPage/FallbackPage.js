import React from 'react';
import loadable from '@loadable/component';

import { NamedLink } from '../../components/index.js';

import css from './FallbackPage.module.css';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// ─── SVG Icons for "How It Works" ─────────────────────────────────

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

// ─── Wave SVG for hero bottom ─────────────────────────────────────

const WaveSvg = () => (
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,72 L1440,120 L0,120 Z"
      fill="#ffffff"
    />
  </svg>
);

// ─── Hero Section ─────────────────────────────────────────────────

const SectionHeroCustom = () => (
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
      <NamedLink name="SearchPage" className={css.heroCta}>
        Explore Expeditions
      </NamedLink>
    </div>

    <div className={css.heroWave}>
      <WaveSvg />
    </div>
  </section>
);

// ─── How It Works ─────────────────────────────────────────────────

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

// ─── Categories ───────────────────────────────────────────────────

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

// ─── Featured Expeditions (static highlight cards) ───────────────

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
            <span>•</span>
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
            <span>•</span>
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
            <span>•</span>
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

// ─── About / Stats ────────────────────────────────────────────────

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

// ─── CTA Banner ───────────────────────────────────────────────────

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

// ─── Fallback page assembly ───────────────────────────────────────

// These sections render as custom React components (not PageBuilder sections),
// so we register them via the sectionComponents option.
const customSectionComponents = {
  customHero: { component: SectionHeroCustom },
  customHowItWorks: { component: SectionHowItWorks },
  customCategories: { component: SectionCategories },
  customFeatured: { component: SectionFeatured },
  customAbout: { component: SectionAbout },
  customCtaBanner: { component: SectionCtaBanner },
};

export const fallbackSections = () => ({
  sections: [
    { sectionType: 'customHero', sectionId: 'hero' },
    { sectionType: 'customHowItWorks', sectionId: 'how-it-works' },
    { sectionType: 'customCategories', sectionId: 'categories' },
    { sectionType: 'customFeatured', sectionId: 'featured' },
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
