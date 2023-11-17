import { Component, OnInit } from '@angular/core';
import { SavedItemsService } from 'src/app/services/saved-items.service';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.page.html',
  styleUrls: ['./saved-items.page.scss'],
})
export class SavedItemsPage implements OnInit {
  savedItems: any[] = [];
  constructor(private savedItemsService: SavedItemsService) { }

  ngOnInit() {
    this.savedItems = this.savedItemsService.getSavedItems();
  }

}
