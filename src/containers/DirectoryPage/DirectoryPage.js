import React, { useEffect } from 'react';
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

/**
 * DirectoryPage — a reusable directory page for Companies, Camps, and Boats.
 *
 * @param {Object} props
 * @param {string} props.directoryType - 'companies' | 'camps' | 'boats'
 * @param {string} props.title - Page heading
 * @param {string} props.subtitle - Page subtitle
 * @param {string} props.icon - Emoji icon for the hero
 * @param {string} props.heroGradient - CSS gradient string
 * @param {Object} props.queryParams - Extra query params for Sharetribe listings API
 * @param {string} props.metaTitle - SEO title
 * @param {string} props.metaDescription - SEO description
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

  const {
    listingRefs,
    queryInProgress,
    queryError,
    totalItems,
  } = useSelector(state => state.DirectoryPage);
  const scrollingDisabled = useSelector(state => isScrollingDisabled(state));

  const listings = useSelector(state => {
    const refs = state.DirectoryPage.listingRefs || [];
    return getListingsById(state, refs.map(r => r.id));
  });

  useEffect(() => {
    dispatch(queryDirectoryListings({ queryParams, config }));
  }, [directoryType]);

  const schemaTitle = metaTitle || `${title} — PalawanExpedition`;
  const schemaDescription =
    metaDescription || `Browse ${directoryType} on PalawanExpedition`;

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

        {/* Results */}
        <section className={css.resultsSection}>
          <div className={css.resultsHeader}>
            <p className={css.resultsCount}>
              {queryInProgress
                ? 'Loading...'
                : `${totalItems} ${totalItems === 1 ? 'result' : 'results'} found`}
            </p>
          </div>

          {queryError ? (
            <p className={css.error}>
              Something went wrong. Please try again later.
            </p>
          ) : null}

          {!queryInProgress && listings.length === 0 && !queryError ? (
            <div className={css.emptyState}>
              <p className={css.emptyTitle}>{emptyMessage || 'No listings yet'}</p>
              <p className={css.emptySubtitle}>
                {emptySubMessage || 'Check back soon — new listings are added regularly.'}
              </p>
              <NamedLink name="SearchPage" className={css.exploreCta}>
                Explore All Expeditions
              </NamedLink>
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
