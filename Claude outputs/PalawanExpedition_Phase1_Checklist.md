# PalawanExpedition.com — Phase 1 Requirements Checklist

Based on the client's SOW (Statement of Work, July 12, 2026) by Did Novo.  
Phase 2 & 3 items are **out of scope** for initial launch.

---

## ✅ DONE — What We've Completed

### Search & Listings Display
- ✅ Search page working on Render (`/s`) with grid layout
- ✅ 7 test listings loading correctly from Sharetribe test environment
- ✅ Fixed listing type filter issue (trip vs trp mismatch)
- ✅ Fixed stock filter issue (tour listings don't use Sharetribe stock)
- ✅ Sharetribe test credentials configured on Render

### Enhanced Listing Cards (Section 5.2)
- ✅ Company name displayed on cards
- ✅ Departure date badge
- ✅ Duration shown
- ✅ Experience type shown
- ✅ Comfort level shown
- ✅ Seats left indicator
- ✅ Rating displayed
- ✅ Privacy badge (Private/Group)
- ✅ Route (departure → arrival)

### Filters & Sort (Partial)
- ✅ Company filter
- ✅ Comfort Level filter
- ✅ Departure date filter
- ✅ Sort by Highest rated
- ✅ Sort by Earliest departure

### Deployment & Hosting
- ✅ Sharetribe backend configured (test environment)
- ✅ Render hosting deployed and working (https://palawan-tours.onrender.com)
- ✅ GitHub repo for version control
- ✅ Build pipeline: `yarn install --ignore-scripts && yarn build`

### Built-in Sharetribe Features (Work Out of the Box)
- ✅ Native messaging (customer-provider conversation threads)
- ✅ User registration & login
- ✅ Listing creation by operators
- ✅ Basic email notifications
- ✅ Secure payment handling via Stripe (PCI compliant by design)

---

## ⚠️ PARTIALLY DONE — Needs More Work

### Filters (Section 6)
**SOW requires:** Company, Date (departure), Duration, Camps, Luxury level, Expedition type  
**Currently have:** Company, Comfort Level, Departure date  
**Missing:** Duration, Camps, Expedition type filters

### Design & Branding (Section 15)
- ⚠️ Enhanced listing cards are styled
- ❌ Full branding not done: logo, color palette, homepage design, marketing content
- ❌ Complete visual identity / custom Sharetribe theme across frontend

### Mobile Responsiveness (Section 16)
- ⚠️ Sharetribe template is responsive by default
- ❌ Custom components (enhanced cards, filters) need mobile testing

### Operator Self-Service (Section 13)
- ⚠️ Sharetribe Console supports operator listing management natively
- ❌ Custom frontend listing creation forms not customized for tour-specific fields

---

## ❌ NOT STARTED — Remaining Phase 1 Requirements

### Companies Directory (Section 5.1)
- ❌ Dedicated browsable Companies tab/page
- ❌ Company profile page: name, description/bio, logo, photos, rating, review count, list of trips, camps, boats
- ❌ Aggregate star rating & review count on company profile (requires Integration API — Section 12)
- ❌ Visibility gating: only operators with active membership appear (Section 11)

### Camps Directory (Section 5.3)
- ❌ Camps tab/directory page
- ❌ Camp listing: name, description, photos, luxury level, linked companies & trips

### Boats Directory (Section 5.4)
- ❌ Boats tab/directory page
- ❌ Boat listing: name, description, photos, capacity, operating company, linked trips

### Trip Detail Page Enhancements (Section 5.2)
- ❌ Linked company/camps/boat on trip detail
- ❌ Full trip description display
- ❌ Reviews section for that specific trip
- ❌ Live seats remaining display

### Booking Flow (Section 7)
- ❌ Seat-based availability configuration
- ❌ Custom booking/checkout flow
- ❌ Booking confirmation
- ❌ Requires Stripe Connect setup first

### Group Bookings (Section 8)
- ❌ Multi-seat booking (traveler selects quantity of seats)
- ❌ Co-traveler name field ("who's coming")
- ❌ Single payer for group

### Events & Free Attendance (Section 9)
- ❌ Event listing type with unlimited seats
- ❌ Free/paid toggle per Event
- ❌ "Attend" button for free Events (logged-in only)
- ❌ Public attendee list on Event listings
- ❌ $0 transaction for free Events

### Payments, Commission & Payouts (Section 10)
- ❌ Stripe Connect integration (Hong Kong platform account)
- ❌ Custom transaction process: hold 100% until trip completion, then 15%/85% split
- ❌ Manual payout tracking for operators (Philippines not Stripe-supported for payouts)
- ❌ Admin disbursement via GCash/bank transfer
- ❌ Dispute control (withhold/adjust/refund before operator payout)
- ❌ **Waiting on:** Client's Stripe API keys

### Operator Membership Fee & Visibility (Section 11)
- ❌ Membership status field on company listings (active/inactive + expiry date)
- ❌ Visibility gating logic (non-paying operators hidden from directory / company attribution removed from trips)
- ❌ ₱20,000/month fee tracking (manual, outside Stripe)

### Reviews & Ratings (Section 12)
- ❌ Aggregate company rating rollup (Integration API listener to calculate from trip reviews)
- ⚠️ Native Sharetribe reviews will work once booking flow is live (built-in)

### Admin Panel Customization (Section 14)
- ❌ Commission percentage configuration
- ❌ Operator membership status management (toggle active/inactive)
- ❌ Payout tracking per completed trip (amount due / paid)
- ❌ Event attendee list viewing & moderation
- ❌ Dispute handling tools

### External Booking API (Section 18)
- ❌ Embeddable booking widget/iframe for operator websites
- ❌ Scoped API credentials per operator
- ❌ Documentation / quick-start guide for operators

### Custom Domain & Go-Live
- ❌ Custom domain setup (waiting on client's domain name)
- ❌ Switch from test to live Sharetribe environment
- ❌ Recreate listings in live environment
- ❌ Connect live Stripe account

---

## ⏸️ BLOCKED — Waiting on Client

| Item | What's Needed from Client |
|---|---|
| Stripe Connect | Stripe API keys (Hong Kong platform account) |
| Custom Domain | Domain name (palawanexpedition.com or similar) |
| Go-Live | Decision to switch from test to live environment |
| Branding | Logo, color palette, brand guidelines |
| Payout Method | Confirm GCash vs bank transfer vs PayMongo for operator payouts |
| Cancellation Policy | Refund policy details (what % is refundable, and until when) |
| Operator Approval | Auto-publish vs admin approval for new companies/trips |

---

## Priority Recommendation

For the next update to the client, focus on what's **most visible and impressive**:

1. **Full branding & homepage design** — biggest visual impact
2. **Additional search filters** (Duration, Expedition type) — easy win
3. **Trip detail page** — necessary for bookings
4. **Companies directory page** — shows multi-vendor capability
5. **Stripe Connect** — enables actual bookings (blocked on client's keys)
