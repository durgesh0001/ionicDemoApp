import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

declare var google;
/**
 * Generated class for the Geolocatoin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-geolocatoin',
  templateUrl: 'geolocatoin.html',
})
export class Geolocatoinnew {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,private platform: Platform) {
  }

  ngAfterViewInit() {
    this.loadMap();
  }


  loadMap(){
    let options = {timeout: 10000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options).then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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

    }, (err) => {
      console.log(err);
    });
    // const watch = this.geolocation.watchPosition().subscribe(pos => {
    //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
    // });

  }
  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  currentPosition(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>your current location!</h4>";

   this.addInfoWindowofCurrentlocation(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  addInfoWindowofCurrentlocation(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    infoWindow.open(this.map, marker);


  }

}
