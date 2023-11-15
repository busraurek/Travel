import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
})
export class CityDetailsPage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  cityUrl : string = '';
  homeUrl : string  = ''
  placeUrl : string = ''
  data : any; 

  constructor( private dataService: DataService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
    this.cityUrl = this.activatedRoute.snapshot.paramMap.get('cityId')as string;
    this.placeUrl = this.activatedRoute.snapshot.paramMap.get('placeId') as string;
    this.getData();
  }

 


getData() {
  this.dataService.getData().subscribe((data: any) => {
    console.log('Received data:', data);
    if (data && data.travelsCity) {
      this.data = data.travelsCity.find((city: any) => this.cityUrl === this.placeUrl);
    } else {
      console.error('Invalid data structure:', data);
    }
  });
}}


//burdak kaldımmmmmmmmmmmmmmmmmmm