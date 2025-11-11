import React, { useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import { Cloud } from 'lucide-react';

interface City {
  id: number;
  city: string;
  date: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  condition: string;
  pressure: string;
  humidity: string;
  visibility: string;
  windSpeed: string;
  windDegree: string;
  sunrise: string;
  sunset: string;
  color: string;
}

export const WeatherDashboard: React.FC = () => {
  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      city: 'Colombo, LK',
      date: '9:19am, Feb 8',
      temperature: 27,
      tempMin: 25,
      tempMax: 28,
      condition: 'Few Clouds',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: 'blue'
    },
    {
      id: 2,
      city: 'Tokyo, JP',
      date: '9:19am, Feb 8',
      temperature: 7,
      tempMin: -7,
      tempMax: 7,
      condition: 'Broken Clouds',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: 'purple'
    },
    {
      id: 3,
      city: 'Liverpool, GB',
      date: '9:19am, Feb 8',
      temperature: -2,
      tempMin: -2,
      tempMax: 5,
      condition: 'Clear Sky',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: 'green'
    },
    {
      id: 4,
      city: 'Sydney, AU',
      date: '9:19am, Feb 8',
      temperature: 26,
      tempMin: 20,
      tempMax: 30,
      condition: 'Light Rain',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: 'orange'
    },
    {
      id: 5,
      city: 'Boston, US',
      date: '9:19am, Feb 8',
      temperature: 13,
      tempMin: 10,
      tempMax: 15,
      condition: 'Mist',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: 'red'
    }
  ]);

  const handleAddCity = (cityName: string): void => {
    if (!cityName.trim()) return;

    const colors = ['blue', 'purple', 'green', 'orange', 'red'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCity: City = {
      id: Date.now(),
      city: cityName,
      date: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric'
      }),
      temperature: Math.floor(Math.random() * 30) + 5,
      tempMin: Math.floor(Math.random() * 15),
      tempMax: Math.floor(Math.random() * 15) + 20,
      condition: ['Clear Sky', 'Few Clouds', 'Broken Clouds', 'Light Rain', 'Mist'][Math.floor(Math.random() * 5)],
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '8.0km',
      windSpeed: '4.0m/s',
      windDegree: '120 Degree',
      sunrise: '6:05am',
      sunset: '6:05am',
      color: randomColor
    };

    setCities([...cities, newCity]);
  };

  const handleRemoveCity = (id: number): void => {
    setCities(cities.filter(city => city.id !== id));
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {cities.map((city) => (
            <WeatherCard
              key={city.id}
              {...city}
              cityname={city.city}
              description={city.condition}
              onRemove={() => handleRemoveCity(city.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm pb-8">
          <p>2021 Fidènz Technologies</p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;
