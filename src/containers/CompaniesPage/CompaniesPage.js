import React from 'react';
import DirectoryPage from '../DirectoryPage/DirectoryPage';

/**
 * CompaniesPage — directory of trusted expedition operators.
 */
const CompaniesPage = () => (
  <DirectoryPage
    directoryType="companies"
    title="Expedition Companies"
    subtitle="Trusted local operators running expeditions, island-hopping tours, and diving trips across Palawan."
    icon="&#x1F3E2;"
    heroGradient="linear-gradient(165deg, #063b33 0%, #0e7c6b 40%, #1a9e8a 100%)"
    queryParams={{ pub_company: 'has_any' }}
    metaTitle="Expedition Companies — PalawanExpedition"
    metaDescription="Browse trusted expedition operators in Palawan. Verified reviews, secure booking."
    emptyMessage="No companies listed yet"
    emptySubMessage="Local operators will be added soon — check back or browse all expeditions."
  />
);

export default CompaniesPage;
