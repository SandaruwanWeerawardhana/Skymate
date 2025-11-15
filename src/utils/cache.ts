const CACHE_DURATION = 1 * 60 * 1000; 

export const setCache = (key: string, data: any) => {
  try {
    const timestamp = Date.now();
    localStorage.setItem(key, JSON.stringify({ data, time: timestamp }));
    console.log(`CACHE SAVED`, key);
    console.log(`   Timestamp: ${new Date(timestamp).toLocaleTimeString()}`);
  } catch (error) {
    console.error("Failed to save cache:", error);
  }
};

export const getCache = (key: string) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log(`CACHE MISS`, key);
      return null;
    }

    const { data, time } = JSON.parse(cached);
    const age = Date.now() - time;
    const ageSeconds = (age / 1000).toFixed(1);
    const remainingSeconds = ((CACHE_DURATION - age) / 1000).toFixed(1);

    if (age < CACHE_DURATION) {
      console.log(`CACHE HIT`, key);
      console.log(`   Age: ${ageSeconds}s | Remaining: ${remainingSeconds}s`);
      return data;
    }

    console.log(`CACHE EXPIRED`, key);
    console.log(`   Age: ${ageSeconds}s (expired ${(age - CACHE_DURATION) / 1000}s ago)`);
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.error("Failed to get cache:", error);
    return null;
  }
};
