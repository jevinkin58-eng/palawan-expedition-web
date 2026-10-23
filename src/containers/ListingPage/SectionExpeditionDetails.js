import React from 'react';
import css from './SectionExpeditionDetails.module.css';

// Keys to skip — these are internal Sharetribe fields or handled elsewhere
const SKIP_KEYS = new Set([
  'listingType', 'transactionProcessAlias', 'unitType',
  'location', 'geolocation', 'rules', 'publicData',
]);

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
 * Prettify a snake_case or kebab-case key into a readable label.
 */
const prettifyKey = key => {
  if (!key) return key;
  return String(key)
    // Insert space before uppercase letters (camelCase split)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

/**
 * Prettify an enum value for display.
 */
const prettifyEnum = val => {
  if (val == null) return null;
  return String(val)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
};

/**
 * Check if a value looks like a YYYYMMDD date.
 */
const isDateValue = (key, val) => {
  if (typeof val !== 'string' && typeof val !== 'number') return false;
  const s = String(val);
  return /^\d{8}$/.test(s) && (key.toLowerCase().includes('date') || parseInt(s.substring(0,4)) > 2000);
};

/**
 * Check if a key is a duration-related field.
 */
const isDurationKey = key => {
  const k = key.toLowerCase();
  return k.includes('duration');
};

/**
 * Render a multi-enum or array field as styled tag pills.
 */
const TagSection = ({ title, values }) => {
  if (!values || (Array.isArray(values) && values.length === 0)) return null;
  const items = Array.isArray(values) ? values : [values];
  if (items.length === 0) return null;

  return (
    <div className={css.tagSection}>
      <h3 className={css.tagSectionTitle}>{title}</h3>
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
 * A single info card with label + value.
 */
const InfoCard = ({ label, value }) => {
  if (!value && value !== 0) return null;
  return (
    <div className={css.infoCard}>
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
 * Format a single value for display based on its key and type.
 */
const formatValue = (key, val) => {
  if (val == null || val === '') return null;
  if (isDateValue(key, val)) return formatDate(val);
  if (isDurationKey(key)) return formatDuration(val);
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'number') return String(val);
  return prettifyEnum(val);
};

/**
 * Dynamically render all publicData fields.
 * - Arrays render as tag pill sections
 * - Single values render as info cards
 * - Grouped under "Details" and "Features & Activities"
 */
const DynamicFields = ({ publicData, handledKeys }) => {
  const singleFields = [];
  const arrayFields = [];

  Object.entries(publicData).forEach(([key, val]) => {
    if (SKIP_KEYS.has(key) || handledKeys.has(key)) return;
    if (val == null || val === '') return;
    // Skip objects that aren't arrays
    if (typeof val === 'object' && !Array.isArray(val)) return;

    if (Array.isArray(val)) {
      arrayFields.push({ key, values: val });
    } else {
      const formatted = formatValue(key, val);
      if (formatted) {
        singleFields.push({ key, label: prettifyKey(key), value: formatted });
      }
    }
  });

  const hasSingle = singleFields.length > 0;
  const hasArray = arrayFields.length > 0;

  if (!hasSingle && !hasArray) return null;

  return (
    <>
      {hasSingle && (
        <div className={css.section}>
          <h2 className={css.sectionTitle}>Details</h2>
          <div className={css.infoGrid}>
            {singleFields.map(({ key, label, value }) => (
              <InfoCard key={key} label={label} value={value} />
            ))}
          </div>
        </div>
      )}

      {hasArray && (
        <div className={css.section}>
          <h2 className={css.sectionTitle}>Features & Activities</h2>
          <div className={css.tagSectionsGrid}>
            {arrayFields.map(({ key, values }) => (
              <TagSection key={key} title={prettifyKey(key)} values={values} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/**
 * SectionExpeditionDetails — renders expedition-specific publicData
 * fields in a visually appealing layout for all listing types.
 *
 * Known fields (departure_date, duration, etc.) get special formatting.
 * All remaining fields are auto-rendered as info cards or tag sections.
 */
const SectionExpeditionDetails = props => {
  const { publicData, listingType } = props;

  if (!publicData) return null;

  // Keys that are handled explicitly and should not appear in DynamicFields
  const handledKeys = new Set();

  const val = key => {
    // Try exact key, then common alternatives
    const v = publicData[key];
    if (v != null) { handledKeys.add(key); return v; }
    return null;
  };

  // === TRIP LISTING TYPE ===
  if (listingType === 'trip' || listingType === 'Trip') {
    const departureDate = val('departure_date') || val('departureDate');
    const duration = val('duration') || val('duration_in_days') || val('durationInDays');
    const expeditionType = val('expedition_type') || val('expeditionType');
    const groupSize = val('group_size') || val('groupSize');
    const difficulty = val('difficulty');
    const meetingPoint = val('meeting_point') || val('meetingPoint');
    const highlights = val('highlights');
    const whatsIncluded = val('whats_included') || val('whatsIncluded');
    const whatsNotIncluded = val('whats_not_included') || val('whatsNotIncluded');
    const itinerary = val('itinerary');
    const seatsLeft = val('seats_left') || val('seatsLeft');
    const rating = val('rating');
    const comfortLevel = val('comfort_level') || val('comfortLevel');

    const hasQuickInfo = departureDate || duration || expeditionType || groupSize ||
      difficulty || seatsLeft || rating || comfortLevel;
    const hasInclusions = whatsIncluded || whatsNotIncluded;

    return (
      <div className={css.root}>
        {/* Quick Info Grid */}
        {hasQuickInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Trip Details</h2>
            <div className={css.infoGrid}>
              <InfoCard label="Departure Date" value={formatDate(departureDate)} />
              <InfoCard label="Duration" value={formatDuration(duration)} />
              <InfoCard label="Expedition Type" value={prettifyEnum(expeditionType)} />
              <InfoCard label="Group Size" value={groupSize ? `Up to ${groupSize} people` : null} />
              <InfoCard label="Difficulty" value={prettifyEnum(difficulty)} />
              <InfoCard label="Meeting Point" value={meetingPoint} />
              <InfoCard label="Seats Left" value={seatsLeft} />
              <InfoCard label="Rating" value={rating} />
              <InfoCard label="Comfort Level" value={prettifyEnum(comfortLevel)} />
            </div>
          </div>
        )}

        {/* Auto-render remaining single + array fields */}
        <DynamicFields publicData={publicData} handledKeys={handledKeys} />

        {/* Highlights */}
        {highlights && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Highlights</h2>
            <div className={css.highlightsList}>
              {(Array.isArray(highlights) ? highlights : String(highlights).split('\n')).map(
                (item, idx) => {
                  const text = String(item).trim();
                  return text ? (
                    <div key={idx} className={css.highlightItem}>
                      <span className={css.checkIcon}>✓</span>
                      <span>{text}</span>
                    </div>
                  ) : null;
                }
              )}
            </div>
          </div>
        )}

        {/* What's Included / Not Included */}
        {hasInclusions && (
          <div className={css.section}>
            <div className={css.inclusionsGrid}>
              {whatsIncluded && (
                <div className={css.inclusionBox}>
                  <h3 className={css.inclusionTitle}>
                    <span className={css.includedIcon}>✓</span> What&apos;s Included
                  </h3>
                  <ul className={css.inclusionList}>
                    {(Array.isArray(whatsIncluded)
                      ? whatsIncluded
                      : String(whatsIncluded).split('\n')
                    ).map((item, idx) => {
                      const text = String(item).trim();
                      return text ? (
                        <li key={idx} className={css.includedItem}>{text}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
              {whatsNotIncluded && (
                <div className={css.exclusionBox}>
                  <h3 className={css.exclusionTitle}>
                    <span className={css.excludedIcon}>✕</span> Not Included
                  </h3>
                  <ul className={css.inclusionList}>
                    {(Array.isArray(whatsNotIncluded)
                      ? whatsNotIncluded
                      : String(whatsNotIncluded).split('\n')
                    ).map((item, idx) => {
                      const text = String(item).trim();
                      return text ? (
                        <li key={idx} className={css.excludedItem}>{text}</li>
                      ) : null;
                    })}
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
              {(Array.isArray(itinerary) ? itinerary : String(itinerary).split('\n')).map(
                (item, idx) => {
                  const text = String(item).trim();
                  return text ? (
                    <div key={idx} className={css.itineraryDay}>
                      <div className={css.timelineDot} />
                      <div className={css.itineraryContent}>{text}</div>
                    </div>
                  ) : null;
                }
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // === COMPANY LISTING TYPE ===
  if (listingType === 'company' || listingType === 'Company') {
    const shortDesc = val('short_description') || val('shortDescription');
    const yearEst = val('year_established') || val('yearEstablished');
    const fleetSz = val('fleet_size') || val('fleetSize');
    const resPhone = val('reservation_phone_number') || val('reservationPhoneNumber');
    const resEmail = val('reservation_email') || val('reservationEmail');
    const acctEmail = val('accounting_email') || val('accountingEmail');
    const mgrName = val('manager_name') || val('managerName');
    const mgrWhatsApp = val('manager_whatsapp') || val('managerWhatsApp');
    const mgrEmail = val('manager_email_address') || val('managerEmailAddress');
    const website = val('company_website') || val('companyWebsite');
    const googleRating = val('google_rating_link') || val('googleRatingLink');
    const instagram = val('instagram');
    const video = val('video');
    const locationsList = val('locations');

    const locationStr = Array.isArray(locationsList) ? locationsList.join(', ') : locationsList;
    const hasInfo = yearEst || fleetSz || locationStr;
    const hasContact = resPhone || resEmail || mgrName || mgrWhatsApp || mgrEmail || website || instagram;

    return (
      <div className={css.root}>
        {shortDesc && (
          <div className={css.shortDescription}>{shortDesc}</div>
        )}

        {hasInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Company Info</h2>
            <div className={css.infoGrid}>
              <InfoCard label="Established" value={yearEst} />
              <InfoCard label="Fleet Size" value={fleetSz ? `${fleetSz} vessels` : null} />
              <InfoCard label="Locations" value={locationStr} />
            </div>
          </div>
        )}

        {/* Auto-render remaining fields */}
        <DynamicFields publicData={publicData} handledKeys={handledKeys} />

        {hasContact && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Contact & Links</h2>
            <div className={css.contactGrid}>
              <ContactRow icon="📞" label="Reservations" value={resPhone} href={resPhone ? `tel:${resPhone}` : null} />
              <ContactRow icon="✉️" label="Email" value={resEmail} href={resEmail ? `mailto:${resEmail}` : null} />
              <ContactRow icon="💼" label="Accounting" value={acctEmail} href={acctEmail ? `mailto:${acctEmail}` : null} />
              <ContactRow icon="👤" label="Manager" value={mgrName} />
              <ContactRow
                icon="💬"
                label="WhatsApp"
                value={mgrWhatsApp}
                href={mgrWhatsApp ? `https://wa.me/${String(mgrWhatsApp).replace(/[^0-9]/g, '')}` : null}
              />
              <ContactRow icon="✉️" label="Manager Email" value={mgrEmail} href={mgrEmail ? `mailto:${mgrEmail}` : null} />
              <ContactRow
                icon="🌐"
                label="Website"
                value={website}
                href={website ? (String(website).startsWith('http') ? website : `https://${website}`) : null}
              />
              <ContactRow
                icon="📸"
                label="Instagram"
                value={instagram}
                href={
                  instagram
                    ? String(instagram).startsWith('http')
                      ? instagram
                      : `https://instagram.com/${String(instagram).replace('@', '')}`
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
                src={String(video).replace('watch?v=', 'embed/')}
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
    const capacity = val('capacity');
    const checkIn = val('check_in') || val('checkIn');
    const checkOut = val('check_out') || val('checkOut');

    const hasInfo = capacity || checkIn || checkOut;

    return (
      <div className={css.root}>
        {hasInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Camp Details</h2>
            <div className={css.infoGrid}>
              <InfoCard label="Capacity" value={capacity ? `${capacity} guests` : null} />
              <InfoCard label="Check-in" value={checkIn} />
              <InfoCard label="Check-out" value={checkOut} />
            </div>
          </div>
        )}

        <DynamicFields publicData={publicData} handledKeys={handledKeys} />
      </div>
    );
  }

  // === BOAT LISTING TYPE ===
  if (listingType === 'boat' || listingType === 'Boat') {
    const bType = val('boat_type') || val('boatType');
    const bCapacity = val('boat_capacity') || val('boatCapacity');
    const cSize = val('crew_size') || val('crewSize');

    const hasInfo = bType || bCapacity || cSize;

    return (
      <div className={css.root}>
        {hasInfo && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Boat Specifications</h2>
            <div className={css.infoGrid}>
              <InfoCard label="Boat Type" value={prettifyEnum(bType)} />
              <InfoCard label="Capacity" value={bCapacity ? `${bCapacity} passengers` : null} />
              <InfoCard label="Crew Size" value={cSize} />
            </div>
          </div>
        )}

        <DynamicFields publicData={publicData} handledKeys={handledKeys} />
      </div>
    );
  }

  // === DESTINATIONS LISTING TYPE ===
  if (listingType === 'destinations' || listingType === 'Destinations') {
    const highlights = val('highlights');

    return (
      <div className={css.root}>
        {highlights && (
          <div className={css.section}>
            <h2 className={css.sectionTitle}>Highlights</h2>
            <div className={css.highlightsList}>
              {(Array.isArray(highlights) ? highlights : String(highlights).split('\n')).map(
                (item, idx) => {
                  const text = String(item).trim();
                  return text ? (
                    <div key={idx} className={css.highlightItem}>
                      <span className={css.checkIcon}>✓</span>
                      <span>{text}</span>
                    </div>
                  ) : null;
                }
              )}
            </div>
          </div>
        )}

        <DynamicFields publicData={publicData} handledKeys={handledKeys} />
      </div>
    );
  }

  // For any other listing type, auto-render all fields
  return (
    <div className={css.root}>
      <DynamicFields publicData={publicData} handledKeys={handledKeys} />
    </div>
  );
};

export default SectionExpeditionDetails;
