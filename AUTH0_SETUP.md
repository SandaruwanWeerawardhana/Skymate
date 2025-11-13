# Auth0 Setup Guide

## Prerequisites
1. An Auth0 account (sign up at https://auth0.com)
2. A configured Auth0 Application

## Step 1: Create Auth0 Application

1. Log in to your Auth0 Dashboard
2. Go to **Applications** > **Applications**
3. Click **Create Application**
4. Choose **Single Page Application**
5. Select **React** as the technology

## Step 2: Configure Application Settings

In your Auth0 Application settings:

### Allowed Callback URLs
```
http://localhost:5173,
http://localhost:5173/dashboard
```

### Allowed Logout URLs
```
http://localhost:5173
```

### Allowed Web Origins
```
http://localhost:5173
```

### Allowed Origins (CORS)
```
http://localhost:5173
```

## Step 3: Create API (Optional, for backend integration)

1. Go to **Applications** > **APIs**
2. Click **Create API**
3. Set a name (e.g., "Weather App API")
4. Set an identifier (e.g., `https://weather-app-api`)
5. Leave signing algorithm as RS256

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Auth0 credentials in `.env`:
   ```env
   VITE_AUTH0_DOMAIN=your-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   VITE_AUTH0_CALLBACK_URL=http://localhost:5173
   VITE_AUTH0_AUDIENCE=https://weather-app-api
   VITE_OPENWEATHER_API_KEY=your-openweather-api-key
   ```

   - **VITE_AUTH0_DOMAIN**: Found in Application Settings (e.g., `dev-abc123.us.auth0.com`)
   - **VITE_AUTH0_CLIENT_ID**: Found in Application Settings under "Client ID"
   - **VITE_AUTH0_AUDIENCE**: Your API Identifier (if you created an API)
   - **VITE_AUTH0_CALLBACK_URL**: Your app URL (for development: `http://localhost:5173`)

## Step 5: Test Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. You should see the Auth0 login page
4. After login, you'll be redirected to the Weather Dashboard

## Features Implemented

✅ **Login**: Users are redirected to Auth0 Universal Login
✅ **Logout**: Users can log out and return to the login page
✅ **Protected Routes**: Weather Dashboard requires authentication
✅ **User Info**: Display logged-in user's name/email
✅ **Token Caching**: Refresh tokens stored in localStorage
✅ **Automatic Redirect**: Unauthenticated users redirected to login

## Troubleshooting

### "Invalid state" error
- Check that your Allowed Callback URLs match exactly
- Clear browser cache and try again

### "Access denied" error
- Verify your Client ID and Domain are correct
- Check that the application is enabled in Auth0 Dashboard

### Infinite redirect loop
- Ensure Auth0 credentials are properly set in `.env`
- Restart the development server after changing `.env`

## Production Deployment

Before deploying to production:

1. Add your production URL to Auth0 Application Settings:
   - Allowed Callback URLs
   - Allowed Logout URLs
   - Allowed Web Origins
   
2. Update `.env` with production values:
   ```env
   VITE_AUTH0_CALLBACK_URL=https://your-production-url.com
   ```

3. Ensure `.env` is in `.gitignore` (never commit credentials)

## Additional Resources

- [Auth0 React SDK Documentation](https://auth0.com/docs/libraries/auth0-react)
- [Auth0 Dashboard](https://manage.auth0.com/)
- [Auth0 Community Forum](https://community.auth0.com/)
