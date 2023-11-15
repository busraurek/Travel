import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  data : any
  homeUrl : string  =''
  constructor( private dataService: DataService, private http: HttpClient ) { }

  ngOnInit() {
    this.getData()
  }


  getData(){
    this.dataService.getData().subscribe((data:any)=>{
      console.log('Received data:', data);
      this.data = data.travelsCity;
    })
  }
}
