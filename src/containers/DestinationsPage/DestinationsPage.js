import React from 'react';
import DirectoryPage from '../DirectoryPage/DirectoryPage';

/**
 * DestinationsPage — directory of destination guides across Palawan.
 */
const DestinationsPage = () => (
  <DirectoryPage
    directoryType="destinations"
    title="Destinations"
    subtitle="Explore the best destinations across Palawan — from El Nido's limestone cliffs to Coron's crystal lakes."
    icon="&#x1F3DD;"
    heroGradient="linear-gradient(165deg, #1a2a3b 0%, #2a5a4b 40%, #3a8a6b 100%)"
    queryParams={{ pub_listingType: 'destinations' }}
    metaTitle="Destinations — PalawanExpedition"
    metaDescription="Discover the best destinations in Palawan. Island guides, travel tips, and things to do."
    emptyMessage="No destinations listed yet"
    emptySubMessage="Destination guides will be added soon — check back or browse all expeditions."
  />
);

export default DestinationsPage;
