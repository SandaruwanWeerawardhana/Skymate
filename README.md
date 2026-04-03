<h1 align=center> Skymate - Weather Application</h1>h1>

A modern weather application built with React, TypeScript, and Vite. The app displays real-time weather data for multiple cities using the OpenWeatherMap API with intelligent caching to minimize API calls.

## Project Overview

Skymate is a frontend-only weather application that fetches and displays weather information for predefined cities. The application reads city codes from a configuration file, retrieves weather data from the OpenWeatherMap API, and presents it in a clean, responsive interface. All API responses are cached for 5 minutes to improve performance and reduce unnecessary API requests.

## Features

- **Real-time Weather Data**: Fetch current weather information from OpenWeatherMap API
- **Multiple Cities**: Display weather for 8 predefined cities (Colombo, Tokyo, Liverpool, Paris, Sydney, Boston, Shanghai, Oslo)
- **Search Functionality**: Add custom cities to the dashboard
- **Detailed Weather View**: Click any weather card to see comprehensive weather details including:
  - Temperature (current, min, max)
  - Weather condition
  - Pressure, humidity, visibility
  - Wind speed and direction
  - Sunrise and sunset times
- **Smart Caching**: 5-minute localStorage caching to minimize API calls
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Authentication**: Secure login/logout with Auth0 integration
- **Modern UI**: Built with Tailwind CSS v4 and Lucide React icons
- **TypeScript**: Fully typed for better development experience

## Tech Stack

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **Axios 1.13** - HTTP client for API requests
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Auth0 React SDK** - Authentication
- **localStorage** - Client-side caching

## Folder Structure

