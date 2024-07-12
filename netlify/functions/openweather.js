const axios = require('axios');

exports.handler = async function(event, context) {
  const { location } = event.queryStringParameters;
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

  try {
    const response = await axios.get(API_ENDPOINT);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data' }),
    };
  }
};
