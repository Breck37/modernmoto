# Modern Moto Fantasy - Legacy Documentation

> **Purpose**: This document captures the complete architecture, business logic, and implementation details of the original Modern Moto Fantasy application. Use this as a reference when rebuilding the app.

---

## Table of Contents

1. [Application Overview](#1-application-overview)
2. [Technology Stack](#2-technology-stack)
3. [Scoring System](#3-scoring-system)
4. [Data Models](#4-data-models)
5. [Authentication Flow](#5-authentication-flow)
6. [API Endpoints](#6-api-endpoints)
7. [Data Sources & Parsing](#7-data-sources--parsing)
8. [Custom Hooks](#8-custom-hooks)
9. [Key Components](#9-key-components)
10. [Constants & Configuration](#10-constants--configuration)
11. [State Management](#11-state-management)
12. [Scheduled Data Structure](#12-scheduled-data-structure)
13. [Environment Variables](#13-environment-variables)
14. [Rebuild Checklist](#14-rebuild-checklist)

---

## 1. Application Overview

**Modern Moto Fantasy** is a fantasy motorsports application for Supercross (SX) and Motocross (MX) racing. Users build fantasy teams by selecting riders from real AMA events, track performance across weeks/rounds, manage league memberships, and compete against other players.

### Core Features

- Passwordless authentication via Magic Link
- Fantasy team management for 250cc and 450cc classes
- Real-time race results and live tracking
- League management and scoring
- Multi-series support (SX and MX)
- Dark/Light mode toggle
- Weekly pick submissions with validation
- Admin point calculation

### User Flow

1. User logs in via email magic link
2. Joins or creates a league
3. Each race week, selects riders for various positions
4. Race occurs, results are fetched from AMA sources
5. Admin triggers point calculation
6. Users see their scores and league standings

---

## 2. Technology Stack

### Original Stack

- **Frontend**: Next.js 15, React 19, styled-components, Material-UI
- **Backend**: Next.js API routes
- **Authentication**: Magic SDK (passwordless)
- **Session**: @hapi/iron (encryption), HTTP-only cookies
- **Data Fetching**: Axios, SWR
- **External Data**: crawler-request for PDF parsing

### Key Dependencies

```json
{
  "magic-sdk": "^4.3.0",
  "@magic-sdk/admin": "^1.3.0",
  "@hapi/iron": "^6.0.0",
  "axios": "^0.21.1",
  "swr": "^0.5.6",
  "crawler-request": "^1.2.2",
  "xml2js": "^0.4.23",
  "styled-components": "^5.3.0",
  "@mui/material": "^7.x"
}
```

---

## 3. Scoring System

### 3.1 Pick Positions

Users select riders for specific finishing positions. Different for each series:

**Supercross (SX) - 7 picks per class:**
| Position | Code | Description |
|----------|------|-------------|
| 1 | 1 | 1st place finisher |
| 2 | 2 | 2nd place finisher |
| 3 | 3 | 3rd place finisher |
| 4 | 4 | 4th place finisher |
| 5 | 5 | 5th place finisher |
| 10 | 10 | 10th place finisher |
| Fastest Lap | 100 | Rider with fastest lap |

**Motocross (MX) - 8 picks per class:**
| Position | Code | Description |
|----------|------|-------------|
| 1-5 | 1-5 | Same as SX |
| 10 | 10 | 10th place finisher |
| Fastest Lap Moto 1 | 101 | Fastest lap in first moto |
| Fastest Lap Moto 2 | 102 | Fastest lap in second moto |

### 3.2 Validation Rules

- **No duplicate riders** in position picks (1-5, 10th)
- **Fastest lap positions allow duplicates** (same rider can be picked for position AND fastest lap)
- **Must complete all picks** before saving (7 for SX, 8 for MX per class)
- **Two classes required**: 450cc (big bike) and 250cc (small bike)

### 3.3 Points Calculation

Points are calculated by an **external backend API**:

```
POST {API_URL}/calculate-points?week={week}&type={type}&year={year}
Body: { raceResults: { ... } }
```

The frontend sends race results to the backend, which:
1. Compares user picks against actual race results
2. Awards points based on correct predictions
3. Returns calculated points per user
4. Updates stored picks with earned points

**Point totals tracked:**
- `totalPoints` - Sum of all points this round
- `bigBikePoints` - 450cc class subtotal
- `smallBikePoints` - 250cc class subtotal
- `rank` - User's position in league standings

### 3.4 Admin Point Assignment

Only admin user can trigger point calculation:
- Condition: `user.email === process.env.ADMIN_USER`
- Button appears on Home page after race results are available
- Calls `/api/[mx|sx]/assign-points` endpoint

---

## 4. Data Models

### User

```typescript
interface User {
  email: string;
  username?: string;
  leagues: string[];
  currentRound: {
    email: string;
    user: string;
    week: number;
    round: string;
    type: 'sx' | 'mx';
    bigBikePicks: Rider[];
    smallBikePicks: Rider[];
    totalPoints: number;
    rank?: number;
    deadline: Date;
  };
  picks: Pick[];
  leaguePicks: {
    [year: string]: {
      [type: string]: {
        [weekKey: string]: LeaguePick[];
      };
    };
  };
}
```

### Rider

```typescript
interface Rider {
  name: string;
  number: string;
  position: number;
  points: number;
  team?: string;
  hometown?: string;
  bike?: string;
  currentLap?: number;
  lastLap?: string;
  bestLap?: string;
  status?: string;
  gap?: string;
  diff?: string;
}
```

### Race Results

```typescript
interface RaceResults {
  raceResults: Rider[];
  fastestLaps: {
    small: Rider[];
    big: Rider[];
  };
  fastLapLeader: Rider;
  session: string;
  round: string;
  liveResults?: any;
  seasonResults?: any[];
}
```

### League Pick

```typescript
interface LeaguePick {
  user: string;
  email: string;
  week: number;
  type: 'sx' | 'mx';
  totalPoints: number;
  bigBikePicks: Rider[];
  smallBikePicks: Rider[];
  bigBikePoints?: number;
  smallBikePoints?: number;
  rank?: number;
}
```

---

## 5. Authentication Flow

### Magic SDK Integration

1. **Login Page** (`/login`):
   - User enters email
   - Magic SDK sends magic link to email
   - User clicks link, returns to app with DID token

2. **Token Exchange** (`POST /api/login`):
   ```javascript
   const did = req.headers.authorization.split('Bearer').pop().trim();
   const user = await new Magic(process.env.MAGIC_SECRET_KEY)
     .users.getMetadataByToken(did);
   const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults);
   CookieService.setTokenCookie(res, token);
   ```

3. **Session Validation** (`GET /api/user`):
   ```javascript
   const token = getAuthToken(req.cookies);
   const user = await Iron.unseal(token, process.env.ENCRYPTION_SECRET, Iron.defaults);
   res.json(user);
   ```

### Cookie Configuration

```javascript
{
  maxAge: 336 * 60 * 60,  // 14 days
  expires: new Date(Date.now() + 336 * 60 * 60 * 1000),
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  sameSite: 'lax'
}
```

Two cookies set:
- `TOKEN_NAME` (httpOnly) - Encrypted session token
- `authed` (client-visible) - Quick auth check flag

---

## 6. API Endpoints

### Authentication

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/login` | POST | Exchange Magic DID for session cookie |
| `/api/user` | GET | Get current user from session |

### User Data

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/get-user/[email]` | GET | Fetch user picks and leagues |
| `/api/save-picks` | POST | Save weekly rider selections |

### Race Results

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/sx/get-weeks-results` | GET | Fetch SX race data (live + PDF) |
| `/api/mx/get-weeks-results` | GET | Fetch MX race data (live + PDF) |
| `/api/sx/get-live-results` | GET | Fetch live SX results only |
| `/api/mx/get-live-results` | GET | Fetch live MX results only |
| `/api/check-entry-list` | GET | Get available riders for round |

### Points

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/sx/assign-points` | POST | Calculate SX fantasy points |
| `/api/mx/assign-points` | POST | Calculate MX fantasy points |

---

## 7. Data Sources & Parsing

### Live Data Sources

**Motocross (MX):**
- URL: `http://americanmotocrosslive.com/xml/mx/RaceResultsWeb.xml`
- Format: XML
- Parser: xml2js

**Supercross (SX):**
- URL: `https://live.amasupercross.com/xml/sx/RaceResults.json`
- Format: JSON

### PDF Sources

Official results from `results.amasupercross.com`:
- Entry lists
- Official race results
- Lap times
- Qualifying results
- Season statistics

### XML/JSON Field Mappings

**SX/MX Results Mapper:**
```javascript
{
  A: 'position',
  BL: 'bestLap',
  F: 'name',
  N: 'number',
  V: 'bike',
  L: 'currentLap',
  LL: 'lastLap',
  D: 'diff',
  G: 'gap',
  S: 'status'
}
```

### PDF Parsing Strategy

1. **Crawl PDF** using `crawler-request`
2. **Split text** by newlines
3. **Identify sections** (results, season stats, lap times)
4. **Parse riders** using state machine:
   - Detect rider numbers (contains "#")
   - Detect bike manufacturers
   - Group into rider objects
5. **Transform** to standardized format

### Helper Functions

| File | Purpose |
|------|---------|
| `helpers/mx/mapper.js` | Parse MX race results from PDF |
| `helpers/mx/results-mapper.js` | Map live XML to rider objects |
| `helpers/mx/season-mapper.js` | Extract season statistics |
| `helpers/mx/splice-results.js` | Extract results section from PDF |
| `helpers/sx/mapper.js` | Parse SX race results |
| `helpers/sx/results-mapper.js` | Map live JSON to rider objects |
| `live-results-laps-mapper.js` | Sort riders by best lap time |
| `splice-laps.js` | Extract top 10 lap times |

---

## 8. Custom Hooks

### useAuth

```typescript
function useAuth(): {
  user: User | null;
  loading: boolean;
  error: Error | undefined;
}
```
Fetches authenticated user via SWR from `/api/user`.

### useCurrentUser

```typescript
function useCurrentUser(user: { email: string }): {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  isLoading: boolean;
  userWithNoAccess: object | null;
}
```
Provides React Context for current user with round-specific data.

### useCurrentMode

```typescript
function useCurrentMode(): {
  currentMode: number; // 0 = dark, 1 = light
}
```
Theme toggle state from context.

### useCurrentRound

```typescript
function useCurrentRound(): {
  type: 'sx' | 'mx';
  round: string;
  week: number;
  year: string;
  apiRequests: { weekResults, liveResults, assignPoints, getUser };
  // + scheduled event data (title, city, URLs, etc.)
}
```
Merges static config with scheduled data.

### useRaceResults

```typescript
function useRaceResults(): {
  raceResults: RaceResults;
  loading: boolean;
}
```
Fetches race results with fallback to live results.

### useQualifying

```typescript
function useQualifying(): {
  entries: Rider[];
  loading: boolean;
  canShowQualifying: boolean;
}
```
Fetches entry list and checks qualifying availability.

---

## 9. Key Components

### Layout

| Component | Purpose |
|-----------|---------|
| Header | Top navigation with mode toggle and tabs |
| Modal | Reusable modal overlay |
| Button | Custom styled button |

### Team Building

| Component | Purpose |
|-----------|---------|
| WeeklyPicks | Rider selection interface for all positions |
| RiderSelect | Single rider dropdown selector |

### Results Display

| Component | Purpose |
|-----------|---------|
| Results (Table) | Main race results table |
| RiderRow | Individual rider row with stats |
| Podium | Top 3 finishers display |
| FastLaps | Top 3 fastest lap times |

### Dashboard

| Component | Purpose |
|-----------|---------|
| LeagueCard | User's weekly picks and scores |
| LastRoundDetailed | Current round score and rank |
| FrontPlate | Rider number plate visualization |

---

## 10. Constants & Configuration

### currentRound.js

```javascript
{
  type: 'sx',              // 'sx' or 'mx'
  round: 's2',             // Round identifier (s1, s2, m1, etc.)
  week: 2,                 // Display week number
  leagueRoundToShow: null, // Override for league display
  year: '2022'             // Season year
}
```

### apiType.js

```javascript
export const sx = {
  weekResults: '/api/sx/get-weeks-results',
  liveResults: '/api/sx/get-live-results',
  assignPoints: '/api/sx/assign-points',
  getUser: '/api/get-user'
};

export const mx = {
  weekResults: '/api/mx/get-weeks-results',
  liveResults: '/api/mx/get-live-results',
  assignPoints: '/api/mx/assign-points',
  getUser: '/api/get-user'
};
```

### manufacturers.js

```javascript
{
  honda: { image: '/logos/HondaLogo.jpeg', color: 'red', rgb: '255,0,0' },
  kawasaki: { image: '/logos/KawiLogo.jpeg', color: 'lime', rgb: '0,255,0' },
  yamaha: { image: '/logos/YamahaLogo.jpeg', color: 'blue', rgb: '0,0,255' },
  ktm: { image: '/logos/KTMLogo.jpeg', color: 'orange', rgb: '255,165,0' },
  husqvarna: { image: '/logos/HuskyLogo.jpeg', color: 'white', rgb: '255,255,255' },
  gasgas: { image: '/logos/GasGasLogo.jpeg', color: 'red', rgb: '255,0,0' },
  suzuki: { image: '/logos/SuzukiLogo.jpeg', color: 'yellow', rgb: '255,255,0' }
}
```

### defaultTabs.js

```javascript
[
  { title: 'My Team', route: '/team' },
  { title: 'Results', route: '/results' }
]
```

---

## 11. State Management

### Context Providers

1. **CurrentModeContext** - Theme (dark/light mode)
   - Stored in localStorage: `USER_CURRENT_MODE`
   - Values: 0 (dark) or 1 (light)

2. **CurrentUserContext** - User data with picks
   - Wraps app in `_app.js`
   - Fetches user data based on current round

### Data Flow

```
User navigates to page
  ↓
useAuth() fetches /api/user (SWR)
  ↓
CurrentUserContext fetches /api/get-user/[email]
  ↓
useCurrentRound() provides round config
  ↓
Components render with user + round data
```

---

## 12. Scheduled Data Structure

Each round in `scheduledData.js`:

```javascript
{
  sx: {
    2022: {
      s1: {
        title: 'Anaheim 1',
        city: 'Anaheim',
        state: 'CA',
        number: '01',
        entryList: 'https://results.amasupercross.com/.../ENTRYLIST.PDF',
        smallBikeEntryList: 'https://...',
        officialResults: 'https://...',
        smallBikeOfficialResults: 'https://...',
        bigBikeQualifying: 'https://...',
        smallBikeQualifying: 'https://...',
        bigBikeLapTimes: 'https://...',
        smallBikeLapTimes: 'https://...',
        submissionStart: Date,
        submissionEnd: Date
      }
    }
  },
  mx: {
    // Similar structure for motocross rounds
  }
}
```

---

## 13. Environment Variables

```bash
# Magic SDK
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_MAGIC_SECRET_KEY=sk_live_...

# Session/Security
TOKEN_NAME=modernmoto_auth
ENCRYPTION_SECRET=your-32-char-secret

# Backend API
API_URL=https://your-backend-api.com

# Admin
ADMIN_USER=admin@example.com

# Environment
NODE_ENV=production
```

---

## 14. Rebuild Checklist

### Authentication
- [ ] Choose auth provider (recommend: Clerk, Auth.js, or Supabase Auth)
- [ ] Implement login flow
- [ ] Set up session management
- [ ] Protect routes

### Core Features
- [ ] User registration and profile
- [ ] League creation and joining
- [ ] Weekly pick submission (7 SX / 8 MX positions per class)
- [ ] Pick validation (no duplicates except fastest lap)
- [ ] Pick deadline enforcement

### Data Integration
- [ ] Live results fetching (XML for MX, JSON for SX)
- [ ] PDF crawling for official results
- [ ] Result parsing and transformation
- [ ] Entry list fetching

### Scoring
- [ ] Points calculation logic
- [ ] Admin point assignment trigger
- [ ] League standings calculation
- [ ] Historical results storage

### UI/UX
- [ ] Home dashboard with current round info
- [ ] Team selection page
- [ ] Results display with live updates
- [ ] League standings view
- [ ] Dark/light mode toggle
- [ ] Mobile responsive design

### Backend
- [ ] User data persistence
- [ ] Pick storage
- [ ] Points calculation API
- [ ] League management

---

## Notes for Rebuild

1. **Simplify Auth**: Magic SDK had version churn issues. Consider Clerk or Auth.js for easier maintenance.

2. **TypeScript**: Original was JavaScript. Strongly recommend TypeScript for rebuild.

3. **Scoring Logic**: The actual points algorithm was in the external backend. You'll need to define or retrieve this.

4. **PDF Parsing**: This was complex. Consider caching parsed results or finding a more stable data source.

5. **Real-time Updates**: Could add WebSocket support for live race tracking.

6. **Testing**: Original had no tests. Add from the start this time.

---

*Documentation generated: February 2026*
*Original app version: Next.js 15, React 19*
