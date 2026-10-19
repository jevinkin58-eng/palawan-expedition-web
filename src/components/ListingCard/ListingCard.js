// ⚠️ If you modify the styling of this component and you're using the SectionListings component in your marketplace (featured listings)
// please reflect those changes in the calculateCarouselHeight function in SectionListing.js to avoid layout issues
import React from 'react';
import classNames from 'classnames';

import { useConfiguration } from '../../context/configurationContext';

import { useIntl } from '../../util/reactIntl';
import { requireListingImage } from '../../util/configHelpers';
import { lazyLoadWithDimensions } from '../../util/uiHelpers';
import { createSlug } from '../../util/urlHelpers';

import {
  AspectRatioWrapper,
  NamedLink,
  ResponsiveImage,
  ListingCardThumbnail,
} from '../../components';

import { getListingCardTranslations } from './ListingCard.helpers';

import css from './ListingCard.module.css';

const LazyImage = lazyLoadWithDimensions(ResponsiveImage, { loadAfterInitialRendering: 3000 });

/**
 * Format YYYYMMDD number to readable date string
 */
const formatDepartureDate = (departureDateNum) => {
  if (!departureDateNum) return null;
  const str = String(departureDateNum);
  if (str.length !== 8) return null;
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);
  const date = new Date(`${year}-${month}-${day}`);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Format duration value to readable string
 */
const formatDuration = (duration) => {
  if (!duration) return null;
  if (typeof duration === 'number') {
    if (duration === 1) return '1 Day';
    return `${duration} Days`;
  }
  const durationMap = {
    'day-tour': 'Day Tour',
    'day_tour': 'Day Tour',
    '2-5-days': '2-5 Days',
    '2_5_days': '2-5 Days',
    '6-plus-days': '6+ Days',
    '6_plus_days': '6+ Days',
  };
  return durationMap[duration] || duration;
};

/**
 * ListingCardImage
 */
const ListingCardImage = props => {
  const {
    listing,
    setActivePropsMaybe,
    title,
    renderSizes,
    aspectWidth,
    aspectHeight,
    variantPrefix,
    aspectRatioClassName,
    lazyLoadImage,
  } = props;

  const firstImage = listing?.images?.[0] || null;
  const variants = firstImage
    ? Object.keys(firstImage?.attributes?.variants).filter(k => k.startsWith(variantPrefix))
    : [];

  const aspectRatioClass = aspectRatioClassName || css.aspectRatioWrapper;
  const ImageComponent = lazyLoadImage ? LazyImage : ResponsiveImage;

  return (
    <AspectRatioWrapper
      className={aspectRatioClass}
      width={aspectWidth}
      height={aspectHeight}
      {...setActivePropsMaybe}
    >
      <ImageComponent
        rootClassName={css.rootForImage}
        alt={title}
        image={firstImage}
        variants={variants}
        sizes={renderSizes}
      />
    </AspectRatioWrapper>
  );
};

/**
 * ListingCard — Enhanced for Palawan Expedition tours
 *
 * Shows departure date badge, duration, experience type, comfort level,
 * route (from → to), max tribe size, privacy type, accommodation,
 * seats left, rating, and company info.
 *
 * @component
 */
