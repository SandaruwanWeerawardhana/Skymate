import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface SearchBarProps {
  onAddCity: (cityName: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onAddCity }) => {
  const [cityName, setCityName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cityName.trim()) {
      onAddCity(cityName);
      setCityName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Enter a city"
          value={cityName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCityName(e.target.value)
          }
          className="flex-1 h-12 px-6 rounded-lg"
        />
        <Button type="submit" className="h-12 px-8 rounded-lg font-medium">
          Add City
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