```
Skymate/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   │   ├── Profile.tsx
│   │   │   └── RequireAuth.tsx
│   │   ├── forms/          # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── ui/             # Base UI components
│   │   ├── AuthForm.tsx
│   │   ├── SearchBar.tsx
│   │   └── WeatherCard.tsx
│   ├── data/               # Static data files
│   │   └── cities.json     # Predefined city list
│   ├── pages/              # Page components
│   │   ├── AuthPage.tsx
│   │   ├── WeatherCardView.tsx
│   │   └── WeatherDashboard.tsx
│   ├── services/           # API and business logic
│   │   └── weatherService.ts
│   ├── utils/              # Helper functions
│   │   └── cache.ts        # Caching utilities
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md
```

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 20 or higher)
- **npm** (version 10 or higher) or **yarn**
- **OpenWeatherMap API Key** - Get one free at [https://openweathermap.org/api](https://openweathermap.org/api)
- **Auth0 Account** (optional) - For authentication features

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SandaruwanWeerawardhana/Skymate.git
cd Skymate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root directory:

```bash
# .env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Auth0 Configuration (optional)
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_AUTH0_AUDIENCE=https://your-auth0-domain.auth0.com/api/v2/
```

**Important**: Replace `your_openweather_api_key_here` with your actual OpenWeatherMap API key.

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## How Caching Works

The application implements a 5-minute caching strategy using browser localStorage:

### Cache Implementation

Located in `src/utils/cache.ts`:

```typescript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Save data with timestamp
setCache(key, data) → stores { data, time: Date.now() }

// Retrieve data if not expired
getCache(key) → returns data or null
```

### Cache Behavior

1. **First Request**: Data fetched from API, saved to localStorage with timestamp
2. **Subsequent Requests** (within 5 min): Data retrieved from localStorage (no API call)
3. **After 5 Minutes**: Cache expires, new API request made, cache updated

### Cache Keys

- **By City ID**: `weather:id:1248991`
- **By City Name**: `weather:name:colombo`
- **Detailed View**: `weather:detailed:1248991`

### Console Logging

The cache system logs all operations:
- ✅ Cache HIT - Data found and fresh
- ❌ Cache MISS - Data not found
- ⏰ Cache EXPIRED - Data too old
- ✅ Cache SAVED - New data stored

## How to Change or Add Cities

### Modify Existing Cities

Edit `src/data/cities.json`:

```json
{
  "List": [
    {
      "CityCode": "1248991",
      "CityName": "Colombo",
      "Temp": "33.0",
      "Status": "Clouds"
    }
  ]
}
```

**Note**: `Temp` and `Status` are placeholder values; real data comes from the API.

### Add New Cities

1. Get the city code from [OpenWeatherMap City List](https://bulk.openweathermap.org/sample/)
2. Add a new entry to `cities.json`:

```json
{
  "CityCode": "2643743",
  "CityName": "London",
  "Temp": "0",
  "Status": ""
}
```

### Add Cities Dynamically

Use the search bar in the application to add cities without editing the JSON file.

## API Documentation

### OpenWeatherMap API

**Base URL**: `https://api.openweathermap.org/data/2.5/weather`

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | City code (for city list) |
| `q` | string | City name (for search) |
| `appid` | string | Your API key |
| `units` | string | `metric` for Celsius |

### Example Request

```bash
https://api.openweathermap.org/data/2.5/weather?id=1248991&appid=YOUR_API_KEY&units=metric
```

### Example Response

```json
{
  "name": "Colombo",
  "main": {
    "temp": 33.0,
    "temp_min": 31.5,
    "temp_max": 34.2,
    "pressure": 1010,
    "humidity": 75
  },
  "weather": [
    {
      "main": "Clouds",
      "description": "scattered clouds"
    }
  ],
  "wind": {
    "speed": 5.2,
    "deg": 180
  },
  "sys": {
    "sunrise": 1700000000,
    "sunset": 1700043000
  },
  "visibility": 10000
}
```

## Responsive Layout

The application uses Tailwind CSS Grid for responsive layouts:

### Breakpoints

- **Mobile**: < 768px (1 column)
- **Tablet**: ≥ 768px (2 columns)
- **Desktop**: ≥ 1024px (2 columns, larger cards)

### Grid Implementation

```css
/* Weather Cards Grid */
grid grid-cols-1 md:grid-cols-2 gap-6

/* Responsive container */
container mx-auto px-4 py-8 max-w-7xl
```

### Components

All components are responsive by default:
- `WeatherCard`: Adjusts padding and font sizes
- `WeatherCardView`: Single column layout on mobile
- `SearchBar`: Full width on small screens
- Navigation: Stacks vertically on mobile

## Authentication

The app uses Auth0 for secure authentication:

### Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new Single Page Application
3. Configure these settings:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
4. Copy Domain and Client ID to `.env` file

### Features

- Secure login/logout
- Protected routes (weather dashboard requires authentication)
- User profile display
- Session persistence

## Troubleshooting

### API Key Issues

**Problem**: "Missing .env file" error

**Solution**:
1. Verify `.env` file exists in root directory
2. Check variable name is exactly `VITE_OPENWEATHER_API_KEY`
3. Ensure no spaces around the `=` sign
4. Restart dev server after creating `.env`

### Cache Not Working

**Problem**: Data refetches every time

**Solution**:
1. Open browser DevTools → Console
2. Look for cache log messages
3. Check localStorage → should see keys like `weather:id:1248991`
4. Clear localStorage: `localStorage.clear()` in console
5. Refresh page

### Cities Not Loading

**Problem**: "Failed to load weather data" message

**Solution**:
1. Verify API key is valid
2. Check internet connection
3. Verify `cities.json` format is correct
4. Check browser console for specific error messages
5. Ensure OpenWeatherMap API is not rate-limited (60 calls/min free tier)

### Build Errors

**Problem**: TypeScript or build errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Styling Issues

**Problem**: Tailwind styles not applying

**Solution**:
1. Ensure `@tailwindcss/vite` is in `devDependencies`
2. Check `vite.config.ts` includes Tailwind plugin
3. Restart dev server
4. Clear browser cache

### Auth0 Logout Not Working

**Problem**: Logout button doesn't work

**Solution**:
1. Go to Auth0 Dashboard → Applications → Settings
2. Add `http://localhost:5173` to **Allowed Logout URLs**
3. Click **Save Changes**
4. Restart the app

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_OPENWEATHER_API_KEY` | Yes | Your OpenWeatherMap API key |
| `VITE_AUTH0_DOMAIN` | No | Auth0 tenant domain |
| `VITE_AUTH0_CLIENT_ID` | No | Auth0 application client ID |
| `VITE_AUTH0_CALLBACK_URL` | No | Callback URL for Auth0 |
| `VITE_AUTH0_AUDIENCE` | No | Auth0 API audience |

## Performance Optimizations

- **React.memo**: Used on `WeatherCard` to prevent unnecessary re-renders
- **useCallback**: Memoized event handlers to maintain referential equality
- **Code Splitting**: Dynamic imports for Auth0 components
- **Caching**: 5-minute cache reduces API calls by ~99%
- **Lazy Loading**: Images load on-demand

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is private and intended for educational purposes.

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Authentication by [Auth0](https://auth0.com/)
- Built by [Sandaruwan Weerawardhana](https://github.com/SandaruwanWeerawardhana)

## Contact

For questions or issues, please open an issue on the [GitHub repository](https://github.com/SandaruwanWeerawardhana/Skymate/issues).
