import {Component, ElementRef, ViewChild} from '@angular/core';
import {Locations} from '../../providers/locations';
import {GoogleMaps} from '../../providers/google-maps';
import {NavController, Platform} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

declare var google;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  private locationsData: Array<any> = [];
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public maps: GoogleMaps, public platform: Platform, public locations: Locations) {

    this.locationsData = [

      {
        "title": "City Hall",
        "latitude": 40.713484,
        "longitude": -74.006739
      },
      {
        "title": "Brooklyn Bridge",
        "latitude": 40.712801,
        "longitude": -74.004936
      },
      {
        "title": "NYPD",
        "latitude": 40.712199,
        "longitude": -74.001675
      },
      {
        "title": "The Woolworth Building",
        "latitude": 40.712443,
        "longitude": -74.008369
      },
      {
        "title": "Foley Square",
        "latitude": 40.714541,
        "longitude": -74.003091
      },
      {
        "title": "Sazon",
        "latitude": 40.715631,
        "longitude": -74.008498
      },
      {
        "title": "Southbridge Towers",
        "latitude": 40.709206,
        "longitude": -74.003434
      },
      {
        "title": "Wall St",
        "latitude": 40.707612,
        "longitude": -74.011996
      },
      {
        "title": "Tribeca Grill",
        "latitude": 40.719518,
        "longitude": -74.009807
      }
    ];
  }

  ionViewDidLoad() {
    this.loadMap();


  }

  addMarker(lat: number, lng: number, title: string) {
    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    let content = "<h4>" + title + "</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    infoWindow.open(this.map, marker);

  }

  loadMap() {
    let options = {timeout: 10000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options).then((position) => {

      let latLng = new google.maps.LatLng(40.713744, -74.009056);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });


      let content = "<h4>your current location!</h4>";
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      infoWindow.open(this.map, marker);
      let locationsLoaded = this.locations.load();

      Promise.all([
        locationsLoaded
      ]).then((result) => {
        console.log(result);

        let locations = result[0];
        for (let location of locations) {
          this.addMarker(location.latitude, location.longitude, location.title);
        }

      });


    }, (err) => {
      console.log(err);
    });
    // const watch = this.geolocation.watchPosition().subscribe(pos => {
    //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    // });

  }


}
