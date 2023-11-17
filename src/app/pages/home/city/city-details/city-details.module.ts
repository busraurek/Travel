import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityDetailsPageRoutingModule } from './city-details-routing.module';

import { CityDetailsPage } from './city-details.page';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityDetailsPageRoutingModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [CityDetailsPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CityDetailsPageModule {}