export const ListingCard = props => {
  const config = useConfiguration();
  const intl = props.intl || useIntl();

  const {
    className,
    rootClassName,
    aspectRatioClassName,
    darkMode,
    listing,
    renderSizes,
    setActiveListing,
    showAuthorInfo = true,
    lazyLoadImage = true,
  } = props;

  const translations = getListingCardTranslations(listing, config, intl);
  const {
    titlePlain,
    titleFormatted,
    cardAriaLabel,
    showPrice,
    priceTooltip,
    priceMessage,
    authorName,
  } = translations;

  const classes = classNames(rootClassName || css.root, className);

  const id = listing?.id?.uuid;
  const { title = '', publicData } = listing?.attributes || {};
  const slug = createSlug(title);

  const { listingType, cardStyle } = publicData || {};
  const validListingTypes = config.listing.listingTypes || [];
  const foundListingTypeConfig = validListingTypes.find(conf => conf.listingType === listingType);
  const showListingImage = requireListingImage(foundListingTypeConfig);

  const {
    aspectWidth = 1,
    aspectHeight = 1,
    variantPrefix = 'listing-card',
  } = config.layout.listingImage;

  const setActivePropsMaybe = setActiveListing
    ? {
        onMouseEnter: () => setActiveListing(listing?.id),
        onMouseLeave: () => setActiveListing(null),
      }
    : null;

  // Tour-specific publicData fields
  const departureDate = publicData?.departure_date;
  const duration = publicData?.duration;
  const experienceType = publicData?.experience_type;
  const comfortLevel = publicData?.comfort_level;
  const locationDeparture = publicData?.location_departure;
  const locationArrival = publicData?.location_arrival;
  const maxTribe = publicData?.max_tribe;
  const privacyType = publicData?.privacy_type;
  const accommodation = publicData?.accommodation;
  const seatsLeft = publicData?.seats_left;
  const rating = publicData?.rating;
  const companyName = publicData?.company_name;

  const formattedDate = formatDepartureDate(departureDate);
  const formattedDuration = formatDuration(duration);
  const isLowSeats = seatsLeft != null && seatsLeft <= 3;

  return (
    <NamedLink
      className={classes}
      name="ListingPage"
      params={{ id, slug }}
      ariaLabel={cardAriaLabel}
    >
      <div className={css.imageWrapper}>
        {formattedDate && (
          <span className={css.departureBadge}>
            {formattedDate}
          </span>
        )}
        {seatsLeft != null && (
          <span className={classNames(css.seatsLeft, { [css.seatsLow]: isLowSeats })}>
            {seatsLeft} {seatsLeft === 1 ? 'seat' : 'seats'} left
          </span>
        )}
        {showListingImage ? (
          <ListingCardImage
            renderSizes={renderSizes}
            title={titlePlain}
            listing={listing}
            setActivePropsMaybe={setActivePropsMaybe}
            aspectWidth={aspectWidth}
            aspectHeight={aspectHeight}
            variantPrefix={variantPrefix}
            aspectRatioClassName={aspectRatioClassName}
            lazyLoadImage={lazyLoadImage}
          />
        ) : (
          <ListingCardThumbnail
            style={cardStyle}
            listingTitle={title}
            className={aspectRatioClassName}
            width={aspectWidth}
            height={aspectHeight}
            setActivePropsMaybe={setActivePropsMaybe}
          />
        )}
      </div>

      <div className={css.info}>
        <div className={css.mainInfo}>
          {showListingImage && (
            <div className={classNames(css.title, { [css.lightText]: darkMode })}>
              {titleFormatted}
            </div>
          )}
          {showPrice ? (
            <div className={css.price} title={priceTooltip}>
              {priceMessage}
            </div>
          ) : null}
        </div>

        {/* Tour meta info */}
        <div className={css.tourMeta}>
          {formattedDuration && (
            <span className={css.metaItem}>
              <span className={css.metaLabel}>{formattedDuration}</span>
            </span>
          )}
          {experienceType && (
            <span className={css.metaItem}>
              <span className={css.metaLabel}>{experienceType}</span>
            </span>
          )}
          {comfortLevel && (
            <span className={css.metaItem}>{comfortLevel}</span>
          )}
          {maxTribe && (
            <span className={css.metaItem}>Max {maxTribe}</span>
          )}
          {accommodation && (
            <span className={css.metaItem}>{accommodation}</span>
          )}
        </div>

        {/* Route info: From → To */}
        {(locationDeparture || locationArrival) && (
          <div className={css.routeInfo}>
            {locationDeparture && <span>{locationDeparture}</span>}
            {locationDeparture && locationArrival && <span className={css.routeArrow}>→</span>}
            {locationArrival && <span>{locationArrival}</span>}
          </div>
        )}

        {/* Privacy badge */}
        {privacyType && (
          <span className={classNames(css.privacyBadge, {
            [css.privacyPrivate]: privacyType === 'private' || privacyType === 'private_tribe',
            [css.privacyJoiners]: privacyType === 'joiners' || privacyType === 'triber_joiners',
          })}>
            {privacyType === 'private' || privacyType === 'private_tribe' ? 'Private Tribe' : 'Triber Joiners'}
          </span>
        )}

        {/* Footer: rating + company */}
        {(rating || companyName || showAuthorInfo) && (
          <div className={css.cardFooter}>
            {rating ? (
              <div className={css.ratingWrapper}>
                <span className={css.ratingStar}>★</span>
                <span className={css.ratingValue}>{Number(rating).toFixed(1)}</span>
              </div>
            ) : <div />}
            {companyName ? (
              <div className={css.companyInfo}>
                <span className={css.companyName}>{companyName}</span>
              </div>
            ) : showAuthorInfo ? (
              <div className={classNames(css.authorInfo, { [css.lightText]: darkMode })}>
                {authorName}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </NamedLink>
  );
};

export default ListingCard;
