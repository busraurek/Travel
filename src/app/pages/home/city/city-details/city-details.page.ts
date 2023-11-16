import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ActivatedRoute, } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
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

  map : any = Map; 
  marker: any = new mapboxgl.Marker();
 

  constructor( private dataService: DataService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
    this.cityUrl = this.activatedRoute.snapshot.paramMap.get('cityId')as string;
    this.placeUrl = this.activatedRoute.snapshot.paramMap.get('cityDetailsId') as string;
    this.getData();
    this.initMap();
  }
  initMap() {
    (mapboxgl as any).accessToken = environment.mapboxkey;
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = '';  
    }

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 15,
    });
  }
 
  showMap() {
    setTimeout(() => {
      this.dataService.getData().subscribe((data: any) => {
        const cityData = data.travelsCity.find((city: any) => city.url === this.cityUrl);
        const placeData = cityData.gezilecekYerler.find((place: any) => place.url === this.placeUrl);
  
        console.log(placeData.lat, placeData.lon);
  
        this.map.setCenter([placeData.lon, placeData.lat]);
  
        if (this.marker) {
          this.marker.remove();
        }
  
        this.marker = new mapboxgl.Marker(
          {}
        )
          .setLngLat([placeData.lon, placeData.lat])
          .addTo(this.map);
      }
      );
    }, 2000);
  } 
  getData() {
    this.dataService.getData().subscribe((data: any) => {
      let cityData = data.travelsCity.find(
        (city: any) => city.url === this.cityUrl
      );

    console.log(cityData)
    console.log(this.placeUrl)

      this.data = cityData.gezilecekYerler.find(
        (place: any) => place.url === this.placeUrl
      )
      this.showMap();
    })
  }

}
