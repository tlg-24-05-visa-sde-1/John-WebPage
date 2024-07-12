export function renderWishlist(wishlistItems, editCallback, removeCallback) {
  const wishlistDiv = document.getElementById("wishlist");
  wishlistDiv.innerHTML = "";
  wishlistItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "wishlist-item";
      itemDiv.innerHTML = `
          <img src="${item.photo}" alt="${item.name}">
          <div class="wishlist-info">
              <h3>${item.name}</h3>
              <p>${item.location}</p>
              <p>${item.description}</p>
              <div class="weather-info" id="weather-${index}">Loading weather...</div>
              <div class="map" id="map-${index}" style="height: 180px;"></div>
              <div class="button-container">
                  <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                  <button class="btn btn-danger btn-sm remove-btn">Remove</button>
              </div>
          </div>
      `;

      itemDiv.querySelector('.edit-btn').addEventListener('click', () => editCallback(index));
      itemDiv.querySelector('.remove-btn').addEventListener('click', () => removeCallback(index));

      wishlistDiv.appendChild(itemDiv);

      // Initialize map
      const map = L.map(`map-${index}`).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Fetch and display weather and map
      getWeather(item.location).then(weather => {
          const weatherDiv = document.getElementById(`weather-${index}`);
          weatherDiv.innerHTML = `Temperature: ${weather.main.temp}°C, ${weather.weather[0].description}`;
          const { lat, lon } = weather.coord;
          map.setView([lat, lon], 10);
          L.marker([lat, lon]).addTo(map);
      }).catch(error => {
          const weatherDiv = document.getElementById(`weather-${index}`);
          weatherDiv.innerHTML = 'Weather data not available';
          console.error('Error fetching weather:', error);
      });
  });
}

import { getWeather } from './api.js';
