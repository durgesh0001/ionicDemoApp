
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Locations } from '../../providers/locations';

@Component({
  selector: 'page-map-list',
  templateUrl: 'map-list.html',
})
export class MapList {

  constructor(public navCtrl: NavController, public locations: Locations) {}

  ionViewDidLoad() {
    console.log('Hello ListPage Page');
  }

}


