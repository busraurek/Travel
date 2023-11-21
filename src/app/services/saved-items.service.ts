import { Injectable } from '@angular/core';
interface SavedItem {
  name: string;
  bookmarked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SavedItemsService {
  
  private savedItems: SavedItem[] = [];
  private localStorageKey = 'myAppSavedItems';

  constructor() {  
   this.getFromLocalStorage();
  }
  private getFromLocalStorage(): void {
  const savedItemsFromStorage = localStorage.getItem(this.localStorageKey);
  if (savedItemsFromStorage) {
    this.savedItems = JSON.parse(savedItemsFromStorage);
  } 
}
  private saveToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.savedItems));}

  saveItem(item: SavedItem) {
    const existingItem = this.savedItems.find(savedItem => savedItem.name === item.name);

    if (!existingItem) {
      this.savedItems.push(item);
    } else {
      existingItem.bookmarked = true;
    }
    this.saveToLocalStorage();
  }
  toggleBookmark(itemName: string) {
    const existingItem = this.savedItems.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.bookmarked = !existingItem.bookmarked;
    } else {
      this.savedItems.push({ name: itemName, bookmarked: true });
    }
    this.saveToLocalStorage();
  }

  unbookmarkItem(itemName: string) {
    const index = this.savedItems.findIndex((savedItem) => savedItem.name === itemName);

    if (index !== -1) {
      this.savedItems.splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  getSavedItems() {
    return this.savedItems.filter(item => item.bookmarked);
  }
}
