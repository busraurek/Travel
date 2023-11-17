import { Injectable } from '@angular/core';
interface SavedItem {
  name: string;
  bookmarked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SavedItemsService {
  
  savedItems: SavedItem[] = [];

  constructor() { }

  saveItem(item: SavedItem) {
    const existingItem = this.savedItems.find(savedItem => savedItem.name === item.name);

    if (!existingItem) {
      this.savedItems.push(item);
    } else {
      existingItem.bookmarked = true;
    }
  }
  toggleBookmark(itemName: string) {
    const existingItem = this.savedItems.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.bookmarked = !existingItem.bookmarked;
    } else {
      this.savedItems.push({ name: itemName, bookmarked: true });
    }
  }

  unbookmarkItem(itemName: string) {
    const index = this.savedItems.findIndex((savedItem) => savedItem.name === itemName);

    if (index !== -1) {
      this.savedItems.splice(index, 1);
    }
  }

  getSavedItems() {
    return this.savedItems.filter(item => item.bookmarked);
  }
}
