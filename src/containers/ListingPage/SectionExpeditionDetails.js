import React from 'react';
import css from './SectionExpeditionDetails.module.css';

/**
 * Format a YYYYMMDD date string (e.g. "20261220") to a readable format.
 */
const formatDate = dateStr => {
  if (!dateStr) return null;
  try {
    const s = String(dateStr);
    if (/^\d{8}$/.test(s)) {
      const year = s.substring(0, 4);
      const month = s.substring(4, 6);
      const day = s.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}T00:00:00`);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/**
 * Format duration — strips trailing "days" since we add our own suffix.
 */
const formatDuration = val => {
  if (!val) return null;
  const s = String(val).replace(/-/g, ' ').replace(/\s*days?\s*$/i, '').trim();
  return s ? `${s} Days` : null;
};

/**
 * Prettify a snake_case or kebab-case enum key into a readable label.
 */
const prettifyEnum = val => {
  if (!val) return val;
  return String(val)
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

/**
 * Render a multi-enum or array field as styled tag pills.
 */
const TagSection = ({ icon, title, values }) => {
  if (!values || (Array.isArray(values) && values.length === 0)) return null;
  const items = Array.isArray(values) ? values : [values];
  if (items.length === 0) return null;

  return (
    <div className={css.tagSection}>
      <h3 className={css.tagSectionTitle}>
        {icon && <span className={css.tagSectionIcon}>{icon}</span>}
        {title}
      </h3>
      <div className={css.tagsGrid}>
        {items.map((item, idx) => (
          <span key={idx} className={css.tag}>
            {prettifyEnum(item)}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * A single info card with icon + label + value.
 */
const InfoCard = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <div className={css.infoCard}>
      <span className={css.infoIcon}>{icon}</span>
      <div className={css.infoContent}>
        <span className={css.infoLabel}>{label}</span>
        <span className={css.infoValue}>{value}</span>
      </div>
    </div>
  );
};

/**
 * A contact/link row.
 */
const ContactRow = ({ icon, label, value, href }) => {
  if (!value) return null;
  return (
    <div className={css.contactRow}>
      <span className={css.contactIcon}>{icon}</span>
      <div className={css.contactContent}>
        <span className={css.contactLabel}>{label}</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={css.contactLink}>
            {value}
          </a>
        ) : (
          <span className={css.contactValue}>{value}</span>
        )}
      </div>
    </div>
  );
};

/**
 * SectionExpeditionDetails — renders expedition-specific publicData
 * fields in a visually appealing layout for Trip, Company, Camp, Boat,
 * and Destinations listing types.
 */
const SectionExpeditionDetails = props => {
  const { publicData, listingType } = props;

  if (!publicData) return null;

  const {
    // Trip fields
    departure_date,
    duration,
    expedition_type,
    group_size,
    difficulty,
    highlights,
    whats_included,
    whats_not_included,
    itinerary,
    meeting_point,
    buyout_price,
    access,
    trip_duration_type,
    duration_in_days,
    time_departure,
    arrival_location,
    arrival_time,
    party_level,
    seats_left,
    rating,
    comfort_level,
    // Trip multi-enum fields
    trip_type,
    trip_activities,
    food_option,
    vibes,
    crowd_expected,
    boat_type: tripBoatType,
    sleeping_location,
    sleeping_style,
    retreats,
    water_toys,
    max_tribe_size,

    // Company fields
    year_established,
    yearEstablished,
    short_description,
    shortDescription,
    fleet_size,
    fleetSize,
    locations,
    reservation_phone_number,
    reservationPhoneNumber,
    reservation_email,
    reservationEmail,
    accounting_email,
    accountingEmail,
    manager_name,
    managerName,
    manager_whatsapp,
    managerWhatsApp,
    manager_email_address,
    managerEmailAddress,
    company_website,
    companyWebsite,
    instagram,
    video,
    google_rating_link,
    googleRatingLink,
    camps,

    // Camp fields
    amenities,
    capacity,
    check_in,
    check_out,

    // Boat fields
    boat_type,
    boatType,
    boat_capacity,
    boatCapacity,
    crew_size,
    crewSize,
  } = publicData;

  // Normalize camelCase and snake_case field names
  const yearEst = year_established || yearEstablished;
  const shortDesc = short_description || shortDescription;
  const fleetSz = fleet_size || fleetSize;
  const resPhone = reservation_phone_number || reservationPhoneNumber;
  const resEmail = reservation_email || reservationEmail;
  const acctEmail = accounting_email || accountingEmail;
  const mgrName = manager_name || managerName;
  const mgrWhatsApp = manager_whatsapp || managerWhatsApp;
  const mgrEmail = manager_email_address || managerEmailAddress;
  const website = company_website || companyWebsite;
  const googleRating = google_rating_link || googleRatingLink;
  const bType = boat_type || boatType;
  const bCapacity = boat_capacity || boatCapacity;
  const cSize = crew_size || crewSize;

  // === TRIP LISTING TYPE ===
  if (listingType === 'trip' || listingType === 'Trip') {
    const hasQuickInfo =
      departure_date || duration || expedition_type || group_size || difficulty;
    const hasExtraInfo =
      buyout_price || access || trip_duration_type || time_departure ||
      arrival_location || arrival_time || party_level || seats_left ||
      rating || comfort_level || max_tribe_size;
    const hasInclusions = whats_included || whats_not_included;
    const hasMultiEnums =
      trip_type || trip_activities || food_option || vibes ||
      crowd_expected || tripBoatType || sleeping_location || sleeping_style ||
      retreats || water_toys;

    if (!hasQuickInfo && !hasExtraInfo && !hasInclusions && !itinerary && !highlights && !meeting_point && !hasMultiEnums) {
      return null;
    }

    return (
      <div className={css.root}>
        {/* Quick Info Grid */}
        {(hasQuickInfo || hasExtraInfo) && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Trip Details</h2>
            <div className={css.infoGrid}>
              <InfoCard icon="📅" label="Departure Date" value={formatDate(departure_date)} />
              <InfoCard icon="⏱️" label="Duration" value={formatDuration(duration || duration_in_days)} />
              <InfoCard icon="🧭" label="Expedition Type" value={prettifyEnum(expedition_type)} />
              <InfoCard
                icon="👥"
                label="Group Size"
                value={group_size ? `Up to ${group_size} people` : null}
              />
              <InfoCard icon="⛰️" label="Difficulty" value={prettifyEnum(difficulty)} />
              <InfoCard icon="📍" label="Meeting Point" value={meeting_point} />
              <InfoCard icon="🕐" label="Departure Time" value={time_departure} />
              <InfoCard icon="📍" label="Arrival Location" value={arrival_location} />
              <InfoCard icon="🕐" label="Arrival Time" value={arrival_time} />
              <InfoCard icon="💰" label="Buyout Price" value={buyout_price ? `$${buyout_price}` : null} />
              <InfoCard icon="🔑" label="Access" value={prettifyEnum(access)} />
              <InfoCard icon="🎉" label="Party Level" value={prettifyEnum(party_level)} />
              <InfoCard icon="💺" label="Seats Left" value={seats_left} />
              <InfoCard icon="⭐" label="Rating" value={rating} />
              <InfoCard icon="🛏️" label="Comfort Level" value={prettifyEnum(comfort_level)} />
              <InfoCard icon="👥" label="Max Tribe Size" value={max_tribe_size} />
            </div>
          </div>
        )}

        {/* Multi-enum tag sections */}
        {hasMultiEnums && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Features & Activities</h2>
            <div className={css.tagSectionsGrid}>
              <TagSection icon="🏷️" title="Trip Type" values={trip_type} />
              <TagSection icon="🏄" title="Activities" values={trip_activities} />
              <TagSection icon="🍽️" title="Food Options" values={food_option} />
              <TagSection icon="✨" title="Vibes" values={vibes} />
              <TagSection icon="👥" title="Crowd Expected" values={crowd_expected} />
              <TagSection icon="⛵" title="Boat Type" values={tripBoatType} />
              <TagSection icon="🏠" title="Sleeping Location" values={sleeping_location} />
              <TagSection icon="🛏️" title="Sleeping Style" values={sleeping_style} />
              <TagSection icon="🧘" title="Retreats" values={retreats} />
              <TagSection icon="🏄‍♂️" title="Water Toys" values={water_toys} />
            </div>
          </div>
        )}

        {/* Highlights */}
        {highlights && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Highlights</h2>
            <div className={css.highlightsList}>
              {(Array.isArray(highlights) ? highlights : highlights.split('\n')).map(
                (item, idx) =>
                  item.trim() && (
                    <div key={idx} className={css.highlightItem}>
                      <span className={css.checkIcon}>✓</span>
                      <span>{item.trim()}</span>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* What's Included / Not Included */}
        {hasInclusions && (
          <div className={css.section}>
            <div className={css.inclusionsGrid}>
              {whats_included && (
                <div className={css.inclusionBox}>
                  <h3 className={css.inclusionTitle}>
                    <span className={css.includedIcon}>✓</span> What&apos;s Included
                  </h3>
                  <ul className={css.inclusionList}>
                    {(Array.isArray(whats_included)
                      ? whats_included
                      : whats_included.split('\n')
                    ).map(
                      (item, idx) =>
                        item.trim() && (
                          <li key={idx} className={css.includedItem}>
                            {item.trim()}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
              {whats_not_included && (
                <div className={css.exclusionBox}>
                  <h3 className={css.exclusionTitle}>
                    <span className={css.excludedIcon}>✕</span> Not Included
                  </h3>
                  <ul className={css.inclusionList}>
                    {(Array.isArray(whats_not_included)
                      ? whats_not_included
                      : whats_not_included.split('\n')
                    ).map(
                      (item, idx) =>
                        item.trim() && (
                          <li key={idx} className={css.excludedItem}>
                            {item.trim()}
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Itinerary */}
        {itinerary && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Itinerary</h2>
            <div className={css.itinerary}>
              {(Array.isArray(itinerary) ? itinerary : itinerary.split('\n')).map(
                (item, idx) =>
                  item.trim() && (
                    <div key={idx} className={css.itineraryDay}>
                      <div className={css.timelineDot} />
                      <div className={css.itineraryContent}>{item.trim()}</div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // === COMPANY LISTING TYPE ===
  if (listingType === 'company' || listingType === 'Company') {
    const hasInfo = yearEst || shortDesc || fleetSz || locations || capacity || rating || camps;
    const hasContact = resPhone || resEmail || mgrName || mgrWhatsApp || mgrEmail || website || instagram;

    if (!hasInfo && !hasContact) return null;

    const locationStr = Array.isArray(locations) ? locations.join(', ') : locations;

    return (
      <div className={css.root}>
        {shortDesc && (
          <div className={css.shortDescription}>{shortDesc}</div>
        )}

        {hasInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Company Info</h2>
            <div className={css.infoGrid}>
              <InfoCard icon="📅" label="Established" value={yearEst} />
              <InfoCard icon="🚢" label="Fleet Size" value={fleetSz ? `${fleetSz} vessels` : null} />
              <InfoCard icon="📍" label="Locations" value={locationStr} />
              <InfoCard icon="👥" label="Capacity" value={capacity} />
              <InfoCard icon="⭐" label="Rating" value={rating} />
            </div>
          </div>
        )}

        {camps && (
          <TagSection icon="🏕️" title="Camps" values={camps} />
        )}

        {hasContact && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Contact & Links</h2>
            <div className={css.contactGrid}>
              <ContactRow icon="📞" label="Reservations" value={resPhone} href={`tel:${resPhone}`} />
              <ContactRow icon="✉️" label="Email" value={resEmail} href={`mailto:${resEmail}`} />
              <ContactRow icon="💼" label="Accounting" value={acctEmail} href={`mailto:${acctEmail}`} />
              <ContactRow icon="👤" label="Manager" value={mgrName} />
              <ContactRow
                icon="💬"
                label="WhatsApp"
                value={mgrWhatsApp}
                href={mgrWhatsApp ? `https://wa.me/${mgrWhatsApp.replace(/[^0-9]/g, '')}` : null}
              />
              <ContactRow icon="✉️" label="Manager Email" value={mgrEmail} href={`mailto:${mgrEmail}`} />
              <ContactRow
                icon="🌐"
                label="Website"
                value={website}
                href={website?.startsWith('http') ? website : `https://${website}`}
              />
              <ContactRow
                icon="📸"
                label="Instagram"
                value={instagram}
                href={
                  instagram
                    ? instagram.startsWith('http')
                      ? instagram
                      : `https://instagram.com/${instagram.replace('@', '')}`
                    : null
                }
              />
              <ContactRow icon="⭐" label="Google Rating" value={googleRating ? 'View Reviews' : null} href={googleRating} />
            </div>
          </div>
        )}

        {video && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Video</h2>
            <div className={css.videoWrapper}>
              <iframe
                className={css.videoIframe}
                src={video.replace('watch?v=', 'embed/')}
                title="Company Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // === CAMP LISTING TYPE ===
  if (listingType === 'camp' || listingType === 'Camp') {
    const hasInfo = capacity || check_in || check_out || amenities;
    if (!hasInfo) return null;

    return (
      <div className={css.root}>
        <div className={css.section}>
          <h2 className={css.sectionTitle}>Camp Details</h2>
          <div className={css.infoGrid}>
            <InfoCard icon="👥" label="Capacity" value={capacity ? `${capacity} guests` : null} />
            <InfoCard icon="🕐" label="Check-in" value={check_in} />
            <InfoCard icon="🕐" label="Check-out" value={check_out} />
          </div>
        </div>

        {amenities && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Amenities</h2>
            <div className={css.tagsGrid}>
              {(Array.isArray(amenities) ? amenities : [amenities]).map((item, idx) => (
                <span key={idx} className={css.tag}>
                  {prettifyEnum(item)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // === BOAT LISTING TYPE ===
  if (listingType === 'boat' || listingType === 'Boat') {
    const hasInfo = bType || bCapacity || cSize || fleetSz;
    if (!hasInfo) return null;

    return (
      <div className={css.root}>
        <div className={css.section}>
          <h2 className={css.sectionTitle}>Boat Specifications</h2>
          <div className={css.infoGrid}>
            <InfoCard icon="⛵" label="Boat Type" value={prettifyEnum(bType)} />
            <InfoCard icon="👥" label="Capacity" value={bCapacity ? `${bCapacity} passengers` : null} />
            <InfoCard icon="👨‍✈️" label="Crew Size" value={cSize} />
          </div>
        </div>
      </div>
    );
  }

  // === DESTINATIONS LISTING TYPE ===
  if (listingType === 'destinations' || listingType === 'Destinations') {
    if (!highlights) return null;

    return (
      <div className={css.root}>
        <div className={css.section}>
          <h2 className={css.sectionTitle}>Highlights</h2>
          <div className={css.highlightsList}>
            {(Array.isArray(highlights) ? highlights : highlights.split('\n')).map(
              (item, idx) =>
                item.trim() && (
                  <div key={idx} className={css.highlightItem}>
                    <span className={css.checkIcon}>✓</span>
                    <span>{item.trim()}</span>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SectionExpeditionDetails;
