import axios from "axios";
import citiesData from "../data/cities.json";
import { getCache, setCache } from "../utils/cache";

const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined;

type CityItem = { CityCode: string; CityName: string };

export type CardWeather = {
  id: string;
  cityname: string;
  description: string;
  temperature: number;
};

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error("Missing .env file");
  }
}

export const fetchWeatherById = async (
  cityId: string
): Promise<CardWeather> => {
  ensureApiKey();

  const cacheKey = `weather:id:${cityId}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const { data } = await axios.get(OPENWEATHER_URL, {
      params: { id: cityId, appid: API_KEY, units: "metric" },
    });
    const weatherData: CardWeather = {
      id: String(cityId),
      cityname: data?.name ?? String(cityId),
      description: data?.weather?.[0]?.description ?? "",
      temperature: data?.main?.temp ?? 0,
    };

    setCache(cacheKey, weatherData);

    return weatherData;
  } catch (err) {
    console.log(`Exception while fetching weather by id ${cityId}: ${err}`);
    throw err;
  }
};

export const fetchWeatherByName = async (
  name: string
): Promise<CardWeather> => {
  ensureApiKey();

  const cacheKey = `weather:name:${name.toLowerCase()}`;
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const { data } = await axios.get(OPENWEATHER_URL, {
      params: { q: name, appid: API_KEY, units: "metric" },
    });
    const weatherData: CardWeather = {
      id: String(data?.id ?? name),
      cityname: data?.name ?? name,
      description: data?.weather?.[0]?.description ?? "",
      temperature: data?.main?.temp ?? 0,
    };

    setCache(cacheKey, weatherData);

    return weatherData;
  } catch (err) {
    console.log(`Exception while fetching weather by name ${name}: ${err}`);
    throw err;
  }
};

export const fetchAllWeatherFromCities = async (): Promise<CardWeather[]> => {
  const list = (citiesData as { List: CityItem[] }).List || [];
  const results = await Promise.all(
    list.map(async (c) => {
      try {
        return await fetchWeatherById(c.CityCode);
      } catch (e) {
        console.log(
          `Exception while fetching weather for ${c.CityName} (${c.CityCode}): ${e}`
        );
        return {
          id: c.CityCode,
          cityname: c.CityName,
          description: "unavailable",
          temperature: Number.NaN,
        };
      }
    })
  );
  return results;
};
