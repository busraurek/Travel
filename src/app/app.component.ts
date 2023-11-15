import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  data : any
  
  constructor(private dataService : DataService) {}

  ngOnInit() {
   
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
