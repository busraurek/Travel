import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedItemsPageRoutingModule } from './saved-items-routing.module';

import { SavedItemsPage } from './saved-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedItemsPageRoutingModule
  ],
  declarations: [SavedItemsPage]
})
export class SavedItemsPageModule {}
