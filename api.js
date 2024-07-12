export async function getPhotoUrl(query) {
  try {
      const response = await fetch(`/.netlify/functions/unsplash-search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.photo_url || "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
  } catch (error) {
      console.error("Error fetching photo:", error);
      throw error;
  }
}

export async function getWeather(location) {
  try {
      const response = await fetch(`/.netlify/functions/openweather?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Weather data not found');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
  }
}
