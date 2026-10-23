import React from 'react';
import css from './SectionExpeditionDetails.module.css';

/**
 * Format a date string to a readable format.
 */
const formatDate = dateStr => {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
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
    const hasQuickInfo = departure_date || duration || expedition_type || group_size || difficulty;
    const hasInclusions = whats_included || whats_not_included;

    if (!hasQuickInfo && !hasInclusions && !itinerary && !highlights && !meeting_point) {
      return null;
    }

    return (
      <div className={css.root}>
        {/* Quick Info Grid */}
        {hasQuickInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Trip Details</h2>
            <div className={css.infoGrid}>
              <InfoCard icon="📅" label="Departure Date" value={formatDate(departure_date)} />
              <InfoCard icon="⏱️" label="Duration" value={duration ? `${duration} days` : null} />
              <InfoCard icon="🧭" label="Expedition Type" value={expedition_type} />
              <InfoCard
                icon="👥"
                label="Group Size"
                value={group_size ? `Up to ${group_size} people` : null}
              />
              <InfoCard icon="⛰️" label="Difficulty" value={difficulty} />
              <InfoCard icon="📍" label="Meeting Point" value={meeting_point} />
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
    const hasInfo = yearEst || shortDesc || fleetSz || locations;
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
            </div>
          </div>
        )}

        {hasContact && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Contact & Links</h2>
            <div className={css.contactGrid}>
              <ContactRow icon="📞" label="Reservations" value={resPhone} href={`tel:${resPhone}`} />
              <ContactRow icon="✉️" label="Email" value={resEmail} href={`mailto:${resEmail}`} />
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
            <div className={css.amenitiesGrid}>
              {(Array.isArray(amenities) ? amenities : [amenities]).map((item, idx) => (
                <div key={idx} className={css.amenityTag}>
                  {item}
                </div>
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
            <InfoCard icon="⛵" label="Boat Type" value={bType} />
            <InfoCard icon="👥" label="Capacity" value={bCapacity ? `${bCapacity} passengers` : null} />
            <InfoCard icon="👨‍✈️" label="Crew Size" value={cSize} />
          </div>
        </div>
      </div>
    );
  }

  // === DESTINATIONS LISTING TYPE ===
  if (listingType === 'destinations' || listingType === 'Destinations') {
    const hasHighlights = highlights;
    if (!hasHighlights) return null;

    return (
      <div className={css.root}>
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
      </div>
    );
  }

  // Default: don't render anything for unknown types
  return null;
};

export default SectionExpeditionDetails;
