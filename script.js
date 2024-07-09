let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document
  .getElementById("destinationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("destinationName").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    if (name && location) {
      fetch(`/.netlify/functions/unsplash-search?query=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
          const photo = data.photo_url || "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";
          wishlist.push({
            name,
            location,
            photo,
            description,
          });
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();
          this.reset();
        })
        .catch(error => {
          console.error("Error fetching photo:", error);
          alert("An error occurred while fetching the photo. Please try again.");
        });
    } else {
      alert("Please enter both a destination name and location.");
    }
  });

function renderWishlist() {
  const wishlistDiv = document.getElementById("wishlist");
  wishlistDiv.innerHTML = "";
  wishlist.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "wishlist-item";
    itemDiv.innerHTML = `
        <img src="${item.photo}" alt="${item.name}">
        <div class="wishlist-info">
          <h3>${item.name}</h3>
          <p>${item.location}</p>
          <p>${item.description}</p>
          <div class="button-container">
            <button onclick="editDestination(${index})" class="btn btn-warning btn-sm">Edit</button>
            <button onclick="removeDestination(${index})" class="btn btn-danger btn-sm">Remove</button>
          </div>
        </div>
      `;
    wishlistDiv.appendChild(itemDiv);
  });
}

function editDestination(index) {
  const item = wishlist[index];
  const fields = ["name", "location", "description"];
  let updated = false;
  let newName;

  for (let field of fields) {
    const newValue = prompt(
      `Enter new ${field} (current: ${item[field]}):`,
      item[field]
    );
    if (newValue !== null && newValue.trim() !== item[field]) {
      item[field] = newValue.trim();
      updated = true;
      if (field === "name") {
        newName = newValue.trim();
      }
    }
  }

  if (updated) {
    if (newName) {
      fetch(`/.netlify/functions/unsplash-search?query=${encodeURIComponent(newName)}`)
        .then(response => response.json())
        .then(data => {
          if (data.photo_url) {
            item.photo = data.photo_url;
          }
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();
        })
        .catch(error => {
          console.error("Error fetching new photo:", error);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          renderWishlist();
        });
    } else {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
    }
  }
}

function removeDestination(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

renderWishlist();
