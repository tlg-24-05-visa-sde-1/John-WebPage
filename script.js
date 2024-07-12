import Wishlist from "./wishlist.js";
import { getPhotoUrl } from "./api.js";
import { renderWishlist, showAlert } from "./ui.js";

const wishlist = new Wishlist();

document
  .getElementById("destinationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("destinationName").value.trim();
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();

    if (name && location) {
      getPhotoUrl(name)
        .then(photo => {
          wishlist.add({ name, location, photo, description });
          renderWishlist(wishlist.getItems(), editDestination, removeDestination);
          this.reset();
        })
        .catch(error => {
          console.error("Error adding destination:", error);
          showAlert("An error occurred while adding the destination. Please try again.");
        });
    } else {
      showAlert("Please enter both a destination name and location.");
    }
  });

function editDestination(index) {
  const item = wishlist.getItems()[index];
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
      getPhotoUrl(newName)
        .then((photo) => {
          wishlist.edit(index, { ...item, photo });
          renderWishlist(
            wishlist.getItems(),
            editDestination,
            removeDestination
          );
        })
        .catch((error) => {
          console.error("Error fetching new photo:", error);
          wishlist.edit(index, item);
          renderWishlist(
            wishlist.getItems(),
            editDestination,
            removeDestination
          );
        });
    } else {
      wishlist.edit(index, item);
      renderWishlist(wishlist.getItems(), editDestination, removeDestination);
    }
  }
}

function removeDestination(index) {
  wishlist.remove(index);
  renderWishlist(wishlist.getItems(), editDestination, removeDestination);
}

try {
  renderWishlist(wishlist.getItems(), editDestination, removeDestination);
} catch (error) {
  console.error("Error rendering initial wishlist:", error);
  showAlert("An error occurred while loading the wishlist. Please refresh the page.");
}
