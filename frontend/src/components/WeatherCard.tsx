import React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface WeatherCardProps {
  cityname: string;
  description: string;
  temperature: number;
  onRemove: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityname,
  description,
  temperature,
  onRemove,
}) => {
  return (
    <div className="rounded-xl overflow-hidden card-shadow smooth-transition hover:card-shadow-hover hover:scale-[1.02] bg-[hsl(217_20%_24%)] text-white">
      <div className="p-6 relative">
        <Button
          onClick={onRemove}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white border-0"
        >
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-2xl font-bold mb-2">{cityname}</h2>
        <p className="text-white/90 mb-4">{description}</p>
        <div className="text-5xl font-bold">{temperature}°C</div>
      </div>
    </div>
  );
};

export default WeatherCard;
