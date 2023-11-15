import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
cityUrl : string = '';
homeUrl : string  = ''
data : any; 
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.cityUrl = this.activatedRoute.snapshot.paramMap.get('cityId')as string;
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
    this.getData();
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
}
