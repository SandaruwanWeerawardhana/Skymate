import React from "react";

interface WeatherCardProps {
  cityname: string;
  description: string;
  temperature: number;
  onRemove: () => void;
  onClick?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = React.memo(
  ({ cityname, description, temperature, onClick }) => (
    <button
      type="button"
      className="group relative z-0 w-full rounded-4xl overflow-hidden cursor-pointer text-left border-2 border-sky-300/60 hover:border-sky-300 p-0 transition-all duration-700 hover:scale-[1.04] hover:rotate-[0.5deg]"
      onClick={onClick}
      aria-label={`View detailed weather for ${cityname}`}
    >
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 m-0.5 rounded-4xl pointer-events-none z-0 bg-linear-to-tr from-blue-500/50 via-transparent to-purple-500/60" />

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* City name with subtle glow */}
        <h2 className="text-3xl font-bold mb-3 text-white tracking-tight drop-shadow-lg">
          {cityname}
        </h2>

        {/* Description */}
        <p className="text-white/90 mb-6 text-base font-medium backdrop-blur-sm inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20">
          {description}
        </p>

        {/* Temperature with dramatic styling */}
        <div className="flex items-baseline gap-3 mb-6">
          <div className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
            {temperature}°
          </div>
          <div className="text-3xl font-light text-white/80 mb-4">C</div>
        </div>
      </div>
    </button>
  )
);

export default WeatherCard;
