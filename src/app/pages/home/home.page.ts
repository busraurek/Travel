import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private languageChangeSubscription: Subscription;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  title : any;
  data : any
  homeUrl : string  =''
  constructor( private dataService: DataService, private http: HttpClient, private translate : TranslateService,
    private translation: TranslationService ) {
      this.languageChangeSubscription = this.translation.getLanguageChangeObservable().subscribe(() => {
        this.updateTranslations();
      });
     }

  ngOnInit() {
    this.getData();
    this.updateTranslations(); 
  }
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe(); 
  }

  getData(){
    this.dataService.getData().subscribe((data:any)=>{
      console.log('Received data:', data);
      this.data = data.travelsCity;
    })
  }
  private updateTranslations() {
    this.translate.get('HomePage.title').subscribe((title) => {
      this.title = title;
    }); }

    
}
