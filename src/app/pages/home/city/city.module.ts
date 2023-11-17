import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityPageRoutingModule } from './city-routing.module';

import { CityPage } from './city.page';
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
    CityPageRoutingModule,
    HttpClientModule,
    TranslateModule

  ],
  declarations: [CityPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CityPageModule {}
