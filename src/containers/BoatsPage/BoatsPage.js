import React from 'react';
import DirectoryPage from '../DirectoryPage/DirectoryPage';

/**
 * BoatsPage — directory of charter vessels and expedition boats.
 */
const BoatsPage = () => (
  <DirectoryPage
    directoryType="boats"
    title="Boats & Charters"
    subtitle="Charter vessels, expedition boats, and sailing trips for every budget and group size."
    icon="&#x26F5;"
    heroGradient="linear-gradient(165deg, #0a2a3b 0%, #1a5a7b 40%, #2a7a9b 100%)"
    queryParams={{ pub_listingType: 'boat' }}
    metaTitle="Boats & Charters — PalawanExpedition"
    metaDescription="Charter boats and expedition vessels in Palawan. Find the right boat for your group."
    emptyMessage="No boats listed yet"
    emptySubMessage="Boats and charters will be added soon — check back or browse all expeditions."
  />
);

export default BoatsPage;
