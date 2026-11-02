/////////////////////////////////////////////////////////
// Configurations related to listing.                  //
// Main configuration here is the extended data config //
/////////////////////////////////////////////////////////

// Note: The listingFields come from listingTypes asset nowadays by default.
//       To use this built-in configuration, you need to change the overwrite from configHelper.js
//       (E.g. use mergeDefaultTypesAndFieldsForDebugging func)

/**
 * Configuration options for listing fields (custom extended data fields):
 * - key, scope, schemaType, enumOptions, filterConfig, showConfig, saveConfig
 * See Sharetribe docs for full reference.
 */
export const listingFields = [
  // ─── Expedition Type (enum) ─────────────────────────────────
  {
    key: 'expeditiontype',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'islandHopping', label: 'Island Hopping' },
      { option: 'diving', label: 'Diving' },
      { option: 'sailing', label: 'Sailing' },
      { option: 'kayaking', label: 'Kayaking' },
      { option: 'snorkeling', label: 'Snorkeling' },
      { option: 'camping', label: 'Camping' },
      { option: 'trekking', label: 'Trekking' },
      { option: 'fishing', label: 'Fishing' },
      { option: 'cultural', label: 'Cultural' },
      { option: 'wildlife', label: 'Wildlife' },
      { option: 'photography', label: 'Photography' },
      { option: 'wellness', label: 'Wellness' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectSingleFilter',
      label: 'Expedition Type',
      group: 'primary',
    },
    showConfig: {
      label: 'Expedition Type',
      isDetail: true,
    },
    saveConfig: {
      label: 'Expedition Type',
      placeholderMessage: 'Select expedition type…',
      isRequired: false,
    },
  },

  // ─── Trip Activities (multi-enum) ───────────────────────────
  {
    key: 'tripactivities',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: [
      { option: 'diving', label: 'Diving' },
      { option: 'snorkeling', label: 'Snorkeling' },
      { option: 'kayaking', label: 'Kayaking' },
      { option: 'swimming', label: 'Swimming' },
      { option: 'hiking', label: 'Hiking' },
      { option: 'fishing', label: 'Fishing' },
      { option: 'surfing', label: 'Surfing' },
      { option: 'paddleboarding', label: 'Paddleboarding' },
      { option: 'camping', label: 'Camping' },
      { option: 'rockClimbing', label: 'Rock Climbing' },
      { option: 'birdWatching', label: 'Bird Watching' },
      { option: 'photography', label: 'Photography' },
      { option: 'cooking', label: 'Cooking' },
      { option: 'yoga', label: 'Yoga' },
      { option: 'meditation', label: 'Meditation' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectMultipleFilter',
      label: 'Activities',
      searchMode: 'has_any',
      group: 'primary',
    },
    showConfig: {
      label: 'Activities',
    },
    saveConfig: {
      label: 'Activities',
      placeholderMessage: 'Select activities…',
      isRequired: false,
    },
  },

  // ─── Boat Type (enum) ───────────────────────────────────────
  {
    key: 'boattype',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'bangka', label: 'Bangka' },
      { option: 'catamaran', label: 'Catamaran' },
      { option: 'sailboat', label: 'Sailboat' },
      { option: 'speedboat', label: 'Speedboat' },
      { option: 'yacht', label: 'Yacht' },
      { option: 'kayak', label: 'Kayak' },
      { option: 'diveBoat', label: 'Dive Boat' },
      { option: 'ferry', label: 'Ferry' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectSingleFilter',
      label: 'Boat Type',
      group: 'secondary',
    },
    showConfig: {
      label: 'Boat Type',
      isDetail: true,
    },
    saveConfig: {
      label: 'Boat Type',
      placeholderMessage: 'Select boat type…',
      isRequired: false,
    },
  },

  // ─── Comfort Level (enum) ───────────────────────────────────
  {
    key: 'comfortlevel',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'budget', label: 'Budget' },
      { option: 'standard', label: 'Standard' },
      { option: 'comfort', label: 'Comfort' },
      { option: 'luxury', label: 'Luxury' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectSingleFilter',
      label: 'Comfort Level',
      group: 'primary',
    },
    showConfig: {
      label: 'Comfort Level',
      isDetail: true,
    },
    saveConfig: {
      label: 'Comfort Level',
      placeholderMessage: 'Select comfort level…',
      isRequired: false,
    },
  },

  // ─── Group Size (enum) ──────────────────────────────────────
  {
    key: 'groupsize',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: [
      { option: 'solo', label: 'Solo (1)' },
      { option: 'small', label: 'Small (2-6)' },
      { option: 'medium', label: 'Medium (7-15)' },
      { option: 'large', label: 'Large (16-30)' },
      { option: 'extraLarge', label: 'Extra Large (30+)' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectSingleFilter',
      label: 'Group Size',
      group: 'secondary',
    },
    showConfig: {
      label: 'Group Size',
      isDetail: true,
    },
    saveConfig: {
      label: 'Group Size',
      placeholderMessage: 'Select group size…',
      isRequired: false,
    },
  },

  // ─── Vibes (multi-enum) ─────────────────────────────────────
  {
    key: 'vibes',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: [
      { option: 'adventurous', label: 'Adventurous' },
      { option: 'relaxed', label: 'Relaxed' },
      { option: 'social', label: 'Social' },
      { option: 'romantic', label: 'Romantic' },
      { option: 'family', label: 'Family-Friendly' },
      { option: 'party', label: 'Party' },
      { option: 'spiritual', label: 'Spiritual' },
      { option: 'educational', label: 'Educational' },
      { option: 'eco', label: 'Eco-Friendly' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectMultipleFilter',
      label: 'Vibes',
      searchMode: 'has_any',
      group: 'secondary',
    },
    showConfig: {
      label: 'Vibes',
    },
    saveConfig: {
      label: 'Vibes',
      placeholderMessage: 'Select vibes…',
      isRequired: false,
    },
  },

  // ─── Trip Type (multi-enum) ─────────────────────────────────
  {
    key: 'triptype',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: [
      { option: 'dayTrip', label: 'Day Trip' },
      { option: 'overnight', label: 'Overnight' },
      { option: 'multiDay', label: 'Multi-Day' },
      { option: 'expedition', label: 'Expedition' },
      { option: 'liveaboard', label: 'Liveaboard' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectMultipleFilter',
      label: 'Trip Type',
      searchMode: 'has_any',
      group: 'secondary',
    },
    showConfig: {
      label: 'Trip Type',
    },
    saveConfig: {
      label: 'Trip Type',
      placeholderMessage: 'Select trip type…',
      isRequired: false,
    },
  },

  // ─── Sleeping Style (multi-enum) ────────────────────────────
  {
    key: 'sleepingstyle',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: [
      { option: 'tent', label: 'Tent' },
      { option: 'hammock', label: 'Hammock' },
      { option: 'cabin', label: 'Cabin' },
      { option: 'dorm', label: 'Dorm' },
      { option: 'privateRoom', label: 'Private Room' },
      { option: 'openAir', label: 'Open Air' },
      { option: 'boat', label: 'On Boat' },
    ],
    filterConfig: {
      indexForSearch: true,
      filterType: 'SelectMultipleFilter',
      label: 'Sleeping Style',
      searchMode: 'has_any',
      group: 'secondary',
    },
    showConfig: {
      label: 'Sleeping Style',
    },
    saveConfig: {
      label: 'Sleeping Style',
      placeholderMessage: 'Select sleeping style…',
      isRequired: false,
    },
  },

  // ─── Duration in Days (long / range filter) ─────────────────
  {
    key: 'durationindays',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 1,
      maximum: 30,
    },
    filterConfig: {
      indexForSearch: true,
      label: 'Duration (days)',
      group: 'primary',
    },
    showConfig: {
      label: 'Duration',
      isDetail: true,
    },
    saveConfig: {
      label: 'Duration (days)',
      placeholderMessage: 'Enter number of days…',
      isRequired: false,
    },
  },
];

///////////////////////////////////////////////////////////////////////
// Configurations related to listing types and transaction processes //
///////////////////////////////////////////////////////////////////////

// A presets of supported listing configurations
//
// Note 1: The listingTypes come from listingTypes asset nowadays by default.
//         To use this built-in configuration, you need to change the overwrite from configHelper.js
//         (E.g. use mergeDefaultTypesAndFieldsForDebugging func)
// Note 2: transaction type is part of listing type. It defines what transaction process and units
//         are used when transaction is created against a specific listing.

/**
 * Configuration options for listing experience:
 * - listingType, label, transactionType, stockType, availabilityType, etc.
 * See Sharetribe docs for full reference.
 */

export const listingTypes = [
  // Listing types come from hosted assets (Console)
];

// SearchPage can enforce listing query to only those listings with valid listingType
// However, it only works if you have set 'enum' type search schema for the public data fields
//   - listingType
//
//  Similar setup could be expanded to 2 other extended data fields:
//   - transactionProcessAlias
//   - unitType
//
// Read More:
// https://www.sharetribe.com/docs/how-to/manage-search-schemas-with-flex-cli/#adding-listing-search-schemas
export const enforceValidListingType = false;
