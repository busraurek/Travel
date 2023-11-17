import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ActivatedRoute, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../services/translation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  private languageChangeSubscription: Subscription;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  title: any
cityUrl : string = '';
homeUrl : string  = ''
data : any; 
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private translate : TranslateService,
    private translation: TranslationService) {
      this.languageChangeSubscription = this.translation.getLanguageChangeObservable().subscribe(() => {
        this.updateTranslations();
      });
     }

  ngOnInit() {
    this.cityUrl = this.activatedRoute.snapshot.paramMap.get('cityId')as string;
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
    this.getData();
    this.updateTranslations(); 
  }
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe(); 
  }


  getData() {
    this.dataService.getData().subscribe((data: any) => {
      console.log('Received data:', data);
      if (data && data.travelsCity) {
        this.data = data.travelsCity.find((city: any) => city.url === this.cityUrl);
      } else {
        console.error('Invalid data structure:', data);
      }
    });
  }
  private updateTranslations() {
    this.translate.get('HomePage.title').subscribe((title) => {
      this.title = title;
    }); }
}
