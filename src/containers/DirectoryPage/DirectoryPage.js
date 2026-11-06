import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useConfiguration } from '../../context/configurationContext';
import { useRouteConfiguration } from '../../context/routeConfigurationContext';
import { isScrollingDisabled } from '../../ducks/ui.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';

import {
  Page,
  LayoutSingleColumn,
  NamedLink,
  ListingCard,
} from '../../components';

import TopbarContainer from '../TopbarContainer/TopbarContainer';
import FooterContainer from '../FooterContainer/FooterContainer';
import { queryDirectoryListings } from './DirectoryPage.duck';

import css from './DirectoryPage.module.css';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/**
 * DirectoryPage — a reusable directory page for Companies, Camps, Boats, and Destinations.
 */
const DirectoryPage = props => {
  const {
    directoryType,
    title,
    subtitle,
    icon,
    heroGradient,
    queryParams = {},
    metaTitle,
    metaDescription,
    emptyMessage,
    emptySubMessage,
  } = props;

  const config = useConfiguration();
  const routeConfiguration = useRouteConfiguration();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const {
    listingRefs,
    queryInProgress,
    queryError,
    totalItems,
  } = useSelector(state => state.DirectoryPage);
  const scrollingDisabled = useSelector(state => isScrollingDisabled(state));

  const allListings = useSelector(state => {
    const refs = state.DirectoryPage.listingRefs || [];
    return getListingsById(state, refs.map(r => r.id));
  });

  // Client-side search filter
  const listings = useMemo(() => {
    if (!searchTerm.trim()) return allListings;
    const term = searchTerm.toLowerCase();
    return allListings.filter(l => {
      const lTitle = (l.attributes?.title || '').toLowerCase();
      const lDesc = (l.attributes?.description || '').toLowerCase();
      return lTitle.includes(term) || lDesc.includes(term);
    });
  }, [allListings, searchTerm]);

  useEffect(() => {
    dispatch(queryDirectoryListings({ queryParams, config }));
  }, [directoryType]);

  const schemaTitle = metaTitle || `${title} — PalawanExpedition`;
  const schemaDescription =
    metaDescription || `Browse ${directoryType} on PalawanExpedition`;

  const displayCount = listings.length;

  return (
    <Page
      title={schemaTitle}
      description={schemaDescription}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn
        topbar={<TopbarContainer />}
        footer={<FooterContainer />}
      >
        {/* Hero */}
        <section
          className={css.hero}
          style={{ background: heroGradient }}
        >
          <div className={css.heroContent}>
            <span className={css.heroIcon}>{icon}</span>
            <h1 className={css.heroTitle}>{title}</h1>
            <p className={css.heroSubtitle}>{subtitle}</p>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className={css.searchBarSection}>
          <div className={css.searchBarInner}>
            <div className={css.searchInputWrapper}>
              <span className={css.searchInputIcon}><SearchIcon /></span>
              <input
                type="text"
                className={css.searchInput}
                placeholder={`Search ${directoryType}...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className={css.searchClear}
                  onClick={() => setSearchTerm('')}
                  type="button"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <div className={css.searchMeta}>
              <span className={css.resultsCount}>
                {queryInProgress
                  ? 'Loading...'
                  : searchTerm
                    ? `${displayCount} of ${totalItems} results`
                    : `${totalItems} ${totalItems === 1 ? 'listing' : 'listings'}`}
              </span>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className={css.resultsSection}>
          {queryError ? (
            <p className={css.error}>
              Something went wrong. Please try again later.
            </p>
          ) : null}

          {!queryInProgress && listings.length === 0 && !queryError ? (
            <div className={css.emptyState}>
              <div className={css.emptyIcon}>🔍</div>
              <p className={css.emptyTitle}>
                {searchTerm
                  ? `No ${directoryType} match "${searchTerm}"`
                  : emptyMessage || 'No listings yet'}
              </p>
              <p className={css.emptySubtitle}>
                {searchTerm
                  ? 'Try a different search term or clear the filter.'
                  : emptySubMessage || 'Check back soon — new listings are added regularly.'}
              </p>
              {searchTerm ? (
                <button
                  className={css.exploreCta}
                  onClick={() => setSearchTerm('')}
                  type="button"
                >
                  Clear Search
                </button>
              ) : (
                <NamedLink name="SearchPage" className={css.exploreCta}>
                  Explore All Expeditions
                </NamedLink>
              )}
            </div>
          ) : null}

          <div className={css.listingsGrid}>
            {listings.map(l => (
              <ListingCard
                key={l.id.uuid}
                listing={l}
                renderSizes="(max-width: 549px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                config={config}
              />
            ))}
          </div>
        </section>
      </LayoutSingleColumn>
    </Page>
  );
};

export default DirectoryPage;
