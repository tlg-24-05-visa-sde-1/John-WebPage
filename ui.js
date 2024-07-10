// ui.js
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
          <div class="button-container">
            <button class="btn btn-warning btn-sm edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm remove-btn">Remove</button>
          </div>
        </div>
      `;

      itemDiv.querySelector('.edit-btn').addEventListener('click', () => editCallback(index));
      itemDiv.querySelector('.remove-btn').addEventListener('click', () => removeCallback(index));

      wishlistDiv.appendChild(itemDiv);
    });
  }

  export function showAlert(message) {
    alert(message);
  }
