import { Component, OnInit } from '@angular/core';
import { SavedItemsService } from 'src/app/services/saved-items.service';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.page.html',
  styleUrls: ['./saved-items.page.scss'],
})
export class SavedItemsPage implements OnInit {
  savedItems: any[] = [];
  homeUrl : string  = ''
  
  constructor(private savedItemsService: SavedItemsService, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.savedItems = this.savedItemsService.getSavedItems();
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
  }

}
