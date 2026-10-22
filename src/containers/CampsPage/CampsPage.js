import React from 'react';
import DirectoryPage from '../DirectoryPage/DirectoryPage';

/**
 * CampsPage — directory of beach camps and eco-lodges.
 */
const CampsPage = () => (
  <DirectoryPage
    directoryType="camps"
    title="Camps & Eco-Lodges"
    subtitle="Beach camps, eco-lodges, and glamping sites nestled across Palawan's most beautiful islands."
    icon="&#x26FA;"
    heroGradient="linear-gradient(165deg, #1a3a2a 0%, #2d6b4f 40%, #3d8b6a 100%)"
    queryParams={{ pub_listingType: 'camp' }}
    metaTitle="Camps & Eco-Lodges — PalawanExpedition"
    metaDescription="Find beach camps and eco-lodges across Palawan's islands. Book your stay with trusted operators."
    emptyMessage="No camps listed yet"
    emptySubMessage="Camps and eco-lodges will be added soon — check back or browse all expeditions."
  />
);

export default CampsPage;
