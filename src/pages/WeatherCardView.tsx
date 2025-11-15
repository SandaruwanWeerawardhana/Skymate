import React from "react";
import { Cloud, CloudRain, Sun, Wind, CloudFog } from "lucide-react";

const weatherIcons: Record<string, React.ElementType> = {
  "Few Clouds": Cloud,
  "Broken Clouds": Cloud,
  "Clear Sky": Sun,
  Clear: Sun,
  "Light Rain": CloudRain,
  Rain: CloudRain,
  Mist: CloudFog,
  Clouds: Cloud,
};

interface WeatherCardViewProps {
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
  onRemove: () => void;
}

export const WeatherCardView: React.FC<WeatherCardViewProps> = React.memo(
  ({
    city,
    date,
    temperature,
    tempMin,
    tempMax,
    condition,
    pressure,
    humidity,
    visibility,
    windSpeed,
    windDegree,
    sunrise,
    sunset,
  }) => {
    const WeatherIcon = weatherIcons[condition] || Cloud;

    return (
      <div className="rounded-2xl overflow-hidden card-shadow smooth-transition hover:card-shadow-hover hover:scale-[1.04] max-w-5xl mx-auto">
        <div className={`bg-blue-800 p-10 relative overflow-hidden min-h-80`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{city}</h2>
              <p className="text-white/90 text-lg mb-8">{date}</p>
              <div className="flex items-center gap-4 mb-2">
                <WeatherIcon
                  className="w-14 h-14 text-white"
                  strokeWidth={1.5}
                />
                <span className="text-white font-semibold text-2xl">
                  {condition}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-7xl font-bold text-white mb-4">
                {temperature}°C
              </div>
              <div className="text-lg text-white/90">
                <div>
                  Temp Min: <span className="font-bold">{tempMin}°C</span>
                </div>
                <div>
                  Temp Max: <span className="font-bold">{tempMax}°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[hsl(217_20%_24%)] p-7 px-7">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-white/70 text-lg mb-4">
                <div className="mb-2">
                  Pressure:{" "}
                  <span className="text-white font-bold">{pressure}</span>
                </div>
                <div className="mb-2">
                  Humidity:{" "}
                  <span className="text-white font-bold">{humidity}</span>
                </div>
                <div>
                  Visibility:{" "}
                  <span className="text-white font-bold">{visibility}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center col-span-2">
              <Wind
                className="w-12 h-12 text-white/70 mb-3"
                strokeWidth={1.5}
              />
              <div className="text-white text-lg font-semibold">
                {windSpeed} {windDegree}
              </div>
            </div>

            <div className="flex flex-col items-end justify-end text-white/70 text-lg mb-4">
              <div className="mb-2">
                Sunrise: <span className="text-white font-bold">{sunrise}</span>
              </div>
              <div className="mb-2">
                Sunset: <span className="text-white font-bold">{sunset}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WeatherCardView.displayName = "WeatherCardView";

export default WeatherCardView;
