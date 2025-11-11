import React, { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import { Cloud } from 'lucide-react';
import type { CardWeather } from '@/services/weatherService';
import { fetchAllWeatherFromCities, fetchWeatherByName } from '@/services/weatherService';
type CardItem = CardWeather;

export const WeatherDashboard: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddCity = async (cityName: string) => {
    if (!cityName.trim()) return;
    try {
      const item = await fetchWeatherByName(cityName);
      setCards((prev) => [...prev, item]);
    } catch (e) {
      console.error(e);
      setError('Could not find that city');
    }
  };

  const handleRemoveCity = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

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
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm pb-8">
          <p>2021 Fidenz Technologies</p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;
