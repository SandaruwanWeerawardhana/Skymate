import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WeatherCard from '../components/WeatherCard';
import WeatherCardView from './WeatherCardView';
import SearchBar from '../components/SearchBar';
import { Cloud, ArrowLeft, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CardWeather, DetailedWeather } from '@/services/weatherService';
import { fetchAllWeatherFromCities, fetchWeatherByName, fetchDetailedWeatherById } from '@/services/weatherService';
type CardItem = CardWeather;

export const WeatherDashboard: React.FC = () => {
  const { user, logout } = useAuth0();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<DetailedWeather | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllWeatherFromCities();
        setCards(data);
      } catch (e) {
        console.error(e);
        setError('Failed to load weather data. Check API key.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // useCallback memoizes the function - prevents creating new function on every render
  // This is important for React.memo components (WeatherCard won't re-render unnecessarily)
  const handleAddCity = useCallback(async (cityName: string) => {
    if (!cityName.trim()) return;
    try {
      const item = await fetchWeatherByName(cityName);
      setCards((prev) => [...prev, item]);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Could not find that city');
    }
  }, []);

  // useCallback with empty deps - function never changes between renders
  const handleRemoveCity = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Handle card click to show detailed view
  const handleCardClick = useCallback(async (cityId: string) => {
    setLoadingDetail(true);
    try {
      const detailedWeather = await fetchDetailedWeatherById(cityId);
      setSelectedCity(detailedWeather);
    } catch (e) {
      console.error('Failed to load detailed weather:', e);
      setError('Failed to load weather details');
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  // Handle back button
  const handleBack = useCallback(() => {
    setSelectedCity(null);
  }, []);

  // If detailed view is selected, show WeatherCardView
  if (selectedCity) {
    return (
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <Button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          {loadingDetail ? (
            <p className="text-center text-foreground">Loading details...</p>
          ) : (
            <WeatherCardView
              city={selectedCity.city}
              date={selectedCity.date}
              temperature={selectedCity.temperature}
              tempMin={selectedCity.tempMin}
              tempMax={selectedCity.tempMax}
              condition={selectedCity.condition}
              pressure={selectedCity.pressure}
              humidity={selectedCity.humidity}
              visibility={selectedCity.visibility}
              windSpeed={selectedCity.windSpeed}
              windDegree={selectedCity.windDegree}
              sunrise={selectedCity.sunrise}
              sunset={selectedCity.sunset}
              onRemove={() => {
                handleRemoveCity(selectedCity.id);
                handleBack();
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background Clouds */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-full">
          <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100 L1200,200 L0,200 Z" fill="hsl(217 45% 15%)" opacity="0.8" />
            <path d="M0,120 Q200,80 400,120 T800,120 T1200,120 L1200,200 L0,200 Z" fill="hsl(217 45% 12%)" opacity="0.6" />
            <path d="M0,150 Q250,120 500,150 T1000,150 T1200,150 L1200,200 L0,200 Z" fill="hsl(217 45% 10%)" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* User Profile Bar */}
        <div className="flex justify-end items-center gap-4 mb-6">
          {user && (
            <div className="flex items-center gap-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 px-4 py-2 shadow-lg">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-purple-400"
                />
              ) : (
                <User className="w-6 h-6 text-white/80" />
              )}
              <span className="text-white/90 font-medium">{user.name || user.email}</span>
            </div>
          )}
          <Button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: globalThis.location.origin,
                },
              })
            }
            className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600 text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Cloud className="w-10 h-10 text-foreground" strokeWidth={1.5} />
            <h1 className="text-4xl font-bold text-foreground">Weather App</h1>
          </div>

          {/* Search Bar */}
          <SearchBar onAddCity={handleAddCity} />
        </header>

        {/* Weather Cards Grid */}
        {loading && <p className="text-center text-foreground">Loading...</p>}
        {!loading && error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {cards.map((c) => (
              <WeatherCard
                key={c.id}
                cityname={c.cityname}
                description={c.description}
                temperature={c.temperature}
                onRemove={() => handleRemoveCity(c.id)}
                onClick={() => handleCardClick(c.id)}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm pb-8">
          <p>2025 Fidenz Technologies</p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;
