# PalawanExpedition.com - Platform Operations Guide

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Creating Listings](#2-creating-listings)
3. [Managing Tours (Trips)](#3-managing-tours-trips)
4. [Bokun Integration & Sync](#4-bokun-integration--sync)
5. [Managing Other Listing Types](#5-managing-other-listing-types)
6. [Search Pages & Navigation](#6-search-pages--navigation)
7. [Payments & Payouts](#7-payments--payouts)
8. [Admin Panel & Approvals](#8-admin-panel--approvals)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Getting Started

### Accessing the Admin Console

- Go to **https://console.sharetribe.com** and log in with your marketplace admin credentials.
- The Console is where you manage all marketplace settings, listing types, custom fields, content pages, users, and transactions - no coding required.

### Accessing the Live Site

- Your marketplace is live at: **https://palawan-expedition-web.onrender.com**
- This is hosted on Render with custom code support enabled.

### Key Roles

| Role | Description |
|------|-------------|
| **Admin** | Full access to Console, can approve/reject listings, manage users, configure marketplace |
| **Operator** | Tour/retreat operators who create and manage their own listings |
| **Traveler** | End users who browse and book experiences |

---

## 2. Creating Listings

### Step-by-Step: Creating a New Listing

1. Log in to the marketplace as an operator
2. Click **"Add listing"** or the **"+"** button in the top navigation
3. Select the listing type (Trip, Boat, Camp/Retreat, Company, or Destination)
4. Fill in all required fields:
   - **Title** - Name of the experience
   - **Description** - Detailed description
   - **Photos** - Upload high-quality images (first image becomes thumbnail)
   - **Location** - Set the map pin for where the experience takes place
   - **Price** - Set the per-person or per-unit price in USD
   - **Custom fields** - Fill in all type-specific fields (activities, amenities, etc.)
5. Click **"Publish"** to submit for admin review
6. Once approved by admin, the listing goes live on the marketplace

### Listing Types Overview

| Type | Purpose | Key Fields |
|------|---------|------------|
| **Trip** | Tours with departure dates and seat inventory | Departure date, seats, activities, pricing |
| **Boat** | Vessel rentals | Boat type, capacity, features |
| **Camp/Retreat** | Multi-day retreats and camps | Duration, accommodation type, group size |
| **Company** | Operator business profiles | Company info, services offered |
| **Destination** | Location/area guides | Region, highlights, linked trips |

---

## 3. Managing Tours (Trips)

### Setting Up a Trip Listing

1. When creating a Trip listing, set these critical fields:
   - **Departure Date**: The date the trip departs. This is what travelers filter by.
   - **Seats Available**: Total number of seats for the trip
   - **Price per Person**: In USD
   - **Duration**: Trip length
   - **Activities**: What's included (diving, island hopping, etc.)
   - **Inclusions/Exclusions**: What is and isn't covered

### How the Departure Date Filter Works

- On the Tours search page (`/s/trip`), travelers see a **single departure date picker**
- When a traveler selects a date, the page shows **all trips departing on or after that date**
- If no date is selected, all upcoming trips are shown
- Trips are sorted by departure date (earliest first)

### Adding Multiple Trips with Different Dates

To test and demonstrate the date filter:
1. Create several Trip listings with different departure dates (e.g., Dec 15, Dec 22, Jan 5, Jan 12)
2. Each trip should have its own photos, description, and pricing
3. On the Tours page, selecting "Dec 20" should show Dec 22, Jan 5, and Jan 12 trips (not Dec 15)

---

## 4. Bokun Integration & Sync

### What Bokun Does

Bokun is a tour booking management system. When connected to PalawanExpedition:
- Tour departure dates from Bokun appear on your marketplace
- Seat availability syncs between Bokun and the marketplace
- Operators manage their tour schedule in Bokun, and it reflects on the website

### Setting Up Bokun

#### Prerequisites
- A Bokun account (create one at **bokun.io** if you don't have one)
- A **Booking Channel** set up in Bokun (this determines the currency and connects to the API)

#### Creating a Booking Channel in Bokun
1. Log in to your Bokun dashboard
2. Go to **Settings > Booking Channels**
3. Click **"Create New Channel"**
4. Set the channel name (e.g., "PalawanExpedition")
5. Set the currency to **USD**
6. Save the channel
7. Note down the **Channel ID** - this is needed for the API connection

#### Connecting Bokun to the Marketplace
1. In your Bokun account, go to **Settings > API Keys**
2. Generate an API key if you don't have one
3. Provide the following to your developer:
   - Bokun API Access Key
   - Bokun API Secret Key
   - Booking Channel ID
4. The developer will configure these in the marketplace's server environment

### How Sync Works

- When a tour is created in Bokun with departure dates and availability, the marketplace pulls this data via the API
- The sync updates:
  - Available departure dates
  - Remaining seats per departure
  - Tour pricing
- Bookings made on the marketplace update Bokun's inventory in real-time

### Managing Tours in Bokun

1. **Add a new tour product** in Bokun with your tour details
2. **Set departure dates** - Add specific departure dates with seat counts
3. **Publish to your Booking Channel** - This makes it available to the marketplace API
4. The marketplace will pick up the new tours on next sync

---

## 5. Managing Other Listing Types

### Boats
- Create boat listings with vessel details, photos, and pricing
- Boats appear on the Boats search page (`/s/boat`)
- Key fields: boat type, capacity, amenities, water toys

### Camps/Retreats
- Multi-day experiences with accommodation
- Appear on the Retreats search page (`/s/retreat`)
- Key fields: duration, group size, sleeping style, food options

### Companies (Operators)
- Business profile pages for tour operators
- Appear on the Companies page (`/s/company`)
- Key fields: company name, services, contact info

### Destinations
- Area/location guide pages
- Appear on the Destinations page (`/s/destination`)
- Key fields: region, highlights, linked trips

---

## 6. Search Pages & Navigation

### Dedicated Search Pages

Each listing type has its own dedicated search page with relevant filters:

| Page | URL Path | Filters |
|------|----------|---------|
| Tours | `/s/trip` | Departure date, seats, price, activities |
| Boats | `/s/boat` | Boat type, capacity, price |
| Retreats | `/s/retreat` | Duration, group size, price |
| Companies | `/s/company` | Services, location |
| Destinations | `/s/destination` | Region |
| All listings | `/s` | All filters combined |

### Configuring Navigation Links

To add "Tours", "Boats", etc. to your site's top navigation:
1. Go to **Sharetribe Console > Build > Content > Top bar**
2. Add custom navigation links:
   - Label: "Tours" | URL: `/s/trip`
   - Label: "Boats" | URL: `/s/boat`
   - Label: "Retreats" | URL: `/s/retreat`
   - Label: "Companies" | URL: `/s/company`
   - Label: "Destinations" | URL: `/s/destination`

---

## 7. Payments & Payouts

### How Payments Work

1. **Traveler pays** in USD via Stripe at checkout
2. **Stripe holds the funds** in the platform's Hong Kong Stripe account
3. **15% platform commission** is deducted
4. **85% goes to the operator** after the trip is completed

### Stripe Setup (Required)

- The marketplace uses **Stripe Connect** through a Hong Kong entity
- Stripe API keys need to be configured in the marketplace environment
- Operators in the Philippines receive payouts manually (GCash, bank transfer, or PayMongo) since Stripe doesn't support direct Philippine payouts

### Manual Payout Process

Since Philippine operators can't receive Stripe payouts directly:
1. Payment is collected via Stripe to the HK platform account
2. Admin reviews completed trips in the Console
3. Admin initiates manual payout to the operator via:
   - GCash transfer
   - Bank transfer
   - PayMongo

---

## 8. Admin Panel & Approvals

### Approving Listings

1. Go to **Sharetribe Console > Manage > Listings**
2. New listings appear with "Pending approval" status
3. Review the listing details, photos, and pricing
4. Click **"Approve"** to make it live, or **"Reject"** with a reason

### Managing Users

1. Go to **Sharetribe Console > Manage > Users**
2. View all registered users (operators and travelers)
3. You can ban users, view their listings, and see transaction history

### Viewing Transactions

1. Go to **Sharetribe Console > Manage > Transactions**
2. See all bookings, their status, and payment details
3. Track which trips have been completed for payout purposes

---

## 9. Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Listing not appearing on search | Check if it's been approved in Console. Check if it's the correct listing type. |
| Date filter not working | Make sure trips have departure dates set. Clear browser cache. |
| Photos not uploading | Check file size (max 20MB). Use JPG or PNG format. |
| Bokun tours not syncing | Verify API keys are correct. Check that tours are published to the Booking Channel. |
| Search page showing mixed types | Make sure you're using the dedicated URL (e.g., `/s/trip` for tours only) |

### Getting Help

- **Sharetribe documentation**: https://www.sharetribe.com/docs/
- **Bokun support**: https://support.bokun.io/
- **Platform developer**: Contact Jevin for technical issues

---

*Document version: 1.0*
*Last updated: October 2026*
*Platform: PalawanExpedition.com powered by Sharetribe Flex*
