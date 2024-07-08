const axios = require('axios');

exports.handler = async function(event, context) {
  const { query } = event.queryStringParameters;
  const API_ENDPOINT = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`;

  try {
    const response = await axios.get(API_ENDPOINT, {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    const photo_url = response.data.results[0]?.urls?.regular || '';

    return {
      statusCode: 200,
      body: JSON.stringify({ photo_url })
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch photo' })
    };
  }
};
