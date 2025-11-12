
const CACHE_DURATION = 5 * 60 * 1000; 


export const setCache = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
    console.log(`✅ Cache SAVED: ${key}`);
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
};


export const getCache = (key: string) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log(`❌ Cache MISS: ${key} (not found)`);
      return null;
    }

    const { data, time } = JSON.parse(cached);
    const age = Date.now() - time;
    
    if (age < CACHE_DURATION) {
      const ageMinutes = (age / 60000).toFixed(2);
      console.log(`✅ Cache HIT: ${key} (age: ${ageMinutes} min)`);
      return data;
    }

    const ageMinutes = (age / 60000).toFixed(2);
    console.log(`⏰ Cache EXPIRED: ${key} (age: ${ageMinutes} min)`);
    localStorage.removeItem(key); 
    return null;
  } catch (error) {
    console.error('Failed to get cache:', error);
    return null;
  }
};
