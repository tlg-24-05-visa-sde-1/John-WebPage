// wishlist.js
export default class Wishlist {
    constructor() {
      this.items = JSON.parse(localStorage.getItem("wishlist")) || [];
    }

    add(item) {
      this.items.push(item);
      this.save();
    }

    edit(index, updatedItem) {
      this.items[index] = { ...this.items[index], ...updatedItem };
      this.save();
    }

    remove(index) {
      this.items.splice(index, 1);
      this.save();
    }

    save() {
      localStorage.setItem("wishlist", JSON.stringify(this.items));
    }

    getItems() {
      return this.items;
    }
  }
