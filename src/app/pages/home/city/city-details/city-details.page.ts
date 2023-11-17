import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { ActivatedRoute, Router, } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { SavedItemsService } from 'src/app/services/saved-items.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../../services/translation.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
})
export class CityDetailsPage implements OnInit {
  private languageChangeSubscription: Subscription;

  isBookmarked: any = undefined;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  cityUrl : string = '';
  homeUrl : string  = ''
  placeUrl : string = ''
  data : any; 
  title: any

  map : any = Map; 
  marker: any = new mapboxgl.Marker();
 

  constructor( private dataService: DataService,
    private activatedRoute: ActivatedRoute,
     private savedItemsService: SavedItemsService,
     private router :Router,private translate : TranslateService,
     private translation: TranslationService
     ) { this.languageChangeSubscription = this.translation.getLanguageChangeObservable().subscribe(() => {
      this.updateTranslations();
    }); }

  ngOnInit() {
    this.homeUrl = this.activatedRoute.snapshot.paramMap.get('homeId') as string;
    this.cityUrl = this.activatedRoute.snapshot.paramMap.get('cityId')as string;
    this.placeUrl = this.activatedRoute.snapshot.paramMap.get('cityDetailsId') as string;
    this.getData();
    this.initMap();
    this.updateTranslations(); 
  }
  ngOnDestroy() {
    this.languageChangeSubscription.unsubscribe(); 
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
  
        this.marker = new mapboxgl.Marker({})
        .setLngLat([placeData.lon, placeData.lat])
        .addTo(this.map)
        .setPopup(new mapboxgl.Popup({ offset: 25,className:'custom-popup-class', maxWidth: '300px'}) 
          .setHTML('<h3>' + placeData.ad + '</h3>' +
            '<a href="https://www.google.com/maps/dir/?api=1&destination=' +
            placeData.lat + ',' + placeData.lon + '" target="_blank">Google Maps</a>'))
        .addTo(this.map);
    });
  }, 2000);
}

  openGoogleMaps(lat: number, lon: number) {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
    window.open(googleMapsUrl, '_blank');
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
  saveCurrentPlace() {
  
    this.dataService.getData().subscribe((data: any) => {
      const cityData = data.travelsCity.find((city: any) => city.url === this.cityUrl);
      const currentPlace = cityData.gezilecekYerler.find((place: any) => place.url === this.placeUrl);

      console.log('Save button clicked');
      this.savedItemsService.saveItem(currentPlace.ad);
    });
  }
 
  toggleBookmark() {
    const itemName = this.data.ad; 

    this.savedItemsService.toggleBookmark(itemName);

    this.isBookmarked = !this.isBookmarked;
    console.log('Toggle Bookmark Clicked');
    
  }
  private updateTranslations() {
    this.translate.get('HomePage.title').subscribe((title) => {
      this.title = title;
    }); }
}

// city-details çevirileri kaldıııııııııııııı*************